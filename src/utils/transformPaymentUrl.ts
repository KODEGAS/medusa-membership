/**
 * Transform Google Storage URLs from googleapis.com to cloud.google.com format
 * @param url - Original payment slip URL
 * @returns Transformed URL or original if not a googleapis URL
 */
export function transformPaymentUrl(url: string): string {
  if (!url) return url;
  
  // Transform storage.googleapis.com to storage.cloud.google.com
  if (url.includes('storage.googleapis.com')) {
    return url.replace('storage.googleapis.com', 'storage.cloud.google.com');
  }
  
  return url;
}