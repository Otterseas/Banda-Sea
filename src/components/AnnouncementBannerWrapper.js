'use client';

import AnnouncementBanner from './AnnouncementBanner';
import { ANNOUNCEMENT_CONFIG } from '@/config/announcement';

/**
 * Wrapper component that reads the announcement config
 * and conditionally renders the banner.
 */
export default function AnnouncementBannerWrapper() {
  if (!ANNOUNCEMENT_CONFIG.enabled) {
    return null;
  }

  return (
    <AnnouncementBanner
      message={ANNOUNCEMENT_CONFIG.message}
      discountCode={ANNOUNCEMENT_CONFIG.discountCode}
      linkText={ANNOUNCEMENT_CONFIG.linkText}
      linkHref={ANNOUNCEMENT_CONFIG.linkHref}
      bannerId={ANNOUNCEMENT_CONFIG.bannerId}
      variant={ANNOUNCEMENT_CONFIG.variant}
    />
  );
}
