import React from 'react';
import './PageHero.css';

/**
 * PageHero – shared hero banner used on every page.
 *
 * Props:
 *  badge      {string}  – small pill label above the title
 *  title      {string}  – plain part of the heading
 *  highlight  {string}  – gradient-coloured part of the heading
 *  subtitle   {string}  – paragraph below the heading
 *  page       {string}  – current page name for breadcrumb
 */
const PageHero = ({ badge, title, highlight, subtitle, page }) => {
  return (
    <section className="page-hero">
      {/* decorative blobs */}
      <div className="page-hero__blob page-hero__blob--tl" />
      <div className="page-hero__blob page-hero__blob--br" />
      <div className="page-hero__dots" />

      <div className="page-hero__inner">
        {/* badge */}
        {badge && (
          <div className="page-hero__badge">
            <span className="page-hero__badge-dot" />
            {badge}
          </div>
        )}

        {/* heading */}
        <h1 className="page-hero__title">
          {title}{' '}
          {highlight && <span>{highlight}</span>}
        </h1>

        {/* subtitle */}
        {subtitle && (
          <p className="page-hero__subtitle">{subtitle}</p>
        )}

        {/* breadcrumb */}
        {page && (
          <div className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span className="page-hero__breadcrumb-sep">›</span>
            <span>{page}</span>
          </div>
        )}
      </div>

      {/* bottom gradient line */}
      <div className="page-hero__divider" />
    </section>
  );
};

export default PageHero;
