/**
 * Announcement Banner Configuration
 *
 * Edit this file to update the site-wide announcement banner.
 * Set `enabled` to false to hide the banner completely.
 *
 * To reset dismissed banners for testing, run in browser console:
 * resetAnnouncementBanner('your-banner-id')
 */

export const ANNOUNCEMENT_CONFIG = {
  // Set to false to hide the banner site-wide
  enabled: true,

  // Unique ID for this announcement (change when updating to show to users who dismissed previous one)
  bannerId: 'welcome-2025',

  // Main message displayed in the banner
  message: 'Welcome to Otterseas! Use code for 10% off your first order:',

  // Discount code (shown with copy button) - set to null to hide
  discountCode: 'DIVE10',

  // Optional link - set both to null to hide
  linkText: null, // e.g., 'Shop Now'
  linkHref: null, // e.g., '/products'

  // Visual style: 'gradient' or 'solid'
  variant: 'gradient',
};
