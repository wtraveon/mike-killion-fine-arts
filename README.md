# MIKE KILLION Fine Arts

A premium, responsive artist portfolio and inquiry website for original paintings, illustration, and commissioned murals by Mike Killion.

## Included
- Responsive editorial-style artist website
- Gallery for all 42 supplied artworks, with category filters and title search
- Accessible artwork detail dialog and keyboard navigation
- Artist biography, education, career highlights, and mural/commission information
- Artist-listed dimensions, media and USD prices; sold work is clearly marked
- Direct email and phone inquiry links
- Server-side contact form delivery through a Cloudflare Pages Function and Resend
- Basic input validation, request-size and same-origin checks, and a hidden honeypot spam trap
- Search metadata, Open Graph previews, VisualArtist structured data, sitemap and robots.txt
- Branded SVG favicon
- Visitor privacy policy at `/privacy.html`
- Content Security Policy and additional browser security headers
- Contact endpoint request-size, content-type, and same-origin checks

## Commerce and inquiry limitations
This release is a premium portfolio and inquiry experience, not a transactional online store. It does not process payments, reserve inventory, calculate international shipping or tax, or store customer comments. The contact form sends inquiries to the artist through a Cloudflare Pages Function and Resend. Configure the required secrets before relying on form delivery. Confirm artwork availability and final prices directly with the artist before accepting payment.

## Deployment
- Connect this GitHub repository to Cloudflare Pages.
- Framework preset: None
- Build command: leave blank
- Build output directory: `.` (repository root)
- Add `mikekillionfinearts.com` as a custom domain in Cloudflare Pages and follow its DNS instructions.
- Verify HTTPS, mobile layout, gallery images, contact links, sitemap, and social preview after deployment.

## Contact form configuration
The form endpoint is `functions/api/contact.js` and sends submissions to `navmike8@gmail.com` through Resend.

1. Create a Resend account and verify a sending domain you control.
2. Create a Resend API key with permission to send email.
3. In Cloudflare Pages, open the site's **Settings → Variables and Secrets** and add these production variables:
   - `RESEND_API_KEY`: your Resend API key (store it as a secret).
   - `RESEND_FROM_EMAIL`: a sender address on the domain verified with Resend, for example `Website inquiries <website@your-verified-domain.com>`.
4. Redeploy the latest production deployment so the Pages Function receives the variables.
5. Submit a real test message from the live site and confirm it arrives at `navmike8@gmail.com`. Replies to the notification will go to the visitor through the Reply-To address.

Until both variables are configured and a real test succeeds, use the direct email link as a fallback. Never commit API keys to this repository.

## Before accepting international orders
Confirm current inventory and prices with the artist. Define packaging, insurance, shipping destinations, returns, taxes/customs, and payment/refund policies. Integrate a hosted payment provider and server-side inventory/order management before presenting artwork as directly purchasable. Never place payment secrets in this static repository.

## Artist contact
- Phone: 704-299-1580
- Email: navmike8@gmail.com
- Website: https://mikekillionfinearts.com/
