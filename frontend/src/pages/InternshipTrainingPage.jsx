import React from 'react';
import { Link } from 'react-router-dom';
import internshipTeamImage from '../Images/game-dev-user.jpg.jpg';
import './InternshipTrainingPage.css';

function FeatureItem({ children }) {
  return (
    <div className="it-feature-item">
      <i className="bi bi-check-circle-fill" />
      <span>{children}</span>
    </div>
  );
}

export default function InternshipTrainingPage() {
  return (
    <div className="it-page">
      {/* ══ HERO ══ */}
      <section className="it-hero">
        {/* White-theme decorations */}
        <div className="it-hero__orb it-hero__orb--1" aria-hidden="true" />
        <div className="it-hero__orb it-hero__orb--2" aria-hidden="true" />
        <div className="it-hero__beam" aria-hidden="true" />

        {/* Rising particles */}
        <div className="it-hero__particles" aria-hidden="true">
          {[...Array(6)].map((_,i) => <div key={i} className="it-hero__particle" />)}
        </div>

        {/* ── Left: Copy ── */}
        <div className="it-hero__copy">
          <div className="it-hero__eyebrow">
            <div className="it-hero__badge-dot" />
            Internship / Training Program
          </div>

          <h1 className="it-hero__title">
            Internship &amp;<br />
            <span className="it-hero__title-accent">Training</span>
          </h1>

          <p className="it-hero__sub">
            Hands-on IT training and internships to kickstart your career in technology. Learn through live projects,
            guided mentorship, and industry-ready implementation.
          </p>

          <div className="it-hero__chips" aria-label="Program highlights">
            <span>Live Projects</span>
            <span>Expert Mentors</span>
            <span>Certification</span>
            <span>Career Support</span>
          </div>

          <div className="it-hero__stats-row">
            <div className="it-hero__stat-card">
              <strong>3-6 Months</strong>
              <span>Practical training</span>
            </div>
            <div className="it-hero__stat-card">
              <strong>100%</strong>
              <span>Real project exposure</span>
            </div>
            <div className="it-hero__stat-card it-hero__stat-card--accent">
              <strong>Career Focused</strong>
              <span>Industry readiness</span>
            </div>
          </div>

          <div className="it-hero__actions">
            <Link to="/apply-now" className="it-hero__primary-btn">
              Apply Now <i className="bi bi-arrow-right ms-2" />
            </Link>
            <a href="#positions" className="it-hero__secondary-btn">
              View Programs
            </a>
          </div>
        </div>

        {/* ── Right: Visual ── */}
        <div className="it-hero__visual" aria-hidden="true">
          <div className="it-hero__glow it-hero__glow--one" />
          <div className="it-hero__glow it-hero__glow--two" />

          <div className="it-hero__image-card">
            <img src={internshipTeamImage} alt="Internship and training team" />
          </div>

          <div className="it-hero__floating it-hero__floating--top">
            <span className="it-hero__floating-label">Hands-on Learning</span>
            <strong>Real projects, not just theory</strong>
          </div>
          <div className="it-hero__floating it-hero__floating--bottom">
            <span className="it-hero__floating-label">Career Outcome</span>
            <strong>Certification + support + portfolio</strong>
          </div>
        </div>
      </section>

      {/* ══ CONTENT ══ */}
      <section className="it-content py-5">
        <div style={{ maxWidth:'1180px', margin:'0 auto', padding:'0 1.5rem' }}>
          <div className="it-grid">
            <main className="it-main">
              <div className="it-intro">
                <div className="it-section-label">
                  <i className="bi bi-mortarboard" /> Our Programs
                </div>
                <p className="it-intro__text">
                  Explore our internship and training tracks below. Each program is designed with hands-on, industry-focused learning to prepare you for real IT careers.
                </p>

                <article className="it-card-large it-training-card" id="positions">
                  <div className="it-card-head">
                    <h3>Mobile Application Development</h3>
                    <p className="muted">Android • iOS • Cross-platform</p>
                  </div>
                  <div className="it-card-body two-col">
                    <ul>
                      <li>Design, develop, and deploy high-performance mobile apps.</li>
                      <li>Real-world app development and scalable architecture.</li>
                      <li>React Native and Flutter for mobile app creation.</li>
                    </ul>
                    <ul>
                      <li>App integration, secure data handling, and testing.</li>
                      <li>Mobile performance tuning and debugging.</li>
                      <li>Play Store and App Store release preparation.</li>
                    </ul>
                  </div>
                </article>

                <article className="it-card-large it-training-card">
                  <div className="it-card-head">
                    <h3>Python Training</h3>
                    <p className="muted">Python • Data • Automation</p>
                  </div>
                  <div className="it-card-body two-col">
                    <ul>
                      <li>Master Python from fundamentals to advanced development.</li>
                      <li>Data science, automation, and backend systems.</li>
                      <li>Industry-standard tooling and scripting workflows.</li>
                    </ul>
                    <ul>
                      <li>Database connectivity and ORM concepts.</li>
                      <li>Backend architecture design and real-world Python projects.</li>
                      <li>Data analysis with pandas and NumPy.</li>
                    </ul>
                  </div>
                </article>

                <article className="it-card-wide">
                  <div className="it-card-head">
                    <h3>Full-Stack Projects</h3>
                  </div>
                  <div className="it-card-body">
                    <p>
                      Work on real-world, production-level applications that strengthen your portfolio and industry
                      readiness. Build complete systems from UI design to backend logic, database management, API
                      integration, and deployment.
                    </p>
                    <div className="it-projects-grid">
                      <div>End-to-end application development</div>
                      <div>Team collaboration using Git &amp; GitHub</div>
                      <div>Cloud deployment and hosting</div>
                      <div>Professional portfolio projects</div>
                    </div>
                  </div>
                </article>
              </div>
            </main>

            <aside className="it-side">
              <div className="it-side-card">
                <div className="it-side-body">
                  <h4>Internship &amp; Training Program</h4>
                  <p>
                    At Kevalon Technology, we offer structured internship and training programs that combine theoretical
                    knowledge with practical application to build confidence, skills, and industry-ready experience.
                  </p>
                  <p>
                    We focus on skill development, real project exposure, teamwork, and problem-solving so learners are
                    ready for real IT careers, not just certificates.
                  </p>

                  <div className="it-features-grid">
                    {[
                      { icon:'✓', title:'Live Projects', sub:'Practical learning approach' },
                      { icon:'✓', title:'Expert Mentors', sub:'Industry professionals' },
                      { icon:'✓', title:'Career Support', sub:'Guidance & referrals' },
                      { icon:'✓', title:'Certification', sub:'Verified credentials' },
                    ].map(f => (
                      <div key={f.title} className="it-feature">
                        <div className="it-feature-icon">{f.icon}</div>
                        <div>
                          <strong>{f.title}</strong>
                          <p className="small">{f.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="it-side-note">
                    Trusted by students • Career-focused • Industry aligned
                  </div>

                  <div className="it-side-cta">
                    <Link to="/apply-now" className="it-apply-btn">
                      Start Your Journey
                    </Link>
                    <Link to="/contact" className="it-contact-btn">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="it-bottom-banner">
            <div className="it-bottom-banner__content">
              <div className="it-bottom-banner__copy">
                <h3>Certification &amp; Support</h3>
                <p>
                  Earn industry-recognized certifications and receive continuous career support designed to guide you
                  from learning to employment with long-term professional growth and career stability.
                </p>
              </div>

              <div className="it-bottom-banner__lists">
                <div className="it-bottom-banner__list">
                  <FeatureItem>Industry-recognized completion certificates</FeatureItem>
                  <FeatureItem>Resume building &amp; professional profiling</FeatureItem>
                  <FeatureItem>Job placement assistance</FeatureItem>
                  <FeatureItem>Continuous learning support</FeatureItem>
                </div>
                <div className="it-bottom-banner__list">
                  <FeatureItem>Interview preparation sessions</FeatureItem>
                  <FeatureItem>Community &amp; alumni network access</FeatureItem>
                  <FeatureItem>Lifetime access to resources</FeatureItem>
                  <FeatureItem>Hands-on project guidance</FeatureItem>
                </div>
              </div>

              {/* <div className="it-bottom-banner__cta">
                <Link to="/apply-now" className="it-banner-btn">
                  Start Your Journey <i className="bi bi-arrow-right ms-2" />
                </Link>
              </div> */}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
