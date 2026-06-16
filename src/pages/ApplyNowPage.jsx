import React, { useState } from "react";
import { apiRequest } from "../utils/api";

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

    if (!resumeFile) {
      setStatus({ type: "error", message: "Please upload your resume before submitting." });
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const payload = new FormData();
      payload.append("firstName",       formData.firstName);
      payload.append("lastName",        formData.lastName);
      payload.append("email",           formData.email);
      payload.append("phone",           formData.phone || "");
      payload.append("linkedInProfile", formData.linkedInProfile || "");
      payload.append("portfolioUrl",    formData.portfolioUrl || "");
      payload.append("role",            formData.role);
      payload.append("resume",          resumeFile);

      await apiRequest("/api/applications", {
        method: "POST",
        body: payload,
      });

      setStatus({ type: "success", message: "Application submitted! We'll review it and get back to you soon." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", linkedInProfile: "", portfolioUrl: "", role: "" });
      setResumeFile(null);
      setResumeFileName("");
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Something went wrong. Please try again." });
    }
  };

  const inputClass = "w-full py-[0.52rem] pr-4 pl-[2.6rem] border-[1.5px] border-[rgba(148,163,184,0.35)] rounded-[10px] bg-[#f8fafc] text-[#0f172a] text-[0.88rem] outline-none transition-all duration-200 placeholder-[#94a3b8] focus:border-teal focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(97,187,197,0.15)] box-border appearance-none font-[Inter,sans-serif]";

  const field = (id, label, name, type, placeholder, required = false, icon = "bi-pencil") => (
    <div className="flex flex-col gap-[0.45rem]">
      <label htmlFor={id} className="text-[0.82rem] font-semibold text-[#334155]">
        {label}{required && <span className="text-teal"> *</span>}
      </label>
      <div className="relative flex items-center">
        <i className={`bi ${icon} absolute left-3.5 text-[0.9rem] text-[#94a3b8] pointer-events-none z-10 transition-colors duration-200`} />
        <input
          id={id} name={name} type={type} placeholder={placeholder}
          value={formData[name]} onChange={handleChange}
          onFocus={() => setFocused(id)} onBlur={() => setFocused("")}
          required={required}
          className={inputClass}
        />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen pt-[100px] sm:pt-[120px] md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 bg-[#f8fafc] overflow-hidden font-[Inter,sans-serif]">
      {/* bg decorations */}
      <div className="absolute rounded-full pointer-events-none z-0"
        style={{ width:500, height:500, top:-150, right:-100, filter:'blur(90px)',
          background:'radial-gradient(circle, rgba(97,187,197,0.13) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute rounded-full pointer-events-none z-0"
        style={{ width:400, height:400, bottom:-100, left:-80, filter:'blur(90px)',
          background:'radial-gradient(circle, rgba(3,70,101,0.09) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage:'radial-gradient(circle, rgba(1,72,103,0.07) 1px, transparent 1px)', backgroundSize:'30px 30px' }} aria-hidden="true" />

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

          {/* ── LEFT PANEL ── */}
          <div className="relative h-full">
            <div className="h-full bg-gradient-to-br from-[#011e2e] via-[#013a52] to-[#014867] rounded-[2rem] p-[2.75rem_2.25rem] text-white overflow-hidden relative shadow-[0_30px_80px_rgba(1,72,103,0.3)] flex flex-col before:content-[''] before:absolute before:bottom-[-80px] before:left-[-80px] before:w-[260px] before:h-[260px] before:rounded-full before:bg-[radial-gradient(circle,rgba(97,187,197,0.15)_0%,transparent_70%)] before:pointer-events-none max-sm:p-[2rem_1.5rem]">

              {/* badge */}
              <div className="inline-flex items-center gap-1.5 bg-[rgba(97,187,197,0.15)] border border-[rgba(97,187,197,0.3)] text-teal text-[0.72rem] font-bold tracking-[0.1em] uppercase px-3.5 py-[5px] rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-[apPulse_2s_ease-in-out_infinite]" />
                We're Hiring
              </div>

              <h1 className="font-extrabold text-[clamp(1.8rem,2.5vw,2.4rem)] leading-[1.15] text-white m-0 mb-4">
                Join the<br />
                <span className="bg-gradient-to-r from-teal to-[#a8e6ec] bg-clip-text text-transparent">Kevalon Team</span>
              </h1>

              <p className="text-[rgba(255,255,255,0.65)] text-[0.92rem] leading-[1.8] mb-8">
                We're always looking for talented, driven individuals who want to build
                meaningful digital products. Share your profile and let's grow together.
              </p>

              {/* perks */}
              <div className="flex flex-col gap-[1.1rem] mb-8">
                {perks.map((p) => (
                  <div key={p.title} className="flex items-start gap-[0.9rem]">
                    <div className="w-10 h-10 rounded-[11px] bg-[rgba(97,187,197,0.15)] border border-[rgba(97,187,197,0.25)] flex items-center justify-center flex-shrink-0 text-[0.95rem] text-teal">
                      <i className={`bi ${p.icon}`} />
                    </div>
                    <div>
                      <p className="text-[0.88rem] font-bold text-white m-0 mb-[2px]">{p.title}</p>
                      <p className="text-[0.78rem] text-[rgba(255,255,255,0.5)] m-0 leading-[1.5]">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* open roles */}
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-6">
                <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[rgba(255,255,255,0.4)] m-0 mb-3">Open Roles</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <span key={r} className="bg-[rgba(97,187,197,0.12)] border border-[rgba(97,187,197,0.25)] text-[rgba(255,255,255,0.75)] text-[0.72rem] font-semibold px-3 py-1 rounded-full">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — FORM ── */}
          <div>
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-[rgba(97,187,197,0.18)] shadow-[0_20px_60px_rgba(1,72,103,0.08)] p-5 sm:p-8 md:p-[2.75rem_2.5rem] overflow-hidden">

              <div className="mb-8 pb-6 border-b border-[rgba(97,187,197,0.15)]">
                <h2 className="font-bold text-[1.35rem] text-[#0d2f3f] m-0 mb-1.5">Submit Your Application</h2>
                <p className="text-[#64748b] text-[0.88rem] m-0">
                  All fields marked <span className="text-teal font-bold">*</span> are required.
                </p>
              </div>

              <form className="flex flex-col gap-[1.1rem]" onSubmit={handleSubmit} noValidate>

                <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                  {field("ap-firstName", "First name", "firstName", "text", "Alex",  true, "bi-person")}
                  {field("ap-lastName",  "Last name",  "lastName",  "text", "Chen",  true, "bi-person")}
                </div>

                <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                  {field("ap-email", "Email address", "email", "email", "alex@example.com", true, "bi-envelope")}
                  {field("ap-phone", "Phone number",  "phone", "tel",   "+91 98765 43210",  false, "bi-telephone")}
                </div>

                <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                  {field("ap-linkedin",  "LinkedIn Profile", "linkedInProfile", "url", "linkedin.com/in/yourname", false, "bi-linkedin")}
                  {field("ap-portfolio", "Portfolio URL",    "portfolioUrl",    "url", "yoursite.com",             false, "bi-globe")}
                </div>

                {/* role select */}
                <div className="flex flex-col gap-[0.45rem]">
                  <label htmlFor="ap-role" className="text-[0.82rem] font-semibold text-[#334155]">
                    Applying for <span className="text-teal">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <i className="bi bi-briefcase absolute left-3.5 text-[0.9rem] text-[#94a3b8] pointer-events-none z-10" />
                    <select
                      id="ap-role" name="role" required
                      value={formData.role} onChange={handleChange}
                      onFocus={() => setFocused("ap-role")} onBlur={() => setFocused("")}
                      className={inputClass}
                    >
                      <option value="" disabled>Select a role…</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                {/* resume upload */}
                <div className="flex flex-col gap-[0.45rem]">
                  <label className="text-[0.82rem] font-semibold text-[#334155]">
                    Resume / CV <span className="text-teal">*</span>
                  </label>
                  <label
                    htmlFor="ap-resume"
                    className={`flex items-center gap-4 px-6 py-5 border-2 border-dashed rounded-[14px] cursor-pointer transition-all duration-200 ${
                      dragOver       ? 'border-teal bg-[rgba(97,187,197,0.07)]' :
                      resumeFileName ? 'border-solid border-[rgba(97,187,197,0.5)] bg-[rgba(97,187,197,0.06)]' :
                      'border-[rgba(97,187,197,0.4)] bg-[rgba(97,187,197,0.03)] hover:border-teal hover:bg-[rgba(97,187,197,0.07)] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(1,72,103,0.08)]'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-teal to-navy flex items-center justify-center flex-shrink-0 text-[1.3rem] text-white shadow-[0_6px_16px_rgba(1,72,103,0.2)]">
                      <i className={`bi ${resumeFileName ? "bi-file-earmark-check-fill" : "bi-cloud-upload"}`} />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      {resumeFileName
                        ? <><strong className="text-[0.88rem] font-semibold text-[#334155]">{resumeFileName}</strong><span className="text-[0.76rem] text-[#94a3b8]">Click to replace</span></>
                        : <><strong className="text-[0.88rem] font-semibold text-[#334155]">Drag & drop or click to upload</strong><span className="text-[0.76rem] text-[#94a3b8]">PDF, DOC, DOCX — max 10 MB</span></>
                      }
                    </div>
                  </label>
                  <input
                    id="ap-resume" type="file" accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                    className="hidden"
                  />
                </div>

                {/* status */}
                {status.message && (
                  <div className={`flex items-center gap-2.5 px-[1.1rem] py-[0.85rem] rounded-[10px] text-[0.88rem] font-medium border ${
                    status.type === 'success'
                      ? 'bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.25)] text-[#065f46]'
                      : 'bg-[rgba(239,68,68,0.07)] border-[rgba(239,68,68,0.2)] text-[#991b1b]'
                  }`}>
                    <i className={`bi ${status.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-circle-fill"}`} />
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-4 border-none rounded-xl bg-gradient-to-br from-teal to-navy text-white text-[0.95rem] font-bold cursor-pointer transition-all duration-200 shadow-[0_8px_24px_rgba(1,72,103,0.25)] mt-1 hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_14px_36px_rgba(1,72,103,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={status.type === "loading"}
                >
                  {status.type === "loading"
                    ? <><span className="inline-block w-4 h-4 border-2 border-[rgba(255,255,255,0.35)] border-t-white rounded-full animate-spin" /> Submitting…</>
                    : <>Submit Application <i className="bi bi-send-fill" /></>
                  }
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <style>{`@keyframes apPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }`}</style>
    </div>
  );
}
