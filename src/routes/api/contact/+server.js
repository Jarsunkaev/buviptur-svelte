// src/routes/api/contact/+server.js
import nodemailer from 'nodemailer';

// Import private environment variables
const EMAIL_USER = process.env.VITE_EMAIL_USER || import.meta.env.VITE_EMAIL_USER;
const EMAIL_PASS = process.env.VITE_EMAIL_PASS || import.meta.env.VITE_EMAIL_PASS;
const ADMIN_EMAIL = 'info@buviptur.com';

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

    // Check if environment variables are loaded
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error('CRITICAL: EMAIL_USER or EMAIL_PASS environment variables are not set');
        console.error('Environment:', process.env.NODE_ENV);
        console.error('Available env vars:', Object.keys(process.env).join(', '));
        console.error('VITE_EMAIL_USER:', process.env.VITE_EMAIL_USER ? 'set' : 'not set');
        console.error('VITE_EMAIL_PASS:', process.env.VITE_EMAIL_PASS ? 'set' : 'not set');
        
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

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // Using TLS port
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // Only for development, remove in production with valid certificates
        }
    });

    // Email template for admin
    const adminMailOptions = {
        from: `"BuVipTur Website" <${EMAIL_USER}>`,
        replyTo: data.email,
        to: ADMIN_EMAIL,
        subject: `New Tour Request from ${data.name} ${data.surname}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">New Tour Request</h1>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
                <p>You have received a new tour request with the following details:</p>
                <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">Contact Information</h3>
                    <p><strong>Name:</strong> ${data.name} ${data.surname}</p>
                    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
                    
                    <h3 style="color: #2d3748; margin-top: 20px;">Tour Details</h3>
                    ${data.tour ? `<p><strong>Selected Package:</strong> ${data.tour}</p>` : ''}
                     <p><strong>From:</strong> ${data.fromDate}</p>
                     <p><strong>To:</strong> ${data.toDate}</p>
                     ${data.startCity ? `<p><strong>Start City:</strong> ${data.startCity}</p>` : ''}
                     ${data.arrivalCity ? `<p><strong>Arrival City:</strong> ${data.arrivalCity}</p>` : ''}
                    <p><strong>Total Participants:</strong> ${data.participants}</p>
                    <p><strong>Age Groups:</strong> ${data.ageGroup}</p>
                    
                    ${data.comments ? `
                    <h3 style="color: #2d3748; margin-top: 20px;">Additional Comments</h3>
                    <p>${data.comments}</p>
                    ` : ''}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <a href="mailto:${data.email}" style="display: inline-block; background-color: #4299e1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reply to ${data.name}</a>
                </div>
            </div>
            <div style="text-align: center; padding: 15px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0;">
                <p>This email was sent from your website's contact form.</p>
            </div>
        </div>
        `
    };

    // Email template for user confirmation
    const userMailOptions = {
        from: `"BuVipTur" <${EMAIL_USER}>`,
        to: data.email,
        subject: `Thank you for your tour request, ${data.name}!`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Thank You for Your Interest!</h1>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
                <p>Dear ${data.name},</p>
                <p>Thank you for contacting BuVipTur. We have received your tour request and will get back to you within 24 hours.</p>
                
                <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">Your Request Summary</h3>
                    ${data.tour ? `<p><strong>Selected Package:</strong> ${data.tour}</p>` : ''}
                     <p><strong>Tour Dates:</strong> ${data.fromDate} to ${data.toDate}</p>
                     ${data.startCity ? `<p><strong>Start City:</strong> ${data.startCity}</p>` : ''}
                     ${data.arrivalCity ? `<p><strong>Arrival City:</strong> ${data.arrivalCity}</p>` : ''}
                    <p><strong>Number of Participants:</strong> ${data.participants}</p>
                    <p><strong>Age Groups:</strong> ${data.ageGroup}</p>
                    ${data.comments ? `<p><strong>Your Message:</strong> ${data.comments}</p>` : ''}
                </div>
                
                <p>Our team is reviewing your request and will contact you shortly to discuss the details and provide you with the best possible options for your tour.</p>
                
                <div style="margin: 25px 0; text-align: center;">
                    <a href="https://buviptur.com" style="display: inline-block; background-color: #4299e1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Visit Our Website</a>
                </div>
                
                <p>If you have any urgent inquiries, feel free to contact us directly at <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a> or by phone at +36 (70) 734-3444.</p>
                
                <p>Best regards,<br>The BuVipTur Team</p>
            </div>
            <div style="text-align: center; padding: 15px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0;">
                <p>BuVipTur - Your Premium Tour Experience in Budapest</p>
                <p>${new Date().getFullYear()} © BuVipTur. All rights reserved.</p>
            </div>
        </div>
        `
    };

    try {
        // Send both emails
        const [adminInfo, userInfo] = await Promise.all([
            transporter.sendMail({
                ...adminMailOptions,
                from: `"BuVipTur Website" <${EMAIL_USER}>`,
                to: ADMIN_EMAIL,
                replyTo: data.email
            }),
            transporter.sendMail({
                ...userMailOptions,
                from: `"BuVipTur" <${EMAIL_USER}>`,
                to: data.email
            })
        ]);

        console.log('Admin email sent:', adminInfo.messageId);
        console.log('User confirmation email sent:', userInfo.messageId);

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