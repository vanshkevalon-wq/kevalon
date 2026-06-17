const nodemailer = require('nodemailer');

/**
 * Create a reusable transporter.
 * Uses Gmail + App Password by default.
 * Set SMTP_HOST/PORT/USER/PASS/FROM_NAME in your environment.
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Faster connection timeout so it doesn't hang the server
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

const FROM = () =>
  `"${process.env.SMTP_FROM_NAME || 'Kevalon Technology'}" <${process.env.SMTP_USER}>`;

/**
 * Fire-and-forget email helper.
 * Sends in the background — never blocks the HTTP response.
 * Logs errors to console but does not throw.
 */
function sendEmailAsync(mailOptions, label) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass ||
      smtpUser === 'your_gmail@gmail.com' ||
      smtpPass === 'your_app_password_here') {
    console.warn(`[mailer] SMTP not configured — skipping email: ${label}`);
    return;
  }

  const transporter = createTransporter();
  // Fire and forget — do NOT await this
  transporter.sendMail(mailOptions)
    .then(() => console.log(`[mailer] Email sent OK: ${label} → ${mailOptions.to}`))
    .catch((err) => console.error(`[mailer] Email FAILED: ${label}`, err.message));
}

/* ─────────────────────────── Templates ─────────────────────────── */

function sendShortlistedEmail({ to, name, role, date, time }) {
  const subject = `You're Shortlisted! Round 1 Technical Interview – ${role} | Kevalon Technology`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#61BBC5,#034665);padding:32px 36px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:1.6rem;letter-spacing:-0.02em;">Kevalon Technology</h1>
    <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:0.95rem;">Recruitment Team</p>
  </div>
  <div style="padding:36px;">
    <p style="font-size:1.05rem;color:#0d3d5a;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
    <p style="color:#334155;line-height:1.7;margin:0 0 24px;">
      Congratulations! After reviewing your application for the <strong>${role}</strong> position,
      we are pleased to inform you that you have been <strong style="color:#16a34a;">shortlisted</strong> for the next stage.
    </p>
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 24px;">
      <h3 style="color:#034665;margin:0 0 16px;font-size:1rem;">Round 1 – Technical Interview</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:0.9rem;width:40%;">Date</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:600;">${date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:0.9rem;">Time</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:600;">${time} (IST)</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:0.9rem;">Mode</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:600;">Online / At our Office</td>
        </tr>
      </table>
    </div>
    <p style="color:#334155;line-height:1.7;margin:0 0 24px;">
      Please confirm your availability by replying to this email. Bring any relevant work samples or portfolio links.
    </p>
    <p style="color:#64748b;font-size:0.88rem;margin:0;">
      Best regards,<br/>
      <strong>HR Team – Kevalon Technology</strong><br/>
      <a href="mailto:${process.env.SMTP_USER}" style="color:#61BBC5;">${process.env.SMTP_USER}</a>
    </p>
  </div>
</div>`;
  sendEmailAsync({ from: FROM(), to, subject, html }, 'shortlisted');
}

function sendRound1ResultEmail({ to, name, role, result }) {
  const isSelected = result === 'selected';
  const subject = isSelected
    ? `Round 1 Result: You are Selected for Round 2 – ${role} | Kevalon Technology`
    : `Round 1 Result: Application Status Update – ${role} | Kevalon Technology`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#61BBC5,#034665);padding:32px 36px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:1.6rem;">Kevalon Technology</h1>
  </div>
  <div style="padding:36px;">
    <p style="font-size:1.05rem;color:#0d3d5a;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
    ${isSelected
      ? `<p style="color:#334155;line-height:1.7;margin:0 0 24px;">
          We are pleased to inform you that you have successfully <strong style="color:#16a34a;">passed Round 1 (Technical Interview)</strong>
          for the <strong>${role}</strong> position. You are now selected to proceed to <strong>Round 2 – Practical Round</strong>.
          Our team will reach out shortly with the schedule details.
         </p>`
      : `<p style="color:#334155;line-height:1.7;margin:0 0 24px;">
          Thank you for participating in Round 1 Technical Interview for the <strong>${role}</strong> position.
          After careful evaluation, we regret that we will not be moving forward with your application at this time.
          We encourage you to apply again for future openings.
         </p>`
    }
    <p style="color:#64748b;font-size:0.88rem;margin:0;">
      Best regards,<br/><strong>HR Team – Kevalon Technology</strong>
    </p>
  </div>
</div>`;
  sendEmailAsync({ from: FROM(), to, subject, html }, `round1_result:${result}`);
}

function sendRound2ScheduledEmail({ to, name, role, date, time }) {
  const subject = `Round 2 Practical Interview Scheduled – ${role} | Kevalon Technology`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#61BBC5,#034665);padding:32px 36px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:1.6rem;">Kevalon Technology</h1>
  </div>
  <div style="padding:36px;">
    <p style="font-size:1.05rem;color:#0d3d5a;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
    <p style="color:#334155;line-height:1.7;margin:0 0 24px;">
      Congratulations on clearing Round 1! You are invited for
      <strong>Round 2 – Practical Round</strong> for the <strong>${role}</strong> position.
    </p>
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 24px;">
      <h3 style="color:#034665;margin:0 0 16px;font-size:1rem;">Round 2 – Practical Interview</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:0.9rem;width:40%;">Date</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:600;">${date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:0.9rem;">Time</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:600;">${time} (IST)</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:0.9rem;">Mode</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:600;">Online / At our Office</td>
        </tr>
      </table>
    </div>
    <p style="color:#334155;line-height:1.7;margin:0 0 24px;">
      Come prepared with your laptop and prior projects. Confirm your availability by replying to this email.
    </p>
    <p style="color:#64748b;font-size:0.88rem;margin:0;">
      Best regards,<br/><strong>HR Team – Kevalon Technology</strong>
    </p>
  </div>
</div>`;
  sendEmailAsync({ from: FROM(), to, subject, html }, 'round2_scheduled');
}

function sendRound2ResultEmail({ to, name, role, result }) {
  const isHired = result === 'hired';
  const subject = isHired
    ? `Congratulations! You are Selected – ${role} | Kevalon Technology`
    : `Round 2 Result: Application Status Update – ${role} | Kevalon Technology`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#61BBC5,#034665);padding:32px 36px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:1.6rem;">Kevalon Technology</h1>
  </div>
  <div style="padding:36px;">
    <p style="font-size:1.05rem;color:#0d3d5a;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
    ${isHired
      ? `<div style="background:rgba(22,163,74,0.07);border:1px solid rgba(22,163,74,0.2);border-radius:12px;padding:20px;margin:0 0 24px;text-align:center;">
          <h2 style="color:#16a34a;margin:0;font-size:1.3rem;">You are Selected!</h2>
        </div>
        <p style="color:#334155;line-height:1.7;margin:0 0 24px;">
          We are delighted to inform you that you have been <strong style="color:#16a34a;">selected</strong> for
          the <strong>${role}</strong> position at Kevalon Technology!
          Our HR team will contact you shortly with offer and onboarding details.
        </p>`
      : `<p style="color:#334155;line-height:1.7;margin:0 0 24px;">
          Thank you for your time and effort during Round 2 for the <strong>${role}</strong> position.
          After thorough evaluation, we are unable to proceed with your application at this time.
          We appreciate your interest and encourage you to apply for future openings.
        </p>`
    }
    <p style="color:#64748b;font-size:0.88rem;margin:0;">
      Best regards,<br/><strong>HR Team – Kevalon Technology</strong>
    </p>
  </div>
</div>`;
  sendEmailAsync({ from: FROM(), to, subject, html }, `round2_result:${result}`);
}

module.exports = {
  sendShortlistedEmail,
  sendRound1ResultEmail,
  sendRound2ScheduledEmail,
  sendRound2ResultEmail,
};
