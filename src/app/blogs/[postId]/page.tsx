import { notFound } from 'next/navigation';

/**
 * Legacy ID-based route is disabled to prevent routing conflicts and prioritize slugs.
 */
export default function LegacyBlogPage() {
  notFound();
}
