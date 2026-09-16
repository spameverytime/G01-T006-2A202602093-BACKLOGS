# problem-backlog-visualize-tool

**Giải quyết:** Quản lý, trực quan hóa và nhập/xuất danh sách các pain point & guideline edge cases trong [`problem-backlog.md`](../../problem-backlog.md).

## Pain point
Trước khi có tool: 
- Thành viên gán nhãn khi gặp edge case phải mở file Markdown, tự nhớ cú pháp bảng Markdown phức tạp để thêm dòng vào bảng `## Danh sách` ở đầu file.
- Phải tự copy khối mẫu cuối file, điền thủ công từng trường và đảm bảo liên kết đồng bộ giữa bảng tóm tắt và chi tiết `## P-xxx`.
- Khó lọc, tìm kiếm hoặc xem tổng quan tình trạng các pain point (bao nhiêu ca đang mở, ca nào đang hỏi BTC, ca nào đã có Quyết định).
- Dễ gõ sai chính tả mục Loại hoặc Trạng thái, dẫn tới tài liệu thiếu nhất quán.

## Tool làm gì
Giao diện Web HTML/JS trực quan, hiện đại, sử dụng Google Material Symbols giúp:
- Hiển thị trực quan danh sách vấn đề theo dạng **Bảng (Table View)** hoặc **Thẻ Kanban theo trạng thái (Board View)**.
- Form nhập/sửa trực quan với đầy đủ trường thông tin: Mã tự sinh (`P-NNN`), Tóm tắt, Loại (có diễn giải tiêu chí), Mục guideline, Người phát hiện, Link CVAT động kèm ghi chú frame, Mô tả, Các cách hiểu / Hướng cân nhắc, Xử lý tạm thời, Trạng thái và Kết quả (liên kết sang `so-quyet-dinh.md`).
- **Ghi nhận và lưu trữ tự động vào JSON** (`LocalStorage` và tải file `.json`).
- **Xuất ra Markdown chuẩn 100% định dạng** của `problem-backlog.md` chỉ với một cú click chuột (hỗ trợ copy nhanh vào clipboard hoặc tải file `.md`).
- Hỗ trợ **nhập (import) hai chiều** từ cả file JSON và file Markdown.

## Cài đặt và chạy

Tool được thiết kế dạng Single Page Application thuần (HTML + CSS + JS) độc lập, không yêu cầu cài đặt dependencies hay build tool.

### Cách 1: Mở trực tiếp bằng trình duyệt
Mở file `index.html` trực tiếp trên trình duyệt bất kỳ (Chrome, Firefox, Edge, Safari):
```bash
# Trên Linux (Ubuntu/Debian)
xdg-open source-tool/problem-backlog-visualize-tool/index.html

# Hoặc nhấp đúp vào index.html trong trình quản lý file
```

### Cách 2: Chạy qua Web Server cục bộ (khuyên dùng)
```bash
cd source-tool/problem-backlog-visualize-tool
python3 -m http.server 9001
# Sau đó truy cập http://localhost:9001 trên trình duyệt
```

Hoặc chạy nhanh bằng script:
```bash
./run.sh
```

## Đầu vào / đầu ra
- **Đầu vào:**
  - Nhập trực tiếp qua Form trên giao diện web.
  - Hoặc nạp file `problem-backlog.json` / `problem-backlog.md` qua chức năng Nhập dữ liệu (hỗ trợ chế độ Ghi đè hoặc Gộp).
- **Đầu ra:**
  - File JSON: `problem-backlog.json` (dữ liệu có cấu trúc phục vụ lưu trữ hoặc tích hợp script).
  - File Markdown: `problem-backlog.md` (chuẩn 100% format gốc, sẵn sàng commit vào repository).

## Đã thử trên
- Thử nghiệm trên toàn bộ dữ liệu mẫu hiện có (`P-001`, `P-002`, `P-003`).
- Thử nghiệm thêm mới, chỉnh sửa, xóa, nhân bản, lọc theo loại và lọc theo trạng thái.
- Đo kiểm sinh Markdown: Khớp chính xác cấu trúc bảng, danh mục loại, trạng thái, và chi tiết từng đề mục.

## Giới hạn
- Trình duyệt cần có kết nối mạng ở lần tải đầu tiên để tải font `Inter` và bộ icon `Material Symbols Outlined` từ Google Fonts CDN.

## Người viết
@antigravity

