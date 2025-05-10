// src/routes/api/contact/+server.js

import nodemailer from 'nodemailer';
// Import private environment variables using SvelteKit's $env module
const EMAIL_USER = import.meta.env.VITE_EMAIL_USER || process.env.EMAIL_USER;
const EMAIL_PASS = import.meta.env.VITE_EMAIL_PASS || process.env.EMAIL_PASS;

/**
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
    // Check if environment variables are loaded. This is a critical first step.
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error('CRITICAL: EMAIL_USER or EMAIL_PASS environment variables are not loaded. Check your .env file and SvelteKit configuration.');
        return new Response(
            JSON.stringify({
                error: 'Server configuration error: Email service credentials missing. Please contact support.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    let data;
    try {
        data = await request.json();
    } catch (e) {
        console.error('Failed to parse JSON body:', e);
        return new Response(
            JSON.stringify({ error: 'Invalid request format. Expected JSON.' }),
            {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    // Validate required fields
    const requiredFields = ['name', 'surname', 'email', 'phone', 'fromDate', 'toDate', 'participants', 'ageGroup'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
        return new Response(
            JSON.stringify({
                error: `Missing required fields: ${missingFields.join(', ')}`
            }),
            {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    // Basic email validation (consider a more robust library for production)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return new Response(
            JSON.stringify({ error: 'Invalid email format.' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, // Or 587 for TLS
        secure: true, // Use SSL
        auth: {
            user: EMAIL_USER, // Your Google Workspace email address (info@buviptur.com) from env
            pass: EMAIL_PASS  // Your Google Workspace password OR an App Password
        }
    });

    const mailOptions = {
        from: `"BuVipTur Tour Request" <${EMAIL_USER}>`, // Using your EMAIL_USER here is fine for Gmail
        replyTo: data.email, // Set the submitter's email as the reply-to address
        to: 'info@buviptur.com',   // Your business email address
        subject: `New Tour Request from ${data.name} ${data.surname} (${data.fromDate} to ${data.toDate})`,
        text: `You have received a new tour request:

Name: ${data.name} ${data.surname}
Email: ${data.email}
Phone: ${data.phone}

Tour Dates:
From: ${data.fromDate}
To: ${data.toDate}

Number of Participants: ${data.participants}
Age Group: ${data.ageGroup}

Additional Comments/Requests:
${data.comments || 'N/A'}
        `,
        html: `
<p>You have received a new tour request:</p>
<ul>
    <li><strong>Name:</strong> ${data.name} ${data.surname}</li>
    <li><strong>Email:</strong> ${data.email}</li>
    <li><strong>Phone:</strong> ${data.phone}</li>
    <li><strong>From Date:</strong> ${data.fromDate}</li>
    <li><strong>To Date:</strong> ${data.toDate}</li>
    <li><strong>Number of Participants:</strong> ${data.participants}</li>
    <li><strong>Age Group:</strong> ${data.ageGroup}</li>
</ul>
<p><strong>Additional Comments/Requests:</strong></p>
<p>${data.comments ? data.comments.replace(/\n/g, '<br>') : 'N/A'}</p>
        `
    };

    try {
        // Optional: Verify transporter configuration.
        // Useful for debugging during development, but can be removed in production
        // await transporter.verify();
        // console.log('Nodemailer transporter verified successfully.');

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: ' + info.response);
        console.log('Message ID: ' + info.messageId);
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info)); // Only for ethereal accounts

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Your tour request has been submitted successfully! We will get back to you shortly.'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Nodemailer - Failed to send email:', error);
        // Log the specific error code if available
        if (error.code) {
            console.error('Nodemailer error code:', error.code);
        }
        // Do not expose detailed internal error messages like stack traces to the client in production.
        // The console.error above is for your server logs.
        let clientErrorMessage = 'Failed to send your request due to a server error. Please try again later or contact us directly.';

        if (error.code === 'EAUTH') {
            clientErrorMessage = 'Email server authentication failed. Please contact support (Ref: EAUTH).';
            // This usually means your EMAIL_USER or EMAIL_PASS (App Password) is incorrect or revoked.
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            clientErrorMessage = 'Could not connect to the email server. Please try again later (Ref: ECONN).';
        } else if (error.responseCode === 550) {
            clientErrorMessage = 'Email rejected by the recipient server. Please check the recipient email address or contact support (Ref: 550).';
        }


        return new Response(
            JSON.stringify({
                error: clientErrorMessage,
                // Optionally, include a generic error code for client-side handling if needed,
                // but avoid sending back error.message or error.stack in production.
                // errorCode: error.code || 'UNKNOWN_EMAIL_ERROR'
            }),
            {
                status: 500, // Internal Server Error
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}