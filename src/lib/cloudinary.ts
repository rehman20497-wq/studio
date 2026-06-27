'use client';

/**
 * Cloudinary Configuration for Telsys Inc.
 * 
 * Simultaneous Account Support Logic:
 * 1. NEW UPLOADS: Managed via the credentials below (dflwfiyn2).
 * 2. LEGACY ASSETS: Load automatically from the old account (dm5cqe1f3) 
 *    because their full absolute URLs are stored in the Firestore database.
 * 3. SECURITY: apiSecret is omitted here as it is not required for 
 *    unsigned client-side uploads and should not be exposed to the browser.
 */
export const cloudinaryConfig = {
  // Primary account for all new uploads
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dflwfiyn2',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '231424559936869',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'preset',
};
