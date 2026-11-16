# MIKE KILLION Fine Arts

A responsive portfolio website for Mike Killion's original paintings, illustration, and commissioned murals.

## Features
- Responsive single-page artist portfolio
- Gallery containing 42 supplied artwork photographs
- Artwork category filters and title search
- Artist biography, education, and career highlights
- Commission/mural information and contact links
- Comment/contact form that prepares an email to the artist (no backend required)
- Accessible navigation and reduced-motion support

## Deploy with Cloudflare Pages
This is a plain static HTML/CSS/JavaScript website. Connect this GitHub repository to Cloudflare Pages using **Workers & Pages → Create application → Pages → Connect to Git**.

Use these settings:
- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: `/` (repository root)

Cloudflare Pages will publish the root-level `index.html` and the `assets/` directory. Once the project is connected, every push to `main` triggers a production deployment. Add `mikekillionfinearts.com` as a custom domain in the Pages project after the first successful deployment, then confirm the domain's DNS is managed by the intended Cloudflare account.

Official setup guide: https://developers.cloudflare.com/pages/get-started/git-integration/

## Validation
The GitHub Actions validation workflow checks JavaScript syntax and confirms that every artwork image referenced by the gallery exists in `assets/images/`.

## Portfolio images
The 42 optimized artwork photographs are stored in `assets/images/`. The gallery references the corresponding local image files by filename.

## Contact
- Phone: 704-299-1580
- Email: navmike8@gmail.com
- Intended domain: MikeKillionFineArts.com

Artwork titles, sizes, media, and listed prices are based on the supplied artist brief. Confirm current availability and pricing with the artist before purchase.
