/**
 * ANNOTATION SOP VISUALIZER & QUALITY MANAGEMENT ENGINE
 * Developed for AI20K • G01-T006
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRoleFilters();
  initPipelineSteps();
  initWilsonCalculator();
  initDemeritCalculator();
  initK100Simulator();
  initLeaderWorkUnits();
  initChecklistStorage();
  initReportGenerator();
});

// ==========================================
// 1. NAVIGATION & TAB SWITCHING
// ==========================================
function initNavbar() {
  const tabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.content-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.style.display = 'block';
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          sec.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 2. ROLE FILTERING (Leader, Annotator, QC, QA)
// ==========================================
function initRoleFilters() {
  const rolePills = document.querySelectorAll('.role-pill');
  const roleCards = document.querySelectorAll('[data-role]');

  rolePills.forEach(pill => {
    pill.addEventListener('click', () => {
      rolePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const selectedRole = pill.dataset.roleFilter;

      roleCards.forEach(card => {
        const roles = card.dataset.role.split(' ');
        if (selectedRole === 'all' || roles.includes(selectedRole)) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 3. PIPELINE STEP DETAIL VIEWER
// ==========================================
const PIPELINE_DATA = [
  {
    id: 1,
    title: "1. Sát hạch Giao thức Protocol K-100",
    role: "QA L2 & Team Leader",
    roleBadge: "badge-purple",
    icon: "military_tech",
    iconBg: "linear-gradient(135deg, #a855f7, #6366f1)",
    summary: "Thẩm định năng lực bắt buộc trên bộ 100 khung hình chuẩn (Golden Benchmark) trước khi phân bổ vào Job Production.",
    raci: "Annotator (R) · Team Leader (A) · Tech Lead/QA L2 (A) · Mentor (I)",
    passCriteria: [
      "Độ chính xác Classification Accuracy >= 98.0%",
      "Hệ số đồng thuận Cohen's Kappa >= 0.85",
      "Độ khít Bounding Box IoU trung bình >= 0.85",
      "Độ chính xác Semantic Segmentation mIoU >= 0.80",
      "Tuyệt đối 0 lỗi Critical (không sót người, không sai mặt đường/vỉa hè)"
    ],
    details: "Tập K-100 được thiết kế với 40 frame Dễ, 35 frame Thách thức (che khuất/cắt mép) và 25 frame Edge Cases (ngược sáng, ban đêm, bóng đổ). Nếu trượt, học viên phải retraining và thi lại đề $K_2$."
  },
  {
    id: 2,
    title: "2. Kế hoạch Tuần & Phân bổ Job CVAT",
    role: "Team Leader",
    roleBadge: "badge-warning",
    icon: "assignment",
    iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
    summary: "Leader thiết lập cấu hình Job trên CVAT, cân bằng tải sản lượng và phân cặp Peer Review chéo.",
    raci: "Team Leader (A/R) · Annotator (I) · Tech Lead (C)",
    passCriteria: [
      "100% nhân sự được giao job đã vượt qua Protocol K-100",
      "Tính toán sản lượng theo Work Units: W = N_ảnh * 19 nhãn",
      "Phân cặp Review chéo rõ ràng (cấm tự review bài mình)",
      "Daily Standup 15 phút mỗi sáng giải phóng blocker ⛔"
    ],
    details: "Leader theo dõi tiến độ thời gian thực trên CVAT và nhat-ky-tuan/. Đảm bảo các rào cản thao tác hoặc đau mỏi thể chất được ghi nhận vào pain-points.md và giải quyết dứt điểm bằng tool tại source-tool/ (cổng 9xxx)."
  },
  {
    id: 3,
    title: "3. Gán nhãn 5 bước & 60s Self-QC",
    role: "Annotator",
    roleBadge: "badge-primary",
    icon: "draw",
    iconBg: "linear-gradient(135deg, #6366f1, #3b82f6)",
    summary: "Annotator thực thi quy trình gán nhãn chuẩn hóa từ Nền ra Tiền cảnh và tự kiểm soát chất lượng trước khi nộp.",
    raci: "Annotator (A/R) · Peer QC (I) · Leader (I)",
    passCriteria: [
      "Tuân thủ chiến thuật Layering: Nền (Drivable/Sky) -> Lanes -> Xe lớn -> Xe nhỏ/Người",
      "Quét không gian Z-Scan & Vanishing Point Outward",
      "Chạy bộ checklist 60 giây Self-QC '3 Không - 3 Đủ'",
      "Gặp ca khó > 30s: DỪNG LẬP TỨC, không đoán, gắn cờ UNCERTAIN_* trên CVAT"
    ],
    details: "Sau khi hoàn thành, annotator bấm Save và đổi trạng thái Job sang 'Validation' để chuyển giao sang vòng kiểm định QC L1."
  },
  {
    id: 4,
    title: "4. Kiểm định QC L1 (Peer Review 25%)",
    role: "Peer QC (L1)",
    roleBadge: "badge-cyan",
    icon: "find_in_page",
    iconBg: "linear-gradient(135deg, #06b6d4, #0284c7)",
    summary: "Vòng kiểm soát chất lượng đồng cấp, lấy mẫu ngẫu nhiên phân tầng tối thiểu 25% tổng số frame của Job.",
    raci: "Peer QC L1 (R) · Team Leader (A) · Annotator (R - nếu sửa)",
    passCriteria: [
      "PASS HOÀN TOÀN: 0 Critical, 0 Major, Điểm phạt DP <= 0.3 điểm/frame",
      "PASS CÓ ĐIỀU KIỆN: 0 Critical, DP <= 1.5 -> Annotator sửa frame lỗi trong 2h",
      "REJECT TOÀN BỘ JOB: >= 1 lỗi Critical HOẶC DP > 1.5 -> Trả về làm lại 100%"
    ],
    details: "Peer Reviewer chấm điểm dựa trên thang đo sai số: Critical (-10 điểm), Major (-3 điểm), Minor (-1 điểm). Ghi nhận feedback cụ thể trên từng frame CVAT."
  },
  {
    id: 5,
    title: "5. Kiểm định Thống kê Wilson QA L2",
    role: "Tech Lead / QA L2",
    roleBadge: "badge-danger",
    icon: "analytics",
    iconBg: "linear-gradient(135deg, #ef4444, #dc2626)",
    summary: "Vòng kiểm định khoa học độc lập cấp cao nhất dựa trên Khoảng tin cậy Wilson để nghiệm thu hoặc từ chối toàn bộ Lô dữ liệu.",
    raci: "QA Lead L2 (R) · Project Manager (A) · Team Leader (C)",
    passCriteria: [
      "Cỡ mẫu kiểm định tối thiểu n >= 80 frame ngẫu nhiên",
      "Cận dưới khoảng tin cậy Wilson 95% thỏa mãn: w- >= 95.00%",
      "Tuyệt đối 0 lỗi Critical trong mẫu kiểm tra",
      "Nếu w- < 95.00%: REJECT BATCH, trả về toàn bộ lô hàng để rà soát"
    ],
    details: "Khắc phục sai lệch của công thức Wald khi mẫu nhỏ hoặc tỷ lệ đạt cao. Với n=100 ảnh, cho phép tối đa 0 lỗi; với n=150 ảnh, cho phép tối đa 2 lỗi; với n=200 ảnh, cho phép tối đa 3 lỗi."
  },
  {
    id: 6,
    title: "6. Ký Nghiệm thu & Bàn giao Sản phẩm",
    role: "Team Leader & Project Manager",
    roleBadge: "badge-success",
    icon: "task_alt",
    iconBg: "linear-gradient(135deg, #10b981, #059669)",
    summary: "Ký Biên bản Nghiệm thu Lô hàng (Batch Acceptance Report) có giá trị pháp lý kỹ thuật và xuất dữ liệu sang pipeline huấn luyện AI.",
    raci: "Team Leader (R) · Project Manager / Mentor (A/R) · QA Lead (C)",
    passCriteria: [
      "Đầy đủ 3 chữ ký: Team Leader, QA Lead, Project Manager",
      "Biên bản đính kèm bảng thống kê chi tiết lỗi và chỉ số Wilson w-",
      "Toàn bộ mã P-xxx liên quan trong tuần đã chuyển trạng thái ✅ Đã chốt",
      "Export dữ liệu đúng chuẩn định dạng (COCO JSON / Pascal VOC / Mask PNG)"
    ],
    details: "Dữ liệu được bàn giao chính thức cho khách hàng hoặc đưa vào training các mô hình tự hành và thị giác máy tính."
  }
];

function initPipelineSteps() {
  const container = document.getElementById('pipelineGrid');
  const detailContainer = document.getElementById('stepDetailContainer');
  if (!container || !detailContainer) return;

  container.innerHTML = PIPELINE_DATA.map((step, idx) => `
    <div class="pipeline-step ${idx === 0 ? 'active' : ''}" data-step-id="${step.id}">
      <div class="step-number">0${step.id}</div>
      <div class="step-icon" style="background: ${step.iconBg}">
        <span class="material-symbols-outlined">${step.icon}</span>
      </div>
      <div class="step-title">${step.title}</div>
      <div class="step-role">
        <span class="material-symbols-outlined" style="font-size: 14px;">person</span>
        ${step.role}
      </div>
    </div>
  `).join('');

  const steps = container.querySelectorAll('.pipeline-step');
  steps.forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      stepEl.classList.add('active');
      const stepId = parseInt(stepEl.dataset.stepId, 10);
      renderStepDetail(stepId);
    });
  });

  // Render first step detail by default
  renderStepDetail(1);
}

function renderStepDetail(stepId) {
  const detailContainer = document.getElementById('stepDetailContainer');
  const step = PIPELINE_DATA.find(s => s.id === stepId);
  if (!detailContainer || !step) return;

  detailContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <span class="badge-tag ${step.roleBadge}" style="margin-bottom: 0.5rem;">
          <span class="material-symbols-outlined" style="font-size: 14px;">person</span>
          ${step.role}
        </span>
        <h3 style="font-size: 1.4rem; font-weight: 800; color: white;">${step.title}</h3>
      </div>
      <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem 1rem; font-size: 0.8rem; color: #cbd5e1;">
        <strong>Phân quyền RACI:</strong> ${step.raci}
      </div>
    </div>

    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">
      ${step.summary}
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
      <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
          <span class="material-symbols-outlined" style="font-size: 18px;">verified</span>
          Tiêu chuẩn Vượt qua (Pass Criteria)
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${step.passCriteria.map(crit => `
            <li style="font-size: 0.85rem; color: #e2e8f0; display: flex; align-items: flex-start; gap: 0.5rem;">
              <span class="material-symbols-outlined" style="color: #10b981; font-size: 16px; margin-top: 2px;">check_circle</span>
              <span>${crit}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
          <span class="material-symbols-outlined" style="font-size: 18px;">info</span>
          Lưu ý Kỹ thuật & Thực thi
        </h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          ${step.details}
        </p>
      </div>
    </div>
  `;
}

// ==========================================
// 4. INTERACTIVE WILSON SCORE CALCULATOR
// ==========================================
function calculateWilsonLower(pHat, n, z = 1.96) {
  if (n <= 0) return 0;
  const denominator = 1 + (z * z) / n;
  const center = pHat + (z * z) / (2 * n);
  const spread = z * Math.sqrt((pHat * (1 - pHat) / n) + ((z * z) / (4 * n * n)));
  return (center - spread) / denominator;
}

function initWilsonCalculator() {
  const sampleSlider = document.getElementById('wilsonSampleSize');
  const sampleInput = document.getElementById('wilsonSampleInput');
  const errorInput = document.getElementById('wilsonErrors');
  const errorBadge = document.getElementById('wilsonErrorBadge');
  
  const pHatDisplay = document.getElementById('wilsonPHat');
  const lowerBoundDisplay = document.getElementById('wilsonLowerBound');
  const statusBanner = document.getElementById('wilsonStatusBanner');
  const barFill = document.getElementById('wilsonBarFill');
  const barLabel = document.getElementById('wilsonBarLabel');
  const matrixRows = document.querySelectorAll('.wilson-matrix-row');

  if (!sampleSlider || !errorInput) return;

  function update() {
    let n = parseInt(sampleSlider.value, 10);
    let e = parseInt(errorInput.value, 10);

    if (isNaN(n) || n < 10) n = 10;
    if (isNaN(e) || e < 0) e = 0;
    if (e > n) e = n;

    sampleSlider.value = n;
    sampleInput.value = n;
    errorInput.value = e;
    errorBadge.textContent = `${e} ảnh lỗi`;

    const k = n - e;
    const pHat = k / n;
    const lowerBound = calculateWilsonLower(pHat, n, 1.96);

    const pHatPercent = (pHat * 100).toFixed(1);
    const lowerPercent = (lowerBound * 100).toFixed(2);

    pHatDisplay.textContent = `${pHatPercent}%`;
    lowerBoundDisplay.textContent = `${lowerPercent}%`;

    const isAccepted = lowerBound >= 0.95 && n >= 80 && e >= 0;

    if (isAccepted) {
      statusBanner.className = 'result-status-banner status-accept';
      statusBanner.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 28px;">verified</span>
        <div>
          <div>NGHIỆM THU CHẤP THUẬN (ACCEPTED)</div>
          <div style="font-size: 0.78rem; font-weight: 500; opacity: 0.9;">Cận dưới Wilson ${lowerPercent}% đạt chuẩn an toàn &ge; 95.00%</div>
        </div>
      `;
      barFill.style.background = '#10b981';
      lowerBoundDisplay.style.color = '#10b981';
    } else {
      statusBanner.className = 'result-status-banner status-reject';
      let reason = `Cận dưới Wilson ${lowerPercent}% dưới ngưỡng tối thiểu 95.00%`;
      if (n < 80) reason = `Cỡ mẫu n = ${n} quá nhỏ (yêu cầu n &ge; 80 để đủ độ tin cậy thống kê)`;
      statusBanner.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 28px;">gpp_bad</span>
        <div>
          <div>TỪ CHỐI LÔ DỮ LIỆU (REJECTED)</div>
          <div style="font-size: 0.78rem; font-weight: 500; opacity: 0.9;">${reason}</div>
        </div>
      `;
      barFill.style.background = '#ef4444';
      lowerBoundDisplay.style.color = '#ef4444';
    }

    const fillWidth = Math.max(0, Math.min(100, lowerBound * 100));
    barFill.style.width = `${fillWidth}%`;
    barLabel.textContent = `w- = ${lowerPercent}%`;

    // Highlight matching row in reference matrix
    matrixRows.forEach(row => {
      const rowN = parseInt(row.dataset.n, 10);
      const rowE = parseInt(row.dataset.e, 10);
      if (rowN === n && rowE === e) {
        row.classList.add('highlight');
      } else {
        row.classList.remove('highlight');
      }
    });
  }

  sampleSlider.addEventListener('input', (e) => {
    sampleInput.value = e.target.value;
    update();
  });

  sampleInput.addEventListener('change', (e) => {
    sampleSlider.value = e.target.value;
    update();
  });

  errorInput.addEventListener('input', update);

  update();
}

// ==========================================
// 5. DEFECT SEVERITY & DEMERIT POINTS CALCULATOR
// ==========================================
function initDemeritCalculator() {
  const critInput = document.getElementById('dpCritical');
  const majorInput = document.getElementById('dpMajor');
  const minorInput = document.getElementById('dpMinor');
  const sampleInput = document.getElementById('dpSampleFrames');

  const totalDpDisplay = document.getElementById('dpTotalDisplay');
  const avgDpDisplay = document.getElementById('dpAvgDisplay');
  const decisionDisplay = document.getElementById('dpDecisionDisplay');

  if (!critInput || !majorInput || !minorInput) return;

  function update() {
    const c = parseInt(critInput.value, 10) || 0;
    const m = parseInt(majorInput.value, 10) || 0;
    const mi = parseInt(minorInput.value, 10) || 0;
    const n = parseInt(sampleInput.value, 10) || 1;

    const totalDP = (c * 10) + (m * 3) + (mi * 1);
    const avgDP = (totalDP / Math.max(1, n)).toFixed(2);

    totalDpDisplay.textContent = totalDP;
    avgDpDisplay.textContent = avgDP;

    if (c > 0) {
      decisionDisplay.className = 'status-reject';
      decisionDisplay.innerHTML = `<strong>REJECT TOÀN BỘ JOB</strong> (Phát hiện ${c} lỗi Critical chí mạng -> Trả về làm lại 100%)`;
    } else if (parseFloat(avgDP) > 1.5) {
      decisionDisplay.className = 'status-reject';
      decisionDisplay.innerHTML = `<strong>REJECT TOÀN BỘ JOB</strong> (Điểm phạt trung bình ${avgDP} > 1.5 điểm/frame)`;
    } else if (parseFloat(avgDP) > 0.3 || m > 0) {
      decisionDisplay.className = 'status-accept';
      decisionDisplay.style.borderColor = '#f59e0b';
      decisionDisplay.style.background = 'rgba(245, 158, 11, 0.15)';
      decisionDisplay.style.color = '#fbbf24';
      decisionDisplay.innerHTML = `<strong>PASS CÓ ĐIỀU KIỆN</strong> (0 Critical, DP = ${avgDP} -> Annotator sửa các frame chỉ định trong 2h)`;
    } else {
      decisionDisplay.className = 'status-accept';
      decisionDisplay.style.borderColor = '#10b981';
      decisionDisplay.style.background = 'rgba(16, 185, 129, 0.15)';
      decisionDisplay.style.color = '#34d399';
      decisionDisplay.innerHTML = `<strong>PASS HOÀN TOÀN (L1 CLEARED)</strong> (0 Critical, 0 Major, DP = ${avgDP} <= 0.3 -> Chuyển tiếp lên QA L2)`;
    }
  }

  critInput.addEventListener('input', update);
  majorInput.addEventListener('input', update);
  minorInput.addEventListener('input', update);
  sampleInput.addEventListener('input', update);

  update();
}

// ==========================================
// 6. PROTOCOL K-100 SIMULATOR
// ==========================================
function initK100Simulator() {
  const accSlider = document.getElementById('kAcc');
  const kappaSlider = document.getElementById('kKappa');
  const iouSlider = document.getElementById('kIoU');
  const miouSlider = document.getElementById('kMIoU');
  const critSelect = document.getElementById('kCrit');
  const resultCard = document.getElementById('k100Result');

  if (!accSlider || !resultCard) return;

  function evaluate() {
    const acc = parseFloat(accSlider.value);
    const kappa = parseFloat(kappaSlider.value);
    const iou = parseFloat(iouSlider.value);
    const miou = parseFloat(miouSlider.value);
    const crit = parseInt(critSelect.value, 10);

    document.getElementById('kAccVal').textContent = `${acc.toFixed(1)}%`;
    document.getElementById('kKappaVal').textContent = kappa.toFixed(2);
    document.getElementById('kIoUVal').textContent = iou.toFixed(2);
    document.getElementById('kMIoUVal').textContent = miou.toFixed(2);

    const isPass = acc >= 98.0 && kappa >= 0.85 && iou >= 0.85 && miou >= 0.80 && crit === 0;

    if (isPass) {
      resultCard.className = 'calc-result-box status-accept';
      resultCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #10b981;">military_tech</span>
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #34d399;">CHÚC MỪNG: VƯỢT QUA PROTOCOL K-100</h4>
            <p style="font-size: 0.85rem; color: #cbd5e1;">Học viên thỏa mãn toàn bộ 4 chỉ số định lượng khắt khe và 0 lỗi Critical. Cấp quyền phân bổ Job Production.</p>
          </div>
        </div>
      `;
    } else {
      let reasons = [];
      if (acc < 98.0) reasons.push(`Accuracy (${acc}%) < 98%`);
      if (kappa < 0.85) reasons.push(`Kappa (${kappa}) < 0.85`);
      if (iou < 0.85) reasons.push(`IoU (${iou}) < 0.85`);
      if (miou < 0.80) reasons.push(`mIoU (${miou}) < 0.80`);
      if (crit > 0) reasons.push(`Phát hiện ${crit} lỗi Critical chí mạng`);

      resultCard.className = 'calc-result-box status-reject';
      resultCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span class="material-symbols-outlined" style="font-size: 36px; color: #ef4444;">cancel</span>
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #f87171;">CHƯA ĐẠT CHUẨN K-100</h4>
            <p style="font-size: 0.85rem; color: #cbd5e1;">Lý do: ${reasons.join(', ')}. Yêu cầu đào tạo lại (Re-training) và làm lại bài kiểm định K-100 khác.</p>
          </div>
        </div>
      `;
    }
  }

  accSlider.addEventListener('input', evaluate);
  kappaSlider.addEventListener('input', evaluate);
  iouSlider.addEventListener('input', evaluate);
  miouSlider.addEventListener('input', evaluate);
  critSelect.addEventListener('change', evaluate);

  evaluate();
}

// ==========================================
// 7. LEADER WORK UNITS CALCULATOR
// ==========================================
function initLeaderWorkUnits() {
  const imagesInput = document.getElementById('leaderNumImages');
  const wuDisplay = document.getElementById('leaderWorkUnitsDisplay');
  if (!imagesInput || !wuDisplay) return;

  function update() {
    const num = parseInt(imagesInput.value, 10) || 0;
    const units = num * 19; // 19 classes per guideline
    wuDisplay.textContent = units.toLocaleString();
  }

  imagesInput.addEventListener('input', update);
  update();
}

// ==========================================
// 8. CHECKLIST PERSISTENCE (LocalStorage)
// ==========================================
function initChecklistStorage() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const STORAGE_KEY = 'annotation_sop_checklist_state';

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  checkboxes.forEach(cb => {
    const id = cb.id;
    if (saved[id]) {
      cb.checked = true;
      const text = cb.parentElement.querySelector('.checklist-text');
      if (text) text.classList.add('checked');
    }

    cb.addEventListener('change', () => {
      saved[id] = cb.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

      const text = cb.parentElement.querySelector('.checklist-text');
      if (text) {
        if (cb.checked) text.classList.add('checked');
        else text.classList.remove('checked');
      }
    });
  });
}

// ==========================================
// 9. BATCH ACCEPTANCE REPORT GENERATOR
// ==========================================
function initReportGenerator() {
  const form = document.getElementById('reportForm');
  const previewBtn = document.getElementById('previewReportBtn');
  const modal = document.getElementById('reportModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const printReportBtn = document.getElementById('printReportBtn');
  const copyMdBtn = document.getElementById('copyReportMdBtn');
  const reportContent = document.getElementById('reportPreviewContent');

  if (!previewBtn || !modal) return;

  function generateMarkdown() {
    const batchId = document.getElementById('repBatchId').value || 'BATCH-2026-001';
    const taskType = document.getElementById('repTaskType').value;
    const totalFrames = document.getElementById('repTotalFrames').value || '1000';
    const sampleSize = document.getElementById('repSampleSize').value || '100';
    const errorCount = document.getElementById('repErrorCount').value || '0';
    const leaderName = document.getElementById('repLeaderName').value || 'Phạm Xuân Duy';
    const qaName = document.getElementById('repQaName').value || 'QA Lead';
    const pmName = document.getElementById('repPmName').value || 'Project Manager';
    const date = new Date().toLocaleDateString('vi-VN');

    const n = parseInt(sampleSize, 10);
    const e = parseInt(errorCount, 10);
    const k = n - e;
    const pHat = (k / n * 100).toFixed(1);
    const lowerBound = (calculateWilsonLower(k / n, n, 1.96) * 100).toFixed(2);
    const isAccepted = parseFloat(lowerBound) >= 95.00 && n >= 80 && e <= 3;

    return `# BIÊN BẢN NGHIỆM THU CHẤT LƯỢNG DỮ LIỆU (BATCH ACCEPTANCE REPORT)

- **Mã Lô Dữ Liệu (Batch ID):** ${batchId}
- **Dạng tác vụ:** ${taskType}
- **Tổng quy mô Lô hàng (N_total):** ${totalFrames} frames
- **Ngày kiểm định:** ${date}
- **Trưởng đội gán nhãn (Team Leader):** @${leaderName}
- **Trưởng nhóm QA (Auditor):** @${qaName}
- **Trưởng dự án (Project Manager):** @${pmName}

---

### 1. Kết quả Kiểm định Mẫu Thống kê (Wilson Audit)
- **Cỡ mẫu kiểm định (n):** ${sampleSize} frames (Rút ngẫu nhiên từ Lô hàng)
- **Số frame hoàn hảo không lỗi (k):** ${k} frames
- **Số frame phát hiện lỗi (e):** ${e} frames
- **Tỷ lệ đạt quan sát trên mẫu (p̂):** ${pHat}%
- **Mức độ tin cậy áp dụng:** 95% (z = 1.96)

**Cận dưới khoảng tin cậy Wilson (Wilson Lower Bound):**
w- = **${lowerBound}%** (Ngưỡng yêu cầu: >= 95.00%)

---

### 2. Kết luận & Phê duyệt
- **Điều kiện Nghiệm thu:** 0 Lỗi Critical VÀ Cận dưới Wilson w- >= 95.00%.
- **Đánh giá:** ${isAccepted ? '✅ **CHẤP THUẬN (ACCEPTED):** Lô dữ liệu đạt chuẩn xuất sắc, bàn giao pipeline mô hình.' : '❌ **TỪ CHỐI (REJECTED):** Lô dữ liệu không đạt chuẩn thống kê, yêu cầu rà soát làm lại.'}

**Chữ ký xác nhận:**
- Team Leader: @${leaderName} (Đã ký)
- QA Lead: @${qaName} (Đã ký)
- Project Manager: @${pmName} (Đã ký)
`;
  }

  previewBtn.addEventListener('click', () => {
    const md = generateMarkdown();
    reportContent.textContent = md;
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  copyMdBtn.addEventListener('click', () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md).then(() => {
      copyMdBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">check</span> Đã sao chép!`;
      setTimeout(() => {
        copyMdBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Sao chép Markdown`;
      }, 2000);
    });
  });

  printReportBtn.addEventListener('click', () => {
    window.print();
  });
}
