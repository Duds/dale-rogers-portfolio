import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        console.log('Creating transporter with config:', {
            host: import.meta.env.SMTP_HOST,
            port: import.meta.env.SMTP_PORT,
            user: import.meta.env.SMTP_USER,
        });

        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: import.meta.env.SMTP_HOST,
            port: import.meta.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: import.meta.env.SMTP_USER,
                pass: import.meta.env.SMTP_PASS,
            },
        });

        // Verify transporter configuration
        try {
            await transporter.verify();
            console.log('Server is ready to take our messages');
        } catch (error) {
            console.error('Error verifying transporter:', error);
            throw error;
        }

        const mailOptions = {
            from: `"${name}" <${import.meta.env.EMAIL_FROM}>`,
            to: import.meta.env.EMAIL_TO,
            replyTo: email as string,
            sender: import.meta.env.EMAIL_FROM,
            subject: `[PORTFOLIO-CONTACT-FORM] New message from ${name}`,
            headers: {
                'X-Gmail-Labels': 'Portfolio/Contact',
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high',
                'List-Unsubscribe': `<mailto:${import.meta.env.EMAIL_FROM}?subject=unsubscribe>`,
            },
            text: `
                New message from portfolio contact form:
                
                Date: ${new Date().toLocaleString('en-AU')}
                Name: ${name}
                Email: ${email}
                Message: ${message}
                
                Sent via contact@dalerogers.com.au
            `,
            html: `
                <h2>New Portfolio Contact Form Submission</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleString('en-AU')}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr />
                <p><small>Sent via contact@dalerogers.com.au</small></p>
            `,
        };

        console.log('Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject,
        });

        // Send mail
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error processing form submission:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
} 