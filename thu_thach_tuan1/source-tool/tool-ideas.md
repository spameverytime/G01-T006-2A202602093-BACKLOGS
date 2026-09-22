# Sổ Ý Tưởng Công Cụ Giải Quyết Pain Point (`tool-ideas.md`)

Tài liệu này lưu trữ và theo dõi các **ý tưởng phát triển công cụ (tool ideas)** nhằm tháo gỡ trực tiếp các khó khăn, nút thắt thao tác và rào cản quy trình (pain points) mà đội ngũ gán nhãn dữ liệu gặp phải.

> **Nguyên tắc phát triển:**
> 1. Ý tưởng xuất phát từ thực tế nỗi đau ([`pain-points.md`](../pain-points.md)) hoặc backlog kỹ thuật ([`problem-backlog.md`](../problem-backlog.md)).
> 2. Ưu tiên các giải pháp nhẹ (Zero-dependency, Vanilla JS, Python standard library) và tuân thủ quy chuẩn phân bổ cổng `9xxx` trong [`GUIDELINE.md`](GUIDELINE.md).
> 3. Trình bày chuẩn hóa gồm 4 thành tố cốt lõi: **Thứ tự ý tưởng**, **Nội dung chi tiết**, **Thời gian đề xuất**, và **Liên kết tới Pain Point ID (`PP-xxx`)**.

---

## 1. Bảng Tổng Hợp Các Ý Tưởng Công Cụ

| STT | Mã ý tưởng | Tên ý tưởng Tool | Pain Point liên quan | Thời gian đề xuất | Người đề xuất | Trạng thái |
|:---:|:---:|---|:---:|:---:|:---:|:---:|
| 1 | [IDEA-001](#idea-001) | CVAT Local Cache & Auto-Save Guardian | [PP-001](../pain-points.md#pp-001) | 18/09/2026 - 11:00 | @spameverytime | 💡 Ý tưởng |
| 2 | [IDEA-002](#idea-002) | Interactive Smart Polygon Assist (SAM & Auto-Contour) | [PP-002](../pain-points.md#pp-002) | 18/09/2026 - 11:05 | @spameverytime | 💡 Ý tưởng |
| 3 | [IDEA-003](#idea-003) | Fast Class Switcher & Radial Quick Palette | [PP-005](../pain-points.md#pp-005) | 18/09/2026 - 11:10 | @spameverytime | 🛠️ Đang thiết kế |
| 4 | [IDEA-004](#idea-004) | Auto Background Pre-Annotator (Sky & Road Generator) | [PP-006](../pain-points.md#pp-006) | 18/09/2026 - 11:15 | @spameverytime | 💡 Ý tưởng |
| 5 | [IDEA-005](#idea-005) | Layer & Z-Order Conflict Inspector | [PP-007](../pain-points.md#pp-007) | 18/09/2026 - 11:20 | @spameverytime | 💡 Ý tưởng |
| 6 | [IDEA-006](#idea-006) | Annotator - Reviewer Quality Check & IoU Visualizer | [PP-004](../pain-points.md#pp-004) | 18/09/2026 - 11:25 | @spameverytime | 💡 Ý tưởng |

*Quy ước trạng thái ý tưởng:*
- `💡 Ý tưởng`: Đang trong giai đoạn thu thập yêu cầu và đánh giá tính khả thi.
- `🛠️ Đang thiết kế`: Đã duyệt tính khả thi, đang lên spec chi tiết hoặc dựng mockup/prototype.
- `🚀 Đang phát triển`: Đang viết code trong thư mục con của `source-tool/`.
- `✅ Đã triển khai`: Hoàn thiện, đã phân cổng `9xxx` và đưa vào sử dụng thực tế.
- `⚪ Tạm hoãn`: Chưa ưu tiên hoặc CVAT đã có bản nâng cấp giải quyết thay thế.

---

## 2. Chi Tiết Các Ý Tưởng Công Cụ

---

### IDEA-001

**Tên ý tưởng:** CVAT Local Cache & Auto-Save Guardian

- **Thứ tự:** #1
- **Thời gian đề xuất:** 18/09/2026 - 11:00
- **Người đề xuất:** @spameverytime
- **Liên kết Pain Point:** [PP-001](../pain-points.md#pp-001) *(Mất dữ liệu nhãn khi CVAT giật lag, mất kết nối hoặc session timeout)*
- **Nội dung & Mục đích:**
  - **Vấn đề:** Khi mạng yếu hoặc server CVAT phản hồi chậm (`504 Gateway Timeout`), annotator thường xuyên bị mất các box/polygon vừa gán nhãn trong suốt 30 - 45 phút vì CVAT mặc định chỉ lưu vào RAM trình duyệt.
  - **Mô tả giải pháp:** 
    - Một tiện ích nhẹ (Userscript / Browser Extension / Chrome Tampermonkey script hoặc Web Wrapper) chạy ngầm khi mở giao diện CVAT.
    - Tự động snapshot state các annotations vào `IndexedDB` hoặc `LocalStorage` sau mỗi thao tác tạo/sửa vật thể.
    - Cung cấp cơ chế auto-trigger lệnh Save định kỳ mỗi 60 giây.
    - Nếu server phản hồi lỗi hoặc rớt mạng, tool lưu trữ hàng đợi thay đổi (offline change queue) và hiển thị nút **"Khôi phục nhãn từ cache cục bộ"** ngay khi kết nối lại, đảm bảo 0% rủi ro mất công sức.
  - **Hiệu quả kỳ vọng:** Loại bỏ hoàn toàn sự cố mất dữ liệu do timeout; giảm 100% ức chế tâm lý cho annotator.
- **Trạng thái:** 💡 Ý tưởng

---

### IDEA-002

**Tên ý tưởng:** Interactive Smart Polygon Assist (SAM & Auto-Contour)

- **Thứ tự:** #2
- **Thời gian đề xuất:** 18/09/2026 - 11:05
- **Người đề xuất:** @spameverytime
- **Liên kết Pain Point:** [PP-002](../pain-points.md#pp-002) *(Mỏi mắt và đau cổ tay RSI khi vẽ Polygon/Segmentation hàng nghìn điểm)*
- **Nội dung & Mục đích:**
  - **Vấn đề:** Annotator phải click thủ công từ 100 - 300 điểm trên mỗi đối tượng phức tạp (tán cây, vỉa hè gồ ghề, xe bị che khuất), dẫn đến kiệt sức và đau mỏi khớp tay.
  - **Mô tả giải pháp:**
    - Công cụ hỗ trợ gắn nhãn bán tự động chạy cục bộ (Web tool hoặc backend Python nhỏ gọn).
    - Sử dụng mô hình Segment Anything (SAM-ONNX / MobileSAM) hoặc thuật toán trích xuất đường biên tự động (GrabCut, Canny + Contour Approximation).
    - Annotator chỉ cần: Click 1 box bao quanh vật thể hoặc click 2 - 3 điểm tích cực/tiêu cực (positive/negative points). Tool tự động nội suy ra Polygon mượt mà với số lượng đỉnh tối ưu hóa (Ramer-Douglas-Peucker).
    - Cho phép xuất trực tiếp định dạng CVAT XML / COCO JSON để import vào task.
  - **Hiệu quả kỳ vọng:** Giảm 70% số lần click chuột vật lý; tăng tốc độ gán nhãn Segmentation từ 3 - 5 lần.
- **Trạng thái:** 💡 Ý tưởng

---

### IDEA-003

**Tên ý tưởng:** Fast Class Switcher & Radial Quick Palette

- **Thứ tự:** #3
- **Thời gian đề xuất:** 18/09/2026 - 11:10
- **Người đề xuất:** @spameverytime
- **Liên kết Pain Point:** [PP-005](../pain-points.md#pp-005) *(Thao tác chuyển đổi giữa hàng chục nhãn chậm và dễ chọn nhầm)*
- **Nội dung & Mục đích:**
  - **Vấn đề:** Danh mục 19 classes dài khiến người gán nhãn phải cuộn chuột tìm kiếm liên tục, dễ click nhầm giữa `car` vs `truck`, `sidewalk` vs `road`.
  - **Mô tả giải pháp:**
    - Tool / Phím tắt giao diện bánh đà (Radial Menu / Quick Pie Menu) xuất hiện ngay tại vị trí con trỏ chuột khi giữ phím tắt (ví dụ `Tab` hoặc chuột phải).
    - Phân cụm 19 nhãn thành 4 nhóm màu trực quan:
      1. Xe cộ & Phương tiện (`car`, `truck`, `bus`, `motorcycle`, `bicycle`...)
      2. Con người (`pedestrian`, `rider`...)
      3. Hạ tầng & Mặt đường (`road`, `sidewalk`, `lane`...)
      4. Cảnh quan & Chướng ngại (`building`, `sky`, `vegetation`, `pole`...)
    - Gán hotkey số nhanh (`1`-`9`) cho các nhãn có tần suất sử dụng cao nhất.
  - **Hiệu quả kỳ vọng:** Rút ngắn thời gian chuyển đổi nhãn từ 3 - 5 giây xuống dưới 0.5 giây; giảm thiểu 90% lỗi chọn nhầm class.
- **Trạng thái:** 🛠️ Đang thiết kế

---

### IDEA-004

**Tên ý tưởng:** Auto Background Pre-Annotator (Sky & Road Generator)

- **Thứ tự:** #4
- **Thời gian đề xuất:** 18/09/2026 - 11:15
- **Người đề xuất:** @spameverytime
- **Liên kết Pain Point:** [PP-006](../pain-points.md#pp-006) *(Thao tác gán nhãn mảng nền lớn sky/road lặp đi lặp lại đơn điệu)*
- **Nội dung & Mục đích:**
  - **Vấn đề:** Mảng bầu trời (`sky`) và lòng đường (`road`) chiếm diện tích lớn trong hầu hết các ảnh Semantic Segmentation. Việc tô vẽ lặp lại cùng một thao tác đơn điệu trên hàng trăm ảnh gây buồn ngủ và giảm sự tập trung.
  - **Mô tả giải pháp:**
    - Script Python hoặc Web Tool nội bộ xử lý hàng loạt (Batch Pre-annotation).
    - Sử dụng mô hình phân đoạn nhẹ (Lightweight SegNet / Mask2Former tiền huấn luyện trên Cityscapes) để gán trước nhãn `sky` và `road` cho toàn bộ các frame chưa gán trong job.
    - Kết xuất file annotation sẵn để annotator nạp vào CVAT. Annotator chỉ việc review và tinh chỉnh nhẹ đường biên giao thoa, sau đó tập trung thời gian cho các vật thể foreground (người, xe cộ, biển báo).
  - **Hiệu quả kỳ vọng:** Tiết kiệm 40% tổng thời gian cho mỗi bức ảnh Segmentation; giải phóng tinh thần annotator khỏi thao tác đơn điệu.
- **Trạng thái:** 💡 Ý tưởng

---

### IDEA-005

**Tên ý tưởng:** Layer & Z-Order Conflict Inspector

- **Thứ tự:** #5
- **Thời gian đề xuất:** 18/09/2026 - 11:20
- **Người đề xuất:** @spameverytime
- **Liên kết Pain Point:** [PP-007](../pain-points.md#pp-007) *(Tranh chấp layer chồng lấn & lúng túng điều chỉnh Z-order khi đã lỡ vẽ đè)*
- **Nội dung & Mục đích:**
  - **Vấn đề:** Khi vẽ nhiều vật thể đè lên nhau (ví dụ: người đi bộ đứng trên vỉa hè, vỉa hè nằm trên nền đường), nếu không kiểm soát thứ tự Z-order đúng cách, nhãn nền sẽ đè mất nhãn foreground khi export dữ liệu mask.
  - **Mô tả giải pháp:**
    - Công cụ kiểm tra logic lớp (Layer Logic Checker) dạng web tool (cổng `9002` hoặc `9003`).
    - Nạp file annotation export từ CVAT, tự động quét và phân tích ma trận giao nhau (Intersection Matrix) giữa các vật thể:
      - Cảnh báo các ca bất hợp lý: `road` đè lên `car`, `vegetation` đè lên `traffic_sign`...
      - Tự động gợi ý và chuẩn hóa lại chỉ số Z-Order theo đúng 4 tầng quy định trong SOP (Tầng 1: Sky/Road -> Tầng 2: Sidewalk/Terrain -> Tầng 3: Building/Fence -> Tầng 4: Người/Xe/Biển báo).
    - Xuất lại file annotation chuẩn thứ tự lớp để import lại CVAT mà không cần sửa thủ công từng hình.
  - **Hiệu quả kỳ vọng:** Loại bỏ 100% lỗi sai mask do Z-Order khi export; không mất công vẽ lại các đối tượng đã lỡ bị đè.
- **Trạng thái:** 💡 Ý tưởng

---

### IDEA-006

**Tên ý tưởng:** Annotator - Reviewer Quality Check & IoU Visualizer

- **Thứ tự:** #6
- **Thời gian đề xuất:** 18/09/2026 - 11:25
- **Người đề xuất:** @spameverytime
- **Liên kết Pain Point:** [PP-004](../pain-points.md#pp-004) *(Reviewer từ chối batch cảm tính, không có tiêu chí định lượng)*
- **Nội dung & Mục đích:**
  - **Vấn đề:** Thiếu công cụ đo lường khách quan dẫn đến tranh cãi giữa annotator và reviewer về việc biên hộp/polygon đã đủ khít hay chưa, bắt sửa lại toàn bộ batch gây lãng phí thời gian.
  - **Mô tả giải pháp:**
    - Web Dashboard đối chiếu chất lượng chạy cục bộ trên dải cổng `9xxx`.
    - Cho phép nạp 2 file annotations: Bản của Annotator và Bản sửa mẫu của Reviewer/Lead.
    - Tự động tính toán chỉ số IoU (Intersection over Union) và khoảng cách Hausdorff cho từng vật thể:
      - Hiển thị heatmap trực quan các điểm chênh lệch biên.
      - Đánh giá đạt/không đạt theo ngưỡng định lượng đã thống nhất (ví dụ: IoU ≥ 0.85 là Pass).
      - Xuất báo cáo sai số chi tiết kèm ảnh minh chứng để đối thoại khách quan, minh bạch.
  - **Hiệu quả kỳ vọng:** Chấm dứt hoàn toàn tranh luận cảm tính; rút ngắn thời gian vòng lặp review - feedback xuống còn một nửa.
- **Trạng thái:** 💡 Ý tưởng

---

## 3. Quy Trình Đóng Góp Ý Tưởng Mới

Khi phát hiện một nỗi đau mới hoặc nảy sinh ý tưởng công cụ hữu ích:
1. Xác định mã nỗi đau liên quan trong [`pain-points.md`](../pain-points.md) (mã `PP-xxx`) hoặc [`problem-backlog.md`](../problem-backlog.md) (mã `P-xxx`).
2. Lấy mã ý tưởng tiếp theo theo thứ tự tăng dần: `IDEA-007`, `IDEA-008`...
3. Thêm 1 dòng tóm tắt vào bảng ở **Mục 1** kèm mốc thời gian đề xuất.
4. Tạo section chi tiết tại **Mục 2** tuân thủ cấu trúc chuẩn: **Thứ tự**, **Thời gian đề xuất**, **Liên kết Pain Point**, **Nội dung & Mục đích**, và **Trạng thái**.
5. Khi ý tưởng được chọn để phát triển, chuyển trạng thái sang `🛠️ Đang thiết kế` hoặc `🚀 Đang phát triển`, đăng ký cổng mạng trong [`source-tool/GUIDELINE.md`](GUIDELINE.md) và bắt đầu triển khai code trong thư mục con tương ứng.
