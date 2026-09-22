/**
 * Problem Backlog Hub - Application Logic
 * Quản lý & Trực quan hóa pain point & edge cases cho Annotation Team
 */

// Dữ liệu mẫu khởi tạo dựa trên problem-backlog.md gốc
const DEFAULT_DATA = {
  title: "Problem backlog",
  intro: `Những chỗ gặp trong lúc gán nhãn mà **guideline chưa trả lời được**, cộng các pain point về công cụ.\n\nGhi ngay khi gặp, kể cả lúc chưa biết xử lý thế nào. Một edge case không được ghi lại thì\nmỗi người sẽ tự xử lý theo một kiểu — và đó là nguồn lớn nhất của nhãn không nhất quán.\n\n> Các mục bên dưới là **ví dụ**, tên và link CVAT đều giả. Mẫu trống để copy nằm cuối file.`,
  items: [
    {
      id: "P-001",
      summary: "Người ngồi sau xe máy: box riêng hay gộp chung với người lái",
      summaryTable: "Người ngồi sau xe máy: box riêng hay gộp với người lái",
      type: "Guideline mơ hồ",
      section: "§3.2",
      sectionDetail: '§3.2 — "mỗi người một bounding box"',
      reporter: "@thanh-vien-b",
      date: "16/09/2026",
      cvatLinks: [
        {
          url: "https://cvat.example.com/tasks/12/jobs/101?frame=37",
          note: "hai người, gần như chồng khít"
        },
        {
          url: "https://cvat.example.com/tasks/12/jobs/101?frame=112",
          note: "người ngồi sau chỉ lộ đầu"
        }
      ],
      description: "§3.2 nói mỗi người một box, nhưng hình minh hoạ trong guideline lại vẽ một box\ncho cả xe máy lẫn người trên xe.",
      options: [
        "Theo câu chữ: người ngồi sau có box `nguoi` riêng.",
        "Theo hình minh hoạ: không vẽ box `nguoi` cho ai đang ngồi trên xe."
      ],
      workaround: "vẽ box riêng và gắn tag `can_xem_lai` để dễ lọc ra sửa.",
      status: "✅ Đã chốt",
      result: "✅ [QĐ-001](so-quyet-dinh.md#qđ-001)",
      resultTable: "[QĐ-001](so-quyet-dinh.md#qđ-001)"
    },
    {
      id: "P-002",
      summary: "Xe bị che khuất hơn một nửa",
      summaryTable: "Xe bị che khuất hơn một nửa",
      type: "Guideline chưa nói tới",
      section: "§3.4",
      sectionDetail: "§3.4 — chỉ nói về vật thể bị cắt ở mép ảnh, không nói về bị che",
      reporter: "@thanh-vien-c",
      date: "17/09/2026",
      cvatLinks: [
        {
          url: "https://cvat.example.com/tasks/12/jobs/103?frame=8",
          note: "ô tô sau xe buýt, lộ khoảng 30%"
        },
        {
          url: "https://cvat.example.com/tasks/12/jobs/103?frame=64",
          note: "xe máy sau cột điện, lộ khoảng 50%"
        }
      ],
      description: "Không rõ có gán nhãn vật thể bị che không, và nếu có thì box ôm phần nhìn thấy\nhay ôm cả phần ước lượng bị che.",
      options: [
        "Bỏ qua khi lộ dưới 50%.",
        "Luôn gán, box chỉ ôm phần nhìn thấy.",
        "Luôn gán, box ôm cả phần ước lượng."
      ],
      workaround: "dừng job 103, chuyển sang job khác ít ca che khuất.",
      status: "↗️ Hỏi BTC",
      result: "↗️ Đã hỏi BTC ngày 18/09/2026, chờ trả lời.",
      resultTable: "—"
    },
    {
      id: "P-003",
      summary: "Phải vẽ lại box y hệt qua nhiều frame liên tiếp",
      summaryTable: "Phải vẽ lại box y hệt qua nhiều frame liên tiếp",
      type: "Pain point công cụ",
      section: "—",
      sectionDetail: "—",
      reporter: "@thanh-vien-d",
      date: "18/09/2026",
      cvatLinks: [
        {
          url: "https://cvat.example.com/tasks/12/jobs/105?frame=200",
          note: "frame 200–260, xe đỗ không di chuyển"
        }
      ],
      description: "Ảnh chụp liên tiếp từ camera cố định. Xe đỗ bên đường xuất hiện y nguyên ở hàng chục\nframe, annotator phải vẽ lại ở từng frame. Ước tính chiếm ~40% thời gian job 105.",
      options: [
        "Dùng chế độ *Track* sẵn có của CVAT — cần thử xem có hợp với dữ liệu dạng ảnh rời không.",
        "Viết script đọc file export của CVAT, nhân box sang các frame kế tiếp, rồi import lại."
      ],
      workaround: "",
      status: "🗣️ Đang bàn",
      result: "🗣️ Đang bàn. Nếu chọn hướng 2 thì đổi trạng thái sang 🛠️ và làm trong\n[`source-tool/`](source-tool/).",
      resultTable: "—"
    }
  ]
};

const STATUS_LIST = [
  { label: "🔴 Mở", class: "badge-status-open", key: "open" },
  { label: "🗣️ Đang bàn", class: "badge-status-discuss", key: "discuss" },
  { label: "↗️ Hỏi BTC", class: "badge-status-btc", key: "btc" },
  { label: "✅ Đã chốt", class: "badge-status-closed", key: "closed" },
  { label: "🛠️ Làm tool", class: "badge-status-tool", key: "tool" },
  { label: "⚪ Bỏ", class: "badge-status-discard", key: "discard" }
];

const TYPE_CLASSES = {
  "Guideline chưa nói tới": "badge-type-unmentioned",
  "Guideline mơ hồ": "badge-type-ambiguous",
  "Guideline mâu thuẫn": "badge-type-conflict",
  "Pain point công cụ": "badge-type-tool"
};

// Application State
let appData = { ...DEFAULT_DATA };
let currentView = "table"; // 'table' | 'kanban'
let filterType = "";
let filterStatus = "";
let searchQuery = "";

// LocalStorage Keys
const STORAGE_KEY = "problem_backlog_data_v1";

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  loadDataFromStorage();
  initEventListeners();
  renderAll();
});

function loadDataFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        appData = parsed;
        return;
      }
    }
  } catch (e) {
    console.error("Lỗi khi nạp từ LocalStorage:", e);
  }
  appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveDataToStorage();
}

function saveDataToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  } catch (e) {
    console.error("Lỗi khi lưu vào LocalStorage:", e);
  }
}

// --- Render Functions ---
function renderAll() {
  renderKPIs();
  renderTable();
  renderKanban();
  updateItemCount();
}

function getFilteredItems() {
  return appData.items.filter(item => {
    // Type filter
    if (filterType && item.type !== filterType) return false;

    // Status filter
    if (filterStatus && item.status !== filterStatus) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = (item.id || "").toLowerCase().includes(q);
      const matchSummary = (item.summary || "").toLowerCase().includes(q);
      const matchDesc = (item.description || "").toLowerCase().includes(q);
      const matchReporter = (item.reporter || "").toLowerCase().includes(q);
      const matchSection = (item.section || "").toLowerCase().includes(q) || (item.sectionDetail || "").toLowerCase().includes(q);
      const matchResult = (item.result || "").toLowerCase().includes(q);
      const matchLinks = (item.cvatLinks || []).some(l => (l.url + " " + (l.note || "")).toLowerCase().includes(q));
      if (!matchId && !matchSummary && !matchDesc && !matchReporter && !matchSection && !matchResult && !matchLinks) {
        return false;
      }
    }

    return true;
  });
}

function updateItemCount() {
  const filtered = getFilteredItems();
  const total = appData.items.length;
  const countEl = document.getElementById("item-count-badge");
  if (countEl) {
    countEl.textContent = `Hiển thị ${filtered.length} / ${total} mục`;
  }
}

function renderKPIs() {
  const grid = document.getElementById("kpi-grid");
  if (!grid) return;

  const total = appData.items.length;
  const statusCounts = {};
  STATUS_LIST.forEach(s => {
    statusCounts[s.label] = 0;
  });

  appData.items.forEach(item => {
    if (statusCounts[item.status] !== undefined) {
      statusCounts[item.status]++;
    }
  });

  let html = `
    <div class="kpi-card ${!filterStatus ? 'active' : ''}" onclick="setQuickStatusFilter('')">
      <div class="kpi-header">
        <span class="kpi-label">Tổng số</span>
        <span class="material-symbols-outlined" style="color: var(--primary);">assessment</span>
      </div>
      <div class="kpi-count">${total}</div>
    </div>
  `;

  STATUS_LIST.forEach(s => {
    const count = statusCounts[s.label] || 0;
    const isActive = filterStatus === s.label;
    html += `
      <div class="kpi-card ${isActive ? 'active' : ''}" onclick="setQuickStatusFilter('${s.label}')">
        <div class="kpi-header">
          <span class="kpi-label">${s.label}</span>
          <span class="badge ${s.class}" style="padding: 0.1rem 0.35rem; font-size: 0.7rem;">${count}</span>
        </div>
        <div class="kpi-count">${count}</div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

window.setQuickStatusFilter = function(status) {
  filterStatus = filterStatus === status ? "" : status;
  document.getElementById("filter-status").value = filterStatus;
  renderAll();
};

function renderTable() {
  const tbody = document.getElementById("table-body");
  if (!tbody) return;

  const filtered = getFilteredItems();

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">
          <span class="material-symbols-outlined">inbox</span>
          <p>Không tìm thấy mục nào phù hợp với bộ lọc hiện tại.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const typeClass = TYPE_CLASSES[item.type] || "badge-type-unmentioned";
    const statusObj = STATUS_LIST.find(s => s.label === item.status) || { class: "badge-status-open" };
    const formattedResult = renderMarkdownLinkHtml(item.resultTable || item.result || "—");

    return `
      <tr>
        <td>
          <a href="javascript:void(0)" class="code-id" onclick="openDetailModal('${item.id}')">
            ${escapeHtml(item.id)}
          </a>
        </td>
        <td style="font-weight: 500;">
          ${escapeHtml(item.summaryTable || item.summary)}
        </td>
        <td>
          <span class="badge ${typeClass}">${escapeHtml(item.type)}</span>
        </td>
        <td>
          <span class="section-tag">${escapeHtml(item.section || "—")}</span>
        </td>
        <td>
          <span class="badge ${statusObj.class}">${escapeHtml(item.status)}</span>
        </td>
        <td style="font-size: 0.85rem;">
          ${formattedResult}
        </td>
        <td style="text-align: right;">
          <div class="action-buttons" style="justify-content: flex-end;">
            <button class="btn btn-secondary btn-icon-only" onclick="openDetailModal('${item.id}')" title="Xem chi tiết">
              <span class="material-symbols-outlined">visibility</span>
            </button>
            <button class="btn btn-secondary btn-icon-only" onclick="openEditModal('${item.id}')" title="Chỉnh sửa">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn-secondary btn-icon-only" onclick="duplicateItem('${item.id}')" title="Nhân bản">
              <span class="material-symbols-outlined">content_copy</span>
            </button>
            <button class="btn btn-outline btn-icon-only" onclick="deleteItem('${item.id}')" style="color: #ef4444;" title="Xóa">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function renderKanban() {
  const container = document.getElementById("kanban-container");
  if (!container) return;

  const filtered = getFilteredItems();

  container.innerHTML = STATUS_LIST.map(statusObj => {
    const itemsInStatus = filtered.filter(it => it.status === statusObj.label);

    const cardsHtml = itemsInStatus.map(item => {
      const typeClass = TYPE_CLASSES[item.type] || "badge-type-unmentioned";
      const cvatCount = (item.cvatLinks || []).length;

      return `
        <div class="kanban-card" onclick="openDetailModal('${item.id}')">
          <div class="kanban-card-meta">
            <span class="code-id">${escapeHtml(item.id)}</span>
            <span class="badge ${typeClass}">${escapeHtml(item.type)}</span>
          </div>
          <div class="kanban-card-title">${escapeHtml(item.summary)}</div>
          <div class="kanban-card-info">
            <div style="display: flex; justify-content: space-between;">
              <span><strong>Mục:</strong> ${escapeHtml(item.section || "—")}</span>
              <span>${escapeHtml(item.date || "")}</span>
            </div>
            ${item.reporter ? `<div><strong>Người báo:</strong> ${escapeHtml(item.reporter)}</div>` : ''}
            ${cvatCount > 0 ? `<div style="color: var(--primary);"><span class="material-symbols-outlined" style="font-size: 14px;">link</span> ${cvatCount} link CVAT</div>` : ''}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="kanban-column">
        <div class="kanban-column-header">
          <span>${statusObj.label}</span>
          <span class="badge ${statusObj.class}">${itemsInStatus.length}</span>
        </div>
        <div class="kanban-cards-container">
          ${itemsInStatus.length > 0 ? cardsHtml : '<div style="font-size: 0.8rem; color: var(--text-light); text-align: center; padding: 1.5rem 0;">(Trống)</div>'}
        </div>
      </div>
    `;
  }).join("");
}

// --- Detail Modal ---
window.openDetailModal = function(id) {
  const item = appData.items.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById("modal-detail");
  const titleEl = document.getElementById("detail-id");
  const bodyEl = document.getElementById("detail-body");

  titleEl.innerHTML = `
    <span class="material-symbols-outlined">visibility</span>
    <span>${escapeHtml(item.id)}</span>
    <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">— ${escapeHtml(item.summary)}</span>
  `;

  const typeClass = TYPE_CLASSES[item.type] || "badge-type-unmentioned";
  const statusObj = STATUS_LIST.find(s => s.label === item.status) || { class: "badge-status-open" };

  // CVAT Links HTML
  let cvatHtml = '<div style="color: var(--text-muted); font-size: 0.85rem;">(Không có link CVAT)</div>';
  if (item.cvatLinks && item.cvatLinks.length > 0) {
    cvatHtml = item.cvatLinks.map(link => `
      <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="link-card">
        <span class="link-url">
          <span class="material-symbols-outlined" style="font-size: 16px;">open_in_new</span>
          ${escapeHtml(link.url)}
        </span>
        ${link.note ? `<span class="link-note">— ${escapeHtml(link.note)}</span>` : ''}
      </a>
    `).join("");
  }

  // Options HTML
  const isTool = item.type === "Pain point công cụ";
  const optionsTitle = isTool ? "Hướng đang cân nhắc" : "Các cách hiểu";
  let optionsHtml = '<div style="color: var(--text-muted); font-size: 0.85rem;">(Chưa có danh sách)</div>';
  if (item.options && item.options.length > 0) {
    optionsHtml = `<ol style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem;">` +
      item.options.map(opt => `<li>${renderMarkdownInline(opt)}</li>`).join("") +
      `</ol>`;
  }

  bodyEl.innerHTML = `
    <!-- Top Meta -->
    <div class="detail-meta-grid">
      <div class="detail-meta-item">
        <span class="detail-meta-label">Trạng thái</span>
        <div><span class="badge ${statusObj.class}">${escapeHtml(item.status)}</span></div>
      </div>
      <div class="detail-meta-item">
        <span class="detail-meta-label">Loại vấn đề</span>
        <div><span class="badge ${typeClass}">${escapeHtml(item.type)}</span></div>
      </div>
      <div class="detail-meta-item">
        <span class="detail-meta-label">Mục Guideline</span>
        <div class="detail-meta-value">${escapeHtml(item.sectionDetail || item.section || "—")}</div>
      </div>
      <div class="detail-meta-item">
        <span class="detail-meta-label">Người phát hiện</span>
        <div class="detail-meta-value">${escapeHtml(item.reporter || "—")} · ${escapeHtml(item.date || "—")}</div>
      </div>
    </div>

    <!-- Description -->
    <div class="detail-section">
      <div class="detail-section-title">
        <span class="material-symbols-outlined" style="font-size: 16px;">notes</span>
        Mô tả chi tiết
      </div>
      <div class="detail-box">
        ${renderMarkdownInline(item.description || "Chưa có mô tả chi tiết.")}
      </div>
    </div>

    <!-- CVAT Links -->
    <div class="detail-section">
      <div class="detail-section-title">
        <span class="material-symbols-outlined" style="font-size: 16px;">link</span>
        Link CVAT minh họa
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        ${cvatHtml}
      </div>
    </div>

    <!-- Options / Interpretations -->
    <div class="detail-section">
      <div class="detail-section-title">
        <span class="material-symbols-outlined" style="font-size: 16px;">splitscreen</span>
        ${optionsTitle}
      </div>
      <div class="detail-box">
        ${optionsHtml}
      </div>
    </div>

    <!-- Workaround -->
    ${item.workaround ? `
      <div class="detail-section">
        <div class="detail-section-title">
          <span class="material-symbols-outlined" style="font-size: 16px;">hourglass_top</span>
          Xử lý tạm trong lúc chờ
        </div>
        <div class="detail-box warning-box">
          ${renderMarkdownInline(item.workaround)}
        </div>
      </div>
    ` : ''}

    <!-- Result -->
    <div class="detail-section">
      <div class="detail-section-title">
        <span class="material-symbols-outlined" style="font-size: 16px;">task_alt</span>
        Kết quả
      </div>
      <div class="detail-box highlight-box">
        ${renderMarkdownInline(item.result || "—")}
      </div>
    </div>
  `;

  // Hook up buttons
  document.getElementById("detail-btn-edit").onclick = () => {
    closeModal(modal);
    openEditModal(item.id);
  };

  document.getElementById("detail-btn-copy-md").onclick = () => {
    const singleMd = generateSingleItemMarkdown(item);
    copyToClipboard(singleMd, `Đã sao chép Markdown cho ${item.id}`);
  };

  openModal(modal);
};

// --- Add / Edit Form Modal ---
window.openAddModal = function() {
  const form = document.getElementById("problem-form");
  form.reset();

  document.getElementById("form-edit-index").value = "-1";
  document.getElementById("modal-form-title").innerHTML = `
    <span class="material-symbols-outlined">add_circle</span>
    <span>Thêm Pain Point mới</span>
  `;

  // Auto-generate next ID
  const nextId = getNextProblemId();
  document.getElementById("form-id").value = nextId;
  document.getElementById("form-status").value = "🔴 Mở";
  document.getElementById("form-type").value = "Guideline chưa nói tới";
  document.getElementById("form-date").value = getTodayDateString();

  renderCvatLinksInput([]);
  renderOptionsInput(["", ""]);

  openModal(document.getElementById("modal-form"));
};

window.openEditModal = function(id) {
  const index = appData.items.findIndex(i => i.id === id);
  if (index === -1) return;
  const item = appData.items[index];

  document.getElementById("form-edit-index").value = index;
  document.getElementById("modal-form-title").innerHTML = `
    <span class="material-symbols-outlined">edit</span>
    <span>Chỉnh sửa ${escapeHtml(item.id)}</span>
  `;

  document.getElementById("form-id").value = item.id;
  document.getElementById("form-status").value = item.status || "🔴 Mở";
  document.getElementById("form-type").value = item.type || "Guideline chưa nói tới";
  document.getElementById("form-summary").value = item.summary || "";
  document.getElementById("form-section").value = item.section || "";
  document.getElementById("form-section-detail").value = item.sectionDetail || "";
  document.getElementById("form-reporter").value = item.reporter || "";
  document.getElementById("form-date").value = item.date || "";
  document.getElementById("form-description").value = item.description || "";
  document.getElementById("form-workaround").value = item.workaround || "";
  document.getElementById("form-result").value = item.result || "";
  document.getElementById("form-result-table").value = item.resultTable || "";

  renderCvatLinksInput(item.cvatLinks || []);
  renderOptionsInput(item.options || []);

  updateOptionsLabel(item.type);

  openModal(document.getElementById("modal-form"));
};

function getNextProblemId() {
  let maxNum = 0;
  appData.items.forEach(it => {
    const match = (it.id || "").match(/^P-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  });
  const nextNum = maxNum + 1;
  return `P-${String(nextNum).padStart(3, "0")}`;
}

function getTodayDateString() {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, "0");
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const y = now.getFullYear();
  return `${d}/${m}/${y}`;
}

function updateOptionsLabel(type) {
  const label = document.getElementById("label-options");
  if (label) {
    if (type === "Pain point công cụ") {
      label.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 16px;">build</span>
        Hướng đang cân nhắc
      `;
    } else {
      label.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 16px;">splitscreen</span>
        Các cách hiểu
      `;
    }
  }
}

// Dynamic CVAT links input
function renderCvatLinksInput(links) {
  const container = document.getElementById("cvat-links-list");
  if (!container) return;

  if (links.length === 0) {
    container.innerHTML = "";
    addCvatLinkRow("", "");
    return;
  }

  container.innerHTML = "";
  links.forEach(l => {
    addCvatLinkRow(l.url, l.note);
  });
}

function addCvatLinkRow(url = "", note = "") {
  const container = document.getElementById("cvat-links-list");
  const row = document.createElement("div");
  row.className = "dynamic-item-row";
  row.innerHTML = `
    <input type="text" class="form-control cvat-url-input" placeholder="https://cvat.example.com/..." value="${escapeHtml(url)}">
    <input type="text" class="form-control cvat-note-input" placeholder="Ghi chú frame / tình huống" value="${escapeHtml(note)}" style="flex: 0.8;">
    <button type="button" class="btn btn-outline btn-icon-only" onclick="this.parentElement.remove()" title="Xóa link">
      <span class="material-symbols-outlined">delete</span>
    </button>
  `;
  container.appendChild(row);
}

// Dynamic Options input
function renderOptionsInput(options) {
  const container = document.getElementById("options-list");
  if (!container) return;

  if (options.length === 0) {
    container.innerHTML = "";
    addOptionRow("");
    return;
  }

  container.innerHTML = "";
  options.forEach(opt => {
    addOptionRow(opt);
  });
}

function addOptionRow(text = "") {
  const container = document.getElementById("options-list");
  const row = document.createElement("div");
  row.className = "dynamic-item-row";
  row.innerHTML = `
    <input type="text" class="form-control option-text-input" placeholder="Nội dung cách hiểu hoặc phương án..." value="${escapeHtml(text)}">
    <button type="button" class="btn btn-outline btn-icon-only" onclick="this.parentElement.remove()" title="Xóa mục">
      <span class="material-symbols-outlined">delete</span>
    </button>
  `;
  container.appendChild(row);
}

// Handle Form Submit
document.getElementById("problem-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const editIndex = parseInt(document.getElementById("form-edit-index").value, 10);
  const id = document.getElementById("form-id").value.trim();
  const status = document.getElementById("form-status").value;
  const type = document.getElementById("form-type").value;
  const summary = document.getElementById("form-summary").value.trim();
  let section = document.getElementById("form-section").value.trim();
  let sectionDetail = document.getElementById("form-section-detail").value.trim();
  const reporter = document.getElementById("form-reporter").value.trim();
  const date = document.getElementById("form-date").value.trim();
  const description = document.getElementById("form-description").value.trim();
  const workaround = document.getElementById("form-workaround").value.trim();
  let result = document.getElementById("form-result").value.trim();
  let resultTable = document.getElementById("form-result-table").value.trim();

  // Smart section extraction
  if (!section && sectionDetail) {
    const sMatch = sectionDetail.match(/^(§[\d\.]+)/);
    if (sMatch) section = sMatch[1];
    else section = sectionDetail.split("—")[0].trim();
  } else if (section && !sectionDetail) {
    sectionDetail = section;
  }

  // Smart resultTable extraction
  if (!resultTable) {
    const qdMatch = result.match(/\[QĐ-\d+\]\([^)]+\)/);
    if (qdMatch) {
      resultTable = qdMatch[0];
    } else if (status === "✅ Đã chốt") {
      resultTable = result;
    } else {
      resultTable = "—";
    }
  }

  // Collect CVAT links
  const cvatLinks = [];
  document.querySelectorAll("#cvat-links-list .dynamic-item-row").forEach(row => {
    const u = row.querySelector(".cvat-url-input").value.trim();
    const n = row.querySelector(".cvat-note-input").value.trim();
    if (u) {
      cvatLinks.push({ url: u, note: n });
    }
  });

  // Collect Options
  const options = [];
  document.querySelectorAll("#options-list .dynamic-item-row").forEach(row => {
    const t = row.querySelector(".option-text-input").value.trim();
    if (t) {
      options.push(t);
    }
  });

  const newItem = {
    id,
    summary,
    summaryTable: summary,
    type,
    section: section || "—",
    sectionDetail: sectionDetail || section || "—",
    reporter,
    date,
    cvatLinks,
    description,
    options,
    workaround,
    status,
    result,
    resultTable
  };

  if (editIndex >= 0 && editIndex < appData.items.length) {
    appData.items[editIndex] = newItem;
    showToast(`Đã cập nhật thành công ${id}`, "success");
  } else {
    // Check duplicate ID
    const exists = appData.items.some(i => i.id.toLowerCase() === id.toLowerCase());
    if (exists) {
      alert(`Mã ${id} đã tồn tại! Vui lòng chọn mã khác.`);
      return;
    }
    appData.items.push(newItem);
    showToast(`Đã thêm mới thành công ${id}`, "success");
  }

  saveDataToStorage();
  closeModal(document.getElementById("modal-form"));
  renderAll();
});

// Duplicate item
window.duplicateItem = function(id) {
  const item = appData.items.find(i => i.id === id);
  if (!item) return;

  const nextId = getNextProblemId();
  const copy = JSON.parse(JSON.stringify(item));
  copy.id = nextId;
  copy.summary = `[Copy] ${copy.summary}`;
  copy.summaryTable = copy.summary;
  copy.status = "🔴 Mở";
  copy.date = getTodayDateString();

  appData.items.push(copy);
  saveDataToStorage();
  renderAll();
  showToast(`Đã nhân bản ${id} thành ${nextId}`, "success");
};

// Delete item
window.deleteItem = function(id) {
  if (!confirm(`Bạn có chắc chắn muốn xóa ${id}?`)) return;

  appData.items = appData.items.filter(i => i.id !== id);
  saveDataToStorage();
  renderAll();
  showToast(`Đã xóa ${id}`, "info");
};

// --- Import / Export Hub ---
function openIOModal(tabName = "tab-export-md") {
  const modal = document.getElementById("modal-io");
  switchTab(tabName);
  updateIOPreviews();
  openModal(modal);
}

function updateIOPreviews() {
  const md = generateFullMarkdown();
  document.getElementById("export-md-box").textContent = md;

  const jsonStr = JSON.stringify(appData, null, 2);
  document.getElementById("export-json-box").textContent = jsonStr;
}

function switchTab(tabId) {
  document.querySelectorAll("#modal-io .tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll("#modal-io .tab-content").forEach(content => {
    content.style.display = content.id === tabId ? "block" : "none";
  });
}

// --- Markdown Generator (Matching problem-backlog.md 100%) ---
function generateFullMarkdown() {
  let out = "";

  // Title & Intro
  out += `# ${appData.title || "Problem backlog"}\n\n`;
  out += `${appData.intro || ""}\n\n`;

  // Summary Table
  out += `## Danh sách\n\n`;
  out += `| Mã | Tóm tắt | Loại | Mục guideline | Trạng thái | Kết quả |\n`;
  out += `|---|---|---|---|---|---|\n`;

  appData.items.forEach(item => {
    const idLink = `[${item.id}](#${item.id.toLowerCase()})`;
    const summary = item.summaryTable || item.summary;
    const type = item.type;
    const section = item.section || "—";
    const status = item.status;
    const result = item.resultTable || item.result || "—";
    out += `| ${idLink} | ${summary} | ${type} | ${section} | ${status} | ${result} |\n`;
  });

  out += `\n**Loại**\n\n`;
  out += `| Loại | Nghĩa là |\n`;
  out += `|---|---|\n`;
  out += `| Guideline chưa nói tới | Tình huống không có trong guideline |\n`;
  out += `| Guideline mơ hồ | Đọc guideline ra được hai cách hiểu trở lên |\n`;
  out += `| Guideline mâu thuẫn | Hai mục trong guideline nói ngược nhau |\n`;
  out += `| Pain point công cụ | Guideline rõ, nhưng làm trên CVAT chậm hoặc dễ sai |\n\n`;

  out += `**Trạng thái:** 🔴 Mở · 🗣️ Đang bàn · ↗️ Hỏi BTC · ✅ Đã chốt (trỏ sang QĐ) · 🛠️ Làm tool (trỏ sang \`source-tool/\`) · ⚪ Bỏ (ghi lý do)\n\n`;
  out += `---\n\n`;

  // Item details
  appData.items.forEach((item, idx) => {
    out += generateSingleItemMarkdown(item);
    if (idx < appData.items.length - 1) {
      out += `\n`;
    }
  });

  out += `\n---\n\n`;
  out += `## Mẫu để copy\n\n`;
  out += `\`\`\`markdown\n`;
  out += `## P-NNN\n\n`;
  out += `**Tóm tắt một dòng**\n\n`;
  out += `- **Loại:** Guideline chưa nói tới | Guideline mơ hồ | Guideline mâu thuẫn | Pain point công cụ\n`;
  out += `- **Mục guideline:** §\n`;
  out += `- **Người phát hiện:** @ · dd/mm/yyyy\n`;
  out += `- **Link CVAT:** (bỏ trống nếu không có)\n`;
  out += `  - https://…/tasks/<id>/jobs/<id>?frame=<n> — frame này có gì\n`;
  out += `- **Mô tả:**\n`;
  out += `- **Các cách hiểu:** (với pain point công cụ thì ghi **Hướng đang cân nhắc:**)\n`;
  out += `  1.\n`;
  out += `  2.\n`;
  out += `- **Xử lý tạm trong lúc chờ:**\n`;
  out += `- **Kết quả:** 🔴 Mở\n`;
  out += `\`\`\`\n\n`;
  out += `Nhớ thêm một dòng vào bảng **Danh sách** ở đầu file.\n`;

  return out;
}

function generateSingleItemMarkdown(item) {
  let s = `## ${item.id}\n\n`;
  s += `**${item.summary}**\n\n`;
  s += `- **Loại:** ${item.type}\n`;
  s += `- **Mục guideline:** ${item.sectionDetail || item.section || "—"}\n`;
  s += `- **Người phát hiện:** ${item.reporter || "@"} · ${item.date || ""}\n`;

  // CVAT links
  if (!item.cvatLinks || item.cvatLinks.length === 0) {
    s += `- **Link CVAT:** —\n`;
  } else if (item.cvatLinks.length === 1 && !item.cvatLinks[0].note) {
    s += `- **Link CVAT:** ${item.cvatLinks[0].url}\n`;
  } else {
    s += `- **Link CVAT:**\n`;
    item.cvatLinks.forEach(l => {
      if (l.note) {
        s += `  - ${l.url} — ${l.note}\n`;
      } else {
        s += `  - ${l.url}\n`;
      }
    });
  }

  // Description
  s += `- **Mô tả:** ${item.description || ""}\n`;

  // Options
  const isTool = item.type === "Pain point công cụ";
  const optionTitle = isTool ? "Hướng đang cân nhắc:" : "Các cách hiểu:";
  if (item.options && item.options.length > 0) {
    s += `- **${optionTitle}**\n`;
    item.options.forEach((opt, oIdx) => {
      s += `  ${oIdx + 1}. ${opt}\n`;
    });
  }

  // Workaround
  if (item.workaround) {
    s += `- **Xử lý tạm trong lúc chờ:** ${item.workaround}\n`;
  }

  // Result
  s += `- **Kết quả:** ${item.result || item.status || "🔴 Mở"}\n`;

  return s;
}

// --- Markdown Parser (Import markdown file) ---
function parseMarkdownToData(mdText) {
  const lines = mdText.split(/\r?\n/);
  const items = [];

  let currentItem = null;
  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect ## P-xxx (exclude ## Danh sách, ## Mẫu để copy)
    const headerMatch = line.match(/^##\s+(P-\d+)/i);
    if (headerMatch) {
      if (currentItem) {
        finalizeItem(currentItem);
        items.push(currentItem);
      }
      currentItem = {
        id: headerMatch[1].toUpperCase(),
        summary: "",
        summaryTable: "",
        type: "Guideline chưa nói tới",
        section: "—",
        sectionDetail: "—",
        reporter: "",
        date: "",
        cvatLinks: [],
        description: "",
        options: [],
        workaround: "",
        status: "🔴 Mở",
        result: "",
        resultTable: "—"
      };
      currentKey = "header";
      continue;
    }

    if (!currentItem) continue;

    // Detect stop at --- or ## Mẫu để copy
    if (line.match(/^##\s+Mẫu để copy/i)) {
      finalizeItem(currentItem);
      items.push(currentItem);
      currentItem = null;
      break;
    }

    // Summary line (bold line right after header)
    if (currentKey === "header" && line.trim().startsWith("**") && line.trim().endsWith("**")) {
      currentItem.summary = line.trim().replace(/^\*\*/, "").replace(/\*\*$/, "").trim();
      currentItem.summaryTable = currentItem.summary;
      currentKey = null;
      continue;
    }

    // Field matches
    const fieldMatch = line.match(/^[-\*]\s+\*\*([^:]+):\*\*(.*)$/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1].trim();
      const val = fieldMatch[2].trim();

      if (fieldName.includes("Loại")) {
        currentItem.type = val;
        currentKey = null;
      } else if (fieldName.includes("Mục guideline")) {
        currentItem.sectionDetail = val;
        const sMatch = val.match(/^(§[\d\.]+)/);
        currentItem.section = sMatch ? sMatch[1] : val.split("—")[0].trim();
        currentKey = null;
      } else if (fieldName.includes("Người phát hiện")) {
        const parts = val.split("·").map(p => p.trim());
        currentItem.reporter = parts[0] || "";
        currentItem.date = parts[1] || "";
        currentKey = null;
      } else if (fieldName.includes("Link CVAT")) {
        if (val && !val.startsWith("—")) {
          const parts = val.split("—").map(p => p.trim());
          currentItem.cvatLinks.push({ url: parts[0], note: parts[1] || "" });
        }
        currentKey = "cvatLinks";
      } else if (fieldName.includes("Mô tả")) {
        currentItem.description = val;
        currentKey = "description";
      } else if (fieldName.includes("Các cách hiểu") || fieldName.includes("Hướng đang cân nhắc")) {
        currentKey = "options";
      } else if (fieldName.includes("Xử lý tạm trong lúc chờ")) {
        currentItem.workaround = val;
        currentKey = "workaround";
      } else if (fieldName.includes("Kết quả")) {
        currentItem.result = val;
        // determine status from result
        if (val.includes("✅")) currentItem.status = "✅ Đã chốt";
        else if (val.includes("↗️")) currentItem.status = "↗️ Hỏi BTC";
        else if (val.includes("🗣️")) currentItem.status = "🗣️ Đang bàn";
        else if (val.includes("🛠️")) currentItem.status = "🛠️ Làm tool";
        else if (val.includes("⚪")) currentItem.status = "⚪ Bỏ";
        else currentItem.status = "🔴 Mở";

        const qdMatch = val.match(/\[QĐ-\d+\]\([^)]+\)/);
        currentItem.resultTable = qdMatch ? qdMatch[0] : (currentItem.status === "✅ Đã chốt" ? val : "—");
        currentKey = "result";
      }
      continue;
    }

    // Sub-lines for currentKey
    if (currentKey === "cvatLinks") {
      const linkMatch = line.match(/^\s*[-\*]\s+(https?:\/\/[^\s]+)(?:\s+—\s+(.*))?/);
      if (linkMatch) {
        currentItem.cvatLinks.push({ url: linkMatch[1], note: linkMatch[2] || "" });
      }
    } else if (currentKey === "options") {
      const optMatch = line.match(/^\s*\d+\.\s+(.*)$/);
      if (optMatch) {
        currentItem.options.push(optMatch[1].trim());
      }
    } else if (currentKey === "description") {
      if (line.trim().startsWith("- **")) {
        // next field
        i--;
        currentKey = null;
      } else if (line.trim()) {
        currentItem.description += "\n" + line.trim();
      }
    } else if (currentKey === "workaround") {
      if (line.trim().startsWith("- **")) {
        i--;
        currentKey = null;
      } else if (line.trim()) {
        currentItem.workaround += "\n" + line.trim();
      }
    } else if (currentKey === "result") {
      if (line.trim().startsWith("- **") || line.trim().startsWith("---")) {
        i--;
        currentKey = null;
      } else if (line.trim()) {
        currentItem.result += "\n" + line.trim();
      }
    }
  }

  if (currentItem) {
    finalizeItem(currentItem);
    items.push(currentItem);
  }

  return items;
}

function finalizeItem(it) {
  it.description = (it.description || "").trim();
  it.workaround = (it.workaround || "").trim();
  it.result = (it.result || "").trim();
}

// --- Event Listeners ---
function initEventListeners() {
  // Add button
  document.getElementById("btn-add").onclick = openAddModal;

  // Export MD button in header
  document.getElementById("btn-export-md").onclick = () => {
    openIOModal("tab-export-md");
  };

  // IO Hub button
  document.getElementById("btn-io").onclick = () => {
    openIOModal("tab-export-md");
  };

  // Help button
  document.getElementById("btn-help").onclick = () => {
    openIOModal("tab-guide");
  };

  // Reset button
  document.getElementById("btn-reset").onclick = () => {
    if (confirm("Khôi phục lại toàn bộ dữ liệu mẫu ban đầu từ problem-backlog.md?")) {
      appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveDataToStorage();
      renderAll();
      showToast("Đã khôi phục dữ liệu mẫu gốc", "info");
    }
  };

  // Search input
  document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderAll();
  });

  // Filter type
  document.getElementById("filter-type").addEventListener("change", (e) => {
    filterType = e.target.value;
    renderAll();
  });

  // Filter status
  document.getElementById("filter-status").addEventListener("change", (e) => {
    filterStatus = e.target.value;
    renderAll();
  });

  // View toggle
  document.getElementById("view-table-btn").onclick = () => setViewMode("table");
  document.getElementById("view-kanban-btn").onclick = () => setViewMode("kanban");

  // Dynamic row buttons in form
  document.getElementById("btn-add-cvat-link").onclick = () => addCvatLinkRow();
  document.getElementById("btn-add-option").onclick = () => addOptionRow();
  document.getElementById("btn-today").onclick = () => {
    document.getElementById("form-date").value = getTodayDateString();
  };
  document.getElementById("form-type").addEventListener("change", (e) => {
    updateOptionsLabel(e.target.value);
  });

  // Close modals
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".modal-backdrop").forEach(m => closeModal(m));
    };
  });

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Tab navigation in IO modal
  document.querySelectorAll("#modal-io .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
      updateIOPreviews();
    });
  });

  // Export buttons
  document.getElementById("btn-copy-md-content").onclick = () => {
    const md = generateFullMarkdown();
    copyToClipboard(md, "Đã sao chép Markdown vào bộ nhớ tạm!");
  };

  document.getElementById("btn-download-md-file").onclick = () => {
    const md = generateFullMarkdown();
    downloadFile(md, "problem-backlog.md", "text/markdown;charset=utf-8;");
  };

  document.getElementById("btn-copy-json-content").onclick = () => {
    const jsonStr = JSON.stringify(appData, null, 2);
    copyToClipboard(jsonStr, "Đã sao chép JSON vào bộ nhớ tạm!");
  };

  document.getElementById("btn-download-json-file").onclick = () => {
    const jsonStr = JSON.stringify(appData, null, 2);
    downloadFile(jsonStr, "problem-backlog.json", "application/json;charset=utf-8;");
  };

  // Import file handler
  document.getElementById("import-file-input").addEventListener("change", handleFileUpload);

  // Do Import button
  document.getElementById("btn-do-import").onclick = handleTextImport;
}

function setViewMode(mode) {
  currentView = mode;
  document.getElementById("view-table-btn").classList.toggle("active", mode === "table");
  document.getElementById("view-kanban-btn").classList.toggle("active", mode === "kanban");

  document.getElementById("table-container").style.display = mode === "table" ? "block" : "none";
  document.getElementById("kanban-container").style.display = mode === "kanban" ? "grid" : "none";
}

// Import processing
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    document.getElementById("import-text-input").value = content;
    handleTextImport();
  };
  reader.readAsText(file);
}

function handleTextImport() {
  const raw = document.getElementById("import-text-input").value.trim();
  const mergeMode = document.getElementById("import-merge-mode").checked;

  if (!raw) {
    alert("Vui lòng chọn file hoặc dán nội dung vào ô nhập liệu.");
    return;
  }

  let importedItems = [];

  // Try parsing JSON first
  if (raw.startsWith("{") || raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        importedItems = parsed;
      } else if (parsed && Array.isArray(parsed.items)) {
        importedItems = parsed.items;
        if (!mergeMode) {
          appData.title = parsed.title || appData.title;
          appData.intro = parsed.intro || appData.intro;
        }
      }
    } catch (e) {
      console.warn("Không thể parse dạng JSON, thử phân tích dạng Markdown:", e);
    }
  }

  // If JSON failed, try Markdown
  if (importedItems.length === 0) {
    importedItems = parseMarkdownToData(raw);
  }

  if (importedItems.length === 0) {
    alert("Không nhận diện được dữ liệu hợp lệ từ nội dung cung cấp. Vui lòng kiểm tra lại định dạng.");
    return;
  }

  if (mergeMode) {
    // Merge without duplicates by ID
    const existingIds = new Set(appData.items.map(i => i.id.toUpperCase()));
    let addedCount = 0;
    let updatedCount = 0;

    importedItems.forEach(item => {
      const idx = appData.items.findIndex(i => i.id.toUpperCase() === item.id.toUpperCase());
      if (idx !== -1) {
        appData.items[idx] = item;
        updatedCount++;
      } else {
        appData.items.push(item);
        addedCount++;
      }
    });
    showToast(`Đã gộp thành công: +${addedCount} mới, cập nhật ${updatedCount} mục`, "success");
  } else {
    appData.items = importedItems;
    showToast(`Đã nạp thành công ${importedItems.length} mục từ file`, "success");
  }

  saveDataToStorage();
  closeModal(document.getElementById("modal-io"));
  renderAll();
}

// --- Utilities ---
function openModal(modal) {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function copyToClipboard(text, successMsg = "Đã sao chép!") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, "success");
    }).catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast(successMsg, "success");
  } catch (err) {
    prompt("Hãy nhấn Ctrl+C để sao chép:", text);
  }
  document.body.removeChild(ta);
}

function downloadFile(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  showToast(`Đã tải file ${fileName}`, "success");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size: 18px;">
      ${type === "success" ? "check_circle" : type === "warning" ? "warning" : "info"}
    </span>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(100%)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdownLinkHtml(str) {
  if (!str) return "—";
  // Replace markdown links [Text](URL) with <a>
  const html = str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, p1, p2) => {
    return `<a href="${escapeHtml(p2)}" target="_blank" style="color: var(--primary); text-decoration: underline; font-weight: 500;">${escapeHtml(p1)}</a>`;
  });
  return html;
}

function renderMarkdownInline(str) {
  if (!str) return "";
  let s = escapeHtml(str);
  // Code `code`
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold **bold**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic *italic*
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: var(--primary); text-decoration: underline;">$1</a>');
  // Newlines
  s = s.replace(/\n/g, '<br>');
  return s;
}

