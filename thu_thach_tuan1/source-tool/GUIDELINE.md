# Guideline Phát Triển & Quản Lý Công Cụ (`source-tool`)

Tài liệu này quy định các nguyên tắc kỹ thuật, phân bổ cổng mạng, và danh mục các công cụ nội bộ trong thư mục `source-tool/`.

> **Lưu ý dành cho AI & Thành viên dự án:** Mỗi khi xây dựng một công cụ mới, bạn **BẮT BUỘC** phải cập nhật thông tin về công cụ đó (ý nghĩa, tác dụng, cổng mạng, cách chạy) vào tài liệu này và tài liệu hướng dẫn AI `.agent.md`.

---

## 1. Nguyên Tắc Thiết Kế & Tiêu Chuẩn Kỹ Thuật Chung

1. **Quy tắc phân bổ cổng mạng (Port Allocation Rule):**
   - Mọi công cụ chạy web server cục bộ **bắt buộc sử dụng dải cổng `9xxx`** (ví dụ: `9001`, `9002`, `9003`,...).
   - **Tuyệt đối không dùng** các cổng mặc định dễ xung đột như `8080`, `3000`, `8000`, `5000`.
   - Mỗi web tool phải có file script `run.sh` thiết lập sẵn cổng `9xxx` tương ứng để khởi chạy chỉ bằng 1 câu lệnh.

2. **Giao diện & Trải nghiệm người dùng (UI/UX Rule):**
   - Giao diện phải trực quan, đơn giản, hiện đại, thân thiện với đội gán nhãn dữ liệu.
   - Toàn bộ nút bấm, biểu tượng thao tác bắt buộc sử dụng **Google Material Icons / Material Symbols Outlined**.
   - Ngôn ngữ giao diện: Tiếng Việt chuẩn xác, rõ ràng.

3. **Quản lý dữ liệu & Định dạng (Data Persistence & Markdown Compatibility):**
   - Dữ liệu thao tác phải được tổ chức và lưu trữ dạng **JSON** có cấu trúc rõ ràng.
   - Hỗ trợ lưu trữ tự động (ví dụ qua `LocalStorage` của trình duyệt) để không mất dữ liệu.
   - Cung cấp tính năng **xuất ra file Markdown chuẩn 100% định dạng** của các file tài liệu dự án tương ứng (ví dụ: `problem-backlog.md`, `so-quyet-dinh.md`).
   - Hỗ trợ **nhập (import) hai chiều** (cả file JSON và file Markdown).

4. **Kiến trúc tối giản (Zero-dependency):**
   - Ưu tiên tối đa HTML, CSS, JavaScript thuần hoặc thư viện chuẩn của Python 3 (`http.server`).
   - Hạn chế các bước build phức tạp (`npm build`, `webpack`, v.v.) để mọi thành viên trong đội có thể mở và sử dụng ngay lập tức mà không cần cài đặt môi trường rườm rà.

---

## 2. Bảng Phân Bổ Cổng Mạng (Port Registry)

| Cổng (Port) | Tên Tool | Thư mục | Mục đích & Chức năng chính | Trạng thái |
|---|---|---|---|---|
| **`9001`** | `problem-backlog-visualize-tool` | [`problem-backlog-visualize-tool/`](problem-backlog-visualize-tool/) | Quản lý, trực quan hóa và nhập/xuất `problem-backlog.md` | Hoàn thành |
| **`9002`** | `annotation-sop-visualizer` | [`annotation-sop-visualizer/`](annotation-sop-visualizer/) | Trực quan hóa quy trình SOP, máy tính Wilson Score, K-100 và tạo biên bản nghiệm thu | Hoàn thành |
| **`9003`** | *(Dành sẵn cho tool tiếp theo)* | — | — | Dự kiến |

---

## 3. Danh Mục Chi Tiết Các Tool Hiện Có

### 3.1. `problem-backlog-visualize-tool` (Cổng `9001`)

- **Thư mục:** [`source-tool/problem-backlog-visualize-tool/`](problem-backlog-visualize-tool/)
- **Cổng phân bổ:** `9001` (Địa chỉ: `http://localhost:9001`)
- **Tác giả:** @antigravity
- **Giải quyết:** Bài toán quản lý pain point và guideline edge cases trong [`problem-backlog.md`](../problem-backlog.md).

#### Ý nghĩa & Bối cảnh:
Trong quá trình gán nhãn dữ liệu, annotator liên tục gặp các ca khó (edge cases) mà guideline chưa đề cập hoặc công cụ CVAT gặp trục trặc. Việc ghi chép thủ công bằng Markdown vào `problem-backlog.md` thường gặp các bất tiện:
- Bảng Markdown ở đầu file khó chỉnh sửa thủ công khi số lượng dòng tăng lên.
- Phải copy mẫu cuối file, dễ quên hoặc điền thiếu các trường thông tin.
- Khó lọc theo loại vấn đề hoặc theo dõi tiến độ các ca đang chờ BTC phản hồi hay đã chốt quyết định.

#### Tác dụng & Giá trị mang lại:
1. **Giao diện Dashboard & KPI trực quan:** Thống kê tổng số và phân nhóm theo trạng thái (`🔴 Mở`, `🗣️ Đang bàn`, `↗️ Hỏi BTC`, `✅ Đã chốt`, `🛠️ Làm tool`, `⚪ Bỏ`). Bấm vào thẻ KPI để lọc nhanh.
2. **Đa chế độ xem:** Chuyển đổi linh hoạt giữa dạng Bảng (Table View) đồng bộ với bảng đầu file MD và dạng Cột thẻ (Kanban Board) theo trạng thái.
3. **Form nhập liệu thông minh:**
   - Tự động sinh mã `P-NNN` tiếp theo.
   - Nút điền ngày hiện tại.
   - Nhập danh sách động nhiều link CVAT kèm ghi chú frame.
   - Nhập các cách hiểu / hướng cân nhắc dễ dàng.
   - Liên kết tự động với Sổ quyết định `QĐ-xxx`.
4. **Lưu trữ JSON & Đồng bộ LocalStorage:** Dữ liệu tự động lưu trong trình duyệt, có thể tải file `problem-backlog.json` về máy.
5. **Xuất Markdown chuẩn 100%:** Sinh ra file Markdown hoàn chỉnh với bảng tóm tắt, giải thích phân loại, chi tiết từng mục và mẫu template copy cuối file.
6. **Nhập dữ liệu 2 chiều:** Hỗ trợ nạp file `.json` hoặc file `.md` cũ vào hệ thống với chế độ "Ghi đè" hoặc "Gộp".

#### Cách khởi chạy:
```bash
# Cách 1: Chạy script tiện ích
cd source-tool/problem-backlog-visualize-tool
./run.sh

# Cách 2: Lệnh trực tiếp
python3 -m http.server 9001
```
Sau đó mở trình duyệt tại: `http://localhost:9001`

---

### 3.2. `annotation-sop-visualizer` (Cổng `9002`)

- **Thư mục:** [`source-tool/annotation-sop-visualizer/`](annotation-sop-visualizer/)
- **Cổng phân bổ:** `9002` (Địa chỉ: `http://localhost:9002`)
- **Tác giả:** @antigravity
- **Giải quyết:** Trực quan hóa toàn diện Quy trình Vận hành Tiêu chuẩn (SOP), máy tính kiểm định thống kê Wilson Score Interval, mô phỏng Protocol K-100, thang đo Demerit Points và tạo Biên bản Nghiệm thu chất lượng lô dữ liệu.

#### Ý nghĩa & Bối cảnh:
Tài liệu quy trình SOP (`Quy_Trinh_Annotation_QC_QA_Guideline.md`) chứa nhiều công thức toán học thống kê phức tạp (khoảng tin cậy Wilson, ma trận RACI, chỉ số Kappa, mIoU). Annotator và QC/QA gặp khó khăn khi phải tính toán thủ công hoặc tra cứu văn bản dài dòng. Công cụ này số hóa và trực quan hóa toàn bộ quy trình thành một Dashboard tương tác thời gian thực.

#### Tác dụng & Giá trị mang lại:
1. **Interactive Workflow Pipeline:** Trực quan hóa 6 bước quy trình với bảng phân quyền RACI, tiêu chí vượt qua (Pass Criteria) và hướng dẫn kỹ thuật chi tiết.
2. **Máy tính Khoảng tin cậy Wilson thời gian thực:** Nhập cỡ mẫu $n$ và số lỗi $e$, tính ngay Cận dưới Wilson $w^-$ ở độ tin cậy 95% ($z=1.96$), đưa ra kết luận tức thì (ACCEPT / REJECT) kèm thanh đo trực quan và highlight bảng ma trận tra cứu.
3. **Mô phỏng Đánh giá Protocol K-100:** Đo lường 4 chỉ số Accuracy, Kappa, BBox IoU, Semantic mIoU và giới hạn lỗi Critical để cấp chứng chỉ phân bổ job.
4. **Cẩm nang Thực chiến Đồ họa (Visual Handbook):** Minh họa SVG so sánh hộp BBox đúng vs sai, chiến thuật Layering 6 lớp, phân biệt Rider vs Pedestrian.
5. **Bộ tính điểm phạt QC L1 (Demerit Points):** Tự động tính điểm phạt theo trọng số Critical ($\times 10$), Major ($\times 3$), Minor ($\times 1$) và đề xuất hành động (Pass / Rework / Reject).
6. **Trung tâm Điều hành Leader (Leader Center):** Tính nhanh khối lượng chuẩn hóa Work Units $W = N \times 19$, lịch trình hàng ngày và bộ checklist hàng tuần có lưu LocalStorage.
7. **Trình tạo Biên bản Nghiệm thu Lô hàng:** Điền thông tin nhanh, tự động tổng hợp kết quả Wilson và xuất văn bản Markdown chuẩn hoặc in PDF.

#### Cách khởi chạy:
```bash
# Cách 1: Chạy script tiện ích
cd source-tool/annotation-sop-visualizer
./run.sh

# Cách 2: Lệnh trực tiếp
python3 -m http.server 9002
```
Sau đó mở trình duyệt tại: `http://localhost:9002`

---

## 4. Quy Trình Tạo Tool Mới Cho Thành Viên & AI

Khi phát hiện một pain point mới cần giải quyết bằng công cụ:

1. **Kiểm tra điều kiện:** Đảm bảo pain point đã được ghi trong `problem-backlog.md` thuộc loại *Pain point công cụ*, có tính lặp lại và mang lại lợi ích đo lường được.
2. **Chọn cổng mạng:** Lấy cổng tiếp theo chưa dùng trong dải `9xxx` (ví dụ: `9002`) và đăng ký vào Bảng Phân Bổ Cổng ở Mục 2 của tài liệu này.
3. **Tạo thư mục tool con:**
   - Đặt tại `source-tool/<ten-tool>/`.
   - Tạo file `run.sh` thiết lập cổng đã chọn.
   - Viết `README.md` theo đúng mẫu quy định trong `source-tool/README.md`.
4. **Cập nhật tài liệu:**
   - Thêm 1 dòng vào bảng danh sách trong [`source-tool/README.md`](README.md).
   - Thêm mục mô tả chi tiết (ý nghĩa, tác dụng, cách chạy) vào file này ([`source-tool/GUIDELINE.md`](GUIDELINE.md)).
   - Cập nhật các quy tắc mới (nếu có) vào [`.agent.md`](../.agent.md).

