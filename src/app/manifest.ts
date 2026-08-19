import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shortly - Technical URL Shortener',
    short_name: 'Shortly',
    description: 'Modern link management platform with precision analytics, custom aliases, password protection, and expiration dates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0038b1',
    icons: [
      {
        src: '/shortly.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/shortly.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
