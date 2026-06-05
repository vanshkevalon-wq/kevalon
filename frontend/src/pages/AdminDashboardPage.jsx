import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiRequest, API_BASE_URL } from '../utils/api';
import './AdminDashboardPage.css';

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
    return [
      {
        label: 'Applications',
        value: stats.applications,
        change: '+ 12.5% from last month',
        tone: 'blue',
        icon: '▦',
      },
      {
        label: 'Contacts',
        value: stats.contacts,
        change: '+ 18.2% from last month',
        tone: 'purple',
        icon: '◌',
      },
      {
        label: 'Pages',
        value: stats.pages,
        change: '+ 9.1% from last month',
        tone: 'green',
        icon: '▣',
      },
      {
        label: 'Positions',
        value: positions.length,
        change: '+ 5.3% from last month',
        tone: 'orange',
        icon: '▤',
      },
    ];
  }, [applications, positions.length, stats.applications, stats.contacts, stats.pages]);

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
    <main className="admin-shell admin-shell--dashboard">
      <div
        className={`admin-sidebar-backdrop ${isSidebarOpen ? 'is-open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Pyj6mPiWW/p4s798c4_expires_30_days.png"
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
                  <span className="admin-bell-dot" />
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
                          <div key={app._id || i} className="notif-item notif-item--blue">
                            <div className="notif-item__icon"><i className="bi bi-person-fill-add" /></div>
                            <div className="notif-item__body">
                              <p className="notif-item__title">New application from <strong>{app.firstName} {app.lastName}</strong></p>
                              <span className="notif-item__meta">{app.role} · {new Date(app.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                        {contacts.slice(0, 2).map((c, i) => (
                          <div key={c._id || i} className="notif-item notif-item--purple">
                            <div className="notif-item__icon"><i className="bi bi-envelope-fill" /></div>
                            <div className="notif-item__body">
                              <p className="notif-item__title">New message from <strong>{c.fullName || c.email}</strong></p>
                              <span className="notif-item__meta">Contact · {new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                        {portfolioLeads.slice(0, 2).map((l, i) => (
                          <div key={l._id || i} className="notif-item notif-item--green">
                            <div className="notif-item__icon"><i className="bi bi-eye-fill" /></div>
                            <div className="notif-item__body">
                              <p className="notif-item__title">Preview request for <strong>{l.projectTitle}</strong></p>
                              <span className="notif-item__meta">{l.email || l.phone} · {new Date(l.createdAt).toLocaleDateString()}</span>
                            </div>
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
                        <button className="notif-panel__mark-read" onClick={() => setNotifOpen(false)}>
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
                const sparkPoints = item.tone === 'blue'   ? '0,28 15,22 30,25 45,15 60,18 80,8'
                                  : item.tone === 'purple' ? '0,26 15,20 30,24 45,12 60,16 80,6'
                                  : item.tone === 'green'  ? '0,24 15,18 30,22 45,10 60,14 80,4'
                                  :                          '0,22 15,16 30,20 45,8 60,12 80,2';
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
                      <p>↑ {item.change}</p>
                    </div>
                    <svg className="admin-stat-sparkline" viewBox="0 0 80 32" preserveAspectRatio="none">
                      <polyline
                        points={sparkPoints}
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
              <div className="admin-chart">
                <div className="admin-chart__axes">
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                  <span>0</span>
                </div>
                <div className="admin-chart__plot" aria-hidden="true">
                  <svg viewBox="0 0 640 240" preserveAspectRatio="none" role="img" aria-label="Applications trend chart">
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
                    <path d="M0 190 C30 170, 45 150, 70 160 S120 200, 145 170 S185 120, 220 130 S270 170, 310 145 S360 120, 395 138 S450 160, 495 118 S560 92, 640 70 L640 240 L0 240 Z" fill="url(#areaGradient)" />
                    <path d="M0 190 C30 170, 45 150, 70 160 S120 200, 145 170 S185 120, 220 130 S270 170, 310 145 S360 120, 395 138 S450 160, 495 118 S560 92, 640 70" fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" />
                    {[[0,190],[70,160],[145,170],[220,130],[310,145],[395,138],[495,118],[560,92],[640,70]].map(([x,y],i) => (
                      <circle key={i} cx={x} cy={y} r="4" fill="#7c5cfc" stroke="#fff" strokeWidth="2" />
                    ))}
                    <text x="310" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1f36">28</text>
                  </svg>
                </div>
                <div className="admin-chart__labels">
                  <span>May</span><span>May</span><span>May</span><span>May</span><span>May</span>
                  <span>June</span><span>June</span><span>June</span><span>June</span><span>June</span>
                </div>
              </div>
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
            <form className="admin-panel admin-form" onSubmit={submitPosition}>
              <div className="admin-panel__header">
                <h3>{positionForm.id ? 'Edit Position' : 'Add Position'}</h3>
                <span>{positionForm.id ? 'editing' : 'new'}</span>
              </div>

              <label>Title *<input name="title" value={positionForm.title} onChange={handlePositionFormChange} placeholder="Web Development – Intern" required /></label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label>Type
                  <select name="type" value={positionForm.type} onChange={handlePositionFormChange}>
                    <option value="Intern">Intern</option>
                    <option value="Full-time">Full-time</option>
                  </select>
                </label>
                <label>Category *<input name="category" value={positionForm.category} onChange={handlePositionFormChange} placeholder="Development" required /></label>
              </div>

              <label>Description<textarea name="desc" value={positionForm.desc} onChange={handlePositionFormChange} rows="3" placeholder="Role description…" /></label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label>Experience<input name="exp" value={positionForm.exp} onChange={handlePositionFormChange} placeholder="Fresher / 0–1 yr" /></label>
                <label>Location<input name="location" value={positionForm.location} onChange={handlePositionFormChange} placeholder="Ahmedabad (On-site)" /></label>
              </div>

              <label>Skills <small style={{ color: '#94a3b8' }}>(comma-separated)</small>
                <input name="skills" value={positionForm.skills} onChange={handlePositionFormChange} placeholder="React, Node.js, Git" />
              </label>

              <label>Responsibilities <small style={{ color: '#94a3b8' }}>(comma-separated)</small>
                <input name="responsibilities" value={positionForm.responsibilities} onChange={handlePositionFormChange} placeholder="Build features, Code reviews" />
              </label>

              <label className="admin-checkbox">
                <input name="isActive" type="checkbox" checked={positionForm.isActive} onChange={handlePositionFormChange} />
                Active (visible on careers page)
              </label>

              <div className="admin-form__actions">
                <button type="submit" className="admin-button admin-button--primary">
                  {positionForm.id ? 'Update position' : 'Create position'}
                </button>
                {positionForm.id && (
                  <button type="button" className="admin-button admin-button--ghost" onClick={resetPositionForm}>Cancel edit</button>
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
          <section className="admin-profile-grid-layout">
            <div className="admin-panel__header" style={{ gridColumn: '1 / -1' }}>
              <h3>Logged-in Admin Profile</h3>
            </div>
            <article className="admin-panel admin-profile-summary">
              <div className="admin-profile-summary__avatar" style={{
                width: '64px', height: '64px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #42c2ff, #7d57ff)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px'
              }}>
                {(authUser?.email || 'A').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="admin-kicker">Authenticated account</p>
                <h2>{authUser?.email || 'admin@example.com'}</h2>
                <p className="admin-copy">Role: {authUser?.role || 'admin'}</p>
              </div>
            </article>

            <article className="admin-panel admin-profile-details" style={{ marginTop: '16px' }}>
              <div className="admin-panel__header">
                <h3>Account Details</h3>
                <span>Live session</span>
              </div>

              <div className="admin-profile-details__grid" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginTop: '16px' }}>
                <div>
                  <span style={{ display: 'block', color: 'var(--admin-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Email</span>
                  <strong style={{ display: 'block', marginTop: '8px' }}>{authUser?.email || 'admin@example.com'}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--admin-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Role</span>
                  <strong style={{ display: 'block', marginTop: '8px' }}>{authUser?.role || 'admin'}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--admin-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Account ID</span>
                  <strong style={{ display: 'block', marginTop: '8px' }}>{authUser?.accountId || authUser?.id || authUser?._id || 'Not available'}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--admin-muted)', fontSize: '0.82rem', textTransform: 'uppercase' }}>Session</span>
                  <strong style={{ display: 'block', marginTop: '8px' }}>Active</strong>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        {activeTab === 'settings' ? (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <h3>Settings</h3>
            </div>
            <p className="admin-copy">Platform settings and configuration will appear here.</p>
          </section>
        ) : null}

      </section>
    </main>
  );
}
