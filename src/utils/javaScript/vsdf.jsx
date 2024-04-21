// Function to load image with fallback URL
const LoadImageWithFallback = (url, fallbackUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(fallbackUrl);
    img.src = url;
  });
};

export default LoadImageWithFallback;
