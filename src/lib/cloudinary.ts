'use client';

/**
 * Cloudinary Configuration
 * 
 * Note: While these are technically "secrets", Cloudinary's unsigned 
 * upload preset pattern is designed to be used in client-side code.
 */
export const cloudinaryConfig = {
  cloudName: 'dflwfiyn2',
  apiKey: '231424559936869',
  apiSecret: 'lr3zWi5hE5ykLM_mdHEeqDnQI8Y',
  uploadPreset: 'preset',
  // The cloud name that is currently disabled and returning errors
  legacyCloudName: 'dm5cqe1f3',
};

/**
 * Utility to fix a Cloudinary URL by pointing it to the new account.
 * This is useful if assets have been migrated but DB URLs are old.
 */
export function fixCloudinaryUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('res.cloudinary.com')) return url;
  
  // Replace the old disabled cloud name with the new one
  return url.replace(`/${cloudinaryConfig.legacyCloudName}/`, `/${cloudinaryConfig.cloudName}/`);
}
