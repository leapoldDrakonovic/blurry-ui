import { twMerge } from 'tailwind-merge';

export function cn(...args: (string | undefined | false | null)[]): string {
  return twMerge(args.filter(Boolean).join(' '));
}
