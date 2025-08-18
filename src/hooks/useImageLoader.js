import { useState, useEffect, useCallback } from 'react';
import { importImage, cache } from '../utils';
import { CACHE_CONFIG } from '../constants';

/**
 * Custom hook for loading images dynamically with caching and error handling
 * @param {string} imagePath - Path to the image relative to assets folder
 * @param {string} fallbackSrc - Fallback image source if loading fails
 * @returns {object} - { src, loading, error, retry }
 */
export const useImageLoader = (imagePath, fallbackSrc = null) => {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadImage = useCallback(async () => {
    if (!imagePath) {
      setLoading(false);
      setError('No image path provided');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = `image_${imagePath}`;
      const cachedSrc = cache.get(cacheKey);
      
      if (cachedSrc) {
        setSrc(cachedSrc);
        setLoading(false);
        return;
      }

      // Try to import the image dynamically
      const imageUrl = await importImage(imagePath);
      
      if (imageUrl) {
        setSrc(imageUrl);
        cache.set(cacheKey, imageUrl, CACHE_CONFIG.IMAGES_TTL);
      } else {
        throw new Error(`Failed to load image: ${imagePath}`);
      }
    } catch (err) {
      console.error('Image loading error:', err);
      setError(err.message);
      
      // Use fallback if provided
      if (fallbackSrc) {
        setSrc(fallbackSrc);
      }
    } finally {
      setLoading(false);
    }
  }, [imagePath, fallbackSrc]);

  const retry = useCallback(() => {
    // Clear cache for this image and retry
    const cacheKey = `image_${imagePath}`;
    cache.delete(cacheKey);
    loadImage();
  }, [imagePath, loadImage]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return {
    src,
    loading,
    error,
    retry
  };
};

/**
 * Hook for preloading multiple images
 * @param {string[]} imagePaths - Array of image paths to preload
 * @returns {object} - { loadedCount, totalCount, isComplete, errors }
 */
export const useImagePreloader = (imagePaths = []) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!imagePaths.length) {
      setIsComplete(true);
      return;
    }

    let mounted = true;
    const loadPromises = imagePaths.map(async (path, index) => {
      try {
        await importImage(path);
        if (mounted) {
          setLoadedCount(prev => prev + 1);
        }
      } catch (error) {
        if (mounted) {
          setErrors(prev => [...prev, { path, error: error.message, index }]);
        }
      }
    });

    Promise.allSettled(loadPromises).then(() => {
      if (mounted) {
        setIsComplete(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [imagePaths]);

  return {
    loadedCount,
    totalCount: imagePaths.length,
    isComplete,
    errors,
    progress: imagePaths.length > 0 ? (loadedCount / imagePaths.length) * 100 : 100
  };
};

/**
 * Hook for lazy loading images with Intersection Observer
 * @param {object} options - Intersection Observer options
 * @returns {object} - { ref, inView, src, loading, error }
 */
export const useLazyImage = (imagePath, options = {}) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const { src, loading, error } = useImageLoader(
    shouldLoad ? imagePath : null
  );

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return {
    ref: setRef,
    inView,
    src,
    loading: shouldLoad ? loading : true,
    error
  };
};

export default useImageLoader;