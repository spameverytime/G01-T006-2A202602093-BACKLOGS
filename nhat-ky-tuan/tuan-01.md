# Nhật ký tuần 01 · 14/09 – 20/09/2026 — Phạm Xuân Duy

## Thông tin cá nhân
- **Học viên:** Phạm Xuân Duy
- **MSSV:** 2A202602093
- **Email:** 26ai.duypx@vinuni.edu.vn
- **Lớp học phần:** AI Action khóa IV
- **Đội:** T006 — Nhóm 01 (G01) | **Repo:** `G01-T006-Phạm Xuân Duy-2A202602093`
- **Tài khoản GitHub:** @spameverytime
- **Vai trò tuần 01:** Annotator
- **Dữ liệu / Task CVAT phụ trách:** [Task 125](https://cvat.note.transformerlabs.ai/tasks/125) (BBox & Polyline), [Task 178](https://cvat.note.transformerlabs.ai/tasks/178) (Semantic Segmentation)

---

## 1. Phân công nhiệm vụ cá nhân

| # | Nhiệm vụ / Job CVAT | Dạng gán nhãn | Quy mô | Tiến độ | Trạng thái |
|:---:|---|---|:---:|:---:|---|
| 1 | **Job [1351](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351)** (Task 125) | Bounding Box & Polyline | 25 ảnh | **🟡 70%** | Đã gán các đối tượng chính, dừng chờ review đợt 1 & chốt edge cases |
| 2 | **Job [1564](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1564)** (Task 178) | Semantic Segmentation | 50 ảnh | **🟡 95%** | Hoàn thành 100% đối tượng `sky`, `building`, `vegetation` (50/50 ảnh) và `sidewalk`; rà soát các chi tiết nhỏ trước nghiệm thu |

*Quy ước mức hoàn thành:* `✅ 100%`: Hoàn thành & đã qua review · `🟡 xx%`: Đang làm (kèm %) · `⛔ xx%`: Bị chặn (kèm mã P-xxx) · `⬜ 0%`: Chưa bắt đầu.

---

## 2. Chi tiết thực hiện & Nhật ký tiến độ hàng ngày (Daily Log)

### 2.1. Chi tiết các Job phụ trách
- **Job [1351](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351) (Task 125 — Bounding Box & Polyline):**
  - **Quy mô:** 25 ảnh giao thông đô thị.
  - **Bộ nhãn thực hiện:** `pedestrian`, `rider`, `car`, `truck`, `bus`, `train`, `motorcycle`, `bicycle`, `traffic light`, `traffic sign`, `area/drivable`, `area/alternative`, `lane/crosswalk`, `lane/double white`, `lane/double yellow`, `lane/road curb`, `lane/single other`, `lane/single white`, `lane/single yellow`.
  - **Tiến độ hiện tại:** **🟡 70%**.
- **Job [1564](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1564) (Task 178 — Semantic Segmentation):**
  - **Quy mô:** 50 ảnh giao thông đô thị.
  - **Bộ nhãn thực hiện:** `road`, `sidewalk`, `building`, `wall`, `fence`, `pole`, `traffic_light`, `traffic_sign`, `vegetation`, `terrain`, `sky`, `person`, `rider`, `car`, `truck`, `bus`, `train`, `motorcycle`, `bicycle`.
  - **Tiến độ hiện tại:** **🟡 95%** (Hoàn thành toàn diện 50/50 ảnh cho các lớp nền và hạ tầng chủ đạo: `sky`, `building`, `vegetation`, `sidewalk` và lòng đường; chuẩn bị rà soát self-QC các chi tiết nhỏ).

### 2.2. Nhật ký công việc hàng ngày (Daily Log)
- **15/09/2026:**
  - Tiếp nhận Job 1351 và Job 1564 trên CVAT. Nghiên cứu kỹ 2 bộ tài liệu hướng dẫn: [`Annotation_Guideline_BBox_Polygon_Polyline_v1.md`](../Annotation_Guideline_BBox_Polygon_Polyline_v1.md) và [`Semantic_Segmentation_Annotation_Guideline.md`](../Semantic_Segmentation_Annotation_Guideline.md).
  - Bắt đầu gán nhãn Job 1351: Tập trung gán nhãn các đối tượng phương tiện chính (`car`, `truck`, `bus`).
- **16/09/2026:**
  - Tiếp tục Job 1351: Gán các đối tượng người (`pedestrian`, `rider`), biển báo và tín hiệu (`traffic light`, `traffic sign`).
  - Gán polyline cho các vạch kẻ đường đơn (`lane/single white`, `lane/single yellow`).
  - Đạt mốc 50% khối lượng Job 1351.
- **17/09/2026:**
  - **Sáng:** Thực hiện các nhãn vạch kẻ và khu vực phức tạp trên Job 1351 (`lane/double white`, `lane/crosswalk`, `area/drivable`). Phát hiện các edge cases bất thường (xe tải chở xe con, xe lóa đèn, vạch ô vuông, vạch đôi).
  - Đối chiếu guideline, phân tích và ghi nhận 05 edge cases vào [`problem-backlog.md`](../problem-backlog.md) từ [P-001] đến [P-005]. Chốt tiến độ Job 1351 đạt **🟡 70%**, dừng chờ review và chốt quy tắc.
  - **Chiều/Tối:** Chuyển sang thực hiện Job 1564 (Semantic Segmentation). Tiến hành gán nhãn phân đoạn cho các lớp không gian lớn (`sky`, `road`, `building`, `vegetation`).
  - **Đêm (Cập nhật):** Hoàn thành rà soát và gán nhãn toàn bộ lối đi bộ (`sidewalk`) trên tất cả 25 ảnh của Job 1564, căn chỉnh tỉ mỉ đường biên tiếp giáp giữa `sidewalk` với lòng đường (`road`) và chân công trình/rào chắn (`building`/`wall`/`fence`). Nâng tiến độ Job 1564 lên **🟡 75%**, sẵn sàng cho đợt review đường biên.
- **18/09/2026:**
  - Tập trung thực hiện Job 1564 (Task 178 — Semantic Segmentation) theo chiến thuật gán nhãn lớp nền (Background Layering):
    - **Sáng:** Hoàn thành gán nhãn đối tượng bầu trời (`sky`) cho toàn bộ 50/50 ảnh của job, bo chuẩn đường chân trời và tiếp giáp với ngọn cây, mái công trình.
    - **Trưa:** Hoàn thành toàn bộ đối tượng công trình xây dựng (`building`) cho 50/50 ảnh của Job 1564, căn chỉnh tỉ mỉ ranh giới tiếp giáp giữa các tòa nhà với bầu trời (`sky`) và vỉa hè (`sidewalk`).
    - **Chiều (Cập nhật):** Hoàn tất gán nhãn đối tượng cây xanh / thảm thực vật (`vegetation`) cho toàn bộ 50/50 ảnh. Đã xử lý kỹ lưỡng phần tán cây phức tạp, tách bạch rõ ràng giữa tán cây với bầu trời (`sky`), tường công trình (`building`) và các cột đèn (`pole`).
  - Nâng tiến độ Job 1564 lên **🟡 95%**, bước vào giai đoạn rà soát self-QC và xử lý các đối tượng chi tiết nhỏ còn lại trước khi gửi review nghiệm thu.

---

## 3. Đóng góp phát hiện Edge Cases ([`problem-backlog.md`](../problem-backlog.md))

Trong quá trình trực tiếp gán nhãn trên Job 1351, tôi đã chủ động phát hiện và lập hồ sơ 05 vấn đề kỹ thuật:

| Mã | Tóm tắt vấn đề | Phân loại | Minh chứng CVAT cụ thể | Hướng xử lý / Trạng thái |
|:---:|---|---|---|---|
| **[P-001](../problem-backlog.md#p-001)** | Vật thể bị che khuất hoặc chỉ lộ một phần | *Guideline mơ hồ* (§3, §3.1) | [Job 1351 Frame 32](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=32) (xe tải chở ô tô con trên thùng) | 🔴 Mở — Đánh dấu frame, chờ chốt ngưỡng "đủ bằng chứng" |
| **[P-002](../problem-backlog.md#p-002)** | Vật thể quá mờ, tối hoặc bị lóa đèn | *Guideline mơ hồ* (§3, §4) | [Job 1351 Frame 26](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=26) (xe quá mờ, đèn pha phản chiếu không rõ ranh giới) | 🔴 Mở — Không tự suy đoán ranh giới, gắn cờ đưa review |
| **[P-003](../problem-backlog.md#p-003)** | Vạch kẻ đường bị lóa, tối hoặc đứt | *Guideline đã nói nhưng cần áp dụng* (§4.2) | [Job 1351 Frame 49](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=49) (vạch kẻ dạng ô vuông/ngang) | 📘 Có rule — Polyline dừng tại điểm hết bằng chứng, không tự nối tắt |
| **[P-004](../problem-backlog.md#p-004)** | Vật thể chồng lên nhau (tách hay gộp) | *Guideline đã nói nhưng cần áp dụng* (§3) | [Job 1351 Frame 33](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=33) (ô tô có giá nóc, xe tải chở ô tô) | 📘 Có rule — Mỗi object độc lập dùng một box riêng |
| **[P-005](../problem-backlog.md#p-005)** | Vạch đôi `lane/double white`: vẽ 1 hay 2 đường | *Guideline mơ hồ* (§2, §4.2) | [Job 1351 Frame 49](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=49) | 🔴 Mở — Đã gửi câu hỏi làm rõ quy cách vẽ polyline |

---

## 4. Áp dụng Quyết định Kỹ thuật & Công cụ hỗ trợ

- **Sổ quyết định ([`so-quyet-dinh.md`](../so-quyet-dinh.md)):**
  - Tuân thủ nghiêm ngặt **[QĐ-001](../so-quyet-dinh.md#qđ-001)**: Gán box `nguoi` riêng cho từng cá nhân ngồi trên xe máy, không gộp chung vào phương tiện.
  - Nắm vững quy chuẩn nghiệm thu **[QĐ-002](../so-quyet-dinh.md#qđ-002)**: Reviewer kiểm tra ngẫu nhiên 20% mẫu, nếu tỷ lệ sai sót vượt quá 10% sẽ trả lại toàn bộ job để tự rà soát.
- **Công cụ hỗ trợ ([`source-tool/`](../source-tool/)):**
  - Sử dụng công cụ `problem-backlog-visualize-tool` (chạy trên cổng `9001`) để trực quan hóa, theo dõi và đồng bộ các vấn đề phát sinh trong quá trình gán nhãn.

---

## 5. Tổng kết cá nhân Tuần 01

- **Khối lượng thực hiện:**
  - Đã thực hiện: Đạt tiến độ tổng thể ~87% khối lượng cá nhân được giao.
    - Job 1351 (Task 125): ~17 / 25 ảnh (**🟡 70%**).
    - Job 1564 (Task 178): 50 ảnh (**🟡 95%** — hoàn thành 100% `sky`, `building`, `vegetation` trên 50/50 ảnh và toàn bộ `sidewalk`).
- **Đóng góp phát hiện vấn đề:** Phát hiện và lập hồ sơ 05 edge cases thực tế kèm bằng chứng link CVAT.
- **Khó khăn gặp phải:**
  - Nhãn Semantic Segmentation ở Job 1564 đòi hỏi độ tỉ mỉ cao ở biên các vật thể phức tạp (`vegetation`, `pole`, `sidewalk`), đặc biệt ranh giới tiếp giáp giữa vỉa hè (`sidewalk`) và mặt đường xe chạy (`road`), tốn nhiều thời gian.
  - Các frame bị lóa đèn pha và sương mù gây khó khăn trong việc xác định điểm dừng polyline của vạch kẻ đường.
- **Bài học kinh nghiệm:**
  - Tuyệt đối không tự suy đoán biên vật thể khi không đủ bằng chứng quan sát; luôn gắn tag `can_xem_lai` và ghi nhận backlog để xử lý đồng bộ.

---

## 6. Kế hoạch cá nhân Tuần 02

1. Nhận kết quả nghiệm thu đợt 1 từ Reviewer cho Job 1351 và Job 1564; rà soát và chỉnh sửa ngay các lỗi được phản hồi.
2. Áp dụng hướng dẫn giải quyết đối với vạch đôi [P-005] và ngưỡng che khuất [P-001] để hoàn thiện các frame còn lại của Job 1351.
3. Hoàn tất 100% khối lượng còn lại của Job 1351 (30%) và Job 1564 (5%), đưa cả 2 job về trạng thái nghiệm thu hoàn tất (**`✅ 100%`**).