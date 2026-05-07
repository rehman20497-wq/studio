'use client';

import { useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { doc, increment } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

/**
 * A client-side component that increments the impression count for a provider.
 * This handles analytics without blocking server-side rendering or SEO.
 */
export default function ImpressionTracker({ providerId }: { providerId: string }) {
  const firestore = useFirestore();

  useEffect(() => {
    if (firestore && providerId) {
      const docRef = doc(firestore, 'providers', providerId);
      updateDocumentNonBlocking(docRef, {
        impressions: increment(1)
      });
    }
  }, [firestore, providerId]);

  return null;
}
