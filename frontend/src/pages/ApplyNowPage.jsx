import React, { useState } from "react";
import "./ApplyNowPage.css";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Mobile App Developer",
  "Digital Marketing Executive",
];

const perks = [
  { icon: "bi-lightning-charge-fill", title: "Fast Growth",      desc: "Accelerate your career with real projects and mentorship." },
  { icon: "bi-people-fill",           title: "Great Team",       desc: "Work alongside passionate, talented professionals." },
  { icon: "bi-laptop",                title: "Remote Friendly",  desc: "Flexible work arrangements that suit your lifestyle." },
  { icon: "bi-graph-up-arrow",        title: "Learning Culture", desc: "Continuous learning, workshops, and skill development." },
];

export default function ApplyNowPage() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    linkedInProfile: "", portfolioUrl: "", role: "",
  });
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeFile, setResumeFile]         = useState(null);
  const [status, setStatus]                 = useState({ type: "idle", message: "" });
  const [focused, setFocused]               = useState("");
  const [dragOver, setDragOver]             = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });
    setStatus({ type: "success", message: "Application captured in static mode. We\'ll review and get back to you soon." });
    setFormData({ firstName: "", lastName: "", email: "", phone: "", linkedInProfile: "", portfolioUrl: "", role: "" });
    setResumeFile(null);
    setResumeFileName("");
    e.target.reset();
  };

  const field = (id, label, name, type, placeholder, required = false, icon = "bi-pencil") => (
    <div className={`ap-field ${focused === id || formData[name] ? "ap-field--active" : ""}`}>
      <label htmlFor={id}>{label}{required && <span> *</span>}</label>
      <div className="ap-field__wrap">
        <i className={`bi ${icon}`} />
        <input
          id={id} name={name} type={type} placeholder={placeholder}
          value={formData[name]} onChange={handleChange}
          onFocus={() => setFocused(id)} onBlur={() => setFocused("")}
          required={required}
        />
      </div>
    </div>
  );

  return (
    <div className="ap-page">
      {/* bg decoration */}
      <div className="ap-bg-orb ap-bg-orb--1" aria-hidden="true" />
      <div className="ap-bg-orb ap-bg-orb--2" aria-hidden="true" />
      <div className="ap-bg-dots"             aria-hidden="true" />

      <div className="ap-container">
        <div className="ap-grid">

          {/* ── LEFT PANEL ── */}
          <div className="ap-left">
            <div className="ap-left__inner">
              {/* badge */}
              <div className="ap-badge">
                <span className="ap-badge__dot" />
                We're Hiring
              </div>

              <h1 className="ap-left__title">
                Join the<br />
                <span>Kevalon Team</span>
              </h1>

              <p className="ap-left__body">
                We're always looking for talented, driven individuals who want to build
                meaningful digital products. Share your profile and let's grow together.
              </p>

              {/* perks */}
              <div className="ap-perks">
                {perks.map((p) => (
                  <div key={p.title} className="ap-perk">
                    <div className="ap-perk__icon">
                      <i className={`bi ${p.icon}`} />
                    </div>
                    <div>
                      <p className="ap-perk__title">{p.title}</p>
                      <p className="ap-perk__desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* open roles strip */}
              <div className="ap-roles-strip">
                <p className="ap-roles-strip__label">Open Roles</p>
                <div className="ap-roles-strip__tags">
                  {roles.map((r) => (
                    <span key={r}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — FORM ── */}
          <div className="ap-right">
            <div className="ap-form-card">
              <div className="ap-form-card__head">
                <h2>Submit Your Application</h2>
                <p>All fields marked <span>*</span> are required.</p>
              </div>

              <form className="ap-form" onSubmit={handleSubmit} noValidate>
                {/* name row */}
                <div className="ap-form__row">
                  {field("ap-firstName", "First name", "firstName", "text", "Alex",  true, "bi-person")}
                  {field("ap-lastName",  "Last name",  "lastName",  "text", "Chen",  true, "bi-person")}
                </div>

                {/* email + phone */}
                <div className="ap-form__row">
                  {field("ap-email", "Email address", "email", "email", "alex@example.com", true, "bi-envelope")}
                  {field("ap-phone", "Phone number",  "phone", "tel",   "+91 98765 43210",  false, "bi-telephone")}
                </div>

                {/* linkedin + portfolio */}
                <div className="ap-form__row">
                  {field("ap-linkedin",  "LinkedIn Profile", "linkedInProfile", "url", "linkedin.com/in/yourname", false, "bi-linkedin")}
                  {field("ap-portfolio", "Portfolio URL",    "portfolioUrl",    "url", "yoursite.com",             false, "bi-globe")}
                </div>

                {/* role */}
                <div className={`ap-field ${focused === "ap-role" || formData.role ? "ap-field--active" : ""}`}>
                  <label htmlFor="ap-role">Applying for <span>*</span></label>
                  <div className="ap-field__wrap">
                    <i className="bi bi-briefcase" />
                    <select
                      id="ap-role" name="role" required
                      value={formData.role} onChange={handleChange}
                      onFocus={() => setFocused("ap-role")} onBlur={() => setFocused("")}
                    >
                      <option value="" disabled>Select a role…</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                {/* resume upload */}
                <div className="ap-field">
                  <label>Resume / CV <span>*</span></label>
                  <label
                    htmlFor="ap-resume"
                    className={`ap-upload ${dragOver ? "ap-upload--drag" : ""} ${resumeFileName ? "ap-upload--filled" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <div className="ap-upload__icon">
                      <i className={`bi ${resumeFileName ? "bi-file-earmark-check-fill" : "bi-cloud-upload"}`} />
                    </div>
                    <div className="ap-upload__text">
                      {resumeFileName
                        ? <><strong>{resumeFileName}</strong><span>Click to replace</span></>
                        : <><strong>Drag & drop or click to upload</strong><span>PDF, DOC, DOCX — max 10 MB</span></>
                      }
                    </div>
                  </label>
                  <input
                    id="ap-resume" type="file" accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {/* status */}
                {status.message && (
                  <div className={`ap-status ap-status--${status.type}`}>
                    <i className={`bi ${status.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-circle-fill"}`} />
                    {status.message}
                  </div>
                )}

                <button type="submit" className="ap-submit" disabled={status.type === "loading"}>
                  {status.type === "loading"
                    ? <><span className="ap-spinner" /> Submitting…</>
                    : <>Submit Application <i className="bi bi-send-fill" /></>
                  }
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
