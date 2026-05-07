'use client';

import { useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { doc, increment } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

/**
 * A client-side component that increments the view count for a blog post.
 * This is separated from the main server component to keep the page indexable.
 */
export default function ViewTracker({ postId }: { postId: string }) {
  const firestore = useFirestore();

  useEffect(() => {
    if (firestore && postId) {
      const docRef = doc(firestore, 'blog_posts', postId);
      updateDocumentNonBlocking(docRef, {
        views: increment(1)
      });
    }
  }, [firestore, postId]);

  return null;
}
