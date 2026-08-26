const boot = document.getElementById('boot-screen');
const terminal = document.getElementById('terminal');
const bar = document.getElementById('loading-bar');
const bootLines = ['> INICIALIZANDO PORTFÓLIO...', '> CARREGANDO RAFAEL_ZANDARIM.exe', '> SISTEMAS PRONTOS.'];
let bootFinished = false;

function finishBoot() { if (bootFinished) return; bootFinished = true; bar.style.width = '100%'; setTimeout(() => boot.classList.add('done'), 260); }
function runBoot() {
  let line = 0, char = 0;
  const type = () => {
    if (bootFinished) return;
    if (line < bootLines.length) {
      terminal.textContent += bootLines[line][char] || '';
      char++;
      if (char > bootLines[line].length) { terminal.textContent += '\n'; line++; char = 0; }
      bar.style.width = `${Math.min(96, (line * 30) + char * 1.6)}%`;
      setTimeout(type, char === 0 ? 170 : 26);
    } else setTimeout(finishBoot, 350);
  };
  type();
}
document.getElementById('skip-boot').addEventListener('click', finishBoot);
runBoot();

lucide.createIcons();
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const skills = document.querySelector('.skills');
new IntersectionObserver(entries => { if (entries[0].isIntersecting) skills.classList.add('active'); }, { threshold: .25 }).observe(skills);
window.addEventListener('scroll', () => { const h = document.documentElement.scrollHeight - innerHeight; document.getElementById('scroll-progress').style.width = `${scrollY / h * 100}%`; }, { passive: true });
const menu = document.getElementById('menu-toggle'); const nav = document.getElementById('main-nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
document.querySelectorAll('.glitch-link').forEach(link => link.addEventListener('click', e => { if (link.dataset.ready) return; e.preventDefault(); link.classList.add('glitch'); setTimeout(() => { link.dataset.ready = '1'; link.click(); }, 300); }));
const achievement = document.getElementById('achievement'); let unlocked = false;
new IntersectionObserver(entries => { if (entries[0].isIntersecting && !unlocked) { unlocked = true; achievement.classList.add('show'); setTimeout(() => achievement.classList.remove('show'), 4100); } }, { threshold: .35 }).observe(document.getElementById('experiencia'));
