// ============================================================
// PPP Tracker — Application
// ============================================================

const STORAGE_KEY = 'ppp_tracker_statuses';

const STATUS_CONFIG = {
  todo:       { label: 'À faire',    cls: 'badge-todo' },
  inprogress: { label: 'En cours',   cls: 'badge-inprogress' },
  waiting:    { label: 'En attente', cls: 'badge-waiting' },
  done:       { label: 'Complété',   cls: 'badge-done' },
  blocked:    { label: 'Bloqué',     cls: 'badge-blocked' },
  cancelled:  { label: 'Annulé',     cls: 'badge-cancelled' },
};

// ── State ──────────────────────────────────────────────────
let statuses   = {};   // { taskId: statusString }
let editMode   = false;
let activeFilter = 'all';
let saveTimer  = null;

// ── Storage ────────────────────────────────────────────────
function loadStatuses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) statuses = JSON.parse(raw);
  } catch (e) {
    statuses = {};
  }
  // Initialise les tâches sans statut sauvegardé
  PROJECT_DATA.forEach(p =>
    p.groups.forEach(g =>
      g.tasks.forEach(t => {
        if (!statuses[t.id]) statuses[t.id] = t.status;
      })
    )
  );
}

function saveStatuses() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
      showSaveConfirm();
    } catch (e) {
      console.warn('Erreur de sauvegarde:', e);
    }
  }, 400);
}

function showSaveConfirm() {
  const el = document.getElementById('save-msg');
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2000);
}

// ── Status helpers ─────────────────────────────────────────
function getStatus(taskId, fallback) {
  return statuses[taskId] || fallback || 'todo';
}

function statusBadge(taskId, fallback) {
  const s   = getStatus(taskId, fallback);
  const cfg = STATUS_CONFIG[s] || STATUS_CONFIG.todo;
  return `<span class="badge status-badge ${cfg.cls}">${cfg.label}</span>`;
}

function statusSelect(taskId, fallback) {
  const current = getStatus(taskId, fallback);
  const opts = Object.entries(STATUS_CONFIG)
    .map(([val, {label}]) =>
      `<option value="${val}"${val === current ? ' selected' : ''}>${label}</option>`
    ).join('');
  return `<select class="status-select" onchange="changeStatus('${taskId}', this.value)" aria-label="Statut">${opts}</select>`;
}

// ── Stats ──────────────────────────────────────────────────
function computeStats() {
  const counts = { done: 0, inprogress: 0, waiting: 0, todo: 0, blocked: 0, cancelled: 0 };
  let totalHours = 0;

  PROJECT_DATA.forEach(p =>
    p.groups.forEach(g =>
      g.tasks.forEach(t => {
        const s = getStatus(t.id, t.status);
        counts[s] = (counts[s] || 0) + 1;
        if (t.hours) totalHours += t.hours;
      })
    )
  );
  return { counts, totalHours };
}

function renderStats() {
  const { counts, totalHours } = computeStats();
  const totalTasks = Object.values(counts).reduce((a, b) => a + b, 0);

  document.getElementById('stats-bar').innerHTML = `
    <div class="stat-card">
      <div class="stat-value" style="color:var(--s-done)">${counts.done}</div>
      <div class="stat-label">Complétés</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:var(--blue)">${counts.inprogress}</div>
      <div class="stat-label">En cours</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:var(--s-wait)">${counts.waiting}</div>
      <div class="stat-label">En attente</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${counts.todo}</div>
      <div class="stat-label">À faire</div>
    </div>
  `;
}

// ── Filter ─────────────────────────────────────────────────
function taskMatchesFilter(taskId, fallback) {
  if (activeFilter === 'all') return true;
  return getStatus(taskId, fallback) === activeFilter;
}

// ── Render ─────────────────────────────────────────────────
function renderBoard() {
  const board = document.getElementById('board');
  let html = '';
  let anyPhaseVisible = false;

  PROJECT_DATA.forEach(phase => {
    const allTasks = phase.groups.flatMap(g => g.tasks);
    const visibleTasks = allTasks.filter(t => taskMatchesFilter(t.id, t.status));
    if (!visibleTasks.length) return;
    anyPhaseVisible = true;

    const done  = allTasks.filter(t => getStatus(t.id, t.status) === 'done').length;
    const total = allTasks.length;
    const pct   = total ? Math.round((done / total) * 100) : 0;

    html += `
      <div class="phase">
        <div class="phase-header" onclick="togglePhase(this)">
          <div class="phase-accent" style="background:${phase.color}"></div>
          <span class="phase-title">${phase.name}</span>
          <div class="phase-progress">
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct}%;background:${phase.color}"></div>
            </div>
            <span class="phase-count">${done}/${total}</span>
          </div>
          <svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 4l4 4-4 4"/>
          </svg>
        </div>
        <div class="phase-body">`;

    phase.groups.forEach(group => {
      const visibleGroupTasks = group.tasks.filter(t => taskMatchesFilter(t.id, t.status));
      if (!visibleGroupTasks.length) return;

      html += `
          <div class="group">
            <div class="group-header" onclick="toggleGroup(this)">
              <svg class="group-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M6 4l4 4-4 4"/>
              </svg>
              <span class="group-title">${group.name}</span>
            </div>
            <div class="group-body">`;

      visibleGroupTasks.forEach(task => {
        let depHtml = '';
        if (task.dep && task.dep.length) {
          const names = task.dep
            .map(id => TASK_INDEX[id]?.name || id)
            .join(', ');
          depHtml = `<div class="task-dep">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-top:1px;flex-shrink:0"><path d="M2 2v5h6"/></svg>
            Dépend de : ${names}
          </div>`;
        }

        html += `
              <div class="task">
                <div class="task-body">
                  <div class="task-name">${task.name}</div>
                  ${task.note ? `<div class="task-note">${task.note}</div>` : ''}
                  ${depHtml}
                </div>
                <div class="task-meta">
                  ${task.hours ? `<span class="badge badge-hours">${task.hours}h</span>` : ''}
                  ${statusBadge(task.id, task.status)}
                  ${statusSelect(task.id, task.status)}
                </div>
              </div>`;
      });

      html += `</div></div>`;
    });

    html += `</div></div>`;
  });

  if (!anyPhaseVisible) {
    html = `<div class="empty">Aucune tâche pour ce filtre.</div>`;
  }

  board.innerHTML = html;
  applyEditMode();
}

function render() {
  renderStats();
  renderBoard();
}

// ── Edit mode ──────────────────────────────────────────────
function applyEditMode() {
  document.getElementById('board').classList.toggle('edit-mode', editMode);
}

function toggleEditMode() {
  editMode = !editMode;
  applyEditMode();

  const bar   = document.getElementById('edit-bar');
  const btn   = document.getElementById('edit-btn');
  const label = document.getElementById('edit-label');

  bar.classList.toggle('visible', editMode);
  btn.classList.toggle('btn-edit-active', editMode);
  label.textContent = editMode ? 'Verrouiller' : 'Mode édition';
}

// ── Interactions ───────────────────────────────────────────
function changeStatus(taskId, value) {
  statuses[taskId] = value;
  saveStatuses();
  render();
}

function togglePhase(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}

function toggleGroup(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}

function setFilter(value, btn) {
  activeFilter = value;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBoard();
}

// ── Init ───────────────────────────────────────────────────
function init() {
  loadStatuses();
  render();
}

document.addEventListener('DOMContentLoaded', init);
