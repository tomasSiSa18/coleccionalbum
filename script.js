const TEAMS = [
  {id: 'FWC', name: 'Intro y Especiales', flag: '🌍', group: 'FWC', count: 20},
  {id: 'USA', name: 'Estados Unidos', flag: '🇺🇸', group: 'A'},
  {id: 'MEX', name: 'México', flag: '🇲🇽', group: 'A'},
  {id: 'CAN', name: 'Canadá', flag: '🇨🇦', group: 'A'},
  {id: 'PAN', name: 'Panamá', flag: '🇵🇦', group: 'A'},
  {id: 'ARG', name: 'Argentina', flag: '🇦🇷', group: 'B'},
  {id: 'CHI', name: 'Chile', flag: '🇨🇱', group: 'B'},
  {id: 'PER', name: 'Perú', flag: '🇵🇪', group: 'B'},
  {id: 'AUS', name: 'Australia', flag: '🇦🇺', group: 'B'},
  {id: 'BRA', name: 'Brasil', flag: '🇧🇷', group: 'C'},
  {id: 'URU', name: 'Uruguay', flag: '🇺🇾', group: 'C'},
  {id: 'COL', name: 'Colombia', flag: '🇨🇴', group: 'C'},
  {id: 'ECU', name: 'Ecuador', flag: '🇪🇨', group: 'C'},
  {id: 'FRA', name: 'Francia', flag: '🇫🇷', group: 'D'},
  {id: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'D'},
  {id: 'POL', name: 'Polonia', flag: '🇵🇱', group: 'D'},
  {id: 'ALB', name: 'Albania', flag: '🇦🇱', group: 'D'},
  {id: 'GER', name: 'Alemania', flag: '🇩🇪', group: 'E'},
  {id: 'POR', name: 'Portugal', flag: '🇵🇹', group: 'E'},
  {id: 'SCO', name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'E'},
  {id: 'HUN', name: 'Hungría', flag: '🇭🇺', group: 'E'},
  {id: 'ESP', name: 'España', flag: '🇪🇸', group: 'F'},
  {id: 'NED', name: 'Países Bajos', flag: '🇳🇱', group: 'F'},
  {id: 'CRO', name: 'Croacia', flag: '🇭🇷', group: 'F'},
  {id: 'MAR', name: 'Marruecos', flag: '🇲🇦', group: 'F'},
  {id: 'BEL', name: 'Bélgica', flag: '🇧🇪', group: 'G'},
  {id: 'SUI', name: 'Suiza', flag: '🇨🇭', group: 'G'},
  {id: 'UKR', name: 'Ucrania', flag: '🇺🇦', group: 'G'},
  {id: 'SLO', name: 'Eslovaquia', flag: '🇸🇰', group: 'G'},
  {id: 'SEN', name: 'Senegal', flag: '🇸🇳', group: 'H'},
  {id: 'EGY', name: 'Egipto', flag: '🇪🇬', group: 'H'},
  {id: 'NZL', name: 'Nueva Zelanda', flag: '🇳🇿', group: 'H'},
  {id: 'SLN', name: 'Eslovenia', flag: '🇸🇮', group: 'H'},
  {id: 'JPN', name: 'Japón', flag: '🇯🇵', group: 'I'},
  {id: 'KOR', name: 'Corea del Sur', flag: '🇰🇷', group: 'I'},
  {id: 'IRN', name: 'Irán', flag: '🇮🇷', group: 'I'},
  {id: 'UZB', name: 'Uzbekistán', flag: '🇺🇿', group: 'I'},
  {id: 'NGR', name: 'Nigeria', flag: '🇳🇬', group: 'J'},
  {id: 'CIV', name: 'Costa de Marfil', flag: '🇨🇮', group: 'J'},
  {id: 'GHA', name: 'Ghana', flag: '🇬🇭', group: 'J'},
  {id: 'CMR', name: 'Camerún', flag: '🇨🇲', group: 'J'},
  {id: 'SAU', name: 'Arabia Saudita', flag: '🇸🇦', group: 'K'},
  {id: 'QAT', name: 'Qatar', flag: '🇶🇦', group: 'K'},
  {id: 'IRQ', name: 'Irak', flag: '🇮🇶', group: 'K'},
  {id: 'KUW', name: 'Kuwait', flag: '🇰🇼', group: 'K'},
  {id: 'ITA', name: 'Italia', flag: '🇮🇹', group: 'L'},
  {id: 'CZE', name: 'Rep. Checa', flag: '🇨🇿', group: 'L'},
  {id: 'TUR', name: 'Turquía', flag: '🇹🇷', group: 'L'},
  {id: 'VEN', name: 'Venezuela', flag: '🇻🇪', group: 'L'}
];

const TOTAL = 980;
let col = {};

function load() {
  try {
    const s = localStorage.getItem('wc26_col_v2');
    if (s) col = JSON.parse(s);
  } catch (e) {}
}

function save() {
  localStorage.setItem('wc26_col_v2', JSON.stringify(col));
}

function getCount(tid, idx) {
  return (col[tid] && col[tid][idx]) ? col[tid][idx] : 0;
}

function setCount(tid, idx, v) {
  if (!col[tid]) col[tid] = {};
  col[tid][idx] = Math.max(0, v);
  if (col[tid][idx] === 0) delete col[tid][idx];
  save();
}

function updateStats() {
  let owned = 0, dups = 0;
  TEAMS.forEach(t => {
    const cnt = t.count || 20;
    for (let i = 0; i < cnt; i++) {
      const c = getCount(t.id, i);
      if (c >= 1) owned++;
      if (c >= 2) dups += (c - 1);
    }
  });
  const miss = TOTAL - owned, pct = Math.round(owned / TOTAL * 100);
  document.getElementById('s-owned').textContent = owned;
  document.getElementById('s-miss').textContent = miss;
  document.getElementById('s-dups').textContent = dups;
  document.getElementById('s-pct').textContent = pct + '%';
  document.getElementById('prog-lbl').textContent = owned + ' / ' + TOTAL + ' estampas';
  document.getElementById('prog-pct2').textContent = pct + '%';
  document.getElementById('prog-fill').style.width = pct + '%';
}

let activeFilter = 'all', collapsedTeams = {};

function setFilter(btn) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  activeFilter = btn.dataset.f;
  render();
}

function render() {
  const search = document.getElementById('search').value.toLowerCase();
  const groupF = document.getElementById('group-filter').value;
  const grid = document.getElementById('main-grid');
  grid.innerHTML = '';
  let anyVisible = false;

  TEAMS.forEach(team => {
    if (search && !team.name.toLowerCase().includes(search)) return;
    if (groupF && team.group !== groupF) return;

    const cnt = team.count || 20;

    const slots = Array.from({length: cnt}, (_, i) => getCount(team.id, i));
    const hasOwned = slots.some(c => c >= 1);
    const hasMissing = slots.some(c => c === 0);
    const hasDup = slots.some(c => c >= 2);

    if (activeFilter === 'owned' && !hasOwned) return;
    if (activeFilter === 'missing' && !hasMissing) return;
    if (activeFilter === 'dup' && !hasDup) return;

    anyVisible = true;
    const ownedCount = slots.filter(c => c >= 1).length;
    const pct = Math.round(ownedCount / cnt * 100);

    const sec = document.createElement('div');
    sec.className = 'team-section';

    const hdr = document.createElement('div');
    hdr.className = 'team-header';
    hdr.innerHTML = `
      <span class="team-flag">${team.flag}</span>
      <span class="team-name">${team.name}</span>
      <span class="team-progress">${ownedCount}/${cnt}</span>
      <div class="team-mini-bar"><div class="team-mini-fill" style="width: ${pct}%"></div></div>
      <span class="team-collapse">${collapsedTeams[team.id] ? '▶' : '▼'}</span>
    `;
    hdr.onclick = () => {
      collapsedTeams[team.id] = !collapsedTeams[team.id];
      render();
    };
    sec.appendChild(hdr);

    if (!collapsedTeams[team.id]) {
      const g = document.createElement('div');
      g.className = 'sticker-grid';

      for (let i = 0; i < cnt; i++) {
        const c = getCount(team.id, i);
        if (activeFilter === 'owned' && c < 1) continue;
        if (activeFilter === 'missing' && c > 0) continue;
        if (activeFilter === 'dup' && c < 2) continue;

        const s = document.createElement('div');
        s.className = 'sticker' + (c >= 2 ? ' dup' : c === 1 ? ' owned' : '');

        const stickerNumber = team.id === 'FWC'
          ? String(i).padStart(2, '0')
          : String(i + 1);
        const label = team.id + ' ' + stickerNumber;
        let inner = `<span class="snum">${label}</span>`;

        if (c >= 2) {
          inner += `<span class="dup-num">${c}</span>`;
        }

        s.innerHTML = inner;
        s.onclick = () => toggleSticker(team.id, i);
        
        // Right-click to uncheck
        s.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          uncheckSticker(team.id, i);
        });
        
        // Long press on mobile to uncheck
        let longPressTimer;
        s.addEventListener('touchstart', () => {
          longPressTimer = setTimeout(() => {
            uncheckSticker(team.id, i);
          }, 500);
        });
        s.addEventListener('touchend', () => {
          clearTimeout(longPressTimer);
        });
        
        g.appendChild(s);
      }
      sec.appendChild(g);
    }
    grid.appendChild(sec);
  });

  if (!anyVisible) {
    const em = document.createElement('div');
    em.className = 'empty-msg';
    em.textContent = 'No hay estampas con ese filtro.';
    grid.appendChild(em);
  }
  updateStats();
}

function toggleSticker(tid, idx) {
  const c = getCount(tid, idx);
  setCount(tid, idx, c + 1);
  render();
}

function uncheckSticker(tid, idx) {
  const c = getCount(tid, idx);
  if (c > 0) setCount(tid, idx, c - 1);
  render();
}

function changeCount(tid, idx, delta) {
  setCount(tid, idx, Math.max(0, getCount(tid, idx) + delta));
  render();
}

function openShare() {
  document.getElementById('share-modal').classList.remove('hidden');
  const box = document.getElementById('qr-box');
  box.innerHTML = '';
  const note = document.getElementById('qr-size-note');
  const pairs = [];

  TEAMS.forEach(t => {
    const cnt = t.count || 20;
    for (let i = 0; i < cnt; i++) {
      const c = getCount(t.id, i);
      if (c > 0) pairs.push(t.id + ':' + i + ':' + c);
    }
  });

  const payload = 'wc26v2|' + pairs.join(',');

  if (payload.length > 2500) {
    note.textContent = 'Colección muy grande para QR. Copia el código y compártelo por WhatsApp.';
    const ta = document.createElement('textarea');
    ta.value = payload;
    ta.style.cssText = 'width: 100%; height: 80px; font-size: 10px; font-family: monospace; padding: 6px; border: 1px solid #ccc; border-radius: 8px; background: var(--bg2); color: var(--text)';
    box.appendChild(ta);
  } else {
    note.textContent = 'Escanéalo con otro teléfono que tenga la app, luego toca "Combinar álbum".';
    new QRCode(box, {text: payload, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.M});
  }
}

function openMerge() {
  document.getElementById('merge-modal').classList.remove('hidden');
  document.getElementById('merge-input').value = '';
  document.getElementById('merge-result').classList.add('hidden');
}

function doMerge() {
  const raw = document.getElementById('merge-input').value.trim();
  const res = document.getElementById('merge-result');
  res.classList.remove('hidden', 'merge-ok', 'merge-err');

  if (!raw.startsWith('wc26v2|')) {
    res.textContent = 'Código inválido. Asegúrate de copiarlo completo.';
    res.classList.add('merge-err');
    return;
  }

  const data = raw.slice(7);
  let added = 0, updated = 0;

  if (data) {
    data.split(',').forEach(pair => {
      const parts = pair.split(':');
      if (parts.length < 3) return;
      const tid = parts[0], idx = parseInt(parts[1]), c = parseInt(parts[2]);
      if (!tid || isNaN(idx) || isNaN(c)) return;
      const existing = getCount(tid, idx);
      setCount(tid, idx, existing + c);
      if (existing === 0) added++;
      else updated++;
    });
  }

  render();
  res.textContent = '¡Combinado! ' + added + ' estampas nuevas, ' + updated + ' actualizadas con copias sumadas.';
  res.classList.add('merge-ok');
}

function confirmReset() {
  document.getElementById('reset-modal').classList.remove('hidden');
}

function doReset() {
  col = {};
  save();
  render();
  closeModal('reset-modal');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

document.addEventListener('click', e => {
  ['share-modal', 'merge-modal', 'reset-modal'].forEach(id => {
    const m = document.getElementById(id);
    if (e.target === m) m.classList.add('hidden');
  });
});

load();
render();
