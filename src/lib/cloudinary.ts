'use client';

/**
 * Cloudinary Configuration
 * 
 * New Account: dflwfiyn2 (Default for uploads)
 * Legacy Account: dm5cqe1f3 (Serving existing assets)
 */
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dflwfiyn2',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '231424559936869',
  apiSecret: 'lr3zWi5hE5ykLM_mdHEeqDnQI8Y',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'preset',
  
  // The cloud name that is currently disabled for uploads but has existing assets
  legacyCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_LEGACY_CLOUD_NAME || 'dm5cqe1f3',
};

/**
 * Runtime Utility to fix Cloudinary URLs.
 * If a URL points to the disabled legacy cloud, it swaps it to the new cloud name.
 * This ensures "broken" images load correctly if the assets have been mirrored.
 */
export function fixCloudinaryUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return '';
  
  // If the URL contains the legacy cloud name, replace it with the new one
  if (url.includes(`res.cloudinary.com/${cloudinaryConfig.legacyCloudName}`)) {
    return url.replace(`/${cloudinaryConfig.legacyCloudName}/`, `/${cloudinaryConfig.cloudName}/`);
  }
  
  return url;
}
