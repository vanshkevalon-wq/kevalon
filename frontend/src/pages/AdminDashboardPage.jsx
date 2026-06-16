import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiRequest, API_BASE_URL } from '../utils/api';
import logo from '../Images/Logo.png';
/* AdminDashboardPage CSS is embedded inline — no external CSS file */

const tabs = [
  { key: 'overview',        label: 'Overview',          short: 'OV' },
  { key: 'applications',    label: 'Applications',       short: 'AP' },
  { key: 'contacts',        label: 'Contacts',           short: 'CT' },
  { key: 'positions',       label: 'Positions',          short: 'PS' },
  { key: 'portfolio-leads', label: 'Portfolio Leads',    short: 'PL' },
];

const blankPositionForm = {
  id: '', title: '', type: 'Full-time', category: '', desc: '',
  skills: '', responsibilities: '', exp: '', location: 'Ahmedabad (On-site)', isActive: true,
};

const blankPageForm = {
  id: '',
  slug: '',
  title: '',
  heroTitle: '',
  body: '',
  metaDescription: '',
  isPublished: true,
};

const ADMIN_DASHBOARD_CSS = `:root {
  /* Sidebar — deep navy */
  --admin-bg:           #0f1535;
  --admin-panel:        #1a2040;
  --admin-panel-soft:   #1e2548;
  --admin-border:       rgba(255,255,255,0.08);
  --admin-text:         #ffffff;
  --admin-muted:        rgba(255,255,255,0.55);
  --admin-primary:      #7c5cfc;
  --admin-primary-dark: #5a3fd4;
  --admin-danger:       #ff6b6b;
  --admin-shadow:       0 8px 32px rgba(0,0,0,0.3);

  /* Content area — clean white/light */
  --content-bg:         #f5f6fa;
  --content-panel:      #ffffff;
  --content-panel-soft: #f8f9fc;
  --content-border:     rgba(0,0,0,0.07);
  --content-text:       #1a1f36;
  --content-muted:      #8898aa;
  --content-shadow:     0 2px 12px rgba(0,0,0,0.06);
}

.admin-shell {
  min-height: 100vh;
  padding: 0;
  background: var(--content-bg);
  color: var(--admin-text);
}

.admin-shell--dashboard {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 0;
  height: 100vh;
  overflow: hidden;
  align-items: start;
}

@media (max-width: 1366px) {
  .admin-shell--dashboard {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  .admin-sidebar {
    padding: 20px;
  }
}

.admin-login-card,
.admin-panel {
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border-radius: 20px;
}

.admin-sidebar {
  border: none;
  border-right: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, #0f1535 0%, #1a2040 100%);
  backdrop-filter: none;
  box-shadow: 4px 0 20px rgba(0,0,0,0.2);
  border-radius: 0;
}

.admin-login-card {
  width: min(100%, 480px);
  margin: 8vh auto 0;
  padding: 30px;
}

.admin-login-card__actions {
  margin-bottom: 20px;
}

.admin-login-card__actions .admin-button--ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  padding: 9px 16px;
}

.admin-login-card__actions .admin-button--ghost::before {
  content: '←';
  font-size: 1rem;
  line-height: 1;
}

.admin-sidebar {
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
  height: 100%;
  position: sticky;
  top: 18px;
  z-index: 20;
  overflow-y: auto;
}

.admin-sidebar-backdrop,
.admin-mobile-topbar {
  display: none;
}

.admin-mobile-topbar__left,
.admin-mobile-topbar__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
  height: 100%;
  overflow-y: auto;
  padding-right: 4px;
  padding-bottom: 18px;
  background: var(--content-bg);
  padding: 24px 28px;
}

.admin-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.admin-toolbar__search,
.admin-toolbar__filters label {
  display: grid;
  gap: 8px;
  color: var(--admin-muted);
  font-size: 0.88rem;
}

.admin-toolbar__search {
  position: relative;
}

.admin-search-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px 0 16px;
  background: #f5f6fa;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  box-shadow: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.admin-search-field:focus-within {
  border-color: #7c5cfc;
  box-shadow: 0 0 0 3px rgba(124,92,252,0.12);
  transform: none;
}

.admin-search-field__icon {
  color: var(--content-muted);
  font-size: 1rem;
  flex: 0 0 auto;
}

.admin-search-field input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 0;
  min-width: 0;
  color: var(--content-text);
}

.admin-search-field input::placeholder {
  color: var(--content-muted);
}

.admin-search-field input:focus {
  box-shadow: none;
}

.admin-search-field__clear {
  border: none;
  background: rgba(97, 187, 197, 0.12);
  color: var(--admin-primary);
  font-size: 0.84rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 8px 12px;
  transition: background 180ms ease, transform 180ms ease;
}

.admin-search-field__clear:hover {
  background: rgba(97, 187, 197, 0.2);
  transform: translateY(-1px);
}

.admin-toolbar__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
}

.admin-toolbar__hint {
  margin: 0;
  color: var(--content-muted);
  font-size: 0.92rem;
  line-height: 1.5;
}

.admin-toolbar__search input,
.admin-toolbar__filters select {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 12px 14px;
  background: #f5f6fa;
  color: var(--content-text);
  outline: none;
}

.admin-toolbar__filters {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.admin-kicker {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #7c5cfc;
  font-size: 0.78rem;
  font-weight: 700;
}

.admin-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
}

.admin-title--small {
  font-size: 1.6rem;
}

.admin-copy {
  margin: 10px 0 0;
  color: var(--content-muted);
  line-height: 1.6;
}

.admin-copy--muted {
  font-size: 0.92rem;
}

.admin-login-form,
.admin-form {
  display: grid;
  gap: 14px;
}

.admin-login-form label,
.admin-form label {
  display: grid;
  gap: 7px;
  color: var(--content-muted);
  font-size: 0.92rem;
}

.admin-login-form input,
.admin-form input,
.admin-form textarea,
.admin-form select,
.admin-item select,
.admin-toolbar__filters select {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 12px 14px;
  background: #f5f6fa;
  color: var(--content-text);
  outline: none;
}

.admin-form select option,
.admin-item select option,
.admin-toolbar__filters select option {
  color: #07131d;
  background: #f8fcff;
}

.admin-form select:focus,
.admin-item select:focus,
.admin-toolbar__filters select:focus {
  background: rgba(255, 255, 255, 0.08);
}

.admin-form textarea {
  resize: vertical;
  min-height: 140px;
}

/* ── Positions form — compact inputs & buttons ── */
.admin-form--positions {
  gap: 5px !important;
  padding: 10px 12px !important;
}

.admin-form--positions .admin-panel__header {
  margin-bottom: 4px !important;
  padding-bottom: 6px !important;
  border-bottom: 1px solid rgba(0,0,0,0.06) !important;
}

.admin-form--positions input,
.admin-form--positions textarea,
.admin-form--positions select {
  padding: 5px 9px !important;
  font-size: 0.81rem !important;
  border-radius: 6px !important;
  height: 30px !important;
  min-height: unset !important;
}

.admin-form--positions textarea {
  height: auto !important;
  min-height: 52px !important;
  max-height: 80px !important;
}

.admin-form--positions .admin-button {
  padding: 4px 12px !important;
  font-size: 0.78rem !important;
}

.admin-form--positions > div,
.admin-form--positions > label {
  margin: 0 !important;
}

.admin-login-form input:focus,
.admin-form input:focus,
.admin-form textarea:focus,
.admin-form select:focus,
.admin-item select:focus {
  border-color: #7c5cfc;
  box-shadow: 0 0 0 3px rgba(124,92,252,0.12);
}

.admin-button {
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 11px 16px;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.admin-button:hover {
  transform: translateY(-1px);
}

.admin-button--primary {
  background: linear-gradient(135deg, #7c5cfc, #5a3fd4);
  color: #fff;
  border: none;
  box-shadow: 0 4px 14px rgba(124,92,252,0.35);
}

.admin-button--ghost {
  background: #f5f6fa;
  color: var(--content-text);
  border: 1px solid rgba(0,0,0,0.1);
}

.admin-button--danger {
  background: rgba(239,68,68,0.08);
  color: #dc2626;
  border: 1px solid rgba(239,68,68,0.2);
}

.admin-status {
  margin: 0;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.92rem;
}

.admin-status--success {
  background: rgba(34,197,94,0.08);
  color: #16a34a;
}

.admin-status--error {
  background: rgba(239,68,68,0.08);
  color: #dc2626;
}

.admin-status--loading {
  background: rgba(124,92,252,0.08);
  color: #7c5cfc;
}

.admin-tabs {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

.admin-tab {
  border: none;
  border-radius: 12px;
  background: transparent;
  color: rgba(255,255,255,0.6);
  padding: 11px 14px;
  text-align: left;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.2s ease;
}

.admin-tab.is-active {
  background: linear-gradient(135deg, rgba(124,92,252,0.25), rgba(90,63,212,0.15));
  color: #fff;
  border: 1px solid rgba(124,92,252,0.4);
  box-shadow: none;
}

.admin-sidebar__footer {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.admin-header,
.admin-stats,
.admin-overview-grid,
.admin-pages-layout {
  display: grid;
  gap: 16px;
}

.admin-header {
  grid-template-columns: 1fr auto;
  align-items: center;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 18px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  color: var(--content-text);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.admin-header:hover {
  transform: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.admin-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--content-text);
}

.admin-stats {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.admin-stats article {
  border: 1px solid var(--admin-border);
  background: var(--admin-panel-soft);
  border-radius: 22px;
  padding: 18px 20px;
}

.admin-stats span,
.admin-panel__header span {
  color: var(--content-muted);
  font-size: 0.82rem;
}

.admin-stats strong {
  display: block;
  margin-top: 10px;
  font-size: 2rem;
}

.admin-overview-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.admin-profile-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 16px;
}

.admin-profile-card {
  display: grid;
  gap: 18px;
}

.admin-profile-card__hero {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  border-radius: 20px;
  background: #f8f9fc;
  border: 1px solid rgba(0,0,0,0.06);
}

.admin-profile-card__avatar {
  width: 82px;
  height: 82px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #42c2ff, #7d57ff);
  color: white;
  font-size: 2rem;
  font-weight: 900;
  flex: 0 0 auto;
}

.admin-profile-card__hero h2 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--content-text);
}

.admin-profile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.admin-profile-metric {
  border: 1px solid rgba(0,0,0,0.06);
  background: #f8f9fc;
  border-radius: 18px;
  padding: 16px;
}

.admin-profile-metric span {
  display: block;
  color: var(--content-muted);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.admin-profile-metric strong {
  display: block;
  margin-top: 8px;
  font-size: 0.98rem;
  word-break: break-word;
  color: var(--content-text);
}

.admin-profile-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-table-wrap {
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.06);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.admin-table thead th {
  text-align: left;
  padding: 14px 16px;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--content-muted);
  background: #f8f9fc;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.admin-table tbody td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  vertical-align: top;
  color: var(--content-text);
}

.admin-table tbody tr:hover {
  background: #f8f9fc;
}

.admin-table strong {
  display: block;
  margin-bottom: 6px;
  font-size: 0.98rem;
  color: var(--content-text);
}

.admin-table span {
  display: block;
  color: var(--content-muted);
  font-size: 0.88rem;
  line-height: 1.45;
}

.admin-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.admin-badge--success {
  background: rgba(34,197,94,0.1);
  color: #16a34a;
}

.admin-badge--muted {
  background: rgba(0,0,0,0.06);
  color: var(--content-muted);
}

.admin-badge--danger {
  background: rgba(239,68,68,0.1);
  color: #dc2626;
}

.admin-download-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(124,92,252,0.08);
  color: #7c5cfc;
  font-weight: 700;
  border: 1px solid rgba(124,92,252,0.2);
}

.admin-download-link:hover {
  background: rgba(124,92,252,0.15);
  color: #5a3fd4;
  transform: translateY(-1px);
}

.admin-empty {
  color: var(--admin-muted);
}

.admin-panel {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  color: var(--content-text);
}

.admin-panel:hover {
  transform: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.admin-panel:hover {
  transform: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.admin-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.admin-panel__header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--content-text);
}

.admin-list {
  display: grid;
  gap: 12px;
}

.admin-item {
  border: 1px solid rgba(0,0,0,0.06);
  background: #f8f9fc;
  backdrop-filter: blur(6px);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.admin-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.admin-item--stacked {
  align-items: flex-start;
}

.admin-item strong {
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
  color: var(--content-text);
}

.admin-item p {
  margin: 0 0 4px;
  color: var(--content-muted);
  font-size: 0.92rem;
  word-break: break-word;
}

.admin-item__actions {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.admin-item__actions select {
  min-width: 140px;
}

.admin-pages-layout {
  grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
  align-items: start;
}

.admin-form__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-checkbox {
  display: flex !important;
  align-items: center;
  gap: 10px;
}

.admin-checkbox input {
  width: auto;
}

@media (max-width: 1100px) {
  .admin-shell {
    padding: 22px 14px;
  }

  .admin-shell--dashboard,
  .admin-pages-layout,
  .admin-overview-grid {
    grid-template-columns: 1fr;
  }

  .admin-shell--dashboard {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .admin-toolbar {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: min(82vw, 320px);
    min-height: 100vh;
    height: 100vh;
    gap: 18px;
    border-radius: 0 20px 20px 0;
    transform: translateX(-105%);
    transition: transform 0.26s ease;
    overflow-y: auto;
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .admin-sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(3, 16, 24, 0.52);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 15;
  }

  .admin-sidebar-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .admin-mobile-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 2px;
    flex-wrap: wrap;
  }

  .admin-mobile-topbar__left {
    min-width: 0;
    flex: 0 0 auto;
  }

  .admin-mobile-topbar__meta {
    width: 100%;
    margin-left: 0;
    gap: 8px;
    justify-content: space-between;
  }

  .admin-mobile-topbar__title {
    margin: 0;
    color: var(--admin-muted);
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    white-space: nowrap;
  }

  .admin-hamburger {
    width: 44px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid rgba(129, 192, 221, 0.24);
    background: rgba(255, 255, 255, 0.05);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0;
  }

  .admin-hamburger span {
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: var(--admin-text);
  }

  .admin-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 0;
  }

  .admin-mobile-date,
  .admin-mobile-profile {
    border: 1px solid rgba(129, 192, 221, 0.18);
    background: rgba(255, 255, 255, 0.04);
    color: var(--admin-text);
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    min-width: 0;
    flex: 1 1 0;
  }

  .admin-mobile-date {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    min-width: 0;
  }

  .admin-mobile-date strong,
  .admin-mobile-profile__text strong {
    font-size: 0.78rem;
    line-height: 1.1;
  }

  .admin-mobile-date span,
  .admin-mobile-profile__text small {
    color: var(--admin-muted);
    font-size: 0.7rem;
    line-height: 1.1;
  }

  .admin-mobile-profile {
    padding: 8px;
    border-radius: 999px;
    justify-content: flex-start;
  }

  .admin-mobile-profile__avatar {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #58a6ff, #a855f7);
    color: #fff;
    font-weight: 800;
    flex: 0 0 auto;
  }

  .admin-mobile-profile__text {
    display: grid;
    text-align: left;
    min-width: 0;
  }

  .admin-mobile-profile__text small {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-sidebar__footer {
    grid-template-columns: 1fr auto;
    align-items: center;
    margin-top: 0;
  }

  .admin-sidebar__footer .admin-button {
    white-space: nowrap;
  }

  .admin-content {
    height: auto;
    overflow: visible;
    padding-right: 0;
  }

  .admin-header h2 {
    font-size: 1.55rem;
  }

  .admin-table {
    min-width: 680px;
  }
}

@media (max-width: 768px) {
  .admin-shell {
    padding: 18px 12px;
  }

  .admin-header,
  .admin-stats article,
  .admin-panel,
  .admin-login-card,
  .admin-sidebar {
    border-radius: 18px;
  }

  .admin-sidebar {
    padding: 16px;
    width: min(88vw, 300px);
  }

  .admin-title--small {
    font-size: 1.38rem;
  }

  .admin-copy {
    font-size: 0.92rem;
  }

  .admin-stats,
  .admin-overview-grid,
  .admin-pages-layout {
    grid-template-columns: 1fr;
  }

  .admin-toolbar__filters {
    grid-template-columns: 1fr;
  }

  .admin-toolbar,
  .admin-header,
  .admin-panel,
  .admin-login-card {
    padding: 16px;
  }

  .admin-item {
    flex-direction: column;
  }

  .admin-header {
    grid-template-columns: 1fr;
  }

  .admin-header__actions {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .admin-header__actions .admin-button {
    width: 100%;
    justify-content: center;
  }

  .admin-tabs {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .admin-tab {
    padding: 11px 12px;
  }

  .admin-sidebar__footer {
    grid-template-columns: 1fr;
  }

  .admin-table-wrap {
    overflow: visible;
    border: none;
  }

  .admin-table {
    min-width: 0;
    border-collapse: separate;
    border-spacing: 0;
  }

  .admin-table thead {
    display: none;
  }

  .admin-table tbody,
  .admin-table tr,
  .admin-table td {
    display: block;
    width: 100%;
  }

  .admin-table tbody tr {
    border: 1px solid rgba(129, 192, 221, 0.16);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    margin-bottom: 10px;
    padding: 10px 10px 2px;
  }

  .admin-table tbody td {
    border-bottom: 1px dashed rgba(129, 192, 221, 0.16);
    padding: 9px 0;
    font-size: 0.86rem;
    word-break: break-word;
  }

  .admin-table tbody td:last-child {
    border-bottom: none;
  }

  .admin-table tbody td::before {
    content: attr(data-label);
    position: static;
    display: block;
    width: auto;
    margin: 0 0 5px;
    color: var(--admin-muted);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .admin-table tbody td .admin-item__actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    gap: 8px;
  }

  .admin-table tbody td .admin-item__actions .admin-button {
    width: 100%;
    padding: 9px 10px;
  }

  .admin-table tbody td select,
  .admin-table tbody td .admin-download-link {
    width: 100%;
  }

  .admin-table tbody td .admin-download-link {
    justify-content: center;
  }

  .admin-form__actions,
  .admin-item__actions {
    width: 100%;
  }

  .admin-form__actions .admin-button,
  .admin-item__actions .admin-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .admin-shell {
    padding: 14px 10px;
  }

  .admin-header h2 {
    font-size: 1.28rem;
  }

  .admin-kicker {
    font-size: 0.68rem;
  }

  .admin-toolbar,
  .admin-header,
  .admin-panel,
  .admin-sidebar,
  .admin-login-card {
    border-radius: 14px;
    padding: 14px;
  }

  .admin-table tbody td {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .admin-table tbody td::before {
    font-size: 0.7rem;
  }

  .admin-table tbody td .admin-item__actions {
    grid-template-columns: 1fr;
  }

  .admin-button {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
}

.admin-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.admin-sidebar__logo {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #7c5cfc, #5a3fd4);
  box-shadow: 0 18px 40px rgba(64, 153, 255, 0.28);
  color: white;
  font-size: 1.3rem;
  font-weight: 900;
}

.admin-sidebar__brand .admin-copy {
  margin-top: 2px;
  letter-spacing: 0.18em;
}

.admin-sidebar__section-label {
  margin-top: 24px;
  color: rgba(255,255,255,0.35);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.admin-tabs--account {
  margin-top: 10px;
}

.admin-tabs--account .admin-tab {
  justify-content: flex-start;
}

.admin-tab {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 52px;
}

.admin-tab.is-active {
  box-shadow: none;
}

.admin-tab__icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.08);
  flex: 0 0 auto;
}

.admin-sidebar__footer {
  margin-top: 22px;
  padding-top: 8px;
}

.admin-help-card {
  border: 1px solid rgba(124,92,252,0.25);
  background: linear-gradient(135deg, rgba(124,92,252,0.15), rgba(90,63,212,0.1));
  border-radius: 16px;
  padding: 18px;
  display: grid;
  gap: 12px;
}

.admin-help-card__icon {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(124,92,252,0.25);
  color: #c4b5fd;
  font-weight: 800;
}

.admin-help-card h4 {
  margin: 0;
  font-size: 1rem;
  color: #fff;
}

.admin-help-card p {
  margin: 0;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  font-size: 0.82rem;
}

.admin-header--hero {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  padding: 22px 24px 18px;
}

.admin-header--hero h2 {
  font-size: 2rem;
  line-height: 1.15;
  max-width: 700px;
}

.admin-header__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.admin-header__date {
  display: grid;
  gap: 4px;
  color: var(--admin-muted);
  text-align: right;
  margin-right: 4px;
}

.admin-header__date strong {
  color: var(--content-text);
  font-size: 0.95rem;
}

.admin-icon-button {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  background: #f5f6fa;
  color: var(--content-text);
  display: grid;
  place-items: center;
  padding: 0;
}

.admin-profile-pill {
  border: 1px solid rgba(0,0,0,0.08);
  background: #f5f6fa;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 8px 8px;
  color: var(--content-text);
}

.admin-profile-pill__avatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #58a6ff, #a855f7);
  color: white;
  font-weight: 800;
}

.admin-profile-pill__text {
  display: grid;
  text-align: left;
}

.admin-profile-pill__text strong {
  font-size: 0.93rem;
  color: var(--content-text);
}

.admin-profile-pill__text small {
  color: var(--content-muted);
  font-size: 0.78rem;
}

.admin-toolbar--compact {
  padding: 0;
  border: none;
  background: transparent;
}

.admin-toolbar__filters--compact {
  grid-template-columns: minmax(0, 1.6fr) minmax(220px, 0.8fr);
}

.admin-toolbar__filters--compact label {
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  border-radius: 14px;
  padding: 14px 16px;
}

.admin-toolbar__filters--compact span {
  color: var(--content-muted);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.admin-toolbar__filters--compact input,
.admin-toolbar__filters--compact select {
  border-radius: 14px;
  margin-top: 2px;
}

.admin-toolbar__filters--compact .admin-toolbar__search {
  gap: 0;
}

.admin-stats--cards {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.admin-stat-card {
  border: 1px solid rgba(0,0,0,0.06);
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.admin-stat-card span {
  display: block;
  color: var(--content-muted);
  font-size: 0.85rem;
}

.admin-stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 2rem;
  font-weight: 800;
  color: var(--content-text);
}

.admin-stat-card p {
  margin: 8px 0 0;
  color: #22c55e;
  font-size: 0.8rem;
}

.admin-stat-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  flex: 0 0 auto;
}

.admin-stat-card__icon--blue {
  background: rgba(99,102,241,0.1);
  color: #6366f1;
}

.admin-stat-card__icon--purple {
  background: rgba(168,85,247,0.1);
  color: #a855f7;
}

.admin-stat-card__icon--green {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
}

.admin-stat-card__icon--orange {
  background: rgba(249,115,22,0.1);
  color: #f97316;
}

.admin-overview-grid {
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
}

.admin-panel--chart {
  min-height: 360px;
}

.admin-chart {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
}

.admin-chart__axes {
  display: grid;
  align-content: space-between;
  color: var(--content-muted);
  font-size: 0.76rem;
  padding: 10px 0 28px;
}

.admin-chart__plot {
  min-height: 240px;
  border-radius: 14px;
  background: #f8f9fc;
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
  position: relative;
}

.admin-chart__plot svg {
  width: 100%;
  height: 100%;
}

.admin-chart__labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: var(--content-muted);
  font-size: 0.78rem;
}

.admin-list {
  display: grid;
  gap: 12px;
}

.admin-person-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f8f9fc;
  border: 1px solid rgba(0,0,0,0.06);
}

.admin-person-row__avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #3aa0ff, #7d57ff);
  color: white;
  font-weight: 800;
}

.admin-person-row__avatar--purple {
  background: linear-gradient(135deg, #a855f7, #ff4fa0);
}

.admin-person-row__body strong,
.admin-person-row__meta strong {
  display: block;
  margin-bottom: 4px;
}

.admin-person-row__body span,
.admin-person-row__meta span {
  color: var(--content-muted);
  font-size: 0.86rem;
}

.admin-person-row__meta {
  display: grid;
  gap: 8px;
  justify-items: end;
}

.admin-person-row__role {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(124,92,252,0.08);
  color: #7c5cfc;
  font-size: 0.78rem;
}

.admin-panel--donut .admin-panel__header span {
  color: var(--content-muted);
  font-size: 0.88rem;
}

.admin-donut-layout {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
}

.admin-donut {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: conic-gradient(#45d5b0 0 43%, #f4c542 43% 71%, #ff6b6b 71% 92%, #58a6ff 92% 100%);
  display: grid;
  place-items: center;
}

.admin-donut__core {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
}

.admin-donut-legend {
  display: grid;
  gap: 12px;
}

.admin-donut-legend__item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
}

.admin-donut-legend__swatch {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.admin-donut-legend__item strong {
  margin: 0;
  font-size: 0.92rem;
  color: var(--content-text);
}

.admin-donut-legend__item span {
  color: var(--content-muted);
  font-size: 0.84rem;
}

.admin-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.admin-action-card {
  border: 1px solid rgba(0,0,0,0.07);
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  display: grid;
  justify-items: start;
  gap: 14px;
  color: var(--content-text);
}

.admin-action-card__icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 800;
}

.admin-action-card__icon--blue { background: rgba(99,102,241,0.1); color: #6366f1; }
.admin-action-card__icon--purple { background: rgba(168,85,247,0.1); color: #a855f7; }
.admin-action-card__icon--green { background: rgba(34,197,94,0.1); color: #22c55e; }
.admin-action-card__icon--orange { background: rgba(249,115,22,0.1); color: #f97316; }

.admin-activity {
  display: grid;
  gap: 14px;
}

.admin-activity__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
}

.admin-activity__dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c5cfc, #5a3fd4);
  box-shadow: 0 0 0 6px rgba(124,92,252,0.1);
}

.admin-activity__item--green .admin-activity__dot {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 0 0 6px rgba(34,197,94,0.1);
}

.admin-activity__item--purple .admin-activity__dot {
  background: linear-gradient(135deg, #a855f7, #7c5cfc);
  box-shadow: 0 0 0 6px rgba(168,85,247,0.1);
}

.admin-activity__item strong {
  display: block;
  margin-bottom: 4px;
  color: var(--content-text);
}

.admin-activity__item span {
  color: var(--content-muted);
  font-size: 0.88rem;
}

.admin-panel--actions .admin-panel__header,
.admin-panel--activity .admin-panel__header,
.admin-panel--table .admin-panel__header {
  margin-bottom: 14px;
}

.admin-panel--chart .admin-panel__header,
.admin-panel--donut .admin-panel__header,
.admin-panel--list .admin-panel__header {
  margin-bottom: 18px;
}

.admin-panel--chart,
.admin-panel--donut,
.admin-panel--list,
.admin-panel--actions,
.admin-panel--activity,
.admin-panel--table {
  padding: 24px;
}

.admin-panel--chart,
.admin-panel--list,
.admin-panel--donut,
.admin-panel--actions,
.admin-panel--activity,
.admin-panel--table {
  min-height: 0;
}

@media (max-width: 1100px) {
  .admin-stats--cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .admin-overview-grid {
    grid-template-columns: 1fr;
  }

  .admin-profile-layout {
    grid-template-columns: 1fr;
  }

  .admin-donut-layout {
    grid-template-columns: 160px minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .admin-header--hero {
    grid-template-columns: 1fr;
    padding: 18px 18px 16px;
    gap: 12px;
  }

  .admin-header--hero h2 {
    font-size: 1.45rem;
    max-width: none;
  }

  .admin-header__meta {
    justify-content: flex-start;
  }

  .admin-header__meta {
    display: none;
  }

  .admin-toolbar__filters--compact {
    grid-template-columns: 1fr;
  }

  .admin-stats--cards {
    grid-template-columns: 1fr;
  }

  .admin-donut-layout {
    grid-template-columns: 1fr;
  }

  .admin-donut {
    margin: 0 auto;
  }

  .admin-actions-grid {
    grid-template-columns: 1fr;
  }

  .admin-profile-card__hero {
    align-items: flex-start;
  }

  .admin-profile-grid {
    grid-template-columns: 1fr;
  }

  .admin-person-row {
    grid-template-columns: auto 1fr;
  }

  .admin-person-row__meta {
    grid-column: 1 / -1;
    justify-items: start;
  }

  .admin-sidebar {
    width: min(90vw, 340px);
    min-height: 100vh;
    top: 0;
  }

  .admin-sidebar__brand {
    align-items: flex-start;
  }

  .admin-tabs,
  .admin-tabs--account {
    grid-template-columns: 1fr;
  }

  .admin-button--ghost {
    width: 100%;
    justify-content: center;
  }
}

/* --- Modern Right Panel Beautification --- */

.admin-content {
  position: relative;
  z-index: 1;
}

/* Soften scrollbar for light panel */
.admin-content::-webkit-scrollbar {
  width: 8px;
}
.admin-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.admin-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
.admin-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.22);
}

/* Stat Cards hover animation for interactivity */
.admin-content .admin-stat-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.admin-content .admin-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* Action card hover */
.admin-content .admin-action-card {
  transition: all 0.2s ease;
}

.admin-content .admin-action-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  border-color: rgba(124,92,252,0.3);
}

/* Person row hover */
.admin-content .admin-person-row {
  transition: all 0.2s ease;
}

.admin-content .admin-person-row:hover {
  background: #f0f1f8;
  border-color: rgba(124,92,252,0.15);
}

/* ── Portfolio Leads tab ── */
.admin-status-select {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
  background: #f5f6fa;
  color: var(--content-text);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}
.admin-status-select--new       { border-color: rgba(99,102,241,0.3);  color: #6366f1; }
.admin-status-select--contacted { border-color: rgba(249,115,22,0.3);  color: #f97316; }
.admin-status-select--closed    { border-color: rgba(34,197,94,0.3);   color: #16a34a; }

.admin-button--danger-sm {
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid rgba(239,68,68,0.2);
  background: rgba(239,68,68,0.06);
  color: #dc2626;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.admin-button--danger-sm:hover {
  background: rgba(239,68,68,0.12);
}

/* ── Additional modern SaaS overrides ── */

/* Tab hover */
.admin-tab:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}

/* Active tab icon */
.admin-tab.is-active .admin-tab__icon {
  background: rgba(124,92,252,0.3);
  color: #c4b5fd;
}

/* Icon button hover */
.admin-icon-button:hover {
  background: #eef0f8;
}

/* Action card strong */
.admin-action-card strong {
  color: var(--content-text);
}

/* Soften table hover override */
.admin-content .admin-table tbody tr {
  background: transparent;
}

.admin-content .admin-table tbody tr:hover {
  background: #f8f9fc;
}

/* Person row body strong */
.admin-person-row__body strong {
  display: block;
  margin-bottom: 4px;
  color: var(--content-text);
}

/* ══════════════════════════════════════════════════════
   FINAL LIGHT-THEME OVERRIDES
   Fixes all remaining dark-panel references
══════════════════════════════════════════════════════ */

/* ── Shell & layout ── */
.admin-shell { background: var(--content-bg) !important; }
.admin-content { background: var(--content-bg) !important; padding: 24px 28px !important; gap: 20px !important; }

/* ── Sidebar stays dark ── */
.admin-sidebar { background: linear-gradient(180deg,#0f1535 0%,#1a2040 60%,#0f1535 100%) !important; border-right: 1px solid rgba(255,255,255,0.06) !important; border-radius: 0 !important; }
.admin-sidebar__brand { border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
.admin-sidebar__logo { background: linear-gradient(135deg,#7c5cfc,#5a3fd4) !important; border-radius: 14px !important; width: 44px !important; height: 44px !important; }
.admin-sidebar__section-label { color: rgba(255,255,255,0.35) !important; }
.admin-tab { background: transparent !important; border: none !important; color: rgba(255,255,255,0.6) !important; border-radius: 12px !important; }
.admin-tab:hover { background: rgba(255,255,255,0.07) !important; color: #fff !important; }
.admin-tab.is-active { background: linear-gradient(135deg,rgba(124,92,252,0.25),rgba(90,63,212,0.15)) !important; color: #fff !important; border: 1px solid rgba(124,92,252,0.4) !important; }
.admin-tab__icon { background: rgba(255,255,255,0.08) !important; color: rgba(255,255,255,0.7) !important; }
.admin-tab.is-active .admin-tab__icon { background: rgba(124,92,252,0.3) !important; color: #c4b5fd !important; }
.admin-help-card { background: linear-gradient(135deg,rgba(124,92,252,0.15),rgba(90,63,212,0.1)) !important; border: 1px solid rgba(124,92,252,0.25) !important; border-radius: 16px !important; }
.admin-help-card h4 { color: #fff !important; }
.admin-help-card p { color: rgba(255,255,255,0.55) !important; }
.admin-help-card__icon { background: rgba(124,92,252,0.25) !important; color: #c4b5fd !important; }

/* ── Header (content area) ── */
.admin-header { background: #fff !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 16px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important; color: var(--content-text) !important; }
.admin-header:hover { transform: none !important; box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important; }
.admin-header h2 { color: var(--content-text) !important; font-size: 1.5rem !important; }
.admin-header--hero h2 { font-size: 1.6rem !important; }
.admin-kicker { color: #7c5cfc !important; }
.admin-header__date strong { color: var(--content-text) !important; }
.admin-header__date span, .admin-header__date { color: var(--content-muted) !important; }
.admin-icon-button { background: #f5f6fa !important; border: 1px solid rgba(0,0,0,0.08) !important; color: var(--content-text) !important; border-radius: 12px !important; }
.admin-icon-button:hover { background: #eef0f8 !important; }
.admin-profile-pill { background: #f5f6fa !important; border: 1px solid rgba(0,0,0,0.08) !important; color: var(--content-text) !important; }
.admin-profile-pill__text strong { color: var(--content-text) !important; }
.admin-profile-pill__text small { color: var(--content-muted) !important; }

/* ── Panels ── */
.admin-panel { background: #fff !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 16px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important; color: var(--content-text) !important; }
.admin-panel:hover { transform: none !important; box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important; }
.admin-panel__header h3 { color: var(--content-text) !important; }
.admin-panel__header span { color: var(--content-muted) !important; }

/* ── Stat cards ── */
.admin-stat-card { background: #fff !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 16px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important; }
.admin-stat-card:hover { transform: translateY(-4px) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
.admin-stat-card span { color: var(--content-muted) !important; }
.admin-stat-card strong { color: var(--content-text) !important; }
.admin-stat-card p { color: #22c55e !important; }

/* ── Toolbar ── */
.admin-toolbar { background: #fff !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 16px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important; }
.admin-toolbar__filters--compact label { background: #fff !important; border: 1px solid rgba(0,0,0,0.08) !important; border-radius: 14px !important; }
.admin-toolbar__filters--compact span { color: var(--content-muted) !important; }
.admin-toolbar__hint { color: var(--content-muted) !important; }
.admin-search-field { background: #f5f6fa !important; border: 1px solid rgba(0,0,0,0.1) !important; border-radius: 12px !important; box-shadow: none !important; }
.admin-search-field:focus-within { border-color: #7c5cfc !important; box-shadow: 0 0 0 3px rgba(124,92,252,0.12) !important; transform: none !important; }
.admin-search-field__icon { color: var(--content-muted) !important; }
.admin-search-field input { color: var(--content-text) !important; }
.admin-search-field input::placeholder { color: var(--content-muted) !important; }
.admin-search-field__clear { background: rgba(124,92,252,0.1) !important; color: #7c5cfc !important; }

/* ── Chart ── */
.admin-chart__plot { background: #f8f9fc !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 14px !important; }
.admin-chart__axes, .admin-chart__labels { color: var(--content-muted) !important; }

/* ── Person rows ── */
.admin-person-row { background: #f8f9fc !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 14px !important; }
.admin-person-row:hover { background: #f0f1f8 !important; border-color: rgba(124,92,252,0.15) !important; }
.admin-person-row__body strong { color: var(--content-text) !important; }
.admin-person-row__body span, .admin-person-row__meta span { color: var(--content-muted) !important; }
.admin-person-row__role { background: rgba(124,92,252,0.08) !important; color: #7c5cfc !important; }

/* ── Badges ── */
.admin-badge--success { background: rgba(34,197,94,0.1) !important; color: #16a34a !important; }
.admin-badge--muted { background: rgba(0,0,0,0.06) !important; color: var(--content-muted) !important; }
.admin-badge--danger { background: rgba(239,68,68,0.1) !important; color: #dc2626 !important; }

/* ── Buttons ── */
.admin-button--primary { background: linear-gradient(135deg,#7c5cfc,#5a3fd4) !important; color: #fff !important; border: none !important; box-shadow: 0 4px 14px rgba(124,92,252,0.35) !important; }
.admin-button--ghost { background: #f5f6fa !important; color: var(--content-text) !important; border: 1px solid rgba(0,0,0,0.1) !important; }
.admin-button--danger { background: rgba(239,68,68,0.08) !important; color: #dc2626 !important; border: 1px solid rgba(239,68,68,0.2) !important; }

/* ── Positions form compact overrides ── */
.admin-form--positions { gap: 5px !important; padding: 10px 12px !important; }
.admin-form--positions .admin-panel__header { margin-bottom: 4px !important; padding-bottom: 6px !important; }
.admin-form--positions input, .admin-form--positions textarea, .admin-form--positions select { padding: 5px 9px !important; font-size: 0.81rem !important; border-radius: 6px !important; height: 30px !important; min-height: unset !important; }
.admin-form--positions textarea { height: auto !important; min-height: 52px !important; max-height: 80px !important; }
.admin-form--positions .admin-button { padding: 4px 12px !important; font-size: 0.78rem !important; }
.admin-form--positions > div, .admin-form--positions > label { margin: 0 !important; }

/* ── Status ── */
.admin-status--success { background: rgba(34,197,94,0.08) !important; color: #16a34a !important; }
.admin-status--error { background: rgba(239,68,68,0.08) !important; color: #dc2626 !important; }
.admin-status--loading { background: rgba(124,92,252,0.08) !important; color: #7c5cfc !important; }

/* ── Forms ── */
.admin-login-form input, .admin-form input, .admin-form textarea,
.admin-form select, .admin-item select, .admin-toolbar__filters select {
  background: #f5f6fa !important; border: 1px solid rgba(0,0,0,0.1) !important;
  color: var(--content-text) !important; border-radius: 10px !important;
}
.admin-login-form input:focus, .admin-form input:focus,
.admin-form textarea:focus, .admin-form select:focus, .admin-item select:focus {
  border-color: #7c5cfc !important; box-shadow: 0 0 0 3px rgba(124,92,252,0.12) !important;
}
.admin-login-form label, .admin-form label { color: var(--content-muted) !important; }
.admin-copy { color: var(--content-muted) !important; }

/* ── Table ── */
.admin-table thead th { background: #f8f9fc !important; color: var(--content-muted) !important; border-bottom: 1px solid rgba(0,0,0,0.06) !important; }
.admin-table tbody td { border-bottom: 1px solid rgba(0,0,0,0.05) !important; color: var(--content-text) !important; }
.admin-table tbody tr:hover { background: #f8f9fc !important; }
.admin-table strong { color: var(--content-text) !important; }
.admin-table span { color: var(--content-muted) !important; }
.admin-table-wrap { border: 1px solid rgba(0,0,0,0.06) !important; }
.admin-content .admin-table tbody tr { background: transparent !important; }
.admin-content .admin-table tbody tr:hover { background: #f8f9fc !important; }

/* ── Items ── */
.admin-item { background: #f8f9fc !important; border: 1px solid rgba(0,0,0,0.06) !important; border-radius: 14px !important; }
.admin-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important; transform: translateY(-1px) !important; }
.admin-item strong { color: var(--content-text) !important; }
.admin-item p { color: var(--content-muted) !important; }

/* ── Action cards ── */
.admin-action-card { background: #fff !important; border: 1px solid rgba(0,0,0,0.07) !important; border-radius: 14px !important; color: var(--content-text) !important; }
.admin-action-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important; border-color: rgba(124,92,252,0.3) !important; }
.admin-action-card strong { color: var(--content-text) !important; }

/* ── Profile ── */
.admin-profile-card__hero { background: #f8f9fc !important; border: 1px solid rgba(0,0,0,0.06) !important; }
.admin-profile-card__hero h2 { color: var(--content-text) !important; }
.admin-profile-metric { background: #f8f9fc !important; border: 1px solid rgba(0,0,0,0.06) !important; }
.admin-profile-metric span { color: var(--content-muted) !important; }
.admin-profile-metric strong { color: var(--content-text) !important; }

/* ── Download link ── */
.admin-download-link { background: rgba(124,92,252,0.08) !important; color: #7c5cfc !important; border: 1px solid rgba(124,92,252,0.2) !important; }
.admin-download-link:hover { background: rgba(124,92,252,0.15) !important; color: #5a3fd4 !important; }

/* ── Donut ── */
.admin-donut__core { background: #fff !important; }
.admin-donut-legend__item strong { color: var(--content-text) !important; }
.admin-donut-legend__item span { color: var(--content-muted) !important; }

/* ── Login card ── */
.admin-login-card { background: #fff !important; border: 1px solid rgba(0,0,0,0.08) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important; border-radius: 20px !important; }

/* ── Mobile table rows ── */
.admin-table tbody tr { border: 1px solid rgba(0,0,0,0.08) !important; background: #fff !important; }
.admin-table tbody td { border-bottom: 1px dashed rgba(0,0,0,0.06) !important; }
.admin-table tbody td::before { color: var(--content-muted) !important; }

/* ── Scrollbar ── */
.admin-content::-webkit-scrollbar { width: 6px; }
.admin-content::-webkit-scrollbar-track { background: rgba(0,0,0,0.04); border-radius: 4px; }
.admin-content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
.admin-content::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.22); }

/* ══════════════════════════════════════════════════════
   FIGMA-MATCH OVERRIDES
══════════════════════════════════════════════════════ */

/* ── Header ── */
.admin-header--hero h2 {
  font-size: 1.55rem !important;
  font-weight: 800 !important;
  color: var(--content-text) !important;
  margin: 0 !important;
}
.admin-header--hero {
  align-items: center !important;
  padding: 18px 24px !important;
}

/* Date pill */
.admin-header__date-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #f5f6fa;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--content-text);
}

/* Bell with red dot */
.admin-icon-button--bell {
  position: relative;
}
.admin-bell-dot {
  position: absolute;
  top: 6px; right: 6px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #fff;
}

/* Profile pill chevron */
.admin-profile-pill {
  gap: 8px !important;
  padding: 7px 12px 7px 7px !important;
}

/* ── Stat cards — Figma layout ── */
.admin-stat-card {
  display: flex !important;
  align-items: center !important;
  gap: 14px !important;
  padding: 20px 18px !important;
  position: relative;
  overflow: hidden;
}
.admin-stat-card__body {
  flex: 1;
  min-width: 0;
}
.admin-stat-card__body span {
  display: block;
  font-size: 0.82rem;
  color: var(--content-muted);
  margin-bottom: 4px;
}
.admin-stat-card__body strong {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--content-text);
  line-height: 1;
}
.admin-stat-card__body p {
  margin: 6px 0 0;
  font-size: 0.78rem;
  color: #22c55e;
}
.admin-stat-card__icon {
  width: 52px !important;
  height: 52px !important;
  border-radius: 16px !important;
  font-size: 1.4rem !important;
  flex-shrink: 0;
}

/* Sparkline */
.admin-stat-sparkline {
  position: absolute;
  bottom: 0; right: 0;
  width: 90px; height: 40px;
  opacity: 0.85;
}

/* ── Chart — purple line ── */
.admin-chart__plot {
  background: #fff !important;
  border: 1px solid rgba(0,0,0,0.05) !important;
  border-radius: 16px !important;
  padding: 12px;
}

/* ── Person rows — Figma style ── */
.admin-person-row {
  padding: 14px 16px !important;
  border-radius: 12px !important;
  gap: 12px !important;
}
.admin-person-row__avatar {
  width: 40px !important;
  height: 40px !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
}
.admin-person-row__body strong {
  font-size: 0.92rem !important;
  font-weight: 700 !important;
}
.admin-person-row__body span {
  font-size: 0.8rem !important;
}
.admin-person-row__role {
  background: rgba(124,92,252,0.08) !important;
  color: #7c5cfc !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  padding: 4px 10px !important;
  border-radius: 6px !important;
}

/* Submitted green badge */
.admin-badge--submitted-green {
  background: rgba(34,197,94,0.1) !important;
  color: #16a34a !important;
  font-size: 0.75rem !important;
  padding: 4px 10px !important;
  border-radius: 6px !important;
}

/* ── Quick Actions — 5 col Figma layout ── */
.admin-actions-grid--5 {
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0,1fr)) !important;
  gap: 12px !important;
}
.admin-actions-grid--5 .admin-action-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 16px 14px !important;
  border-radius: 14px !important;
  text-align: left !important;
  justify-content: flex-start !important;
}
.admin-action-card__text {
  flex: 1;
  min-width: 0;
}
.admin-action-card__text strong {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--content-text);
  line-height: 1.3;
}
.admin-action-card__text small {
  display: block;
  font-size: 0.72rem;
  color: var(--content-muted);
  margin-top: 2px;
}
.admin-action-card__arrow {
  color: var(--content-muted);
  font-size: 0.75rem;
  flex-shrink: 0;
}
.admin-action-card__icon {
  width: 40px !important;
  height: 40px !important;
  border-radius: 12px !important;
  font-size: 1.1rem !important;
  flex-shrink: 0;
}
.admin-action-card__icon--red {
  background: rgba(239,68,68,0.1);
  color: #ef4444;
}

/* ── Overview grid — full width for actions ── */
.admin-panel--actions {
  grid-column: 1 / -1 !important;
}

/* ── Responsive quick actions ── */
@media (max-width: 1200px) {
  .admin-actions-grid--5 {
    grid-template-columns: repeat(3, minmax(0,1fr)) !important;
  }
}
@media (max-width: 768px) {
  .admin-actions-grid--5 {
    grid-template-columns: repeat(2, minmax(0,1fr)) !important;
  }
}
@media (max-width: 480px) {
  .admin-actions-grid--5 {
    grid-template-columns: 1fr !important;
  }
}

/* ══════════════════════════════════════════════════════
   NOTIFICATION PANEL
══════════════════════════════════════════════════════ */
.notif-panel {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.notif-panel__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.15);
  pointer-events: auto;
  animation: notifFadeIn 0.18s ease;
}

@keyframes notifFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.notif-panel__card {
  position: absolute;
  top: 72px;
  right: 28px;
  width: 360px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.07);
  overflow: hidden;
  pointer-events: auto;
  animation: notifSlideDown 0.22s cubic-bezier(0.22,1,0.36,1);
}

@keyframes notifSlideDown {
  from { opacity: 0; transform: translateY(-12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}

.notif-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px 14px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.notif-panel__header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--content-text);
}

.notif-panel__close {
  width: 30px; height: 30px;
  border-radius: 8px;
  border: none;
  background: #f5f6fa;
  color: var(--content-muted);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.notif-panel__close:hover { background: #eef0f8; color: var(--content-text); }

.notif-panel__list {
  max-height: 380px;
  overflow-y: auto;
  padding: 8px 0;
}
.notif-panel__list::-webkit-scrollbar { width: 4px; }
.notif-panel__list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }

/* Notification item */
.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 18px;
  transition: background 0.15s ease;
  cursor: default;
}
.notif-item:hover { background: #f8f9fc; }

.notif-item__icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}
.notif-item--blue  .notif-item__icon { background: rgba(99,102,241,0.1);  color: #6366f1; }
.notif-item--purple .notif-item__icon { background: rgba(168,85,247,0.1); color: #a855f7; }
.notif-item--green  .notif-item__icon { background: rgba(34,197,94,0.1);  color: #22c55e; }

.notif-item__body { flex: 1; min-width: 0; }

.notif-item__title {
  margin: 0 0 3px;
  font-size: 0.83rem;
  color: var(--content-text);
  line-height: 1.4;
}
.notif-item__title strong { font-weight: 700; }

.notif-item__meta {
  font-size: 0.74rem;
  color: var(--content-muted);
}

/* Unread highlight */
.notif-item--unread {
  background: #f8f7ff;
}
.notif-item--unread:hover { background: #f0eeff; }

/* Empty state */
.notif-panel__empty {  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 20px;
  color: var(--content-muted);
}
.notif-panel__empty i { font-size: 2rem; opacity: 0.4; }
.notif-panel__empty p { margin: 0; font-size: 0.88rem; }

/* Footer */
.notif-panel__footer {
  padding: 12px 18px;
  border-top: 1px solid rgba(0,0,0,0.06);
  text-align: center;
}
.notif-panel__mark-read {
  border: none;
  background: none;
  color: #7c5cfc;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;
}
.notif-panel__mark-read:hover { color: #5a3fd4; }

/* ── Sidebar logo image ── */
.admin-sidebar__logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  display: block;
}

.admin-sidebar__brand {
  padding-bottom: 20px !important;
  border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  display: flex !important;
  align-items: center !important;
}
`;
function AdminDashboardStyles() {
  return <style dangerouslySetInnerHTML={{ __html: ADMIN_DASHBOARD_CSS }} />;
}
/* ── Profile Tab ─────────────────────────────────────────────── */
function ProfileTab({ authUser, authHeaders, handleLogout }) {
  const [pwForm, setPwForm]   = React.useState({ current: '', next: '', confirm: '' });
  const [pwStatus, setPwStatus] = React.useState({ type: 'idle', message: '' });
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNext,    setShowNext]    = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handlePwChange = async (e) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) {
      setPwStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    if (pwForm.next.length < 8) {
      setPwStatus({ type: 'error', message: 'New password must be at least 8 characters.' });
      return;
    }
    setPwStatus({ type: 'loading', message: '' });
    try {
      await apiRequest('/api/auth/change-password', {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      });
      setPwStatus({ type: 'success', message: 'Password changed successfully. Please log in again.' });
      setPwForm({ current: '', next: '', confirm: '' });
      setTimeout(() => handleLogout(), 2200);
    } catch (err) {
      setPwStatus({ type: 'error', message: err.message || 'Failed to change password.' });
    }
  };

  const inputStyle = {
    width: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10,
    padding: '11px 40px 11px 14px', background: '#f5f6fa',
    color: 'var(--content-text)', outline: 'none', fontSize: '0.92rem', boxSizing: 'border-box',
  };
  const eyeStyle = {
    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
    cursor: 'pointer', color: 'var(--content-muted)', fontSize: '0.9rem', userSelect: 'none',
  };

  return (
    <section style={{ display: 'grid', gap: 20, maxWidth: 860 }}>
      {/* ── Account Info ── */}
      <div className="admin-panel">
        <div className="admin-panel__header">
          <h3>Account Details</h3>
          <span className="admin-badge admin-badge--success">Active session</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center',
            background: 'linear-gradient(135deg,#42c2ff,#7d57ff)', color: '#fff',
            fontSize: '1.6rem', fontWeight: 900, flexShrink: 0,
          }}>
            {(authUser?.email || 'A').charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p className="admin-kicker" style={{ margin: '0 0 4px' }}>Authenticated admin</p>
            <strong style={{ fontSize: '1.05rem', color: 'var(--content-text)', display: 'block', wordBreak: 'break-all' }}>
              {authUser?.email || 'admin@example.com'}
            </strong>
            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'var(--content-muted)', lineHeight: 1.6 }}>
              <span style={{ display: 'inline-block', marginRight: 12 }}>
                <span style={{ fontWeight: 700 }}>Role:</span> {authUser?.role || 'admin'}
              </span>
              <span style={{ display: 'block', marginTop: 2 }}>
                <span style={{ fontWeight: 700 }}>ID:</span>{' '}
                <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', wordBreak: 'break-all' }}>
                  {authUser?.accountId || authUser?.id || '—'}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Change Password ── */}
      <div className="admin-panel">
        <div className="admin-panel__header">
          <h3>Change Password</h3>
        </div>
        <p className="admin-copy admin-copy--muted" style={{ marginTop: 4 }}>
          After saving, you will be logged out and must sign in with your new password.
        </p>

        <form className="admin-form" onSubmit={handlePwChange} style={{ marginTop: 18, maxWidth: 460 }} noValidate>
          {/* current */}
          <label>
            Current Password
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                value={pwForm.current}
                onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))}
                placeholder="Enter current password"
                required
                style={inputStyle}
              />
              <span style={eyeStyle} onClick={() => setShowCurrent(v => !v)}>
                <i className={`bi bi-eye${showCurrent ? '-slash' : ''}`} />
              </span>
            </div>
          </label>

          {/* new */}
          <label>
            New Password
            <div style={{ position: 'relative' }}>
              <input
                type={showNext ? 'text' : 'password'}
                value={pwForm.next}
                onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))}
                placeholder="Min. 8 characters"
                required
                style={inputStyle}
              />
              <span style={eyeStyle} onClick={() => setShowNext(v => !v)}>
                <i className={`bi bi-eye${showNext ? '-slash' : ''}`} />
              </span>
            </div>
          </label>

          {/* confirm */}
          <label>
            Confirm New Password
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={pwForm.confirm}
                onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                placeholder="Re-enter new password"
                required
                style={inputStyle}
              />
              <span style={eyeStyle} onClick={() => setShowConfirm(v => !v)}>
                <i className={`bi bi-eye${showConfirm ? '-slash' : ''}`} />
              </span>
            </div>
          </label>

          {pwStatus.message && (
            <p className={`admin-status admin-status--${pwStatus.type === 'success' ? 'success' : pwStatus.type === 'loading' ? 'loading' : 'error'}`}>
              {pwStatus.type === 'loading' ? 'Saving…' : pwStatus.message}
            </p>
          )}

          <div className="admin-form__actions">
            <button type="submit" className="admin-button admin-button--primary" disabled={pwStatus.type === 'loading'}>
              {pwStatus.type === 'loading' ? 'Saving…' : 'Save New Password'}
            </button>
            <button type="button" className="admin-button admin-button--ghost"
              onClick={() => { setPwForm({ current: '', next: '', confirm: '' }); setPwStatus({ type: 'idle', message: '' }); }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ── Settings Tab ─────────────────────────────────────────────── */
function SettingsTab({ authUser, authHeaders }) {
  const [activeSection, setActiveSection] = React.useState('general');

  /* ── General — persisted in localStorage ── */
  const [siteName,  setSiteName]  = React.useState(() => localStorage.getItem('kv-site-name')  || 'Kevalon Technology');
  const [siteEmail, setSiteEmail] = React.useState(() => localStorage.getItem('kv-site-email') || 'contact@kevalontechnology.in');
  const [sitePhone, setSitePhone] = React.useState(() => localStorage.getItem('kv-site-phone') || '+91 98765 43210');
  const [timezone,  setTimezone]  = React.useState(() => localStorage.getItem('kv-timezone')   || 'Asia/Kolkata');
  const [generalSaved, setGeneralSaved] = React.useState(false);

  /* ── Notifications — persisted in localStorage ── */
  const [notifNewApp,     setNotifNewApp]     = React.useState(() => localStorage.getItem('kv-notif-app')     !== 'false');
  const [notifNewContact, setNotifNewContact] = React.useState(() => localStorage.getItem('kv-notif-contact') !== 'false');
  const [notifNewLead,    setNotifNewLead]    = React.useState(() => localStorage.getItem('kv-notif-lead')    !== 'false');
  const [notifEmail,      setNotifEmail]      = React.useState(() => localStorage.getItem('kv-notif-email')   || authUser?.email || '');
  const [notifSaved,      setNotifSaved]      = React.useState(false);

  /* ── Appearance — persisted in localStorage ── */
  const [compactMode, setCompactMode] = React.useState(() => localStorage.getItem('kv-compact') === 'true');
  const [accentColor, setAccentColor] = React.useState(() => localStorage.getItem('kv-accent')  || '#7c5cfc');
  const [appearSaved, setAppearSaved] = React.useState(false);

  /* apply compact mode live */
  React.useEffect(() => {
    document.documentElement.style.setProperty('--admin-content-gap', compactMode ? '12px' : '20px');
  }, [compactMode]);

  /* apply accent color live */
  React.useEffect(() => {
    document.documentElement.style.setProperty('--admin-primary', accentColor);
  }, [accentColor]);

  const saveGeneral = (e) => {
    e.preventDefault();
    localStorage.setItem('kv-site-name',  siteName);
    localStorage.setItem('kv-site-email', siteEmail);
    localStorage.setItem('kv-site-phone', sitePhone);
    localStorage.setItem('kv-timezone',   timezone);
    setGeneralSaved(true);
    setTimeout(() => setGeneralSaved(false), 2500);
  };

  const saveNotif = (e) => {
    e.preventDefault();
    localStorage.setItem('kv-notif-app',     String(notifNewApp));
    localStorage.setItem('kv-notif-contact', String(notifNewContact));
    localStorage.setItem('kv-notif-lead',    String(notifNewLead));
    localStorage.setItem('kv-notif-email',   notifEmail);
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
  };

  const saveAppear = (e) => {
    e.preventDefault();
    localStorage.setItem('kv-compact', String(compactMode));
    localStorage.setItem('kv-accent',  accentColor);
    setAppearSaved(true);
    setTimeout(() => setAppearSaved(false), 2500);
  };

  const sections = [
    { key: 'general',       label: 'General',       icon: 'bi-gear-fill' },
    { key: 'notifications', label: 'Notifications', icon: 'bi-bell-fill' },
    { key: 'appearance',    label: 'Appearance',     icon: 'bi-palette-fill' },
    { key: 'security',      label: 'Security',       icon: 'bi-shield-lock-fill' },
  ];

  const inp = {
    width: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10,
    padding: '11px 14px', background: '#f5f6fa', color: 'var(--content-text)',
    outline: 'none', fontSize: '0.92rem', boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color .18s, box-shadow .18s',
  };

  const Toggle = ({ checked, onChange, label, desc }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.92rem', color: 'var(--content-text)' }}>{label}</p>
        {desc && <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--content-muted)' }}>{desc}</p>}
      </div>
      <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, flexShrink: 0, cursor: 'pointer' }}>
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: 24, transition: '.2s', background: checked ? 'var(--admin-primary,#7c5cfc)' : '#d1d5db' }} />
        <span style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: '#fff', top: 3, left: checked ? 23 : 3, transition: '.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
      </label>
    </div>
  );

  const accentColors = [
    { color: '#7c5cfc', label: 'Purple' },
    { color: '#6366f1', label: 'Indigo' },
    { color: '#0ea5e9', label: 'Sky' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f97316', label: 'Orange' },
    { color: '#ef4444', label: 'Red' },
  ];

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, alignItems: 'start' }}>

      {/* ── Left nav ── */}
      <div className="admin-panel" style={{ padding: '10px 8px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--content-muted)', padding: '6px 10px 10px', margin: 0 }}>Settings</p>
        {sections.map(s => (
          <button key={s.key} type="button" onClick={() => setActiveSection(s.key)} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%', border: 'none',
            borderRadius: 10, padding: '10px 12px', textAlign: 'left', fontSize: '0.88rem',
            fontWeight: 600, cursor: 'pointer', transition: 'all .18s', fontFamily: 'inherit',
            background: activeSection === s.key ? 'linear-gradient(135deg,rgba(124,92,252,0.12),rgba(90,63,212,0.08))' : 'transparent',
            color: activeSection === s.key ? 'var(--admin-primary,#7c5cfc)' : 'var(--content-text)',
            marginBottom: 2,
          }}>
            <i className={`bi ${s.icon}`} style={{ fontSize: '0.9rem', width: 18, flexShrink: 0 }} />
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Right content ── */}
      <div>

        {/* GENERAL */}
        {activeSection === 'general' && (
          <div className="admin-panel">
            <div className="admin-panel__header">
              <h3>General</h3>
              <span className="admin-badge admin-badge--muted">Saved to browser</span>
            </div>
            <p style={{ margin: '4px 0 20px', fontSize: '0.85rem', color: 'var(--content-muted)' }}>
              Basic platform information displayed across the admin panel.
            </p>
            <form style={{ display: 'grid', gap: 16 }} onSubmit={saveGeneral}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'grid', gap: 6, fontSize: '0.85rem', color: 'var(--content-muted)', fontWeight: 700 }}>
                  Site Name
                  <input style={inp} value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="Kevalon Technology" />
                </label>
                <label style={{ display: 'grid', gap: 6, fontSize: '0.85rem', color: 'var(--content-muted)', fontWeight: 700 }}>
                  Contact Email
                  <input style={inp} type="email" value={siteEmail} onChange={e => setSiteEmail(e.target.value)} placeholder="contact@example.com" />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'grid', gap: 6, fontSize: '0.85rem', color: 'var(--content-muted)', fontWeight: 700 }}>
                  Contact Phone
                  <input style={inp} value={sitePhone} onChange={e => setSitePhone(e.target.value)} placeholder="+91 98765 43210" />
                </label>
                <label style={{ display: 'grid', gap: 6, fontSize: '0.85rem', color: 'var(--content-muted)', fontWeight: 700 }}>
                  Timezone
                  <select style={inp} value={timezone} onChange={e => setTimezone(e.target.value)}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST, UTC+4)</option>
                  </select>
                </label>
              </div>
              {generalSaved && <p className="admin-status admin-status--success">✓ General settings saved successfully.</p>}
              <div className="admin-form__actions">
                <button type="submit" className="admin-button admin-button--primary">Save Changes</button>
                <button type="button" className="admin-button admin-button--ghost" onClick={() => { setSiteName('Kevalon Technology'); setSiteEmail('contact@kevalontechnology.in'); setSitePhone('+91 98765 43210'); setTimezone('Asia/Kolkata'); }}>
                  Reset to Default
                </button>
              </div>
            </form>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeSection === 'notifications' && (
          <div className="admin-panel">
            <div className="admin-panel__header">
              <h3>Notifications</h3>
              <span className="admin-badge admin-badge--muted">Saved to browser</span>
            </div>
            <p style={{ margin: '4px 0 20px', fontSize: '0.85rem', color: 'var(--content-muted)' }}>
              Choose which events show alerts in the notification bell.
            </p>
            <form style={{ display: 'grid', gap: 0 }} onSubmit={saveNotif}>
              <Toggle checked={notifNewApp}     onChange={setNotifNewApp}     label="New Application"      desc="Show bell alert when a candidate submits an application." />
              <Toggle checked={notifNewContact} onChange={setNotifNewContact} label="New Contact Message"  desc="Show bell alert when someone sends a contact form message." />
              <Toggle checked={notifNewLead}    onChange={setNotifNewLead}    label="New Portfolio Lead"   desc="Show bell alert when someone requests a project preview." />
              <div style={{ marginTop: 20, display: 'grid', gap: 6 }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--content-muted)', fontWeight: 700 }}>
                  Digest Email Address
                  <input style={{ ...inp, marginTop: 6 }} type="email" value={notifEmail} onChange={e => setNotifEmail(e.target.value)} placeholder={authUser?.email || 'admin@example.com'} />
                </label>
                <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--content-muted)' }}>Used for future email digest notifications.</p>
              </div>
              {notifSaved && <p className="admin-status admin-status--success" style={{ marginTop: 12 }}>✓ Notification preferences saved.</p>}
              <div className="admin-form__actions" style={{ marginTop: 20 }}>
                <button type="submit" className="admin-button admin-button--primary">Save Changes</button>
                <button type="button" className="admin-button admin-button--ghost" onClick={() => { setNotifNewApp(true); setNotifNewContact(true); setNotifNewLead(true); }}>
                  Reset to Default
                </button>
              </div>
            </form>
          </div>
        )}

        {/* APPEARANCE */}
        {activeSection === 'appearance' && (
          <div className="admin-panel">
            <div className="admin-panel__header">
              <h3>Appearance</h3>
              <span className="admin-badge admin-badge--muted">Applied live</span>
            </div>
            <p style={{ margin: '4px 0 20px', fontSize: '0.85rem', color: 'var(--content-muted)' }}>
              Changes apply instantly and are saved to your browser.
            </p>
            <form style={{ display: 'grid', gap: 0 }} onSubmit={saveAppear}>
              <Toggle checked={compactMode} onChange={setCompactMode} label="Compact Mode"  desc="Reduce spacing for a denser, information-rich layout." />

              <div style={{ paddingTop: 20 }}>
                <p style={{ margin: '0 0 12px', fontSize: '0.85rem', color: 'var(--content-muted)', fontWeight: 700 }}>Accent Color</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {accentColors.map(({ color, label }) => (
                    <button key={color} type="button" title={label} onClick={() => setAccentColor(color)} style={{
                      width: 36, height: 36, borderRadius: '50%', background: color, cursor: 'pointer',
                      border: accentColor === color ? '3px solid #fff' : '3px solid transparent',
                      boxShadow: accentColor === color ? `0 0 0 3px ${color}` : '0 2px 6px rgba(0,0,0,0.15)',
                      outline: 'none', transition: 'all .18s',
                    }} />
                  ))}
                </div>
                <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--content-muted)' }}>
                  Currently: <strong style={{ color: accentColor }}>{accentColors.find(a => a.color === accentColor)?.label || accentColor}</strong>
                </p>
              </div>

              {appearSaved && <p className="admin-status admin-status--success" style={{ marginTop: 16 }}>✓ Appearance saved. Changes applied live.</p>}
              <div className="admin-form__actions" style={{ marginTop: 20 }}>
                <button type="submit" className="admin-button admin-button--primary">Save Changes</button>
                <button type="button" className="admin-button admin-button--ghost" onClick={() => { setCompactMode(false); setAccentColor('#7c5cfc'); }}>
                  Reset to Default
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SECURITY */}
        {activeSection === 'security' && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div className="admin-panel">
              <div className="admin-panel__header">
                <h3>Active Session</h3>
                <span className="admin-badge admin-badge--success">Live</span>
              </div>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
                {[
                  { label: 'Logged in as',  value: authUser?.email || '—' },
                  { label: 'Role',           value: authUser?.role  || 'admin' },
                  { label: 'Session',        value: 'Active' },
                  { label: 'Token expires',  value: '7 days from login' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: '#f8f9fc', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--content-muted)', marginBottom: 6 }}>{label}</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--content-text)', wordBreak: 'break-all' }}>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-panel">
              <div className="admin-panel__header"><h3>API &amp; Access</h3></div>
              <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                {[
                  { label: 'API Base URL', value: 'http://localhost:3001',           icon: 'bi-server' },
                  { label: 'Auth Method',  value: 'JWT Bearer Token (7d expiry)',    icon: 'bi-key' },
                  { label: 'CORS Origins', value: 'localhost:5173, localhost:4173',  icon: 'bi-shield-check' },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 14px', background: '#f8f9fc', borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(124,92,252,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`bi ${icon}`} style={{ color: 'var(--admin-primary,#7c5cfc)', fontSize: '0.95rem' }} />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--content-muted)', marginBottom: 3 }}>{label}</span>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--content-text)' }}>{value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('kevalon-admin-token') || '');
  const [authUser, setAuthUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('all');
  const [pageStatusFilter, setPageStatusFilter] = useState('all');
  const [stats, setStats] = useState({ applications: 0, contacts: 0, pages: 0 });
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageForm, setPageForm] = useState(blankPageForm);
  const [pageStatus, setPageStatus] = useState({ type: 'idle', message: '' });
  const [dataStatus, setDataStatus] = useState({ type: 'idle', message: '' });
  const [positions, setPositions] = useState([]);
  const [positionForm, setPositionForm] = useState(blankPositionForm);
  const [positionStatus, setPositionStatus] = useState({ type: 'idle', message: '' });
  const [portfolioLeads, setPortfolioLeads] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardRange, setDashboardRange] = useState('This Month');

  /* ── Unread notification tracking ── */
  const [seenCount, setSeenCount] = useState(() => {
    try {
      // Version check — reset if stored version doesn't match
      const version = localStorage.getItem('kevalon-notif-version');
      if (version !== '2') {
        localStorage.removeItem('kevalon-notif-seen');
        localStorage.setItem('kevalon-notif-version', '2');
        return { apps: 0, contacts: 0, leads: 0 };
      }
      return JSON.parse(localStorage.getItem('kevalon-notif-seen') || '{"apps":0,"contacts":0,"leads":0}');
    }
    catch { return { apps: 0, contacts: 0, leads: 0 }; }
  });

  // Auto-update seenCount if actual data exceeds stored seen (handles stale localStorage)
  useEffect(() => {
    setSeenCount(prev => {
      const next = {
        apps:     Math.min(prev.apps,     applications.length),
        contacts: Math.min(prev.contacts, contacts.length),
        leads:    Math.min(prev.leads,    portfolioLeads.length),
      };
      if (next.apps !== prev.apps || next.contacts !== prev.contacts || next.leads !== prev.leads) {
        localStorage.setItem('kevalon-notif-seen', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  }, [applications.length, contacts.length, portfolioLeads.length]);

  const unreadCount = useMemo(() => {
    const newApps     = Math.max(0, applications.length   - seenCount.apps);
    const newContacts = Math.max(0, contacts.length       - seenCount.contacts);
    const newLeads    = Math.max(0, portfolioLeads.length - seenCount.leads);
    return newApps + newContacts + newLeads;
  }, [applications.length, contacts.length, portfolioLeads.length, seenCount]);

  const markAllSeen = () => {
    const next = { apps: applications.length, contacts: contacts.length, leads: portfolioLeads.length };
    localStorage.setItem('kevalon-notif-seen', JSON.stringify(next));
    setSeenCount(next);
    setNotifOpen(false);
  };

  const authHeaders = useMemo(
    () => ({ Authorization: `Bearer ${authToken}` }),
    [authToken],
  );

  const locale = typeof navigator !== 'undefined' ? navigator.language : undefined;
  const dashboardDate = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return formatter.format(currentDate);
  }, [currentDate, locale]);

  const dashboardWeekday = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    return formatter.format(currentDate);
  }, [currentDate, locale]);

  const dashboardSummary = useMemo(() => {
    /* ── helpers ── */
    const now = new Date();

    const startOf = (period) => {
      const d = new Date(now);
      if (period === 'thisMonth')  { d.setDate(1); d.setHours(0,0,0,0); return d; }
      if (period === 'lastMonth')  { d.setDate(1); d.setHours(0,0,0,0); d.setMonth(d.getMonth()-1); return d; }
      if (period === 'endLastMonth') { const e = new Date(now); e.setDate(1); e.setHours(0,0,0,0); return e; }
      return d;
    };

    const countInRange = (arr, from, to) =>
      arr.filter(item => {
        const t = new Date(item.createdAt).getTime();
        return t >= from.getTime() && t < to.getTime();
      }).length;

    /* Applications */
    const appsThisMonth = countInRange(applications, startOf('thisMonth'), now);
    const appsLastMonth = countInRange(applications, startOf('lastMonth'), startOf('endLastMonth'));
    const appsDelta = appsLastMonth === 0
      ? (appsThisMonth > 0 ? 100 : 0)
      : Math.round(((appsThisMonth - appsLastMonth) / appsLastMonth) * 100);

    /* Contacts */
    const ctsThisMonth = countInRange(contacts, startOf('thisMonth'), now);
    const ctsLastMonth = countInRange(contacts, startOf('lastMonth'), startOf('endLastMonth'));
    const ctsDelta = ctsLastMonth === 0
      ? (ctsThisMonth > 0 ? 100 : 0)
      : Math.round(((ctsThisMonth - ctsLastMonth) / ctsLastMonth) * 100);

    const fmtDelta = (n) => n >= 0 ? `+${n}% vs last month` : `${n}% vs last month`;

    /* Sparkline — last 7 days counts per day for a given array */
    const sparkData = (arr) => {
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (6 - i));
        d.setHours(0,0,0,0);
        const end = new Date(d); end.setDate(d.getDate() + 1);
        return countInRange(arr, d, end);
      });
    };

    const toSparkPoints = (data) => {
      const max = Math.max(...data, 1);
      return data.map((v, i) => `${(i / 6) * 80},${28 - (v / max) * 24}`).join(' ');
    };

    return [
      {
        label: 'Applications',
        value: stats.applications,
        change: fmtDelta(appsDelta),
        positive: appsDelta >= 0,
        tone: 'blue',
        icon: '▦',
        sparkPoints: toSparkPoints(sparkData(applications)),
      },
      {
        label: 'Contacts',
        value: stats.contacts,
        change: fmtDelta(ctsDelta),
        positive: ctsDelta >= 0,
        tone: 'purple',
        icon: '◌',
        sparkPoints: toSparkPoints(sparkData(contacts)),
      },
      {
        label: 'Portfolio Leads',
        value: portfolioLeads.length,
        change: fmtDelta(
          (() => {
            const leadsThisMonth = countInRange(portfolioLeads, startOf('thisMonth'), now);
            const leadsLastMonth = countInRange(portfolioLeads, startOf('lastMonth'), startOf('endLastMonth'));
            return leadsLastMonth === 0
              ? (leadsThisMonth > 0 ? 100 : 0)
              : Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100);
          })()
        ),
        positive: (() => {
          const leadsThisMonth = countInRange(portfolioLeads, startOf('thisMonth'), now);
          const leadsLastMonth = countInRange(portfolioLeads, startOf('lastMonth'), startOf('endLastMonth'));
          return leadsThisMonth >= leadsLastMonth;
        })(),
        tone: 'green',
        icon: '◈',
        sparkPoints: toSparkPoints(sparkData(portfolioLeads)),
      },
      {
        label: 'Positions',
        value: positions.length,
        change: 'Active open positions',
        positive: true,
        tone: 'orange',
        icon: '▤',
        sparkPoints: '0,28 13,25 26,22 40,20 53,18 66,15 80,12',
      },
    ];
  }, [applications, contacts, portfolioLeads, positions.length, stats.applications, stats.contacts, stats.pages]);

  const applicationBreakdown = useMemo(() => {
    const approved = applications.filter((application) => (application.status || 'submitted') === 'hired' || (application.status || 'submitted') === 'shortlisted').length;
    const pending = applications.filter((application) => (application.status || 'submitted') === 'submitted' || (application.status || 'submitted') === 'reviewing').length;
    const rejected = applications.filter((application) => (application.status || 'submitted') === 'rejected').length;
    const underReview = applications.filter((application) => (application.status || 'submitted') === 'reviewing').length;

    const total = Math.max(approved + pending + rejected + underReview, 1);

    return [
      { label: 'Approved', value: approved, color: '#45d5b0' },
      { label: 'Pending', value: pending, color: '#f4c542' },
      { label: 'Rejected', value: rejected, color: '#ff6b6b' },
      { label: 'Under Review', value: underReview, color: '#58a6ff' },
    ].map((item) => ({ ...item, percent: (item.value / total) * 100 }));
  }, [applications]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesQuery = !normalizedQuery || [
        application.firstName,
        application.lastName,
        application.email,
        application.phone,
        application.role,
        application.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

      const matchesStatus =
        applicationStatusFilter === 'all' || (application.status || 'submitted') === applicationStatusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [applications, applicationStatusFilter, normalizedQuery]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesQuery = !normalizedQuery || [
        contact.fullName,
        contact.email,
        contact.phone,
        contact.message,
        contact.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesQuery;
    });
  }, [contacts, normalizedQuery]);

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const matchesQuery = !normalizedQuery || [
        page.title,
        page.slug,
        page.heroTitle,
        page.body,
        page.metaDescription,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

      const isPublished = Boolean(page.isPublished);
      const matchesPublished =
        pageStatusFilter === 'all' ||
        (pageStatusFilter === 'published' && isPublished) ||
        (pageStatusFilter === 'hidden' && !isPublished);

      return matchesQuery && matchesPublished;
    });
  }, [normalizedQuery, pageStatusFilter, pages]);

  const visibleRecentApplications = useMemo(
    () => filteredApplications.slice(0, 4),
    [filteredApplications],
  );
  const visibleRecentContacts = useMemo(
    () => filteredContacts.slice(0, 4),
    [filteredContacts],
  );
  const hasSearchResults = useMemo(
    () => searchQuery.trim() === '' || filteredApplications.length > 0 || filteredContacts.length > 0 || filteredPages.length > 0,
    [filteredApplications.length, filteredContacts.length, filteredPages.length, searchQuery],
  );
  const recentActivity = useMemo(() => {
    const entries = [
      applications[0] ? { title: `New application submitted by ${applications[0].firstName} ${applications[0].lastName}`, meta: '2 minutes ago', tone: 'blue' } : null,
      pages[0] ? { title: `Page "${pages[0].title}" updated`, meta: '1 hour ago', tone: 'green' } : null,
      contacts[0] ? { title: `New contact added - ${contacts[0].email}`, meta: '3 hours ago', tone: 'purple' } : null,
    ].filter(Boolean);

    return entries;
  }, [applications, contacts, pages]);

  const handlePageFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPageForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetPageForm = () => {
    setPageForm(blankPageForm);
  };

  const loadDashboard = async (token = authToken) => {
    if (!token) {
      return;
    }

    setDataStatus({ type: 'loading', message: 'Loading dashboard...' });

    try {
      const [meResponse, dashboardResponse, applicationsResponse, contactsResponse, pagesResponse, positionsResponse, portfolioLeadsResponse] = await Promise.all([
        apiRequest('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/api/applications/admin', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/api/contact/admin', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/api/pages/admin/list', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/api/positions/admin', { headers: { Authorization: `Bearer ${token}` } }),
        apiRequest('/api/portfolio-leads/admin', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setAuthUser(meResponse.user);
      setStats(dashboardResponse.data);
      setApplications(applicationsResponse.data);
      setContacts(contactsResponse.data);
      setPages(pagesResponse.data);
      setPositions(positionsResponse.data);
      setPortfolioLeads(portfolioLeadsResponse.data);
      setDataStatus({ type: 'success', message: 'Dashboard loaded.' });
    } catch (error) {
      if (error.message === 'Invalid or expired token' || error.message === 'Missing bearer token') {
        localStorage.removeItem('kevalon-admin-token');
        setAuthToken('');
        navigate('/admin/login', { replace: true });
        return;
      }

      setDataStatus({ type: 'error', message: error.message || 'Failed to load dashboard.' });
    }
  };

  useEffect(() => {
    if (authToken) {
      loadDashboard(authToken);
    }
  }, [authToken]);

  /* ── Auto-refresh every 30 s to pick up new submissions ── */
  useEffect(() => {
    if (!authToken) return;
    const id = window.setInterval(() => loadDashboard(authToken), 30_000);
    return () => window.clearInterval(id);
  }, [authToken]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('kevalon-admin-token');
    setAuthToken('');
    setAuthUser(null);
    setSearchQuery('');
    setApplicationStatusFilter('all');
    setPageStatusFilter('all');
    setStats({ applications: 0, contacts: 0, pages: 0 });
    setApplications([]);
    setContacts([]);
    setPages([]);
    setPositions([]);
    setActiveTab('overview');
    setIsSidebarOpen(false);
    navigate('/admin/login', { replace: true });
  };

  const updateApplicationStatus = async (id, status) => {
    await apiRequest(`/api/applications/admin/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ status }),
    });
    await loadDashboard();
  };

  const submitPage = async (event) => {
    event.preventDefault();
    setPageStatus({ type: 'loading', message: pageForm.id ? 'Updating page...' : 'Creating page...' });

    try {
      const response = pageForm.id
        ? await apiRequest(`/api/pages/admin/${pageForm.id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({
              slug: pageForm.slug,
              title: pageForm.title,
              heroTitle: pageForm.heroTitle,
              body: pageForm.body,
              metaDescription: pageForm.metaDescription,
              isPublished: pageForm.isPublished,
            }),
          })
        : await apiRequest('/api/pages/admin', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
              slug: pageForm.slug,
              title: pageForm.title,
              heroTitle: pageForm.heroTitle,
              body: pageForm.body,
              metaDescription: pageForm.metaDescription,
              isPublished: pageForm.isPublished,
            }),
          });

      setPageStatus({ type: 'success', message: response.message || 'Page saved.' });
      resetPageForm();
      await loadDashboard();
    } catch (error) {
      setPageStatus({ type: 'error', message: error.message || 'Could not save page.' });
    }
  };

  const editPage = (page) => {
    setPageForm({
      id: page._id,
      slug: page.slug || '',
      title: page.title || '',
      heroTitle: page.heroTitle || '',
      body: page.body || '',
      metaDescription: page.metaDescription || '',
      isPublished: Boolean(page.isPublished),
    });
    setActiveTab('pages');
  };

  const deletePage = async (id) => {
    await apiRequest(`/api/pages/admin/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    await loadDashboard();
  };

  /* ── Position handlers ── */
  const handlePositionFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPositionForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetPositionForm = () => setPositionForm(blankPositionForm);

  const submitPosition = async (e) => {
    e.preventDefault();
    setPositionStatus({ type: 'loading', message: positionForm.id ? 'Updating…' : 'Creating…' });
    try {
      const body = {
        title: positionForm.title, type: positionForm.type, category: positionForm.category,
        desc: positionForm.desc, exp: positionForm.exp, location: positionForm.location,
        isActive: positionForm.isActive,
        skills: positionForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        responsibilities: positionForm.responsibilities.split(',').map(s => s.trim()).filter(Boolean),
      };
      const res = positionForm.id
        ? await apiRequest(`/api/positions/admin/${positionForm.id}`, { method: 'PATCH', headers: authHeaders, body: JSON.stringify(body) })
        : await apiRequest('/api/positions/admin', { method: 'POST', headers: authHeaders, body: JSON.stringify(body) });
      setPositionStatus({ type: 'success', message: res.message || 'Saved.' });
      resetPositionForm();
      await loadDashboard();
    } catch (err) {
      setPositionStatus({ type: 'error', message: err.message || 'Could not save position.' });
    }
  };

  const editPosition = (pos) => {
    setPositionForm({
      id: pos._id, title: pos.title, type: pos.type, category: pos.category,
      desc: pos.desc || '', exp: pos.exp || '', location: pos.location || '',
      isActive: Boolean(pos.isActive),
      skills: (pos.skills || []).join(', '),
      responsibilities: (pos.responsibilities || []).join(', '),
    });
    setActiveTab('positions');
  };

  const deletePosition = async (id) => {
    if (!window.confirm('Delete this position?')) return;
    await apiRequest(`/api/positions/admin/${id}`, { method: 'DELETE', headers: authHeaders });
    await loadDashboard();
  };

  if (!authToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
    <AdminDashboardStyles />
    <main className="admin-shell admin-shell--dashboard">
      <div
        className={`admin-sidebar-backdrop ${isSidebarOpen ? 'is-open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img
            src={logo}
            alt="Kevalon Technology"
            className="admin-sidebar__logo-img"
          />
        </div>

        <div className="admin-sidebar__section-label">MAIN</div>
        <nav className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`admin-tab ${activeTab === tab.key ? 'is-active' : ''}`}
              onClick={() => {
                setActiveTab(tab.key);
                setIsSidebarOpen(false);
              }}
            >
              <span className="admin-tab__icon" aria-hidden="true">{tab.short}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__section-label admin-sidebar__section-label--account">ACCOUNT</div>

        <nav className="admin-tabs admin-tabs--account">
          <button type="button" className={`admin-tab ${activeTab === 'profile' ? 'is-active' : ''}`} onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}>
            <span className="admin-tab__icon" aria-hidden="true">PR</span>
            Profile
          </button>
          <button type="button" className={`admin-tab ${activeTab === 'settings' ? 'is-active' : ''}`} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}>
            <span className="admin-tab__icon" aria-hidden="true">ST</span>
            Settings
          </button>
          <button type="button" className="admin-tab" onClick={handleLogout}>
            <span className="admin-tab__icon" aria-hidden="true">LO</span>
            Logout
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <section className="admin-help-card">
            <div className="admin-help-card__icon">?</div>
            <h4>Need Help?</h4>
            <p>Check our documentation or contact support.</p>
            <button type="button" className="admin-button admin-button--primary" onClick={() => navigate('/contact')}>
              View Docs
            </button>
          </section>
        </div>
      </aside>

      <section className="admin-content">
        <div className="admin-mobile-topbar">
          <div className="admin-mobile-topbar__left">
            <button
              type="button"
              className="admin-hamburger"
              aria-label="Open section menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
            <p className="admin-mobile-topbar__title">Admin Menu</p>
          </div>

          <div className="admin-mobile-topbar__meta">
            <button type="button" className="admin-mobile-date" onClick={() => setActiveTab('overview')}>
              <strong>{dashboardWeekday}</strong>
              <span>{dashboardDate}</span>
            </button>
            <button type="button" className="admin-mobile-profile" onClick={() => setActiveTab('profile')} aria-label="Open profile page">
              <span className="admin-mobile-profile__avatar">A</span>
              <span className="admin-mobile-profile__text">
                <strong>Admin</strong>
                <small>{authUser?.email || 'admin@example.com'}</small>
              </span>
            </button>
          </div>
        </div>

        {activeTab !== 'profile' && activeTab !== 'settings' ? (
          <>
            <header className="admin-header admin-header--hero">
              <div>
                <h2>👋 Welcome back, Admin! 👋</h2>
                <p className="admin-kicker" style={{textTransform:'none',letterSpacing:'normal',fontSize:'0.9rem',fontWeight:400,color:'var(--content-muted)',marginTop:'4px'}}>Here's what's happening with your platform today.</p>
              </div>
              <div className="admin-header__meta">
                <div className="admin-header__date-pill">
                  <i className="bi bi-calendar3" style={{fontSize:'0.85rem'}} />
                  <strong>{dashboardDate}</strong>
                </div>
                <button type="button" className="admin-icon-button admin-icon-button--bell" onClick={() => setNotifOpen(o => !o)} aria-label="Notifications">
                  <i className="bi bi-bell" />
                  {unreadCount > 0 && (
                    <span className="admin-bell-dot" style={{ minWidth: 16, height: 16, borderRadius: 8, fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', top: 4, right: 4, padding: '0 3px' }}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* ── Notification panel ── */}
                {notifOpen && (
                  <div className="notif-panel" role="dialog" aria-label="Notifications">
                    <div className="notif-panel__backdrop" onClick={() => setNotifOpen(false)} />
                    <div className="notif-panel__card">
                      <div className="notif-panel__header">
                        <h4>Notifications</h4>
                        <button className="notif-panel__close" onClick={() => setNotifOpen(false)} aria-label="Close">
                          <i className="bi bi-x-lg" />
                        </button>
                      </div>

                      <div className="notif-panel__list">
                        {applications.slice(0, 3).map((app, i) => (
                          <div key={app._id || i} className={`notif-item notif-item--blue${i < Math.max(0, applications.length - seenCount.apps) ? ' notif-item--unread' : ''}`}>
                            <div className="notif-item__icon"><i className="bi bi-person-fill-add" /></div>
                            <div className="notif-item__body">
                              <p className="notif-item__title">New application from <strong>{app.firstName} {app.lastName}</strong></p>
                              <span className="notif-item__meta">{app.role} · {new Date(app.createdAt).toLocaleDateString()}</span>
                            </div>
                            {i < Math.max(0, applications.length - seenCount.apps) && (
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1', flexShrink: 0, marginTop: 4 }} />
                            )}
                          </div>
                        ))}
                        {contacts.slice(0, 3).map((c, i) => (
                          <div key={c._id || i} className={`notif-item notif-item--purple${i < Math.max(0, contacts.length - seenCount.contacts) ? ' notif-item--unread' : ''}`}>
                            <div className="notif-item__icon"><i className="bi bi-envelope-fill" /></div>
                            <div className="notif-item__body">
                              <p className="notif-item__title">New message from <strong>{c.fullName || c.email}</strong></p>
                              <span className="notif-item__meta">Contact · {new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                            {i < Math.max(0, contacts.length - seenCount.contacts) && (
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', flexShrink: 0, marginTop: 4 }} />
                            )}
                          </div>
                        ))}
                        {portfolioLeads.slice(0, 2).map((l, i) => (
                          <div key={l._id || i} className={`notif-item notif-item--green${i < Math.max(0, portfolioLeads.length - seenCount.leads) ? ' notif-item--unread' : ''}`}>
                            <div className="notif-item__icon"><i className="bi bi-eye-fill" /></div>
                            <div className="notif-item__body">
                              <p className="notif-item__title">Preview request for <strong>{l.projectTitle}</strong></p>
                              <span className="notif-item__meta">{l.email || l.phone} · {new Date(l.createdAt).toLocaleDateString()}</span>
                            </div>
                            {i < Math.max(0, portfolioLeads.length - seenCount.leads) && (
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginTop: 4 }} />
                            )}
                          </div>
                        ))}
                        {applications.length === 0 && contacts.length === 0 && portfolioLeads.length === 0 && (
                          <div className="notif-panel__empty">
                            <i className="bi bi-bell-slash" />
                            <p>No notifications yet</p>
                          </div>
                        )}
                      </div>

                      <div className="notif-panel__footer">
                        <button className="notif-panel__mark-read" onClick={markAllSeen}>
                          Mark all as read
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button type="button" className="admin-profile-pill" onClick={() => setActiveTab('profile')} aria-label="Open profile page">
                  <span className="admin-profile-pill__avatar">A</span>
                  <span className="admin-profile-pill__text">
                    <strong>Admin</strong>
                  </span>
                  <i className="bi bi-chevron-down" style={{fontSize:'0.7rem',color:'var(--content-muted)'}} />
                </button>
              </div>
            </header>

            <section className="admin-toolbar admin-toolbar--compact">
              <div className="admin-toolbar__filters admin-toolbar__filters--compact">
                <label className="admin-toolbar__search">
                  <span>Search</span>
                  <div className="admin-search-field">
                    <span className="admin-search-field__icon" aria-hidden="true">⌕</span>
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      type="search"
                      placeholder="Search name, email, role, or content"
                      aria-label="Search dashboard records"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        className="admin-search-field__clear"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>
                </label>

                <label>
                  <span>Period</span>
                  <select value={dashboardRange} onChange={(event) => setDashboardRange(event.target.value)}>
                    <option>This Month</option>
                    <option>This Week</option>
                    <option>Today</option>
                  </select>
                </label>
              </div>
              <div className="admin-toolbar__meta">
                <p className="admin-toolbar__hint">
                  {searchQuery
                    ? `${filteredApplications.length} applications, ${filteredContacts.length} contacts, ${filteredPages.length} pages matched “${searchQuery.trim()}”.`
                    : 'Search across applications, contacts, and content to narrow the overview.'}
                </p>
              </div>
            </section>

            {dataStatus.message ? <p className={`admin-status admin-status--${dataStatus.type}`}>{dataStatus.message}</p> : null}

            <section className="admin-stats admin-stats--cards">
              {dashboardSummary.map((item) => {
                const sparkColor  = item.tone === 'blue'   ? '#6366f1'
                                  : item.tone === 'purple' ? '#a855f7'
                                  : item.tone === 'green'  ? '#22c55e'
                                  :                          '#f97316';
                return (
                  <article key={item.label} className={`admin-stat-card admin-stat-card--${item.tone}`}>
                    <div className={`admin-stat-card__icon admin-stat-card__icon--${item.tone}`}>
                      {item.icon}
                    </div>
                    <div className="admin-stat-card__body">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      <p style={{ color: item.positive ? '#22c55e' : '#ef4444' }}>
                        {item.positive ? '↑' : '↓'} {item.change}
                      </p>
                    </div>
                    <svg className="admin-stat-sparkline" viewBox="0 0 80 32" preserveAspectRatio="none">
                      <polyline
                        points={item.sparkPoints}
                        fill="none"
                        stroke={sparkColor}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </article>
                );
              })}
            </section>
          </>
        ) : null}

        {activeTab === 'overview' ? (
          <div className="admin-overview-grid">
            {!hasSearchResults ? (
              <section className="admin-panel admin-panel--empty-state">
                <div className="admin-panel__header">
                  <h3>No results found</h3>
                </div>
                <p className="admin-copy">
                  No applications, contacts, or pages matched “{searchQuery.trim()}”. Try a different name, email, or page title.
                </p>
              </section>
            ) : null}

            <section className="admin-panel admin-panel--chart">
              <div className="admin-panel__header">
                <h3>Applications Overview</h3>
                <button type="button" className="admin-badge admin-badge--muted">{dashboardRange}</button>
              </div>
              {(() => {
                /* ── build chart data from real applications filtered by dashboardRange ── */
                const now = new Date();

                /* how many buckets + their labels */
                let buckets;
                if (dashboardRange === 'Today') {
                  buckets = Array.from({ length: 24 }, (_, h) => ({
                    label: h % 4 === 0 ? `${h}:00` : '',
                    key: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${h}`,
                    count: 0,
                  }));
                  applications.forEach(a => {
                    const d = new Date(a.createdAt);
                    if (d.toDateString() === now.toDateString()) {
                      buckets[d.getHours()].count++;
                    }
                  });
                } else if (dashboardRange === 'This Week') {
                  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                  buckets = Array.from({ length: 7 }, (_, i) => {
                    const d = new Date(now);
                    d.setDate(now.getDate() - now.getDay() + i);
                    return { label: dayNames[i], key: d.toDateString(), count: 0 };
                  });
                  applications.forEach(a => {
                    const d = new Date(a.createdAt);
                    const key = d.toDateString();
                    const b = buckets.find(b => b.key === key);
                    if (b) b.count++;
                  });
                } else {
                  /* This Month — one bucket per day */
                  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  buckets = Array.from({ length: daysInMonth }, (_, i) => ({
                    label: (i + 1) % 5 === 1 ? `${monthNames[now.getMonth()]} ${i + 1}` : '',
                    key: `${now.getFullYear()}-${now.getMonth()}-${i + 1}`,
                    count: 0,
                  }));
                  applications.forEach(a => {
                    const d = new Date(a.createdAt);
                    if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
                      buckets[d.getDate() - 1].count++;
                    }
                  });
                }

                const maxVal = Math.max(...buckets.map(b => b.count), 1);
                const W = 640, H = 240, PAD = 20;
                const xStep = (W - PAD * 2) / (buckets.length - 1 || 1);

                /* SVG points */
                const pts = buckets.map((b, i) => {
                  const x = PAD + i * xStep;
                  const y = H - PAD - ((b.count / maxVal) * (H - PAD * 2));
                  return [x, y];
                });

                const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
                const areaPath = `${linePath} L${pts[pts.length-1][0].toFixed(1)},${H} L${pts[0][0].toFixed(1)},${H} Z`;

                const totalThisPeriod = buckets.reduce((s, b) => s + b.count, 0);
                const yLabels = [maxVal, Math.round(maxVal*0.75), Math.round(maxVal*0.5), Math.round(maxVal*0.25), 0];

                /* visible x-axis labels */
                const xLabels = buckets.filter(b => b.label);

                return (
                  <div className="admin-chart">
                    <div className="admin-chart__axes">
                      {yLabels.map(v => <span key={v}>{v}</span>)}
                    </div>
                    <div>
                      <div className="admin-chart__plot" aria-hidden="true">
                        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Applications trend chart">
                          <defs>
                            <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                              <stop offset="0%" stopColor="#7c5cfc" />
                              <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="rgba(124,92,252,0.18)" />
                              <stop offset="100%" stopColor="rgba(124,92,252,0.01)" />
                            </linearGradient>
                          </defs>
                          <path d={areaPath} fill="url(#areaGradient)" />
                          <path d={linePath} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          {pts.map(([x, y], i) => (
                            buckets[i].count > 0 && (
                              <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="4" fill="#7c5cfc" stroke="#fff" strokeWidth="2" />
                            )
                          ))}
                          {totalThisPeriod === 0 && (
                            <text x={W/2} y={H/2} textAnchor="middle" fontSize="13" fill="#8898aa">No applications {dashboardRange.toLowerCase()}</text>
                          )}
                          {totalThisPeriod > 0 && (
                            <text x={W/2} y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1f36">{totalThisPeriod} total</text>
                          )}
                        </svg>
                      </div>
                      <div className="admin-chart__labels" style={{ justifyContent: 'space-between' }}>
                        {xLabels.map((b, i) => (
                          <span key={i} style={{ fontSize: '0.7rem' }}>{b.label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>

            <section className="admin-panel admin-panel--list">
              <div className="admin-panel__header">
                <h3>Recent Applications</h3>
                <button type="button" className="admin-badge admin-badge--muted">View all</button>
              </div>
              <div className="admin-list">
                {visibleRecentApplications.length > 0 ? visibleRecentApplications.map((application) => (
                  <article key={application._id} className="admin-person-row">
                    <div className="admin-person-row__avatar">{(application.firstName || 'A').charAt(0)}</div>
                    <div className="admin-person-row__body">
                      <strong>{application.firstName} {application.lastName}</strong>
                      <span>{application.email}</span>
                    </div>
                    <div className="admin-person-row__meta">
                      <span className="admin-person-row__role">{application.role}</span>
                      <span className={`admin-badge admin-badge--${application.status === 'rejected' ? 'danger' : 'submitted-green'}`}>
                        {application.status || 'Submitted'}
                      </span>
                    </div>
                  </article>
                )) : (
                  <p className="admin-copy">No matching applications.</p>
                )}
              </div>
            </section>

            <section className="admin-panel admin-panel--donut">
              <div className="admin-panel__header">
                <h3>Applications by Status</h3>
                <span>{filteredApplications.length}</span>
              </div>
              <div className="admin-donut-layout">
                <div className="admin-donut" aria-hidden="true">
                  <div className="admin-donut__core" />
                </div>
                <div className="admin-donut-legend">
                  {applicationBreakdown.map((item) => (
                    <div key={item.label} className="admin-donut-legend__item">
                      <span className="admin-donut-legend__swatch" style={{ background: item.color }} />
                      <strong>{item.label}</strong>
                      <span>{item.value} ({item.percent.toFixed(1)}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="admin-panel admin-panel--actions">
              <div className="admin-panel__header">
                <h3>⚡ Quick Actions</h3>
              </div>
              <div className="admin-actions-grid admin-actions-grid--5">
                <button type="button" className="admin-action-card" onClick={() => setActiveTab('applications')}>
                  <span className="admin-action-card__icon admin-action-card__icon--blue"><i className="bi bi-plus-circle-fill" /></span>
                  <div className="admin-action-card__text">
                    <strong>Add New Application</strong>
                    <small>Create a new application</small>
                  </div>
                  <i className="bi bi-chevron-right admin-action-card__arrow" />
                </button>
                <button type="button" className="admin-action-card" onClick={() => setActiveTab('contacts')}>
                  <span className="admin-action-card__icon admin-action-card__icon--purple"><i className="bi bi-people-fill" /></span>
                  <div className="admin-action-card__text">
                    <strong>Manage Contacts</strong>
                    <small>View and manage contacts</small>
                  </div>
                  <i className="bi bi-chevron-right admin-action-card__arrow" />
                </button>
                <button type="button" className="admin-action-card" onClick={() => setActiveTab('pages')}>
                  <span className="admin-action-card__icon admin-action-card__icon--green"><i className="bi bi-file-earmark-text-fill" /></span>
                  <div className="admin-action-card__text">
                    <strong>Manage Pages</strong>
                    <small>Edit and organize pages</small>
                  </div>
                  <i className="bi bi-chevron-right admin-action-card__arrow" />
                </button>
                <button type="button" className="admin-action-card" onClick={() => setActiveTab('positions')}>
                  <span className="admin-action-card__icon admin-action-card__icon--orange"><i className="bi bi-briefcase-fill" /></span>
                  <div className="admin-action-card__text">
                    <strong>Manage Positions</strong>
                    <small>Update job positions</small>
                  </div>
                  <i className="bi bi-chevron-right admin-action-card__arrow" />
                </button>
                <button type="button" className="admin-action-card" onClick={() => setActiveTab('overview')}>
                  <span className="admin-action-card__icon admin-action-card__icon--red"><i className="bi bi-graph-up-arrow" /></span>
                  <div className="admin-action-card__text">
                    <strong>View Reports</strong>
                    <small>Analytics and reports</small>
                  </div>
                  <i className="bi bi-chevron-right admin-action-card__arrow" />
                </button>
              </div>
            </section>

            <section className="admin-panel admin-panel--activity">
              <div className="admin-panel__header">
                <h3>Platform Activity</h3>
              </div>
              <div className="admin-activity">
                {recentActivity.map((item) => (
                  <article key={item.title} className={`admin-activity__item admin-activity__item--${item.tone}`}>
                    <div className="admin-activity__dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="admin-panel admin-panel--table">
              <div className="admin-panel__header">
                <h3>Recent Contacts</h3>
                <button type="button" className="admin-badge admin-badge--muted">View all</button>
              </div>
              <div className="admin-list">
                {visibleRecentContacts.length > 0 ? visibleRecentContacts.map((contact) => (
                  <article key={contact._id} className="admin-person-row">
                    <div className="admin-person-row__avatar admin-person-row__avatar--purple">{(contact.fullName || 'C').charAt(0)}</div>
                    <div className="admin-person-row__body">
                      <strong>{contact.fullName}</strong>
                      <span>{contact.email}</span>
                    </div>
                    <div className="admin-person-row__meta">
                      <span className="admin-person-row__role">{contact.message}</span>
                    </div>
                  </article>
                )) : (
                  <p className="admin-copy">No matching contacts.</p>
                )}
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === 'applications' ? (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <h3>Applications</h3>
              <span>{filteredApplications.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Resume</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application._id}>
                      <td data-label="Applicant">
                        <strong>{application.firstName} {application.lastName}</strong>
                        <span>{application.enrollmentNumber || application.uniqueId || 'No ID'}</span>
                      </td>
                      <td data-label="Contact">
                        <strong>{application.email}</strong>
                        <span>{application.phone}</span>
                      </td>
                      <td data-label="Role">
                        <strong>{application.role}</strong>
                        {application.positionId?.category && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>
                            {application.positionId.category}
                          </span>
                        )}
                      </td>
                      <td data-label="Resume">
                        {application.resumeFileUrl ? (
                          <a
                            className="admin-download-link"
                            href={`${API_BASE_URL}${application.resumeFileUrl}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download resume
                          </a>
                        ) : (
                          <span className="admin-empty">No file</span>
                        )}
                      </td>
                      <td data-label="Status">
                        <select value={application.status || 'submitted'} onChange={(event) => updateApplicationStatus(application._id, event.target.value)}>
                          <option value="submitted">submitted</option>
                          <option value="reviewing">reviewing</option>
                          <option value="shortlisted">shortlisted</option>
                          <option value="rejected">rejected</option>
                          <option value="hired">hired</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {activeTab === 'contacts' ? (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <h3>Contact Messages</h3>
              <span>{filteredContacts.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td data-label="Name">{contact.fullName}</td>
                      <td data-label="Email">{contact.email}</td>
                      <td data-label="Phone">{contact.phone || 'No phone provided'}</td>
                      <td data-label="Message">{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {activeTab === 'pages' ? (
          <section className="admin-pages-layout">
            <form className="admin-panel admin-form" onSubmit={submitPage}>
              <div className="admin-panel__header">
                <h3>{pageForm.id ? 'Edit Page' : 'Create Page'}</h3>
                <span>{pageForm.id ? 'editing' : 'new'}</span>
              </div>

              <label>
                Slug
                <input name="slug" value={pageForm.slug} onChange={handlePageFormChange} placeholder="home" />
              </label>
              <label>
                Title
                <input name="title" value={pageForm.title} onChange={handlePageFormChange} placeholder="Home Page" />
              </label>
              <label>
                Hero Title
                <input name="heroTitle" value={pageForm.heroTitle} onChange={handlePageFormChange} placeholder="Engineering digital products" />
              </label>
              <label>
                Meta Description
                <input name="metaDescription" value={pageForm.metaDescription} onChange={handlePageFormChange} placeholder="Page meta description" />
              </label>
              <label>
                Body
                <textarea name="body" value={pageForm.body} onChange={handlePageFormChange} rows="7" placeholder="Page content"></textarea>
              </label>
              <label className="admin-checkbox">
                <input name="isPublished" type="checkbox" checked={pageForm.isPublished} onChange={handlePageFormChange} />
                Published
              </label>

              <div className="admin-form__actions">
                <button type="submit" className="admin-button admin-button--primary">
                  {pageForm.id ? 'Update page' : 'Create page'}
                </button>
                {pageForm.id ? (
                  <button type="button" className="admin-button admin-button--ghost" onClick={resetPageForm}>
                    Cancel edit
                  </button>
                ) : null}
              </div>

              {pageStatus.message ? <p className={`admin-status admin-status--${pageStatus.type}`}>{pageStatus.message}</p> : null}
            </form>

            <section className="admin-panel">
              <div className="admin-panel__header">
                <h3>Pages</h3>
                <span>{filteredPages.length}</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table admin-table--pages">
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Slug</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPages.map((page) => (
                      <tr key={page._id}>
                        <td data-label="Page">
                          <strong>{page.title}</strong>
                          <span>{page.heroTitle || 'No hero title yet'}</span>
                        </td>
                        <td data-label="Slug">/{page.slug}</td>
                        <td data-label="Published">
                          <span className={`admin-badge ${page.isPublished ? 'admin-badge--success' : 'admin-badge--muted'}`}>
                            {page.isPublished ? 'Published' : 'Hidden'}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className="admin-item__actions">
                            <button type="button" className="admin-button admin-button--ghost" onClick={() => editPage(page)}>
                              Edit
                            </button>
                            <button type="button" className="admin-button admin-button--danger" onClick={() => deletePage(page._id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        ) : null}
        {activeTab === 'positions' ? (
          <section className="admin-pages-layout">
            {/* ── Create / Edit form ── */}
            <form onSubmit={submitPosition} style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--content-text)' }}>{positionForm.id ? 'Edit Position' : 'Add Position'}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)' }}>{positionForm.id ? 'editing' : 'new'}</span>
              </div>

              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Title *</span>
                <input name="title" value={positionForm.title} onChange={handlePositionFormChange} placeholder="Web Development – Intern" required
                  style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              </div>

              {/* Type + Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Type</span>
                  <select name="type" value={positionForm.type} onChange={handlePositionFormChange}
                    style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%' }}>
                    <option value="Intern">Intern</option>
                    <option value="Full-time">Full-time</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Category *</span>
                  <input name="category" value={positionForm.category} onChange={handlePositionFormChange} placeholder="Development" required
                    style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Description</span>
                <textarea name="desc" value={positionForm.desc} onChange={handlePositionFormChange} rows={3} placeholder="Role description…"
                  style={{ padding: '8px 11px', fontSize: '0.88rem', minHeight: '72px', resize: 'vertical', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              </div>

              {/* Experience + Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Experience</span>
                  <input name="exp" value={positionForm.exp} onChange={handlePositionFormChange} placeholder="Fresher / 0–1 yr"
                    style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Location</span>
                  <input name="location" value={positionForm.location} onChange={handlePositionFormChange} placeholder="Ahmedabad (On-site)"
                    style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Skills <small style={{ color: '#94a3b8', fontWeight: 400 }}>(comma-separated)</small></span>
                <input name="skills" value={positionForm.skills} onChange={handlePositionFormChange} placeholder="React, Node.js, Git"
                  style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              </div>

              {/* Responsibilities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--content-muted)', fontWeight: 600 }}>Responsibilities <small style={{ color: '#94a3b8', fontWeight: 400 }}>(comma-separated)</small></span>
                <input name="responsibilities" value={positionForm.responsibilities} onChange={handlePositionFormChange} placeholder="Build features, Code reviews"
                  style={{ padding: '8px 11px', fontSize: '0.88rem', height: '36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f6fa', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              </div>

              {/* Active checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--content-muted)', cursor: 'pointer' }}>
                <input name="isActive" type="checkbox" checked={positionForm.isActive} onChange={handlePositionFormChange} />
                Active (visible on careers page)
              </label>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '2px' }}>
                <button type="submit" className="admin-button admin-button--primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  {positionForm.id ? 'Update position' : 'Create position'}
                </button>
                {positionForm.id && (
                  <button type="button" className="admin-button admin-button--ghost" onClick={resetPositionForm} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                    Cancel edit
                  </button>
                )}
              </div>

              {positionStatus.message && (
                <p className={`admin-status admin-status--${positionStatus.type}`}>{positionStatus.message}</p>
              )}
            </form>

            {/* ── Positions list ── */}
            <section className="admin-panel">
              <div className="admin-panel__header">
                <h3>All Positions</h3>
                <span>{positions.length}</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table admin-table--pages">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map(pos => (
                      <tr key={pos._id}>
                        <td data-label="Title"><strong>{pos.title}</strong><span>{pos.exp}</span></td>
                        <td data-label="Type">{pos.type}</td>
                        <td data-label="Category">{pos.category}</td>
                        <td data-label="Status">
                          <span className={`admin-badge ${pos.isActive ? 'admin-badge--success' : 'admin-badge--muted'}`}>
                            {pos.isActive ? 'Active' : 'Hidden'}
                          </span>
                        </td>
                        <td data-label="Actions">
                          <div className="admin-item__actions">
                            <button type="button" className="admin-button admin-button--ghost" onClick={() => editPosition(pos)}>Edit</button>
                            <button type="button" className="admin-button admin-button--danger" onClick={() => deletePosition(pos._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        ) : null}

        {activeTab === 'portfolio-leads' ? (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <h3>Portfolio Leads</h3>
              <span className="admin-badge admin-badge--muted">{portfolioLeads.length} total</span>
            </div>
            {portfolioLeads.length === 0 ? (
              <p className="admin-copy">No leads yet. They appear here when visitors request a live preview.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioLeads.map((lead, idx) => (
                      <tr key={lead._id}>
                        <td>{idx + 1}</td>
                        <td><strong>{lead.projectTitle}</strong></td>
                        <td>{lead.email || '—'}</td>
                        <td>{lead.phone || '—'}</td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={async (e) => {
                              await apiRequest(`/api/portfolio-leads/admin/${lead._id}/status`, {
                                method: 'PATCH',
                                headers: authHeaders,
                                body: JSON.stringify({ status: e.target.value }),
                              });
                              await loadDashboard();
                            }}
                            className={`admin-status-select admin-status-select--${lead.status}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            type="button"
                            className="admin-button admin-button--danger-sm"
                            onClick={async () => {
                              if (!window.confirm('Delete this lead?')) return;
                              await apiRequest(`/api/portfolio-leads/admin/${lead._id}`, {
                                method: 'DELETE',
                                headers: authHeaders,
                              });
                              await loadDashboard();
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : null}

        {activeTab === 'profile' ? (
          <ProfileTab authUser={authUser} authHeaders={authHeaders} handleLogout={handleLogout} />
        ) : null}

        {activeTab === 'settings' ? (
          <SettingsTab authUser={authUser} authHeaders={authHeaders} />
        ) : null}

      </section>
    </main>
    </>
  );
}
