# Hướng Dẫn Chi Tiết & Template Mẫu Cho Báo Cáo / Nhật Ký Tuần

## 1. Quy Chuẩn Đặt Tên File & Cấu Trúc Thư Mục

- Đường dẫn: `nhat-ky-tuan/tuan-NN.md` (ví dụ `tuan-01.md`, `tuan-02.md`).
- Số tuần luôn có 2 chữ số (`01`, `02`... `09`, `10`).

## 2. Quy Chuẩn Biểu Tượng Trạng Thái & Tiến Độ (Bắt buộc)

| Ký hiệu | Ý nghĩa | Điều kiện áp dụng |
|---|---|---|
| `✅ 100%` | Đã hoàn thành và đã qua nghiệm thu review | Đã qua review của Reviewer/Lead, không còn lỗi tồn đọng |
| `🟡 xx%` | Đang thực hiện (kèm tỷ lệ %) | Đang gán nhãn, tiến độ tính theo số ảnh & số label guideline |
| `⛔ xx%` | Đang bị chặn (kèm tỷ lệ %) | Dừng lại do vướng edge case hoặc chờ mentor, kèm mã `P-xxx` |
| `⬜ 0%` | Chưa bắt đầu | Đã phân công nhưng chưa tiến hành thao tác |

---

## 3. Nguyên Tắc Cập Nhật Nhật Ký & Tính Toán Tiến Độ

### 3.1. Nguyên tắc Ghi chép Nhật ký (Append-Only & Timestamp)
- **Không ghi đè (Append-Only):** Mỗi khi cập nhật công việc, chỉ thêm dòng/khối mới vào cuối mục Daily Log (`2.2. Nhật ký công việc hàng ngày`). Tuyệt đối **không xóa, không sửa đè** lên các dòng nhật ký cũ để đảm bảo tính toàn vẹn của lịch sử làm việc.
- **Mốc thời gian ngày và giờ (Timestamp):** Mọi dòng nhật ký cập nhật mới bắt buộc phải có mốc thời gian rõ ràng:
  - Cú pháp: `- **dd/mm/yyyy - HH:MM:** <Nội dung công việc thực hiện>`
  - Ví dụ: `- **18/09/2026 - 08:45:** Hoàn thành gán nhãn sidewalk cho 10/50 ảnh...`

### 3.2. Phạm vi cập nhật tiến độ (Chỉ cập nhật phần tổng hợp)
Các dòng nhật ký mô tả cũ được giữ nguyên vẹn. Việc cập nhật số liệu tiến độ mới **CHỈ ÁP DỤNG VÀO CÁC PHẦN TỔNG HỢP SAU**:
1. **Bảng phân công nhiệm vụ (`## 1. Phân công nhiệm vụ cá nhân`):** Cột **Tiến độ** (`🟡 XX%`) và cột **Trạng thái**.
2. **Chi tiết các Job phụ trách (`### 2.1. Chi tiết các Job phụ trách`):** Dòng **Tiến độ hiện tại:** `🟡 XX%` kèm phân bổ nhãn/ảnh.
3. **Mục Tổng kết cá nhân (`## 5. Tổng kết cá nhân Tuần NN`):** Cập nhật **Khối lượng thực hiện:** % tiến độ tổng thể và % chi tiết từng job.

### 3.3. Phương pháp & Công thức tính toán % tiến độ
Tiến độ % của mỗi job được tính toán định lượng dựa trên 2 tham số:
1. **$N_{ảnh}$:** Tổng số lượng ảnh của Job được giao.
2. **$K_{nhãn}$:** Tổng số lượng nhãn/class quy định trong Guideline của Task:
   - **Task Bounding Box & Polyline:** **19 classes** (10 object instances + 2 drivable area polygons + 7 lane markings polylines).
   - **Task Semantic Segmentation:** **19 classes** (`road`, `sidewalk`, `building`, `wall`, `fence`, `pole`, `traffic_light`, `traffic_sign`, `vegetation`, `terrain`, `sky`, `person`, `rider`, `car`, `truck`, `bus`, `train`, `motorcycle`, `bicycle`).

#### Công thức tính % tiến độ Job:
$$\text{Tiến độ Job (\%)} = \frac{\sum_{i=1}^{K_{nhãn}} (\text{Số ảnh đã hoàn thành gán nhãn } i)}{N_{ảnh} \times K_{nhãn}} \times 100\%$$

*Ví dụ:* Job Semantic Segmentation có $N_{ảnh} = 50$, guideline có $K_{nhãn} = 19$. Tổng đơn vị công việc là $50 \times 19 = 950$ nhãn-ảnh.
- Nếu đã hoàn thành nhãn `sky` cho 50/50 ảnh (50 đơn vị), nhãn `sidewalk` cho 25/50 ảnh (25 đơn vị), nhãn `building` cho 2/50 ảnh (2 đơn vị):
  $\text{Tiến độ} = \frac{50 + 25 + 2}{950} \times 100\% \approx 8.1\%$.
- Khi kết hợp các lớp diện tích lớn và đối tượng trọng tâm theo tỷ trọng quy đổi, luôn căn cứ trên số lượng ảnh đã hoàn thành từng nhãn so với $N_{ảnh} \times K_{nhãn}$ để đưa ra con số chính xác nhất.

#### Công thức tính % tiến độ Tổng Thể:
$$\text{Tiến độ Tổng Thể (\%)} = \frac{\sum_{\text{Job } j} (\text{Tiến độ Job } j \times N_{ảnh, j})}{\sum_{\text{Job } j} N_{ảnh, j}}$$

### 3.4. Cơ chế tự động hóa của AI Agent
Mỗi khi người dùng cập nhật báo cáo công việc:
- **Bước 1:** Trích xuất thông tin công việc, ảnh và label.
- **Bước 2:** Thêm dòng nhật ký mới kèm ngày giờ (`dd/mm/yyyy - HH:MM`) vào cuối mục `2.2. Daily Log`.
- **Bước 3:** Tự động tính toán lại % tiến độ của job và tổng thể theo công thức ở mục 3.3.
- **Bước 4:** Cập nhật đồng bộ các con số % mới vào Bảng 1, Mục 2.1 và Mục 5.

---

## 4. Template Đầy Đủ Cho Báo Cáo Tuần Cá Nhân

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
| 1 | **Job [<JobID>](<LinkJob>)** (Task <TaskID>) | Bounding Box & Polyline | <Số> ảnh | **🟡 <xx>%** | <Mô tả tiến độ mới nhất> |
| 2 | **Job [<JobID>](<LinkJob>)** (Task <TaskID>) | Semantic Segmentation | <Số> ảnh | **🟡 <yy>%** | <Mô tả tiến độ mới nhất> |

*Quy ước mức hoàn thành:* `✅ 100%`: Hoàn thành & đã qua review · `🟡 xx%`: Đang làm (kèm %) · `⛔ xx%`: Bị chặn (kèm mã P-xxx) · `⬜ 0%`: Chưa bắt đầu.

---

## 2. Chi tiết thực hiện & Nhật ký tiến độ hàng ngày (Daily Log)

### 2.1. Chi tiết các Job phụ trách
- **Job [<JobID>](<LinkJob>) (Task <TaskID> — Bounding Box & Polyline):**
  - **Quy mô:** <Số> ảnh giao thông đô thị.
  - **Bộ nhãn thực hiện:** `pedestrian`, `rider`, `car`, `truck`, `bus`, `train`, `motorcycle`, `bicycle`, `traffic light`, `traffic sign`, `area/drivable`, `area/alternative`, `lane/crosswalk`, `lane/double white`, `lane/double yellow`, `lane/road curb`, `lane/single other`, `lane/single white`, `lane/single yellow` (Tổng 19 nhãn).
  - **Tiến độ hiện tại:** **🟡 <xx>%** (<Chi tiết nhãn và ảnh đã làm>).
- **Job [<JobID>](<LinkJob>) (Task <TaskID> — Semantic Segmentation):**
  - **Quy mô:** <Số> ảnh giao thông đô thị.
  - **Bộ nhãn thực hiện:** 19 classes theo guideline.
  - **Tiến độ hiện tại:** **🟡 <yy>%** (<Chi tiết nhãn và ảnh đã làm>).

### 2.2. Nhật ký công việc hàng ngày (Daily Log)
*(Quy tắc: Thêm dòng mới, không sửa dòng cũ, kèm ngày giờ dd/mm/yyyy - HH:MM)*
- **dd/mm/yyyy - HH:MM:**
  - Tiếp nhận Job, nghiên cứu tài liệu hướng dẫn kỹ thuật gán nhãn...
- **dd/mm/yyyy - HH:MM:**
  - Hoàn thành nhãn X trên M ảnh, nhãn Y trên N ảnh...
- **dd/mm/yyyy - HH:MM:**
  - Phát hiện edge cases, lập hồ sơ Backlog [P-xxx]...

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
  - Đã thực hiện: Đạt tiến độ tổng thể ~<Tổng_%> khối lượng cá nhân được giao (tính định lượng theo $N_{ảnh} \times K_{nhãn}$).
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
