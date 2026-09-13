import React, { useEffect } from 'react';

const DEFAULT_DOMAIN = 'https://school-web-rouge-nine.vercel.app';

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
    const fullCanonical = canonicalUrl 
      ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${DEFAULT_DOMAIN}${canonicalUrl}`)
      : DEFAULT_DOMAIN;

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
      let scriptSchema = document.querySelector('script[id="json-ld-schema"]');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('type', 'application/ld+json');
        scriptSchema.setAttribute('id', 'json-ld-schema');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, canonicalUrl, ogType, schema]);

  return null;
}
