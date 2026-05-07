export function optimizeImageUrl(url, width = 600, quality = 80) {
  if (!url) return url;
  if (!url.includes('/storage/v1/object/public/')) return url;
  return (
    url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') +
    `?width=${width}&quality=${quality}&resize=cover`
  );
}
