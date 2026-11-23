// ===== Dark / Light toggle =====
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  icon.textContent = isDark ? "☀️" : "🌙";
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#0f172a" : "#ffffff");
}

// Dark is the default. Use the saved choice if there is one.
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) { /* storage blocked: ignore */ }
applyTheme(saved === "light" ? "light" : "dark");

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
});

// ===== Smooth scrolling + keyboard focus =====
// CSS handles the smooth scroll. This moves keyboard focus to the section
// so screen readers and Tab users land in the right place.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (id.length < 2) return;            // ignore placeholder "#" links
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.pushState(null, "", id);
  });
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
