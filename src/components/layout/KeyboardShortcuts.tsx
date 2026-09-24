'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const KeyboardShortcuts: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input, textarea, select, or contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Ignore if any modifier key like ctrl/alt/cmd/shift is pressed for single key shortcuts
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return;
      }

      switch (e.key) {
        case '1':
          router.push('/units/1');
          break;
        case '2':
          router.push('/units/2');
          break;
        case '3':
          router.push('/units/3');
          break;
        case '4':
          router.push('/units/4');
          break;
        case '5':
          router.push('/units/5');
          break;
        case '6':
          router.push('/units/6');
          break;
        case 'Escape':
          // If no modal or dialog is open, route to dashboard
          const modalOpen = document.querySelector('[role="dialog"]');
          if (!modalOpen) {
            router.push('/dashboard');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return null;
};
