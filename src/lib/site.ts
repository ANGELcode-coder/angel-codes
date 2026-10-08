/**
 * Single source of truth for site-wide identity, URLs and social handles.
 *
 * Kept in one module so the sitemap, JSON-LD, canonical URLs and blog feed can
 * never drift apart again — they previously pointed at a domain that 404'd.
 */

export const SITE_URL = "https://angel-codes-portfolio.vercel.app";

export const SITE_NAME = "Angel Codes";

export const AUTHOR_NAME = "Angel Zee Ngoh";

export const DEV_TO_USERNAME = "angel_zeengoh_0fc1818af4";

export const DEV_TO_URL = `https://dev.to/${DEV_TO_USERNAME}`;

export const GITHUB_URL = "https://github.com/ANGELcode-coder";

export const LINKEDIN_URL = "https://www.linkedin.com/in/angel-zee-ngoh";