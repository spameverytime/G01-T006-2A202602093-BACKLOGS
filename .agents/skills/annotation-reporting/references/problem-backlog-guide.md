# Hướng Dẫn Chi Tiết & Template Mẫu Cho Problem Backlog

## 1. Mẫu Dòng Danh Sách (Bảng đầu file `problem-backlog.md`)

```markdown
| [P-NNN](#p-nnn) | <Tóm tắt ngắn gọn vấn đề> | <Loại chuẩn> | <Mục guideline> | <Trạng thái chuẩn> | <Kết quả / Hướng xử lý> |
```

## 2. Mẫu Section Chi Tiết (Thêm vào cuối danh sách mục chi tiết)

```markdown
## P-NNN

**<Tóm tắt vấn đề trong một câu súc tích>**

- **Loại:** <Guideline chưa nói tới | Guideline mơ hồ | Guideline mâu thuẫn | Guideline đã nói nhưng cần áp dụng | Pain point công cụ>
- **Mục guideline:** <Tên guideline và số điều khoản, ví dụ: BBox §3, §3.1; Semantic Segmentation §3>
- **Người phát hiện:** @<github_username> · <dd/mm/yyyy>
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/<task_id>/jobs/<job_id>?frame=<frame_number> — <mô tả đối tượng trong frame>
- **Mô tả:** <Mô tả chi tiết hiện tượng, mâu thuẫn hoặc điểm mơ hồ khiến annotator không thể xác định chắc chắn>
- **Các cách hiểu:**
  1. <Cách hiểu hoặc phương án khả dĩ thứ nhất>
  2. <Cách hiểu hoặc phương án khả dĩ thứ hai>
- **Xử lý tạm trong lúc chờ:** <Cách annotator xử lý tạm (gắn tag can_xem_lai, issue UNCERTAIN_BOUNDARY, tạm dừng frame...)>
- **Kết quả:** <Trạng thái chuẩn> — <Chi tiết hướng xử lý tiếp theo>
```

> **Lưu ý:** Nếu Loại là `Pain point công cụ`, phần `Các cách hiểu:` được đổi tên thành `**Hướng đang cân nhắc:**`.

## 3. Bảng Phân Loại Chuẩn

| Phân loại | Định nghĩa & Bối cảnh sử dụng |
|---|---|
| `Guideline chưa nói tới` | Trường hợp thực tế chưa từng được đề cập trong tài liệu hướng dẫn gán nhãn. |
| `Guideline mơ hồ` | Tài liệu có nhắc đến nhưng diễn đạt chưa rõ, đọc ra từ 2 cách hiểu khác nhau trở lên. |
| `Guideline mâu thuẫn` | Các điều khoản trong cùng guideline hoặc giữa 2 guideline (BBox vs Segmentation) xung đột nhau. |
| `Guideline đã nói nhưng cần áp dụng` | Đã có nguyên tắc cơ bản nhưng cần thống nhất quy chuẩn chi tiết trên các ảnh cụ thể. |
| `Pain point công cụ` | Vấn đề thao tác trên CVAT, giao diện chậm, dễ nhầm lẫn hoặc cần tool tự động hóa. |

## 4. Bảng Trạng Thái Chuẩn

| Biểu tượng & Tên trạng thái | Diễn giải | Yêu cầu đi kèm |
|---|---|---|
| `🔴 Mở` | Vấn đề mới phát hiện, chưa có hướng giải quyết | Cần ghi rõ việc xử lý tạm |
| `🗣️ Đang bàn` | Nhóm hoặc annotator và reviewer đang thảo luận | Ghi nhận các luận điểm |
| `↗️ Hỏi BTC` | Đã gửi câu hỏi lên ban tổ chức / mentor | Ghi rõ câu hỏi gửi đi |
| `📘 Có rule trong guideline` | Đã tìm thấy quy tắc áp dụng trong guideline | Trích dẫn mục guideline |
| `✅ Đã chốt` | Đã chốt quy tắc chính thức | Bắt buộc liên kết sang `[QĐ-xxx](so-quyet-dinh.md#qđ-xxx)` |
| `🛠️ Làm tool` | Giải quyết bằng tool tự động | Bắt buộc liên kết sang thư mục `source-tool/<tên-tool>/` |
| `⚪ Bỏ` | Không còn là vấn đề hoặc không cần xử lý | Bắt buộc ghi lý do bỏ |
