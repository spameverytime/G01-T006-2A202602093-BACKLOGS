# Hướng Dẫn Chi Tiết & Template Mẫu Cho Báo Cáo / Nhật Ký Tuần

## 1. Quy Chuẩn Đặt Tên File & Cấu Trúc Thư Mục

- Đường dẫn: `nhat-ky-tuan/tuan-NN.md` (ví dụ `tuan-01.md`, `tuan-02.md`).
- Số tuần luôn có 2 chữ số (`01`, `02`... `09`, `10`).

## 2. Quy Chuẩn Biểu Tượng Trạng Thái & Tiến Độ (Bắt buộc)

| Ký hiệu | Ý nghĩa | Điều kiện áp dụng |
|---|---|---|
| `✅ 100%` | Đã hoàn thành và đã qua nghiệm thu review | Đã qua review của Reviewer/Lead, không còn lỗi tồn đọng |
| `🟡 xx%` | Đang thực hiện (kèm tỷ lệ %) | Đang trong quá trình gán nhãn hoặc sửa lỗi |
| `⛔ xx%` | Đang bị chặn (kèm tỷ lệ %) | Dừng lại do vướng edge case hoặc chờ mentor, kèm mã `P-xxx` |
| `⬜ 0%` | Chưa bắt đầu | Đã phân công nhưng chưa tiến hành thao tác |

## 3. Template Đầy Đủ Cho Báo Cáo Tuần Cá Nhân

```markdown
# Nhật ký tuần NN · dd/mm – dd/mm/yyyy — <Họ và Tên>

## Thông tin cá nhân
- **Học viên:** <Họ và Tên>
- **MSSV:** <Mã số sinh viên>
- **Email:** <Email>
- **Lớp học phần:** AI Action khóa IV
- **Đội:** T006 — Nhóm 01 (G01) | **Repo:** `G01-T006-<Họ và Tên>-<MSSV>`
- **Tài khoản GitHub:** @<username>
- **Vai trò tuần NN:** <Lead | Annotator | Reviewer>
- **Dữ liệu / Task CVAT phụ trách:** [Task <ID>](<link_task_1>), [Task <ID>](<link_task_2>)

---

## 1. Phân công nhiệm vụ cá nhân

| # | Nhiệm vụ / Job CVAT | Dạng gán nhãn | Quy mô | Tiến độ | Trạng thái |
|:---:|---|---|:---:|:---:|---|
| 1 | **Job [<JobID>](<LinkJob>)** (Task <TaskID>) | Bounding Box & Polyline | <Số> ảnh | **🟡 <xx>%** | <Mô tả tiến độ ngắn gọn> |
| 2 | **Job [<JobID>](<LinkJob>)** (Task <TaskID>) | Semantic Segmentation | <Số> ảnh | **🟡 <yy>%** | <Mô tả tiến độ ngắn gọn> |

*Quy ước mức hoàn thành:* `✅ 100%`: Hoàn thành & đã qua review · `🟡 xx%`: Đang làm (kèm %) · `⛔ xx%`: Bị chặn (kèm mã P-xxx) · `⬜ 0%`: Chưa bắt đầu.

---

## 2. Chi tiết thực hiện & Nhật ký tiến độ hàng ngày (Daily Log)

### 2.1. Chi tiết các Job phụ trách
- **Job [<JobID>](<LinkJob>) (Task <TaskID> — Bounding Box & Polyline):**
  - **Quy mô:** <Số> ảnh giao thông đô thị.
  - **Bộ nhãn thực hiện:** `pedestrian`, `rider`, `car`, `truck`, `bus`, `train`, `motorcycle`, `bicycle`, `traffic light`, `traffic sign`, `area/drivable`, `area/alternative`, `lane/crosswalk`, `lane/double white`, `lane/double yellow`, `lane/road curb`, `lane/single other`, `lane/single white`, `lane/single yellow`.
  - **Tiến độ hiện tại:** **🟡 <xx>%**.
- **Job [<JobID>](<LinkJob>) (Task <TaskID> — Semantic Segmentation):**
  - **Quy mô:** <Số> ảnh giao thông đô thị.
  - **Bộ nhãn thực hiện:** `road`, `sidewalk`, `building`, `wall`, `fence`, `pole`, `traffic_light`, `traffic_sign`, `vegetation`, `terrain`, `sky`, `person`, `rider`, `car`, `truck`, `bus`, `train`, `motorcycle`, `bicycle`.
  - **Tiến độ hiện tại:** **🟡 <yy>%**.

### 2.2. Nhật ký công việc hàng ngày (Daily Log)
- **dd/mm/yyyy:**
  - Tiếp nhận Job, nghiên cứu tài liệu hướng dẫn kỹ thuật gán nhãn.
  - Tiến hành gán nhãn các đối tượng cơ bản...
- **dd/mm/yyyy:**
  - Thực hiện tiếp các nhóm đối tượng phức tạp... Đạt mốc <xx>% khối lượng.
- **dd/mm/yyyy:**
  - Phát hiện edge cases (nêu vắn tắt). Phân tích guideline và lập hồ sơ Backlog [P-xxx]. Chốt tiến độ tuần đạt **🟡 <xx>%**, dừng chờ review đợt 1.

---

## 3. Đóng góp phát hiện Edge Cases ([`problem-backlog.md`](../problem-backlog.md))

| Mã | Tóm tắt vấn đề | Phân loại | Minh chứng CVAT cụ thể | Hướng xử lý / Trạng thái |
|:---:|---|---|---|---|
| **[P-xxx](../problem-backlog.md#p-xxx)** | <Tóm tắt vấn đề> | *<Phân loại>* | [Job <ID> Frame <N>](<LinkFrame>) (<mô tả>) | <Trạng thái chuẩn> — <Hành động> |

---

## 4. Áp dụng Quyết định Kỹ thuật & Công cụ hỗ trợ

- **Sổ quyết định ([`so-quyet-dinh.md`](../so-quyet-dinh.md)):**
  - Tuân thủ nghiêm ngặt **[QĐ-xxx](../so-quyet-dinh.md#qđ-xxx)**: <Cách thức áp dụng cụ thể vào bài làm>.
- **Công cụ hỗ trợ ([`source-tool/`](../source-tool/)):**
  - Sử dụng công cụ `<tên-tool>` (chạy trên cổng `9xxx`) để <mục đích và giá trị mang lại>.

---

## 5. Tổng kết cá nhân Tuần NN

- **Khối lượng thực hiện:**
  - Đã thực hiện: ~<Đã_làm> / <Tổng> ảnh (tương đương <Tổng_%> tổng khối lượng cá nhân được giao).
    - Job <ID1> (Task <ID1>): ~<Đã_làm_1> / <Tổng_1> ảnh (**🟡 <xx>%**).
    - Job <ID2> (Task <ID2>): ~<Đã_làm_2> / <Tổng_2> ảnh (**🟡 <yy>%**).
- **Đóng góp phát hiện vấn đề:** Phát hiện và lập hồ sơ <Số lượng> edge cases thực tế kèm bằng chứng link CVAT.
- **Khó khăn gặp phải:**
  - <Khó khăn 1, ví dụ: độ tỉ mỉ của nhãn segmentation, chất lượng ảnh đêm/sương mù...>
- **Bài học kinh nghiệm:**
  - <Bài học 1, ví dụ: không suy đoán biên ảnh khi không rõ; luôn ghi nhận backlog và gắn tag...>

---

## 6. Kế hoạch cá nhân Tuần NN+1

1. <Kế hoạch 1: Nhận kết quả nghiệm thu từ Reviewer; rà soát và chỉnh sửa lỗi...>
2. <Kế hoạch 2: Áp dụng hướng dẫn xử lý mới cho các edge case còn tồn đọng...>
3. <Kế hoạch 3: Hoàn tất 100% khối lượng các job còn lại, đưa về trạng thái nghiệm thu hoàn tất (`✅ 100%`)>
```
