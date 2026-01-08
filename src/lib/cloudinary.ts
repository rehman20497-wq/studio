'use client';

// WARNING: Storing secrets directly in source code is not recommended
// and can lead to security vulnerabilities. These should be stored
// in environment variables for better security.

export const cloudinaryConfig = {
  cloudName: 'dm5cqe1f3',
  apiKey: '899987212698367',
  apiSecret: 'cnu9824BKAPcDL8--k5wpFPjInQ',
  // IMPORTANT: For unsigned uploads to work, you MUST create an "Unsigned"
  // upload preset in your Cloudinary account settings and put its name here.
  // 1. Go to your Cloudinary Dashboard -> Settings (gear icon) -> Upload tab.
  // 2. Scroll down to "Upload presets", click "Add upload preset".
  // 3. Change "Signing Mode" from "Signed" to "Unsigned".
  // 4. Note the "Preset name" and paste it below, replacing 'unsigned_uploads'.
  uploadPreset: 'unsigned_uploads',
};
