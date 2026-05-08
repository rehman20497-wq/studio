
import { notFound } from 'next/navigation';

/**
 * Legacy ID-based route is disabled to prevent routing conflicts and prioritize slugs.
 * This file remains to overwrite the previous postId dynamic segment and resolve the
 * 'You cannot use different slug names' error.
 */
export default function LegacyBlogPage() {
  notFound();
}
