'use client';

/**
 * Cloudinary Configuration
 * 
 * New Account: dflwfiyn2 (Default for all new uploads)
 * Legacy Account: dm5cqe1f3 (Existing assets remain in database pointing here)
 */
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dflwfiyn2',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '231424559936869',
  apiSecret: 'lr3zWi5hE5ykLM_mdHEeqDnQI8Y',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'preset',
};
