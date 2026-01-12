# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## Deployment on Vercel

This project is optimized for deployment on [Vercel](https://vercel.com/), the creators of Next.js. Follow these steps to get your site live in minutes.

### Prerequisites

1.  **GitHub Repository**: Your project should be in a GitHub repository.
2.  **Vercel Account**: You'll need a Vercel account. You can sign up for free with your GitHub account.
3.  **Environment Variables**: You will need to add your project's environment variables (from your `.env.local` file) to Vercel.

### Step-by-Step Guide

1.  **Log in to Vercel**: Go to the [Vercel dashboard](https://vercel.com/dashboard) and log in with your GitHub account.

2.  **Import Your Project**:
    *   Click the "**Add New...**" button and select "**Project**".
    *   Find your GitHub repository in the list and click the "**Import**" button next to it. If you don't see it, you may need to configure the Vercel GitHub App to grant it access.

3.  **Configure Your Project**:
    *   Vercel will automatically detect that you are using Next.js and configure the build settings for you. You don't need to change anything here.
    *   Expand the "**Environment Variables**" section.
    *   Copy all the variables from your local `.env.local` file and add them one by one. This includes `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `ADMIN_EMAIL`, and your Firebase & Cloudinary credentials.

4.  **Deploy**:
    *   Click the "**Deploy**" button.
    *   Vercel will start building and deploying your application. You can watch the progress in real-time.

5.  **Done!**
    *   Once the deployment is complete, Vercel will provide you with a live URL for your site. Congratulations, your app is live!

Vercel will automatically redeploy your application every time you push a new commit to your main branch on GitHub.
