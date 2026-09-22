# Sổ Ghi Nhận Nỗi Đau Của Người Gán Nhãn (Annotator Pain Points)

Tài liệu này dùng để **thu thập, phân tích và theo dõi các nỗi đau (pain points)**, rào cản thao tác, khó khăn thể chất/tâm lý và xung đột quy trình mà người gán nhãn (Annotator) gặp phải trong suốt chiến dịch gán nhãn dữ liệu.

Khác với [`problem-backlog.md`](problem-backlog.md) (tập trung chủ yếu vào các ca biên **Edge Cases** dữ liệu và thiếu sót của guideline kỹ thuật), **Sổ Pain Points** tập trung vào **con người và công cụ**: *Cái gì khiến annotator mệt mỏi nhất? Thao tác nào tốn nhiều thời gian vô ích nhất? Khâu nào dễ ức chế và dễ nản lòng nhất?*

Từ tài liệu này, nhóm sẽ ưu tiên:
1. Đề xuất & xây dựng các **công cụ tự động hóa** (ghi nhận tại [`source-tool/tool-ideas.md`](source-tool/tool-ideas.md) và mã nguồn tại [`source-tool/`](source-tool/)) giúp giảm tải thao tác lặp.
2. Chuẩn hóa lại **quy trình review/feedback** để giảm bất đồng quan điểm.
3. Đề xuất cải tiến **guideline và môi trường làm việc** thân thiện hơn cho annotator.

---

## 1. Quy Chuẩn Phân Loại & Đánh Giá

### 1.1. Mã định danh
- Quy ước: `PP-NNN` (`PP-001`, `PP-002`, `PP-003`...). Đánh số tăng dần, **không tái sử dụng mã cũ đã đóng/hủy**.

### 1.2. Phân loại chuẩn (Category)
| Phân loại | Ý nghĩa |
|---|---|
| `🛠️ Công cụ & Hạ tầng` | Sự cố giật lag, mất dữ liệu, thiếu phím tắt, giao diện CVAT khó thao tác hoặc thiếu tính năng tiện ích. |
| `📘 Đặc tả & Guideline` | Hướng dẫn mông lung, thiếu hình ảnh đối chiếu, quy tắc mâu thuẫn hoặc thay đổi đột ngột giữa chừng. |
| `🩺 Thể chất & Thao tác` | Mỏi mắt, đau cổ tay/ngón tay (hội chứng RSI), mỏi lưng/cổ do ngồi lâu và click chuột hàng nghìn lần lặp đi lặp lại. |
| `⚖️ Review & Phản hồi` | Đánh giá cảm tính, thiếu tiêu chí định lượng, phản hồi chậm trễ dẫn đến phải sửa hàng loạt (re-work). |
| `📷 Chất lượng Dữ liệu` | Ảnh quá tối, mờ, rung lắc, góc chụp khuất, độ phân giải thấp khiến mắt người cũng không thể phân định. |

### 1.3. Mức độ tác động (Severity)
- `🚨 Nghiêm trọng (Critical)`: Khiến annotator mất toàn bộ công sức gán nhãn, chặn đứng tiến độ hoặc gây ức chế tột độ khiến annotator không thể tiếp tục công việc.
- `⚠️ Cao (High)`: Làm giảm >50% năng suất gán nhãn, tỷ lệ lỗi sai cao hoặc gây mệt mỏi thể chất nhanh chóng.
- `⚡ Trung bình (Medium)`: Làm chậm 15% - 30% tốc độ làm việc, thao tác cồng kềnh nhưng vẫn có thể làm việc tiếp.
- `💡 Thấp (Low)`: Bất tiện nhỏ, gây phiền toái nhẹ về trải nghiệm sử dụng.

### 1.4. Trạng thái xử lý (Status)
- `🔴 Đang gặp`: Nỗi đau đang diễn ra thường xuyên, chưa có giải pháp giảm tải.
- `🟡 Giải pháp tạm`: Đã có mẹo (tip/trick) hoặc quy trình ứng phó tạm thời.
- `🛠️ Đang làm tool`: Đang phát triển phần mềm/script nội bộ để tự động hóa hoặc tháo gỡ.
- `✅ Đã giải quyết`: Đã có giải pháp dứt điểm (bổ sung tool, tinh chỉnh CVAT hoặc chuẩn hóa quy trình).

---

## 2. Bảng Danh Sách Nỗi Đau (Pain Point Index)

| Mã | Tóm tắt nỗi đau | Phân loại | Mức độ | Trạng thái | Hướng giải quyết / Tool hỗ trợ |
|:---:|---|---|:---:|:---:|---|
| [PP-001](#pp-001) | Mất dữ liệu nhãn khi CVAT giật lag, mất kết nối hoặc session timeout | 🛠️ Công cụ & Hạ tầng | 🚨 Nghiêm trọng | 🟡 Giải pháp tạm | Rút ngắn chu kỳ Save; Cần script Auto-save & Local Cache |
| [PP-002](#pp-002) | Mỏi mắt và đau cổ tay (RSI) khi vẽ Polygon/Segmentation hàng nghìn điểm | 🩺 Thể chất & Thao tác | ⚠️ Cao | 🟡 Giải pháp tạm | Tận dụng AI Assist (Segment Anything/SAM); Quy tắc nghỉ mắt 20-20-20 |
| [PP-003](#pp-003) | "Vùng xám" nhận diện ranh giới: Vật thể bị che khuất (Occlusion) vs Bóng đổ (Shadow) | 📘 Đặc tả & Guideline | ⚠️ Cao | 🔴 Đang gặp | Bổ sung hình ảnh visual do/don't vào Guideline; Gắn flag `can_xem_lai` |
| [PP-004](#pp-004) | Reviewer từ chối batch cảm tính, không có tiêu chí định lượng khiến annotator sửa lại toàn bộ | ⚖️ Review & Phản hồi | ⚠️ Cao | 🔴 Đang gặp | Thống nhất sai số cho phép (Margin of Error / IoU threshold); Họp đối chiếu mẫu |
| [PP-005](#pp-005) | Thao tác chuyển đổi giữa hàng chục nhãn (Class selector) chậm và dễ chọn nhầm | 🛠️ Công cụ & Hạ tầng | ⚡ Trung bình | 🛠️ Đang làm tool | Phím tắt số (Number Keys); Gom nhóm phân cấp nhãn (Hierarchical labels) |
| [PP-006](#pp-006) | Thao tác gán nhãn mảng nền lớn (sky, road) lặp đi lặp lại đơn điệu gây ngợp và chán nản | 🩺 Thể chất & Thao tác | ⚠️ Cao | 🛠️ Đang làm tool | Đề xuất Tool tự động Pre-annotation Sky & Road (Background First) |
| [PP-007](#pp-007) | Tranh chấp layer chồng lấn & lúng túng điều chỉnh thứ tự Z-order khi đã lỡ vẽ đè | 🛠️ Công cụ & Hạ tầng | ⚠️ Cao | 🟡 Giải pháp tạm | Tận dụng thuộc tính Z-Order trong CVAT; Áp dụng Quy trình vẽ 4 tầng (Layering SOP) |

---

## 3. Chi Tiết Các Nỗi Đau Mẫu Từ Chuyên Gia (Expert Sample Pain Points)

---

### PP-001

**Mất dữ liệu nhãn khi CVAT giật lag, mất kết nối hoặc session timeout đột ngột**

- **Phân loại:** 🛠️ Công cụ & Hạ tầng
- **Mức độ tác động:** 🚨 Nghiêm trọng (Critical)
- **Người ghi nhận:** Chuyên gia Data Annotation / @spameverytime · 18/09/2026
- **Tần suất xuất hiện:** Thường xảy ra vào giờ cao điểm nhiều người cùng truy cập server hoặc mạng wifi chập chờn.
- **Triệu chứng & Bối cảnh:**
  - Annotator tỉ mỉ gán nhãn suốt 30 - 45 phút trên một job phức tạp (nhiều xe cộ, người đi bộ và polyline). Khi nhấn tổ hợp phím lưu (`Ctrl + S`), giao diện CVAT quay vòng tròn (spinner) liên tục rồi báo lỗi `504 Gateway Timeout` hoặc `Session Expired`.
  - Toàn bộ các box và polygon vừa tạo trong phiên làm việc biến mất hoàn toàn, bắt buộc annotator phải làm lại từ đầu.
- **Nguyên nhân gốc rễ (Root Cause):**
  - CVAT web client mặc định không lưu trữ state nhãn vào LocalStorage/IndexedDB của trình duyệt trước khi đồng bộ lên máy chủ.
  - Người gán nhãn tập trung cao độ nên quên thói quen lưu thường xuyên (mỗi 2 - 3 phút).
- **Tác động thực tế:**
  - Giảm sút nghiêm trọng tinh thần và động lực làm việc.
  - Gây trễ deadline công việc từ 1 - 2 ngày cho cả đội.
- **Giải pháp tạm thời (Workaround):**
  - Rèn luyện phản xạ: Cứ gán xong 3 - 5 vật thể hoặc sau 2 phút là bấm `Ctrl + S`.
  - Kiểm tra biểu tượng đám mây lưu trên góc trên thanh công cụ CVAT trước khi chuyển frame.
- **Giải pháp dài hạn đề xuất:**
  - Thiết lập tiện ích mở rộng (Browser Extension) hoặc Userscript tự động trigger save và cảnh báo khi mất kết nối.
  - Cấu hình server CVAT tăng timeout và duy trì keep-alive session tốt hơn.
- **Trạng thái:** 🟡 Giải pháp tạm

---

### PP-002

**Mỏi mắt và đau mỏi cổ tay (hội chứng RSI) khi vẽ Polygon / Semantic Segmentation hàng nghìn đỉnh**

- **Phân loại:** 🩺 Thể chất & Thao tác
- **Mức độ tác động:** ⚠️ Cao (High)
- **Người ghi nhận:** Chuyên gia Data Annotation · 18/09/2026
- **Tần suất xuất hiện:** Mỗi khi nhận job bài toán Segmentation giao thông (vỉa hè gồ ghề, tán cây, dải phân cách phức tạp).
- **Triệu chứng & Bối cảnh:**
  - Để đạt độ mịn theo yêu cầu của Semantic Segmentation, annotator phải click chuột liên tục từ 100 đến 300 điểm cho mỗi vật thể phức tạp.
  - Sau 2 - 3 giờ làm việc liên tục, ngón trỏ và cổ tay bị căng cứng, khớp ngón tay ê buốt; mắt bị khô, mờ do phải zoom sát mức 400% - 800% để tìm viền pixel.
- **Nguyên nhân gốc rễ (Root Cause):**
  - Công cụ polygon thủ công đòi hỏi quá nhiều thao tác vật lý.
  - Thiếu công cụ hỗ trợ AI bán tự động (như SAM - Segment Anything hoặc OpenCV grabcut) tích hợp sẵn trong pipeline CVAT.
  - Thiếu quy tắc nghỉ ngơi ngắt quãng (Micro-breaks).
- **Tác động thực tế:**
  - Năng suất gán nhãn giảm dần theo thời gian trong ngày (buổi sáng đạt 40 ảnh/giờ, buổi chiều giảm còn 15 ảnh/giờ).
  - Tỷ lệ lỗi viền tăng cao về cuối ngày do annotator "click ẩu" cho nhanh xong việc.
- **Giải pháp tạm thời (Workaround):**
  - Áp dụng nguyên tắc 20-20-20: Mỗi 20 phút nhìn xa 20 feet (6m) trong 20 giây.
  - Dùng chuột công thái học (Ergonomic Mouse) hoặc bàn vẽ cảm ứng nếu có điều kiện.
  - Sử dụng phím tắt `N` (Create new shape) và `Space` (Pan ảnh) thay vì rê chuột khắp màn hình.
- **Giải pháp dài hạn đề xuất:**
  - Kích hoạt model AI Assist SAM trên CVAT để annotator chỉ cần click 1 - 2 điểm (positive/negative clicks) là tự động sinh mặt nạ polygon chính xác.
- **Trạng thái:** 🟡 Giải pháp tạm

---

### PP-003

**"Vùng xám" nhận diện ranh giới: Vật thể bị che khuất (Occlusion) vs Bóng đổ (Shadow) vs Phản chiếu (Reflection)**

- **Phân loại:** 📘 Đặc tả & Guideline
- **Mức độ tác động:** ⚠️ Cao (High)
- **Người ghi nhận:** Chuyên gia Data Annotation · 18/09/2026
- **Tần suất xuất hiện:** Các ảnh chụp thời tiết nắng gắt ban trưa (bóng đổ đậm) hoặc trời mưa (mặt đường phản chiếu đèn/xe).
- **Triệu chứng & Bối cảnh:**
  - Khi xe ô tô chạy dưới gầm cầu hoặc bóng cây đổ râm ran lên nắp capo, annotator phân vân không biết ranh giới của xe kết thúc ở đâu và bóng bắt đầu từ đâu.
  - Đối với vệt bóng đen dài của xe tải trên mặt đường: Nếu vẽ lấn vào box xe tải thì sai kích thước thực tế, nếu cắt sát thì bị reviewer mắng là "bỏ sót đuôi xe vì tưởng là bóng".
- **Nguyên nhân gốc rễ (Root Cause):**
  - Guideline chỉ nêu quy tắc bằng câu chữ chung chung: *"Không vẽ bóng đổ của xe"*, nhưng thực tế bóng đổ hòa trộn trực tiếp với phần gầm xe và bánh xe màu đen tuyền.
  - Thiếu thư viện "Ví dụ thực tế Tốt / Xấu" (Visual Good/Bad Examples).
- **Tác động thực tế:**
  - Annotator mất từ 2 - 5 phút chỉ để săm soi zoom từng pixel cho 1 chiếc xe.
  - Gây tranh cãi và không nhất quán giữa các annotator khác nhau trong cùng một đội.
- **Giải pháp tạm thời (Workaround):**
  - Bật thanh trượt `Brightness / Contrast / Gamma` trên CVAT lên mức cao để làm sáng phần gầm xe và phân biệt lốp xe màu xám với bóng màu đen.
  - Đặt tag `can_xem_lai` khi độ che phủ vượt quá 60%.
- **Giải pháp dài hạn đề xuất:**
  - Đề xuất bổ sung phụ lục hình ảnh thực tế vào [`Annotation_Guideline_BBox_Polygon_Polyline_v1.md`](Annotation_Guideline_BBox_Polygon_Polyline_v1.md).
  - Lập quyết định kỹ thuật [`so-quyet-dinh.md`](so-quyet-dinh.md) về ngưỡng chấp nhận đối với bóng gầm xe.
- **Trạng thái:** 🔴 Đang gặp (Liên quan: [`P-001`](problem-backlog.md#p-001), [`P-002`](problem-backlog.md#p-002))

---

### PP-004

**Reviewer từ chối batch cảm tính, không có tiêu chí định lượng khiến annotator sửa lại toàn bộ**

- **Phân loại:** ⚖️ Review & Phản hồi
- **Mức độ tác động:** ⚠️ Cao (High)
- **Người ghi nhận:** Chuyên gia Data Annotation · 18/09/2026
- **Tần suất xuất hiện:** Giai đoạn nghiệm thu cuối tuần.
- **Triệu chứng & Bối cảnh:**
  - Annotator hoàn thành 200 ảnh và gửi review. Reviewer trả về trạng thái `Rejected` chỉ với lời bình luận: *"Nhiều xe vẽ chưa khít viền, đề nghị xem lại toàn bộ"*.
  - Annotator không biết "chưa khít" là bao nhiêu pixel, ở frame nào, job nào, dẫn đến việc phải mở lại từng ảnh trong 200 ảnh để kiểm tra trong vô vọng.
- **Nguyên nhân gốc rễ (Root Cause):**
  - Thiếu quy chuẩn nghiệm thu (Acceptance Criteria) bằng con số (ví dụ: sai số viền tối đa $\pm 2$ pixel đối với ảnh 1080p, hoặc chỉ số IoU $\ge 0.90$).
  - Thiếu công cụ tạo issue ghim trực tiếp lên đúng đối tượng lỗi trên CVAT.
- **Tác động thực tế:**
  - Gây căng thẳng, mất niềm tin và rạn nứt mối quan hệ phối hợp giữa Annotator và Reviewer.
  - Tốn gấp đôi thời gian (re-work) mà chất lượng dữ liệu chưa chắc đã cải thiện.
- **Giải pháp tạm thời (Workaround):**
  - Yêu cầu Reviewer chụp màn hình kèm đường link frame CVAT cụ thể chứa lỗi mẫu đại diện.
- **Giải pháp dài hạn đề xuất:**
  - Ban hành quy chế: Reviewer khi reject **bắt buộc** phải chỉ ra tối thiểu 3 minh chứng kèm ID đối tượng và giải thích rõ vi phạm điều khoản nào trong Guideline.
  - Xây dựng script kiểm tra tự động trước khi submit (Auto-linter kiểm tra box rỗng, box quá bé, polygon tự cắt chéo).
- **Trạng thái:** 🔴 Đang gặp

---

### PP-005

**Thao tác chuyển đổi qua lại giữa hàng chục nhãn (Class selector) chậm và dễ nhấp nhầm**

- **Phân loại:** 🛠️ Công cụ & Hạ tầng
- **Mức độ tác động:** ⚡ Trung bình (Medium)
- **Người ghi nhận:** Chuyên gia Data Annotation · 18/09/2026
- **Tần suất xuất hiện:** Các task hỗn hợp gồm nhiều đối tượng khác nhau trên cùng một khung hình.
- **Triệu chứng & Bối cảnh:**
  - Khi gán nhãn đường phố có tới 20 - 30 classes: `car`, `truck`, `bus`, `pedestrian`, `rider`, `bicycle`, `motorcycle`, `traffic_light_green`, `traffic_light_red`, `traffic_sign`, `lane_solid_white`...
  - Mỗi khi đổi từ vẽ ô tô sang vẽ người đi bộ, annotator phải di chuột sang thanh bên phải, cuộn chuột tìm kiếm nhãn trong danh sách thả xuống (dropdown) dài dằng dặc.
  - Thao tác nhanh rất dễ bấm nhầm `car` thành `truck` hoặc `pedestrian` thành `rider`.
- **Nguyên nhân gốc rễ (Root Cause):**
  - Danh sách nhãn phẳng (flat list), chưa được gom nhóm logic (Vehicle, Human, Road, Sign).
  - Annotator chưa quen cấu hình phím tắt số nhanh (Hotkeys 0-9) trên CVAT.
- **Tác động thực tế:**
  - Tốn khoảng 3 - 5 giây vô ích cho mỗi lần đổi nhãn. Nhân lên 1,000 objects = mất gần 1 giờ làm việc chỉ để chọn nhãn!
  - Lỗi gán sai class (Classification Error) dù ranh giới vẽ rất đẹp.
- **Giải pháp tạm thời (Workaround):**
  - Áp dụng kỹ thuật gán nhãn theo mẻ (Batch by Class): Gán hết toàn bộ `car` trên frame rồi mới chuyển sang gán toàn bộ `pedestrian`, không đổi class liên tục.
  - Dùng tính năng gán phím tắt nhanh 1-9 cho các class xuất hiện thường xuyên nhất.
- **Giải pháp dài hạn đề xuất:**
  - Sử dụng tool chuẩn hóa hoặc cấu hình template task CVAT chia nhãn theo nhóm màu trực quan.
- **Trạng thái:** 🛠️ Đang làm tool (Tích hợp gợi ý phím tắt)

---

## 4. Các Pain Point Của Tôi (User Pain Points)

> ✍️ **Khu vực dành riêng cho Duy bổ sung các nỗi đau thực tế của cá nhân.**  
> Khi bạn gặp bất kỳ sự ức chế, khó khăn thao tác, mỏi mệt hoặc vấn đề quy trình nào trong lúc làm bài, hãy ghi nhận tiếp từ mã `PP-008` theo cấu trúc mẫu bên dưới:

---

### PP-006

**Thao tác gán nhãn các đối tượng nền lớn (Bầu trời, Mặt đường) lặp đi lặp lại đơn điệu gây ngợp và kiệt sức nhận thức (Cognitive Fatigue)**

- **Phân loại:** 🩺 Thể chất & Thao tác
- **Mức độ tác động:** ⚠️ Cao (High)
- **Người ghi nhận:** @spameverytime · 18/09/2026
- **Tần suất xuất hiện:** Toàn bộ các ảnh/frame trong bài toán Semantic Segmentation giao thông đường phố.
- **Triệu chứng & Bối cảnh:**
  - Các đối tượng nền background như Bầu trời (`sky`) và Mặt đường (`road`) chiếm diện tích rất lớn trong ảnh (thường từ 40% đến 60% toàn bộ khung hình).
  - Bản chất các đối tượng này là lớp nền (background), chỉ cần gán nhãn tương đối, không đòi hỏi độ chính xác viền quá khắt khe như vật thể tiền cảnh (foreground).
  - Tuy nhiên, trên từng frame, annotator vẫn phải làm đi làm lại chuỗi thao tác thủ công: chọn nhãn `sky` -> kéo vẽ polygon viền xung quanh -> chọn nhãn `road` -> kéo vẽ polygon viền xung quanh.
  - Việc phải lặp đi lặp lại một công việc đơn giản, tẻ nhạt trên hàng trăm bức ảnh khiến người gán nhãn cảm thấy ngợp, nhàm chán (bore-out) và nhanh chóng tụt mood, giảm năng lượng trước khi bắt tay vào các đối tượng phức tạp đòi hỏi sự tỉ mỉ thực sự (như `building`, `tree`, `pole`, `traffic_sign`, `vehicle`, `pedestrian`...).
- **Nguyên nhân gốc rễ (Root Cause):**
  - Quy trình gán nhãn hiện tại hoàn toàn thủ công từ đầu đến cuối, thiếu bước tiền gán nhãn (Pre-annotation / Semi-automated pre-processing) cho các mảng nền lớn.
  - Con người đang phải bỏ sức cơ bắp cho những tác vụ mà thị giác máy tính / mô hình phân đoạn cơ bản có thể tự động nhận biết chính xác đến 85–95%.
- **Tác động thực tế:**
  - Tiêu tốn từ 25% – 35% tổng thời gian thao tác cho mỗi frame chỉ cho công việc "chân tay" đơn điệu.
  - Gây ức chế tâm lý và suy giảm nhận thức (Cognitive Exhaustion), khiến annotator dễ mất kiên nhẫn và vẽ ẩu ở các đối tượng quan trọng ở bước sau.
- **Giải pháp tạm thời (Workaround):**
  - Áp dụng kỹ thuật vẽ polygon thô bao trọn toàn bộ nửa trên màn hình cho `sky` và nửa dưới cho `road`, sau đó gửi về lớp dưới cùng (Z-order / Background layer) trên CVAT để các đối tượng foreground vẽ sau tự động đè lên.
  - Gán mảng lớn theo mẻ (làm sky/road cho 20 ảnh một lúc rồi mới quay lại vẽ chi tiết).
- **Giải pháp dài hạn đề xuất (Đề xuất Tool hỗ trợ):**
  - **Tên công cụ đề xuất:** `Auto Sky-Road Pre-Annotator` (Tool tiền gán nhãn Bầu trời & Con đường tự động).
  - **Cơ chế hoạt động:**
    1. **Đầu vào:** Thư mục ảnh gốc của Job/Task hoặc danh sách frame từ CVAT.
    2. **Xử lý tự động:** Sử dụng mô hình Semantic Segmentation gọn nhẹ (như SegFormer / MobileNet-DeepLabV3+ hoặc Color/Horizon Gradient Heuristic) đã được huấn luyện trên tập dữ liệu đường phố (Cityscapes/Mapillary) để tự động sinh mask/polygon cho 2 nhãn `sky` và `road`.
    3. **Đầu ra:** Xuất file annotation chuẩn định dạng CVAT XML 1.1 / Datumaro hoặc COCO Segmentation.
    4. **Workflow ứng dụng:** Upload file annotation sinh sẵn này lên CVAT trước -> Khi Annotator mở CVAT ra, `sky` và `road` đã được tô sẵn ở layer nền -> Annotator chỉ cần tập trung vẽ các chi tiết tinh xảo (`building`, `tree`, `pole`, `traffic_sign`, `vehicle`, `pedestrian`) đè lên trên, giảm ngay 30%–40% khối lượng thao tác thủ công!
- **Trạng thái:** 🛠️ Đang làm tool (Đề xuất phát triển trong `source-tool/sky-road-pre-annotator/` trên cổng `9002`)

---

### PP-007

**Tranh chấp thứ tự layer chồng lấn (Layer Overlap) & lúng túng khi điều chỉnh thứ tự Z-Order khi đã lỡ vẽ đè**

- **Phân loại:** 🛠️ Công cụ & Hạ tầng
- **Mức độ tác động:** ⚠️ Cao (High)
- **Người ghi nhận:** @spameverytime · 18/09/2026
- **Tần suất xuất hiện:** Thường xuyên trong mọi cảnh Semantic Segmentation có độ phức tạp cao (cây cối trước tòa nhà, xe cộ trên mặt đường, biển báo trên nền trời).
- **Triệu chứng & Bối cảnh:**
  - Trong quá trình vẽ segmentation, các đối tượng thực tế luôn có sự che khuất và chồng lấn nhau (ví dụ: cành cây đè lên tường nhà, xe ô tô đè lên mặt đường, cột đèn đè lên xe và cây).
  - Annotator không phán đoán được nên vẽ đối tượng nào trước, đối tượng nào sau.
  - Khi đã tỉ mỉ vẽ xong một đối tượng (ví dụ chiếc xe), sau đó lỡ tay vẽ một mảng nền (ví dụ mặt đường hoặc bóng râm) thì mảng nền lại nhảy lên đè mất toàn bộ chiếc xe bên dưới.
  - Annotator không biết làm thế nào để đưa chiếc xe nổi trở lại lên trên; nếu xóa đi vẽ lại thì mất 15–30 phút công sức cực kỳ ức chế và nản lòng.
- **Nguyên nhân gốc rễ (Root Cause):**
  - Thiếu quy chuẩn thứ tự vẽ lớp (Layer Hierarchy Pipeline) từ xa tới gần trước khi đặt bút vẽ.
  - Thiếu kiến thức sử dụng thuộc tính **Z-Order** (độ sâu hiển thị của layer) trên giao diện CVAT và các phím tắt quản lý layer nâng cao.
- **Tác động thực tế:**
  - Lãng phí thời gian: Phải xóa đi vẽ lại hoặc cắt viền thủ công cực kỳ vất vả, giảm 50% tốc độ gán nhãn.
  - Nguy cơ sinh lỗi chất lượng: Lớp sau đè mất pixel của lớp trước khiến mask xuất ra bị sai phân loại pixel nghiêm trọng.
- **Giải pháp tạm thời (Workaround):**
  - **Sử dụng tính năng Z-Order của CVAT:** Chọn đối tượng bị che $\rightarrow$ Mở bảng `Objects` ở thanh bên phải $\rightarrow$ Tăng chỉ số `Z Order` từ `0` lên `1`, `2` hoặc `10`. Đối tượng sẽ lập tức nổi lên trên các lớp khác mà không cần vẽ lại!
  - **Dùng phím tắt:** Chọn đối tượng và nhấn phím `+` (hoặc `Shift + +`) để tăng Z-order, `-` để giảm Z-order.
  - **Ẩn/Khóa tạm thời:** Nhấn icon Con Mắt (phím tắt `H`) để tạm ẩn các layer lớn, hoặc icon Ổ Khóa (phím tắt `L`) để khóa layer nền, tránh click nhầm khi đang vẽ chi tiết nhỏ.
- **Giải pháp dài hạn đề xuất:**
  - Chuẩn hóa **"Quy trình vẽ tối ưu 4 tầng (Layering SOP)"** vào cẩm nang nội bộ và guideline:
    1. *Tầng 1 (Z=0):* Nền vô tận (`sky`, đồi núi xa).
    2. *Tầng 2 (Z=5):* Hạ tầng tĩnh (`road`, `sidewalk`, `terrain`, `building`).
    3. *Tầng 3 (Z=10):* Thảm thực vật & Kết cấu trung cảnh (`vegetation`, tường rào).
    4. *Tầng 4 (Z=20+):* Vật thể độc lập & Chi tiết mảnh (`vehicle`, `pedestrian`, `pole`, `traffic sign`, `lane`).
  - Khi tuân thủ đúng quy trình này, các lớp sau tự nhiên đè lên lớp trước mà không cần phải cắt xén viền giao nhau.
- **Trạng thái:** 🟡 Giải pháp tạm (Đã có giải pháp Z-Order & Quy trình SOP)

---

## 5. Mẫu Trống Để Thêm Pain Point Mới

### Thêm 1 dòng vào bảng `## 2. Bảng Danh Sách Nỗi Đau`:
```markdown
| [PP-NNN](#pp-nnn) | Tóm tắt ngắn gọn nỗi đau | Phân loại chuẩn | Mức độ chuẩn | Trạng thái chuẩn | Hướng giải quyết / Tool |
```

### Thêm section chi tiết vào phần nội dung:
```markdown
### PP-NNN

**Tóm tắt nỗi đau trong một câu súc tích**

- **Phân loại:** [🛠️ Công cụ & Hạ tầng | 📘 Đặc tả & Guideline | 🩺 Thể chất & Thao tác | ⚖️ Review & Phản hồi | 📷 Chất lượng Dữ liệu]
- **Mức độ tác động:** [🚨 Nghiêm trọng | ⚠️ Cao | ⚡ Trung bình | 💡 Thấp]
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
- **Trạng thái:** [🔴 Đang gặp | 🟡 Giải pháp tạm | 🛠️ Đang làm tool | ✅ Đã giải quyết]
```
