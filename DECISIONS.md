# Technical Decisions Log

## [2024-04-12] Analytics: Chose Umami over Google Analytics
- Context: Needed privacy-focused, lightweight analytics
- Options Considered:
  1. Google Analytics
  2. Plausible
  3. Umami
- Decision: Umami
- Reasoning:
  - Open source and self-hostable
  - Lightweight (1KB)
  - No cookies required
  - Simple deployment
- Implementation Plan:
  - Deploy separately from main site
  - Use managed PostgreSQL database
  - Add minimal tracking script to site

## [2024-04-12] Contact Form: Nodemailer with Gmail SMTP
- Context: Needed reliable email delivery for contact form
- Options Considered:
  1. SendGrid
  2. Mailgun
  3. Nodemailer with Gmail SMTP
- Decision: Nodemailer with Gmail SMTP
- Reasoning:
  - Already using Google Workspace
  - No additional service dependencies
  - Direct control over email sending
  - Cost-effective (included in Google Workspace)
- Implementation Details:
  - Using contact@dalerogers.com.au alias
  - Server-side implementation in Astro API route
  - Custom email templates with HTML/text versions 