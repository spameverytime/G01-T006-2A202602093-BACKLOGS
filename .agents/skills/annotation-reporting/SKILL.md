---
name: annotation-reporting
description: >-
  Hỗ trợ ghi nhận, định dạng và đồng bộ các báo cáo trong dự án Data Annotation:
  Problem Backlog (P-xxx), Sổ Quyết Định (QĐ-xxx), Sổ Pain Points (PP-xxx) và Nhật Ký / Báo Cáo Tuần (tuan-NN.md).
  Sử dụng skill này khi người dùng yêu cầu thêm/cập nhật issue backlog, ghi chép quyết định kỹ thuật,
  ghi nhận nỗi đau gán nhãn (pain points), hoặc lập báo cáo tiến độ/nhật ký công việc cá nhân hoặc nhóm theo chuẩn định dạng của dự án.
---

# Annotation Reporting Skill (Problem Backlog, Sổ Quyết Định, Pain Points, Báo Cáo Tuần)

Skill này chuẩn hóa và tự động hóa quy trình ghi nhận 4 loại tài liệu cốt lõi trong dự án Quản lý quy trình gán nhãn dữ liệu:
1. **Problem Backlog** ([`problem-backlog.md`](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/problem-backlog.md)) — Lưu vết các edge case dữ liệu, vấn đề guideline và pain point công cụ.
2. **Sổ Quyết Định** ([`so-quyet-dinh.md`](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/so-quyet-dinh.md)) — Lưu vết các quy định kỹ thuật đã chốt (Bất biến / Append-only).
3. **Sổ Pain Points** ([`pain-points.md`](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/pain-points.md)) — Lưu vết các nỗi đau, rào cản thao tác, mệt mỏi thể chất/tâm lý và xung đột quy trình của người gán nhãn.
4. **Nhật Ký & Báo Cáo Tuần** ([`nhat-ky-tuan/tuan-NN.md`](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/nhat-ky-tuan/)) — Báo cáo tiến độ cá nhân/nhóm, daily log, tổng kết tuần và kế hoạch tuần tới.

---

## 1. Quy Trình Ghi Nhận Problem Backlog (`P-NNN`)

### 1.1. Nguyên tắc cốt lõi
- **Mã định danh:** `P-NNN` (ví dụ `P-001`, `P-002`, `P-006`...). Tăng dần liên tục, **tuyệt đối không tái sử dụng mã đã bỏ**.
- **Cập nhật đồng thời:** Khi thêm một problem mới, **bắt buộc cập nhật cả 2 vị trí**:
  1. Thêm 1 dòng vào bảng `## Danh sách` ở đầu file.
  2. Tạo section chi tiết `## P-NNN` ở phần thân file.
- **Link CVAT minh chứng:** Bắt buộc trỏ chính xác đến job và frame cụ thể:
  `https://cvat.note.transformerlabs.ai/tasks/<task_id>/jobs/<job_id>?frame=<frame_number>` kèm chú thích ngắn gọn vật thể/vấn đề trong frame.

### 1.2. Phân loại chuẩn (Chỉ chọn 1 trong 5 loại)
| Loại | Ý nghĩa |
|---|---|
| `Guideline chưa nói tới` | Tình huống hoàn toàn chưa có trong tài liệu guideline |
| `Guideline mơ hồ` | Đọc guideline có từ 2 cách hiểu trở lên |
| `Guideline mâu thuẫn` | Hai mục hoặc hai tài liệu guideline quy định ngược nhau |
| `Guideline đã nói nhưng cần áp dụng` | Guideline đã có quy tắc, nhưng cần thống nhất cách áp dụng cụ thể trên ảnh thực tế |
| `Pain point công cụ` | Guideline rõ ràng, nhưng thao tác trên CVAT/tool bị chậm, giật lag hoặc dễ lỗi |

### 1.3. Trạng thái chuẩn (Chỉ chọn 1 trong 7 trạng thái)
- `🔴 Mở`: Vấn đề mới phát hiện, chưa xử lý xong, đang chờ ý kiến.
- `🗣️ Đang bàn`: Nhóm đang thảo luận nội bộ.
- `↗️ Hỏi BTC`: Đã tổng hợp để gửi câu hỏi lên Mentor / Ban tổ chức.
- `📘 Có rule trong guideline`: Vấn đề đã được làm rõ bằng quy tắc có sẵn trong guideline.
- `✅ Đã chốt`: Đã có quyết định chính thức (bắt buộc trỏ sang `[QĐ-xxx](so-quyet-dinh.md#qđ-xxx)`).
- `🛠️ Làm tool`: Giải quyết bằng phần mềm hỗ trợ (bắt buộc trỏ sang thư mục tool trong `source-tool/`).
- `⚪ Bỏ`: Không cần xử lý nữa (bắt buộc ghi rõ lý do hủy).

### 1.4. Template chuẩn thêm vào `problem-backlog.md`

#### Dòng thêm vào bảng danh sách đầu file:
```markdown
| [P-NNN](#p-nnn) | Tóm tắt ngắn gọn vấn đề | Loại chuẩn | Mục guideline liên quan | Trạng thái chuẩn | Kết quả / Hướng xử lý |
```

#### Section chi tiết:
```markdown
## P-NNN

**Tóm tắt vấn đề trong một câu súc tích**

- **Loại:** [Chọn 1 trong 5 loại chuẩn]
- **Mục guideline:** [Ví dụ: BBox §3, §3.1; Segmentation §3]
- **Người phát hiện:** @[username-github] · dd/mm/yyyy
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/<task_id>/jobs/<job_id>?frame=<frame_id> — mô tả đối tượng / lỗi trong frame
- **Mô tả:** [Mô tả bối cảnh, tại sao phát sinh phân vân hoặc khó khăn]
- **Các cách hiểu:** *(Nếu là pain point công cụ thì ghi **Hướng đang cân nhắc:**)*
  1. [Cách hiểu hoặc phương án 1]
  2. [Cách hiểu hoặc phương án 2]
  3. [Cách hiểu hoặc phương án 3 (nếu có)]
- **Xử lý tạm trong lúc chờ:** [Cách annotator xử lý tạm thời, ví dụ: gắn cờ can_xem_lai, issue UNCERTAIN_BOUNDARY, dừng gán các frame tương tự...]
- **Kết quả:** [Trạng thái chuẩn] — [Ghi chú kết quả hoặc bước tiếp theo]
```

---

## 2. Quy Trình Ghi Nhận Sổ Quyết Định (`QĐ-NNN`)

### 2.1. Nguyên tắc cốt lõi: Bất biến (Append-only)
- **Tuyệt đối không sửa nội dung quyết định cũ:** Một khi đã ghi nhận, không bao giờ được xóa hoặc sửa đổi nội dung của `QĐ-xxx`.
- **Quy trình thay thế / hủy bỏ:**
  - Nếu có quyết định mới thay thế: Tạo `QĐ-yyy` mới, tại dòng **Xuất phát từ** hoặc **Bối cảnh** ghi rõ *Thay thế cho `[QĐ-xxx](#qđ-xxx)`*. Đồng thời cập nhật trạng thái của `QĐ-xxx` cũ thành *Bị thay bởi `[QĐ-yyy](#qđ-yyy)`*.
  - Nếu hủy quyết định: Chuyển trạng thái sang *Huỷ (kèm lý do)*.
- **Đồng bộ 2 chiều với Backlog:**
  - Quyết định xuất phát từ `P-xxx` thì phải có link: `[P-xxx](problem-backlog.md#p-xxx)`.
  - Đồng thời cập nhật `P-xxx` tương ứng trong `problem-backlog.md` sang trạng thái: `✅ Đã chốt (trỏ sang [QĐ-NNN](so-quyet-dinh.md#qđ-nnn))`.

### 2.2. Trạng thái chuẩn của Quyết định
- `Hiệu lực`: Đang được áp dụng trên toàn bộ quy trình gán nhãn và review.
- `Bị thay bởi QĐ-xxx`: Đã có quyết định mới thay thế.
- `Huỷ (ghi lý do)`: Không còn áp dụng.

### 2.3. Template chuẩn thêm vào `so-quyet-dinh.md`

#### Dòng thêm vào bảng danh sách đầu file:
```markdown
| [QĐ-NNN](#qđ-nnn) | Tên quyết định ngắn gọn | dd/mm/yyyy | [P-xxx](problem-backlog.md#p-xxx) hoặc Họp tuần NN | Hiệu lực |
```

#### Section chi tiết:
```markdown
## QĐ-NNN

**Nội dung quyết định tóm tắt trong một dòng**

- **Ngày:** dd/mm/yyyy
- **Người tham gia:** @[lead] (chốt), @[thanh-vien-a], @[thanh-vien-b]
- **Xuất phát từ:** [P-xxx](problem-backlog.md#p-xxx) (hoặc Họp tuần NN, Mentor chỉ đạo)
- **Bối cảnh:** [Lý do phải đưa ra quyết định, xung đột hoặc mơ hồ trước đó]
- **Các phương án đã cân nhắc:**
  1. *[Phương án 1]* — [Ưu điểm / nhược điểm]. Loại hoặc **Chọn.**
  2. *[Phương án 2]* — [Ưu điểm / nhược điểm]. Loại hoặc **Chọn.**
- **Quyết định:** [Nội dung quy định cụ thể, chi tiết, đủ rõ để người không dự họp đọc vào là làm đúng]
- **Việc phải làm theo:**
  - [ ] [Nhiệm vụ 1, ví dụ: rà lại job XXX, sửa các ảnh bị gộp] (@[nguoi-phu-trach])
  - [ ] [Nhiệm vụ 2, ví dụ: thông báo toàn đội trên kênh chat] (@[nguoi-phu-trach])
- **Trạng thái:** Hiệu lực
```

---

## 3. Quy Trình Lập Nhật Ký / Báo Cáo Tuần (`tuan-NN.md`)

### 3.1. Nguyên tắc tổ chức file
- **Vị trí lưu:** `nhat-ky-tuan/tuan-NN.md` (đánh số tuần với 2 chữ số: `tuan-01.md`, `tuan-02.md`,...).
- **Quy ước biểu tượng tiến độ (Bắt buộc dùng chính xác):**
  - `✅ 100%`: Đã hoàn thành và **đã qua review nghiệm thu**.
  - `🟡 xx%`: Đang thực hiện (ghi rõ % tiến độ ước lượng).
  - `⛔ xx%`: Đang bị chặn / dừng lại (ghi rõ lý do hoặc mã `P-xxx` liên quan).
  - `⬜ 0%`: Chưa bắt đầu thực hiện.

### 3.2. Cấu trúc chuẩn của file Nhật ký tuần cá nhân

```markdown
# Nhật ký tuần NN · dd/mm – dd/mm/yyyy — [Họ và Tên]

## Thông tin cá nhân
- **Học viên:** [Họ và Tên]
- **MSSV:** [Mã số sinh viên]
- **Email:** [Email học viên]
- **Lớp học phần:** [Tên lớp]
- **Đội:** [Mã đội] — Nhóm [Số nhóm] | **Repo:** `[Tên Repo]`
- **Tài khoản GitHub:** @[username]
- **Vai trò tuần NN:** [Lead | Annotator | Reviewer]
- **Dữ liệu / Task CVAT phụ trách:** [Task XXX](link), [Task YYY](link)

---

## 1. Phân công nhiệm vụ cá nhân

| # | Nhiệm vụ / Job CVAT | Dạng gán nhãn | Quy mô | Tiến độ | Trạng thái |
|:---:|---|---|:---:|:---:|---|
| 1 | **Job [ID](link)** (Task ID) | Bounding Box & Polyline | XX ảnh | **🟡 XX%** | [Tóm tắt trạng thái] |
| 2 | **Job [ID](link)** (Task ID) | Semantic Segmentation | YY ảnh | **🟡 YY%** | [Tóm tắt trạng thái] |

*Quy ước mức hoàn thành:* `✅ 100%`: Hoàn thành & đã qua review · `🟡 xx%`: Đang làm (kèm %) · `⛔ xx%`: Bị chặn (kèm mã P-xxx) · `⬜ 0%`: Chưa bắt đầu.

---

## 2. Chi tiết thực hiện & Nhật ký tiến độ hàng ngày (Daily Log)

### 2.1. Chi tiết các Job phụ trách
- **Job [ID](link) (Task ID — Dạng nhãn):**
  - **Quy mô:** XX ảnh.
  - **Bộ nhãn thực hiện:** `class_1`, `class_2`, `class_3`...
  - **Tiến độ hiện tại:** **🟡 XX%**.

### 2.2. Nhật ký công việc hàng ngày (Daily Log)
- **dd/mm/yyyy:**
  - [Mô tả chi tiết nội dung công việc thực hiện trong ngày, ví dụ tiếp nhận job, đọc guideline...]
- **dd/mm/yyyy:**
  - [Gán nhãn các đối tượng cụ thể (xe, người, vạch kẻ đường...), đạt mốc XX%...]
- **dd/mm/yyyy:**
  - [Phát hiện edge case, đối chiếu guideline, lập problem backlog P-xxx, dừng chờ review...]

---

## 3. Đóng góp phát hiện Edge Cases ([`problem-backlog.md`](../problem-backlog.md))

| Mã | Tóm tắt vấn đề | Phân loại | Minh chứng CVAT cụ thể | Hướng xử lý / Trạng thái |
|:---:|---|---|---|---|
| **[P-xxx](../problem-backlog.md#p-xxx)** | [Tóm tắt] | *[Phân loại]* | [Job ID Frame XX](link) | [Trạng thái chuẩn kèm mô tả] |

---

## 4. Áp dụng Quyết định Kỹ thuật & Công cụ hỗ trợ

- **Sổ quyết định ([`so-quyet-dinh.md`](../so-quyet-dinh.md)):**
  - Tuân thủ nghiêm ngặt **[QĐ-xxx](../so-quyet-dinh.md#qđ-xxx)**: [Cách áp dụng cụ thể vào job của mình].
- **Công cụ hỗ trợ ([`source-tool/`](../source-tool/)):**
  - Sử dụng công cụ `[tên-tool]` (chạy trên cổng `9xxx`) để [mục đích sử dụng].

---

## 5. Tổng kết cá nhân Tuần NN

- **Khối lượng thực hiện:**
  - Đã thực hiện: ~AA / BB ảnh (tương đương XX% tổng khối lượng cá nhân được giao).
    - Job ID (Task ID): ~AA1 / BB1 ảnh (**🟡 XX%**).
- **Đóng góp phát hiện vấn đề:** Phát hiện và lập hồ sơ XX edge cases thực tế kèm bằng chứng link CVAT.
- **Khó khăn gặp phải:** [Nêu các khó khăn về ảnh mờ, thời tiết, vật thể phức tạp, công cụ...]
- **Bài học kinh nghiệm:** [Bài học rút ra trong tuần, cách xử lý khi gặp case khó...]

---

## 6. Kế hoạch cá nhân Tuần NN+1

1. [Mục tiêu 1, ví dụ: Nhận feedback từ reviewer và sửa các lỗi phát hiện]
2. [Mục tiêu 2, ví dụ: Áp dụng QĐ-xxx mới chốt để hoàn thiện phần còn lại]
3. [Mục tiêu 3, ví dụ: Hoàn tất 100% khối lượng job và nghiệm thu ✅ 100%]
```


---

## 4. Quy Trình Ghi Nhận Sổ Pain Points (`PP-NNN`)

### 4.1. Nguyên tắc cốt lõi
- **Mã định danh:** `PP-NNN` (ví dụ `PP-001`, `PP-002`, `PP-006`...). Tăng dần liên tục, **tuyệt đối không tái sử dụng mã đã đóng/hủy**.
- **Vị trí lưu:** [`pain-points.md`](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/pain-points.md).
- **Cập nhật đồng thời:** Khi ghi nhận một pain point mới, **bắt buộc cập nhật cả 2 vị trí**:
  1. Thêm 1 dòng vào bảng `## 2. Bảng Danh Sách Nỗi Đau` ở đầu file.
  2. Tạo section chi tiết `### PP-NNN` ở phần thân file (trong mục `## 4. Các Pain Point Của Tôi` hoặc nối tiếp mã trước).

### 4.2. Phân loại chuẩn (Chỉ chọn 1 trong 5 nhóm)
| Phân loại | Ý nghĩa |
|---|---|
| `🛠️ Công cụ & Hạ tầng` | CVAT lag, timeout, mất dữ liệu, thiếu phím tắt, giao diện khó thao tác |
| `📘 Đặc tả & Guideline` | Hướng dẫn mông lung, thiếu ảnh đối chiếu, quy tắc mâu thuẫn hoặc thay đổi đột ngột |
| `🩺 Thể chất & Thao tác` | Mỏi mắt, đau cổ tay/ngón tay (RSI), mệt mỏi do lặp lại thao tác click chuột hàng nghìn lần |
| `⚖️ Review & Phản hồi` | Đánh giá cảm tính, thiếu chuẩn sai số định lượng, feedback trễ gây sửa lại hàng loạt |
| `📷 Chất lượng Dữ liệu` | Ảnh mờ, tối, nhòe, lóa sáng, góc quay bị che khuất nghiêm trọng |

### 4.3. Mức độ tác động (Severity - Chỉ chọn 1 trong 4 mức)
- `🚨 Nghiêm trọng (Critical)`: Gây mất dữ liệu hoàn toàn, chặn đứng tiến độ hoặc gây ức chế cực lớn khiến annotator bỏ cuộc.
- `⚠️ Cao (High)`: Làm giảm >50% năng suất gán nhãn, tăng cao tỷ lệ sai sót hoặc gây đau mỏi thể chất nhanh chóng.
- `⚡ Trung bình (Medium)`: Làm chậm 15% - 30% tốc độ làm việc, thao tác cồng kềnh nhưng vẫn tiếp tục được.
- `💡 Thấp (Low)`: Bất tiện nhỏ về trải nghiệm, không cản trở lớn đến tiến độ.

### 4.4. Trạng thái chuẩn (Chỉ chọn 1 trong 4 trạng thái)
- `🔴 Đang gặp`: Nỗi đau diễn ra thường xuyên, chưa có giải pháp khắc phục.
- `🟡 Giải pháp tạm`: Đã có mẹo, phím tắt hoặc cách ứng phó tạm thời (ghi rõ ở mục Workaround).
- `🛠️ Đang làm tool`: Đang phát triển phần mềm/script nội bộ để tự động hóa hoặc tháo gỡ (trỏ sang `source-tool/`).
- `✅ Đã giải quyết`: Đã có giải pháp dứt điểm (bổ sung tool, tinh chỉnh CVAT hoặc ban hành quyết định mới trong `so-quyet-dinh.md`).

### 4.5. Template chuẩn thêm vào `pain-points.md`

#### Dòng thêm vào bảng danh sách:
```markdown
| [PP-NNN](#pp-nnn) | Tóm tắt ngắn gọn nỗi đau | Phân loại chuẩn | Mức độ chuẩn | Trạng thái chuẩn | Hướng giải quyết / Tool |
```

#### Section chi tiết:
```markdown
### PP-NNN

**Tóm tắt nỗi đau trong một câu súc tích**

- **Phân loại:** [Chọn 1 trong 5 loại chuẩn]
- **Mức độ tác động:** [Chọn 1 trong 4 mức chuẩn]
- **Người ghi nhận:** @[username-github] · dd/mm/yyyy
- **Tần suất xuất hiện:** [Mỗi khi làm bài / Khi mạng lag / Cuối tuần /...]
- **Triệu chứng & Bối cảnh:**
  - [Mô tả chi tiết cảm giác, tình huống cụ thể diễn ra khiến bạn bực bội hoặc tốn công sức]
- **Nguyên nhân gốc rễ (Root Cause):**
  - [Tại sao điều này lại xảy ra?]
- **Tác động thực tế:**
  - [Làm mất bao nhiêu thời gian, gây ảnh hưởng tinh thần/thể chất ra sao?]
- **Giải pháp tạm thời (Workaround):**
  - [Hiện tại bạn đang làm cách nào để chống chế hoặc giải quyết tạm thời?]
- **Giải pháp dài hạn đề xuất:**
  - [Bạn muốn có tool gì, muốn leader/mentor đổi quy tắc ra sao để giải quyết dứt điểm?]
- **Trạng thái:** [Chọn 1 trong 4 trạng thái chuẩn]
```

---

## 5. Checklist Kiểm Tra Chéo (Cross-Validation Checklist)

Trước khi xác nhận hoàn thành bất kỳ báo cáo hay cập nhật nào, AI Agent phải thực hiện kiểm tra các điều kiện sau:

- [ ] **Tính nhất quán mã định danh:**
  - Mã `P-NNN`, `QĐ-NNN`, và `PP-NNN` có tồn tại và khớp hoàn toàn giữa bảng danh sách và nội dung chi tiết.
  - Không trùng lặp mã đã tồn tại; không tái sử dụng mã đã hủy.
- [ ] **Tính chính xác của Link:**
  - Link CVAT có đủ format `https://.../tasks/<id>/jobs/<id>?frame=<n>` hoặc có mô tả rõ ràng.
  - Link nội bộ Markdown dùng cú pháp chính xác: `[P-xxx](problem-backlog.md#p-xxx)`, `[PP-xxx](pain-points.md#pp-xxx)` tuỳ theo vị trí file hiện tại.
- [ ] **Nguyên tắc Sổ quyết định:** Không chỉnh sửa quyết định cũ; nếu thay thế phải có liên kết chéo 2 chiều (QĐ mới trỏ QĐ cũ, QĐ cũ đổi trạng thái sang "Bị thay bởi").
- [ ] **Quy chuẩn Sổ Pain Points:** Phân loại thuộc 5 nhóm chuẩn; Mức độ thuộc 4 mức chuẩn; Trạng thái thuộc 4 trạng thái chuẩn; Có cả mục Workaround lẫn Đề xuất dài hạn.
- [ ] **Quy chuẩn Icon tiến độ trong Báo cáo tuần:** Chỉ dùng `✅ 100%`, `🟡 xx%`, `⛔ xx%`, `⬜ 0%`. Tuyệt đối không ghi `100%` mà chưa qua review.
- [ ] **Chuẩn Git Commit:** Đề xuất câu lệnh commit theo cú pháp:
  `git commit -m "backlog dd/mm/yyyy: <nội dung tóm tắt>"`

