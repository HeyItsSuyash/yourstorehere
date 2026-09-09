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
    const baseTitle = 'Express daily Mart';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} - Fresh Quality Groceries Everyday | Gomti Nagar, Lucknow`;

    // Dynamic Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        description ||
          'Order fresh vegetables, fruits, staples, dairy, snacks & household essentials from Express daily Mart, Gomti Nagar, Lucknow. Fast delivery to your doorstep.'
      );
    }

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || `https://expressdailymart.com${location.pathname}`);
  }, [title, description, canonical, location]);

  return null;
};
