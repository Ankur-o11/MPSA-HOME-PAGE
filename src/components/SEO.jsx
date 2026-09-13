import React, { useEffect } from 'react';

const DEFAULT_DOMAIN = 'https://school-web-rouge-nine.vercel.app';

// Helper function to sanitize URLs by stripping Markdown link syntax like [label](url) or [url](url)
const cleanUrl = (urlStr) => {
  if (!urlStr || typeof urlStr !== 'string') return urlStr;
  let cleaned = urlStr.trim();
  
  // 1. Match Markdown link format: [label](https://...)
  const mdMatch = cleaned.match(/\[.*?\]\((https?:\/\/[^\s\)]+)\)/i);
  if (mdMatch) {
    cleaned = mdMatch[1];
  } else {
    // 2. Strip any accidental outer Markdown brackets or parens
    cleaned = cleaned.replace(/^\[+|\]+$|^\(+|\)+$/g, '').trim();
  }

  // 3. Normalize schema.org context URLs
  if (cleaned === 'https://schema.org/' || cleaned === 'http://schema.org/' || cleaned === 'http://schema.org') {
    cleaned = 'https://schema.org';
  }

  return cleaned;
};

// Helper function to recursively sanitize JSON-LD schema objects
const cleanSchema = (obj) => {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    return cleanUrl(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanSchema);
  }
  if (typeof obj === 'object') {
    const cleaned = {};
    for (const key of Object.keys(obj)) {
      cleaned[key] = cleanSchema(obj[key]);
    }
    return cleaned;
  }
  return obj;
};

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  schema
}) {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // Helper to set or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      if (!content) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Description & OG/Twitter Description
    if (description) {
      updateMetaTag('meta[name="description"]', 'name', 'description', description);
      updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
      updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    // 3. Meta Keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 4. Open Graph & Twitter Titles
    if (title) {
      updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
      updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    }
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Maharana Pratap Science Academy');
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    // 5. Canonical Link & OG URL
    const rawCanonical = cleanUrl(canonicalUrl);
    const baseDomain = cleanUrl(DEFAULT_DOMAIN);
    
    let fullCanonical;
    if (rawCanonical) {
      if (rawCanonical.startsWith('http')) {
        fullCanonical = rawCanonical;
      } else {
        const path = rawCanonical.startsWith('/') ? rawCanonical : `/${rawCanonical}`;
        fullCanonical = `${baseDomain}${path}`;
      }
    } else {
      fullCanonical = baseDomain;
    }

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonical);

    // 6. JSON-LD Structured Data Schema
    if (schema) {
      const sanitizedSchema = cleanSchema(schema);
      let scriptSchema = document.querySelector('script[id="json-ld-schema"]');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('type', 'application/ld+json');
        scriptSchema.setAttribute('id', 'json-ld-schema');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(sanitizedSchema);
    }
  }, [title, description, keywords, canonicalUrl, ogType, schema]);

  return null;
}
