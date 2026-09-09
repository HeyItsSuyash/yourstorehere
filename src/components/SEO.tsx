import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  const location = useLocation();

  useEffect(() => {
    // Dynamic Page Title
    const baseTitle = 'Your Store Here';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} - Fresh Quality Groceries Everyday | Supermarket`;

    // Dynamic Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        description ||
          'Order fresh vegetables, fruits, staples, dairy, snacks & household essentials from Your Store Here. Fast delivery to your doorstep.'
      );
    }

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || `https://yourstorehere.com${location.pathname}`);
  }, [title, description, canonical, location]);

  return null;
};
