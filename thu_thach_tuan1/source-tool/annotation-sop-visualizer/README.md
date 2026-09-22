# annotation-sop-visualizer

**Giải quyết:** Trực quan hóa quy trình vận hành tiêu chuẩn (SOP Guideline) được phân tách độc lập thành 3 Hub chuyên biệt dành cho: **Team Leader**, **Annotator**, và **Reviewer (QC L1 & QA L2)**; chỉ rõ các tiêu chí cần đạt định lượng (Pass Criteria / KPIs) và tích hợp toàn bộ dữ liệu mẫu, taxonomy, edge cases thực tế từ guideline của dự án.

---

## 1. Cấu Trúc 3 Hub Chuyên Biệt Cho 3 Vai Trò

### 👑 Hub 1: Dành cho Team Leader (Quản Trị & Điều Phối)
- **Bộ tiêu chí cần đạt:**
  - Sản lượng định lượng đạt $\ge 100\%$ Work Units ($W = N_{\text{ảnh}} \times 19$ classes).
  - SLA giải quyết Issue ngoại lệ L2: $\le 2$ giờ.
  - Zero blocker tồn đọng quá 24h.
  - 100% nhân sự pass Protocol K-100 trước khi giao job.
- **Quy trình 5 bước:** Onboarding Gate K-100 $\rightarrow$ Phân bổ Job & Cân bằng tải $\rightarrow$ Daily Standup 15p $\rightarrow$ Xử lý cờ CVAT `UNCERTAIN_*` & Ban hành `QĐ-xxx` (Append-only) $\rightarrow$ Tổng hợp Báo cáo tuần & Ký nghiệm thu Wilson.
- **Ví dụ thực tế từ Guideline:**
  - *Ví dụ 1 (Tính sản lượng):* Job 1351 gồm 50 ảnh $\times$ 19 classes = 950 Work Units.
  - *Ví dụ 2 (Escalation L2):* Xử lý `P-001` đường khẩn cấp `area/alternative` $\rightarrow$ Ban hành `QĐ-001` chốt phương án áp dụng.
  - *Ví dụ 3 (Tooling):* Tiếp nhận nỗi đau `PP-001` $\rightarrow$ Chỉ đạo phát triển tool nội bộ dải cổng `9xxx`.

---

### ✏️ Hub 2: Dành cho Annotator (Thực Thi & Tự Kiểm)
- **Bộ tiêu chí cần đạt:**
  - Vượt qua Protocol K-100: Accuracy $\ge 98\%$, Cohen's Kappa $\ge 0.85$, BBox IoU $\ge 0.85$, Semantic mIoU $\ge 0.80$, 0 lỗi Critical.
  - Tỷ lệ Rework vòng QC L1 $< 3.0\%$.
  - 100% hộp BBox đạt chuẩn Tightness (bao trọn gương, chạm đáy lốp, không chứa bóng đổ).
  - 0 đoán mò: Dừng ngay khi phân vân quá 30s và gắn cờ `UNCERTAIN_*`.
- **Quy trình 5 bước:** Quét 3s & chỉnh sáng $\rightarrow$ Chiến thuật Layering 6 lớp (Nền sâu ra Tiền cảnh) $\rightarrow$ Kích thước từ Lớn đến Nhỏ (Truck/Bus làm mỏ neo) $\rightarrow$ Quét Z-Scan & Vanishing Point $\rightarrow$ 60s Self-QC "3 Không - 3 Đủ".
- **Ví dụ thực tế từ Guideline:**
  - *Frame B026 (Job 1351):* Xe `car` bị che 40% bật `occluded=true`; xe `truck` cắt mép bật `truncated=true`.
  - *Phân biệt `rider` vs `pedestrian`:* Người lái xe máy vẽ box `rider` đè box `motorcycle`; người dắt bộ vẽ box `pedestrian` cạnh box `motorcycle`.
  - *Cột đèn tín hiệu (Semantic Seg):* Hộp đèn = `traffic_light`; Cột treo = `pole` (theo `QĐ-001`).

---

### 🔍 Hub 3: Dành cho Reviewer (QC L1 & QA L2 Kiểm Định Chất Lượng)
- **Bộ tiêu chí cần đạt:**
  - Tỷ lệ lấy mẫu: Đủ $\ge 25\%$ Job (QC L1) và mẫu ngẫu nhiên độc lập $n \ge 80$ (QA L2).
  - Ngưỡng Pass L1: $0$ Critical, Điểm phạt bình quân $\overline{\text{DP}} \le 0.3$ điểm/frame.
  - Ngưỡng Pass L2: $0$ Critical, Cận dưới khoảng tin cậy Wilson $w^- \ge 95.00\%$.
  - SLA phản hồi feedback: $\le 4$ giờ.
- **Quy trình kiểm định 2 tầng:**
  - *Tầng 1 (QC L1):* Soát lỗi theo 3 mức Critical (-10đ), Major (-3đ), Minor (-1đ).
  - *Tầng 2 (QA L2):* Lấy mẫu Wilson $n=100$ hoặc $n=200$, giải phương trình Wilson 95% ($z=1.96$) để ra quyết định Accept/Reject.
- **Ví dụ thực tế từ Guideline:**
  - *Lỗi Critical:* Frame B032 bỏ sót 1 người đi bộ trong bóng râm $\rightarrow$ **Reject ngay 100% Job**.
  - *Kiểm định Wilson QA:* Mẫu $n=100$, 0 lỗi $\rightarrow$ $w^- = 96.30\% \ge 95\%$ $\rightarrow$ **Accept**. Nếu 1 lỗi $\rightarrow$ $w^- = 94.55\% < 95\%$ $\rightarrow$ **Reject**.

---

## 2. Các Phân Hệ Tính Toán Thời Gian Thực

1. **Máy Tính Khoảng Tin Cậy Wilson (Wilson Score Calculator):** Kéo thanh trượt $n$ và $e$, hiển thị $w^-$ thời gian thực kèm thanh đo so với vạch đỏ 95.00%.
2. **Mô Phỏng Protocol K-100 (K-100 Simulator):** Đánh giá các ngưỡng Acc, Kappa, IoU, mIoU và Lỗi Critical.
3. **Bộ Tính Điểm Phạt QC L1 (Demerit Points Engine):** Tự động tính $\overline{\text{DP}}$ và đề xuất quyết định.
4. **Trình Tạo Biên Bản Nghiệm Thu (Batch Acceptance Sign-off Generator):** Tự động sinh biên bản có đủ 3 chữ ký: Team Leader, QA Lead và Project Manager.

---

## 3. Khởi Chạy & Sử Dụng

Công cụ chạy hoàn toàn độc lập (**Zero-dependency**):

```bash
cd source-tool/annotation-sop-visualizer
./run.sh
```

> 🌐 Mở trình duyệt tại: `http://localhost:9002`
