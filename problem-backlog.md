# Problem backlog

Những chỗ gặp trong lúc gán nhãn mà **guideline chưa trả lời được**, cộng các pain point về công cụ.

Ghi ngay khi gặp, kể cả lúc chưa biết xử lý thế nào. Một edge case không được ghi lại thì
mỗi người sẽ tự xử lý theo một kiểu — và đó là nguồn lớn nhất của nhãn không nhất quán.

> Các mục bên dưới là **ví dụ**, tên và link CVAT đều giả. Mẫu trống để copy nằm cuối file.

## Danh sách

| Mã | Tóm tắt | Loại | Mục guideline | Trạng thái | Kết quả |
|---|---|---|---|---|---|
| [P-001](#p-001) | Người ngồi sau xe máy: box riêng hay gộp với người lái | Guideline mơ hồ | §3.2 | ✅ Đã chốt | [QĐ-001](so-quyet-dinh.md#qđ-001) |
| [P-002](#p-002) | Xe bị che khuất hơn một nửa | Guideline chưa nói tới | §3.4 | ↗️ Hỏi BTC | — |
| [P-003](#p-003) | Phải vẽ lại box y hệt qua nhiều frame liên tiếp | Pain point công cụ | — | 🗣️ Đang bàn | — |
| [P-004](#p-004) | Xe quá mờ kèm bóng phản chiếu đèn: không rõ ranh giới (UNCERTAIN_BOUNDARY) | Guideline mơ hồ | §3, §5 | 🔴 Mở | — |
| [P-005](#p-005) | Xác định độ cao box khi xe quá mờ/tối: phân biệt nóc và bóng đổ gầm xe | Guideline mơ hồ | §3, §5 | 🔴 Mở | — |
| [P-006](#p-006) | Ô tô lắp giá treo trên nóc xe: BBox chỉ xe hay bao cả giá treo | Guideline chưa nói tới | §3 | 🔴 Mở | — |
| [P-007](#p-007) | Xe tải chở xe khác (car/truck) trên thùng: BBox gộp hay tách riêng | Guideline chưa nói tới | §3 | 🔴 Mở | — |
| [P-008](#p-008) | Vẽ polyline cho lane/double yellow: vẽ tim hay biên ngoài vạch đôi | Guideline mơ hồ | §4.2 | ✅ Đã chốt | [QĐ-005](so-quyet-dinh.md#qđ-005) |
| [P-009](#p-009) | Vạch liền đôi vàng bị mờ đứt đoạn: vẽ ngắt đoạn hay nối liền theo logic | Guideline mâu thuẫn | §4.2, §6 | ✅ Đã chốt | [QĐ-004](so-quyet-dinh.md#qđ-004) |
| [P-010](#p-010) | Quy cách vẽ polyline cho vạch kẻ đường dạng vạch ngang, ô vuông | Guideline chưa nói tới | §2, §4.2 | 🔴 Mở | — |

**Loại**

| Loại | Nghĩa là |
|---|---|
| Guideline chưa nói tới | Tình huống không có trong guideline |
| Guideline mơ hồ | Đọc guideline ra được hai cách hiểu trở lên |
| Guideline mâu thuẫn | Hai mục trong guideline nói ngược nhau |
| Pain point công cụ | Guideline rõ, nhưng làm trên CVAT chậm hoặc dễ sai |

**Trạng thái:** 🔴 Mở · 🗣️ Đang bàn · ↗️ Hỏi BTC · ✅ Đã chốt (trỏ sang QĐ) · 🛠️ Làm tool (trỏ sang `source-tool/`) · ⚪ Bỏ (ghi lý do)

---

## P-001

**Người ngồi sau xe máy: box riêng hay gộp chung với người lái**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** §3.2 — "mỗi người một bounding box"
- **Người phát hiện:** @thanh-vien-b · 16/09/2026
- **Link CVAT:**
  - https://cvat.example.com/tasks/12/jobs/101?frame=37 — hai người, gần như chồng khít
  - https://cvat.example.com/tasks/12/jobs/101?frame=112 — người ngồi sau chỉ lộ đầu
- **Mô tả:** §3.2 nói mỗi người một box, nhưng hình minh hoạ trong guideline lại vẽ một box
  cho cả xe máy lẫn người trên xe.
- **Các cách hiểu:**
  1. Theo câu chữ: người ngồi sau có box `nguoi` riêng.
  2. Theo hình minh hoạ: không vẽ box `nguoi` cho ai đang ngồi trên xe.
- **Xử lý tạm trong lúc chờ:** vẽ box riêng và gắn tag `can_xem_lai` để dễ lọc ra sửa.
- **Kết quả:** ✅ [QĐ-001](so-quyet-dinh.md#qđ-001)

## P-002

**Xe bị che khuất hơn một nửa**

- **Loại:** Guideline chưa nói tới
- **Mục guideline:** §3.4 — chỉ nói về vật thể bị cắt ở mép ảnh, không nói về bị che
- **Người phát hiện:** @thanh-vien-c · 17/09/2026
- **Link CVAT:**
  - https://cvat.example.com/tasks/12/jobs/103?frame=8 — ô tô sau xe buýt, lộ khoảng 30%
  - https://cvat.example.com/tasks/12/jobs/103?frame=64 — xe máy sau cột điện, lộ khoảng 50%
- **Mô tả:** Không rõ có gán nhãn vật thể bị che không, và nếu có thì box ôm phần nhìn thấy
  hay ôm cả phần ước lượng bị che.
- **Các cách hiểu:**
  1. Bỏ qua khi lộ dưới 50%.
  2. Luôn gán, box chỉ ôm phần nhìn thấy.
  3. Luôn gán, box ôm cả phần ước lượng.
- **Xử lý tạm trong lúc chờ:** dừng job 103, chuyển sang job khác ít ca che khuất.
- **Kết quả:** ↗️ Đã hỏi BTC ngày 18/09/2026, chờ trả lời.

## P-003

**Phải vẽ lại box y hệt qua nhiều frame liên tiếp**

- **Loại:** Pain point công cụ
- **Mục guideline:** —
- **Người phát hiện:** @thanh-vien-d · 18/09/2026
- **Link CVAT:** https://cvat.example.com/tasks/12/jobs/105?frame=200 — frame 200–260, xe đỗ không di chuyển
- **Mô tả:** Ảnh chụp liên tiếp từ camera cố định. Xe đỗ bên đường xuất hiện y nguyên ở hàng chục
  frame, annotator phải vẽ lại ở từng frame. Ước tính chiếm ~40% thời gian job 105.
- **Hướng đang cân nhắc:**
  1. Dùng chế độ *Track* sẵn có của CVAT — cần thử xem có hợp với dữ liệu dạng ảnh rời không.
  2. Viết script đọc file export của CVAT, nhân box sang các frame kế tiếp, rồi import lại.
- **Kết quả:** 🗣️ Đang bàn. Nếu chọn hướng 2 thì đổi trạng thái sang 🛠️ và làm trong
  [`source-tool/`](source-tool/).

## P-004

**Xe quá mờ kèm bóng đèn phản chiếu, không rõ ranh giới (UNCERTAIN_BOUNDARY)**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** §3 (Quy tắc Bounding Box: vật thể mờ & reflection), §5 (Issue format: UNCERTAIN_BOUNDARY)
- **Người phát hiện:** @thanh-vien-d · 16/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B026.jpg — đối tượng car ID 110
- **Mô tả:** Đối tượng car ID 110 quá mờ, không phân biệt rõ là thân xe hay bóng đèn phản chiếu hắt vào bề mặt. Ranh giới vật thể bị nhòe/chói sáng, không xác định được boundary chính xác (extent) của xe.
- **Các cách hiểu:**
  1. Xóa box/không gán: Tuân thủ nguyên tắc không suy đoán khi quá mờ và cấm gán nhãn bóng phản chiếu (reflection) theo §3.
  2. Vẫn vẽ box ước lượng thân xe và bật thuộc tính `occluded=true`.
  3. Chỉ vẽ box ôm phần nhận diện được chắc chắn, loại trừ vùng lóa sáng/phản chiếu.
- **Xử lý tạm trong lúc chờ:** Gắn issue `UNCERTAIN_BOUNDARY` / tag `can_xem_lai` trên CVAT cho ID 110, tạm thời chưa chốt job.
- **Kết quả:** 🔴 Mở

## P-005

**Xác định độ cao BBox khi xe quá mờ/tối: phân biệt ranh giới nóc xe và bóng đổ gầm xe**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** §3 (Bounding Box: bao sát đối tượng & loại trừ bóng đổ), §5 (Issue UNCERTAIN_BOUNDARY)
- **Người phát hiện:** @thanh-vien-d · 16/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B026.jpg — đối tượng car ID 111
- **Mô tả:** Đối tượng car ID 111 quá mờ/tối, rất khó xác định chính xác chiều cao (height) của BBox. Cụ thể: mép trên dễ bị vẽ thừa nền do mui xe chìm vào hậu cảnh, mép dưới dễ bị kéo trùm lên bóng đổ (shadow) của gầm xe trên mặt đường dẫn đến sai lệch kích thước hình học.
- **Các cách hiểu:**
  1. Chỉ căn box đến điểm tiếp đất ước lượng của bánh xe (loại trừ bóng đổ theo §3) và điểm cao nhất còn thấy rõ của mui xe.
  2. Kéo box trùm cả bóng mờ dưới gầm để tránh sót đối tượng.
  3. Bật thuộc tính `occluded=true` hoặc gắn issue `UNCERTAIN_BOUNDARY` khi độ cao không thể xác định chắc chắn.
- **Xử lý tạm trong lúc chờ:** Căn chỉnh đáy box dừng ở điểm tiếp xúc bánh xe theo visual evidence hiện có, gắn issue `UNCERTAIN_BOUNDARY` trên CVAT.
- **Kết quả:** 🔴 Mở

## P-006

**Ô tô lắp thêm giá treo / baga trên nóc xe: BBox chỉ ôm thân xe hay bao cả giá treo**

- **Loại:** Guideline chưa nói tới
- **Mục guideline:** §3 (Quy tắc Bounding Box — bao sát đối tượng, chưa nói tới phụ kiện lắp ngoài)
- **Người phát hiện:** @thanh-vien-d · 16/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B029.jpg — xe ô tô có lắp thêm khung giá treo trên nóc
  - w1/bbox_polygon/G01/G01_B033.jpg — car ID 150 chở theo hàng hóa/đồ vật cồng kềnh
- **Mô tả:** Ô tô có lắp thêm giá treo đồ/giá chở hàng (roof rack) hoặc hộp đựng đồ trên nóc xe. Guideline chưa quy định BBox của class `car` chỉ giới hạn đến phần nóc kim loại của xe hay phải mở rộng lên để bao trọn cả khung giá treo và hàng hóa mang theo.
- **Các cách hiểu:**
  1. Box ôm trọn cả thân xe và khung giá nóc: Đảm bảo phản ánh toàn bộ không gian vật lý chiếm dụng thực tế của phương tiện khi lưu thông trên đường (tránh va chạm không gian).
  2. Box chỉ ôm thân xe nguyên bản (chạm đến mép nóc kim loại của xe), bỏ qua giá treo để giữ kích thước hình học chuẩn của dòng xe `car`.
  3. Giá gắn cố định thì tính vào box xe; đồ đạc/hành lý/xe đạp đặt trên giá thì không tính.
- **Xử lý tạm trong lúc chờ:** Vẽ box bao gồm cả giá nóc và gắn tag `can_xem_lai` trên CVAT, xin ý kiến Lead/BTC chốt.
- **Kết quả:** 🔴 Mở

## P-007

**Xe tải chở theo ô tô/xe khác trên thùng: BBox gộp chung hay tách thành các đối tượng độc lập**

- **Loại:** Guideline chưa nói tới
- **Mục guideline:** §3 (Quy tắc Bounding Box — mỗi object = một annotation riêng, chưa nói về phương tiện đóng vai trò hàng hóa)
- **Người phát hiện:** @thanh-vien-d · 16/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B033.jpg — xe tải (truck) chở thêm xe con (car) hoặc xe tải khác trên thùng
- **Mô tả:** Xe tải chở theo phương tiện khác trên thùng xe (ví dụ xe cứu hộ sàn trượt, xe lồng chở ô tô con). Guideline chưa quy định rõ: các xe nằm trên thùng có được coi là object độc lập để gán nhãn hay coi là hàng hóa (freight/cargo); và BBox của xe tải có bao trùm toàn bộ các xe trên thùng hay chỉ tính riêng thân xe tải.
- **Các cách hiểu:**
  1. Tách riêng từng đối tượng: Xe tải có 1 BBox `truck` (chỉ ôm thân xe tải); mỗi xe nằm trên thùng có 1 BBox riêng (`car` hoặc `truck` tương ứng) và bật `occluded=true`. Đảm bảo mô hình học được từng instance xe xuất hiện trong ảnh.
  2. Gộp chung vào xe tải: BBox `truck` bao trọn cả xe tải lẫn các xe trên thùng; không gán nhãn cho các xe trên thùng vì chúng không tự tham gia giao thông mà đóng vai trò là hàng hóa chuyên chở.
  3. Vừa gán box `truck` trùm cả khối (bao gồm hàng trên thùng), vừa vẽ thêm box con cho từng xe trên thùng (overlap box).
- **Xử lý tạm trong lúc chờ:** Tách box riêng cho xe tải và từng xe trên thùng, gắn tag `can_xem_lai` trên CVAT và xin ý kiến Lead/BTC.
- **Kết quả:** 🔴 Mở

## P-008

**Vẽ polyline cho vạch làn đôi `lane/double yellow`: vẽ tim giữa hai vạch hay biên ngoài**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** §4.2 (Polyline – Lane Marking: "đi theo đúng tim/biên lane marking theo quy ước của bài")
- **Người phát hiện:** @thanh-vien-d · 17/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B026.jpg — vạch kẻ làn đôi màu vàng (lane/double yellow)
- **Mô tả:** Mục §4.2 của guideline chỉ ghi chung chung: *"Polyline phải đi theo đúng tim/biên lane marking theo quy ước của bài"*, nhưng hoàn toàn không định nghĩa rõ quy ước đối với vạch đôi (`lane/double yellow` / `lane/double white`) là: vẽ 1 đường polyline duy nhất chạy dọc theo tim (ở khe giữa 2 vạch vàng) hay bám theo biên ngoài, hay phải vẽ 2 polyline riêng biệt cho từng vạch.
- **Các cách hiểu:**
  1. Vẽ 1 đường polyline duy nhất chạy dọc theo tâm/tim chính giữa cụm vạch đôi (cách làm chuẩn và phổ biến nhất trong autonomous driving cho làn đôi).
  2. Vẽ 1 đường polyline bám theo biên ngoài của cụm vạch đôi.
  3. Vẽ 2 đường polyline riêng biệt cho từng vạch vàng (mỗi vạch 1 polyline).
- **Xử lý tạm trong lúc chờ:** Tạm thời vẽ polyline bám theo biên ngoài của vạch đôi, gắn tag `can_xem_lai` trên CVAT và xin ý kiến Mentor/BTC chốt quy ước.
- **Kết quả:** ✅ [QĐ-005](so-quyet-dinh.md#qđ-005) (thay thế [QĐ-003](so-quyet-dinh.md#qđ-003))

## P-009

**Vạch liền đôi vàng bị mờ, đứt đoạn: vẽ ngắt đoạn theo bằng chứng thị giác hay nối liền theo logic**

- **Loại:** Guideline mâu thuẫn
- **Mục guideline:** §4.2 (Polyline – Lane Marking: "không nối tắt qua vùng không có vạch", "kết thúc polyline tại điểm không còn đủ bằng chứng thị giác"), §6 (Checklist: "không nhảy qua vùng không có evidence")
- **Người phát hiện:** @thanh-vien-d · 17/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B041.jpg — vạch đôi vàng (`lane/double yellow`) bị mòn mờ, mất dấu từng đoạn ngắn
- **Mô tả:** Vạch đôi vàng trên thực tế là vạch liền nhưng do mặt đường bị mòn, bụi bẩn hoặc bóng râm che phủ nên bị đứt đoạn thành từng quãng ngắn. Theo câu chữ của §4.2 và §6, annotator bắt buộc phải ngắt polyline và không được nối tắt qua vùng mất dấu. Tuy nhiên, nếu vẽ ngắt thành nhiều đoạn polyline ngắn rời rạc, dữ liệu làn đường sẽ mất tính liên tục ngữ nghĩa và có nguy cơ khiến hệ thống xe tự lái nhận diện nhầm thành vạch đứt (dashed lane).
- **Các cách hiểu:**
  1. Tuân thủ nghiêm ngặt câu chữ §4.2: Kết thúc polyline ngay khi mất bằng chứng thị giác, vẽ ngắt thành từng đoạn ngắn riêng biệt mang cùng nhãn `lane/double yellow`.
  2. Nối liền theo logic vạch liên tục (nội suy): Nếu khoảng cách đứt đoạn ngắn và 2 đầu vạch cùng phương thẳng hàng rõ ràng, cho phép vẽ 1 đường polyline nối xuyên suốt qua vùng mất dấu để bảo toàn ngữ nghĩa làn đường cho xe tự lái.
- **Xử lý tạm trong lúc chờ:** Tạm thời vẽ ngắt đoạn theo bằng chứng thị giác hiện có (không nối tắt qua vùng mất dấu) để không vi phạm §4.2, gắn tag `can_xem_lai` trên CVAT và gửi câu hỏi xin ý kiến BTC/Mentor làm rõ quy tắc nội suy.
- **Kết quả:** ✅ [QĐ-004](so-quyet-dinh.md#qđ-004)

## P-010

**Quy cách vẽ polyline cho vạch kẻ đường dạng vạch ngang, ô vuông**

- **Loại:** Guideline chưa nói tới
- **Mục guideline:** §2 (Taxonomy: `lane/crosswalk`, `lane/single other`), §4.2 (Polyline – Lane Marking)
- **Người phát hiện:** @thanh-vien-d · 17/09/2026
- **Link CVAT:**
  - w1/bbox_polygon/G01/G01_B049.jpg — nét vẽ ID 445, 446 (vạch kẻ đường dạng vạch ngang, ô vuông)
- **Mô tả:** Tại ảnh xuất hiện vạch kẻ đường có họa tiết dạng vạch ngang, ô vuông (có thể là vạch đi bộ qua đường, vạch mắt võng cấm dừng hoặc ô đỗ xe). Guideline mục §2 có liệt kê các class như `lane/crosswalk`, `lane/single other` với shape polyline, nhưng mục §4.2 hoàn toàn chưa có hướng dẫn quy cách vẽ cho các dạng vạch hình học này: vẽ 2 đường biên giới hạn hai bên, vẽ từng nét vạch thành phần, hay vẽ bao quanh.
- **Các cách hiểu:**
  1. Vẽ 2 đường polyline giới hạn hai bên dải vạch (gán nhãn `lane/single white` như đang tạm vẽ ID 445, 446).
  2. Vẽ từng sọc vạch ngang độc lập bằng polyline (gán nhãn `lane/crosswalk` nếu là lối sang đường hoặc `lane/single other`).
  3. Chỉ vẽ vạch chỉ dẫn dọc luồng xe chạy, bỏ qua các họa tiết vạch ngang/ô vuông trên bề mặt.
- **Xử lý tạm trong lúc chờ:** Tạm thời giữ 2 đường `lane/single white` (ID 445, 446) giới hạn dải vạch, gắn tag `can_xem_lai` trên CVAT và xin ý kiến Mentor/BTC chốt taxonomy và quy cách vẽ chuẩn.
- **Kết quả:** 🔴 Mở

---

## Mẫu để copy

```markdown
## P-NNN

**Tóm tắt một dòng**

- **Loại:** Guideline chưa nói tới | Guideline mơ hồ | Guideline mâu thuẫn | Pain point công cụ
- **Mục guideline:** §
- **Người phát hiện:** @ · dd/mm/yyyy
- **Link CVAT:** (bỏ trống nếu không có)
  - https://…/tasks/<id>/jobs/<id>?frame=<n> — frame này có gì
- **Mô tả:**
- **Các cách hiểu:** (với pain point công cụ thì ghi **Hướng đang cân nhắc:**)
  1.
  2.
- **Xử lý tạm trong lúc chờ:**
- **Kết quả:** 🔴 Mở
```

Nhớ thêm một dòng vào bảng **Danh sách** ở đầu file.
