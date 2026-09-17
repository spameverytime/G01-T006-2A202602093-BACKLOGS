# Problem backlog

Những chỗ gặp trong lúc gán nhãn mà **guideline chưa trả lời được**, cộng các pain point về công cụ.

Ghi ngay khi gặp, kể cả lúc chưa biết xử lý thế nào. Một edge case không được ghi lại thì
mỗi người sẽ tự xử lý theo một kiểu — và đó là nguồn lớn nhất của nhãn không nhất quán.

> Các mục bên dưới là **ví dụ**, tên và link CVAT đều giả. Mẫu trống để copy nằm cuối file.

## Danh sách


| Mã             | Tóm tắt                                                                        | Loại                                     | Mục guideline                    | Trạng thái | Kết quả                                  |
| --------------- | -------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------- | ------------ | ------------------------------------------ |
| [P-001](#p-001) | Vật thể bị che khuất hoặc chỉ nhìn thấy một phần                       | Guideline mơ hồ                         | BBox §3, §3.1; Segmentation §3 | 🔴 Mở       | Cần chốt ngưỡng "đủ bằng chứng"    |
| [P-002](#p-002) | Vật thể quá mờ, quá tối hoặc bị lóa: chưa rõ ngưỡng để gán nhãn | Guideline mơ hồ                         | BBox §3; Segmentation §3, §4   | 🔴 Mở       | Đưa review nếu không chắc             |
| [P-003](#p-003) | Vạch kẻ đường bị lóa, tối hoặc đứt: chưa rõ cách vẽ polyline      | Guideline đã nói nhưng cần áp dụng | BBox §4.2                        | 📘 Có rule  | Dừng tại điểm không còn bằng chứng |
| [P-004](#p-004) | Vật thể chồng lên nhau: chưa rõ tách hay gộp box                         | Guideline đã nói nhưng cần áp dụng | BBox §3; Segmentation §3        | 📘 Có rule  | Mỗi object riêng; mỗi pixel một class  |
| [P-005](#p-005) | Vạch đôi`lane/double white`: chưa rõ vẽ một hay hai polyline              | Guideline mơ hồ                         | BBox §2, §4.2                   | 🔴 Mở       | Cần Mentor chốt cách đặt polyline     |

**Loại**


| Loại                                     | Nghĩa là                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Guideline chưa nói tới                 | Tình huống không có trong guideline                                                 |
| Guideline mơ hồ                         | Đọc guideline ra được hai cách hiểu trở lên                                    |
| Guideline mâu thuẫn                     | Hai mục trong guideline nói ngược nhau                                              |
| Guideline đã nói nhưng cần áp dụng | Guideline đã có nguyên tắc, nhưng cần áp dụng thống nhất vào case thực tế |
| Pain point công cụ                      | Guideline rõ, nhưng làm trên CVAT chậm hoặc dễ sai                               |

**Trạng thái:** 🔴 Mở · 🗣️ Đang bàn · ↗️ Hỏi BTC · 📘 Có rule trong guideline · ✅ Đã chốt (trỏ sang QĐ) · 🛠️ Làm tool (trỏ sang `source-tool/`) · ⚪ Bỏ (ghi lý do)

---

## Đối chiếu hai guideline


| Vấn đề                            | Bounding Box / Polygon / Polyline                                                 | Semantic Segmentation                                                            | Kết luận                                            |
| ------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Vật thể bị che khuất             | Vẫn annotate nếu đủ bằng chứng, bật`occluded=true`, không đoán boundary | Chỉ tô pixel đang nhìn thấy, không tô phần bị che                       | Còn mơ hồ ở ngưỡng "đủ bằng chứng"          |
| Vật thể nhỏ, mờ, tối hoặc lóa | Nếu không xác định chắc class thì đưa review                             | Nếu quá nhỏ/mờ để xác định class thì đưa review                      | Đã có hướng xử lý, chưa có ngưỡng cụ thể |
| Vạch kẻ đường không còn rõ   | Polyline kết thúc tại điểm không còn đủ bằng chứng, không nối tắt   | Không áp dụng lane marking trong bài segmentation                            | Đã có rule cho bài Bounding Box                   |
| Vật thể chồng lấn                | Mỗi object là một annotation riêng                                            | Mỗi pixel chỉ thuộc một class; pixel nhìn thấy thuộc object phía trước | Đã có rule, không gộp object độc lập          |

Các mục dưới đây ghi lại case thực tế và phần còn cần thống nhất khi áp dụng guideline.

---

## P-001

**Vật thể bị che khuất hoặc chỉ nhìn thấy một phần**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** BBox §3, §3.1; Semantic Segmentation §3
- **Người phát hiện:** @spameverytime, @nnq2412 · 17/09/2026
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=32 — xe tải chở ô tô trên thùng, chưa rõ tách hay gộp box
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352?frame=59 — xe tải (ID 246) bị che khuất nhiều
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352?frame=59 — nhóm người (ID 253) bị che khuất một phần
- **Mô tả:** Hai guideline đã nói phải annotate khi còn đủ bằng chứng, bật `occluded=true` với Bounding Box và chỉ tô pixel nhìn thấy với Semantic Segmentation. Tuy nhiên chưa có ngưỡng cụ thể thế nào là "đủ bằng chứng" trong các case chỉ lộ một phần.
- **Các cách hiểu:**
  1. Bỏ qua khi vật thể chỉ còn lộ một phần.
  2. Luôn gán, box chỉ ôm phần nhìn thấy.
  3. Luôn gán, box ôm cả phần ước lượng.
- **Xử lý tạm trong lúc chờ:** dừng các trường hợp không chắc, ghi lại frame và ID đối tượng để reviewer/Lead thống nhất.
- **Kết quả:** 🔴 Mở — cần Lead/BTC chốt ngưỡng áp dụng.

## P-002

**Vật thể quá mờ, quá tối hoặc bị lóa: chưa rõ ngưỡng để gán nhãn**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** BBox §3; Semantic Segmentation §3, §4
- **Người phát hiện:** @spameverytime, @nnq2412 · 17/09/2026
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=26 — xe quá mờ, có bóng đèn phản chiếu không rõ ranh giới
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=26 — bóng đỏ gần xe làm khó xác định độ cao của xe
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352?frame=55 — xe lóa đèn pha, khó xác định mép ngoài
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352?frame=60 — đèn giao thông xa/mờ, chưa rõ có gán nhãn hay bỏ qua
- **Mô tả:** Hai guideline đều yêu cầu đưa review nếu vật thể quá nhỏ hoặc quá mờ để xác định chắc class, đồng thời không được đoán. Tuy nhiên chưa có ngưỡng cụ thể cho các trường hợp bị lóa, phản chiếu hoặc nằm trong vùng tối.
- **Các cách hiểu:**
  1. Vẫn gán nếu nhận diện được loại vật thể, chỉ vẽ phần nhìn thấy.
  2. Chỉ gán khi xác định được phần lớn ranh giới vật thể.
  3. Bỏ qua vật thể quá mờ hoặc quá ít thông tin.
- **Xử lý tạm trong lúc chờ:** đánh dấu để reviewer kiểm tra, không tự suy đoán phần ranh giới không nhìn thấy.
- **Kết quả:** 🔴 Mở — trước mắt đưa review, không tự suy đoán.

## P-003

**Vạch kẻ đường bị lóa, tối hoặc đứt: chưa rõ cách vẽ polyline**

- **Loại:** Guideline đã nói nhưng cần áp dụng
- **Mục guideline:** Bounding Box §4.2
- **Người phát hiện:** @spameverytime, @nnq2412 · 17/09/2026
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=49 — vạch kẻ dạng ô vuông/vạch ngang, chưa rõ quy cách vẽ polyline
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352?frame=59 — đống tuyết cản đường, chưa rõ có nối polyline vòng qua hay không
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352?frame=60 — vạch kẻ chìm vào vùng tối, chưa rõ điểm kết thúc
- **Mô tả:** Guideline đã quy định polyline đi theo phần có bằng chứng, không nối tắt qua vùng không có vạch và kết thúc tại điểm lane marking không còn đủ bằng chứng. Các frame này cần được dùng để áp dụng đúng rule, không tự nối qua vùng tối hoặc vùng bị che.
- **Các cách hiểu:**
  1. Chỉ vẽ phần vạch nhìn thấy rõ, kết thúc tại điểm cuối quan sát được.
  2. Nối qua vùng tối hoặc vùng bị che nếu có thể suy luận hướng của vạch.
  3. Bỏ qua khi không xác định được hình dạng hoặc điểm kết thúc.
- **Xử lý tạm trong lúc chờ:** chỉ vẽ phần nhìn thấy rõ và ghi lại các trường hợp không chắc.
- **Kết quả:** 📘 Có rule trong guideline — cần áp dụng và đưa review nếu không xác định được điểm kết thúc.

## P-004

**Vật thể chồng lên nhau: chưa rõ tách hay gộp box**

- **Loại:** Guideline đã nói nhưng cần áp dụng
- **Mục guideline:** BBox §3; Semantic Segmentation §3
- **Người phát hiện:** @spameverytime, @nnq2412 · 17/09/2026
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=33 — ô tô có giá nóc, chưa rõ box bao cả giá hay chỉ bao thân xe
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=33 — xe tải chở ô tô trên thùng, chưa rõ tách thành các box hay gộp
- **Mô tả:** Guideline Bounding Box quy định mỗi object là một annotation riêng, không dùng một box bao nhiều object độc lập. Guideline Semantic Segmentation quy định mỗi pixel chỉ thuộc một class và pixel nhìn thấy thuộc object phía trước.
- **Các cách hiểu:**
  1. Mỗi vật thể có thể nhận diện được dùng một box riêng.
  2. Các phần không phải đối tượng cần gán nhãn được gộp vào box của vật thể chính.
  3. Chỉ gán nhãn vật thể ở phía trước, bỏ qua vật thể bị che phía sau.
- **Xử lý tạm trong lúc chờ:** tách box khi nhận diện được từng vật thể, đồng thời ghi lại trường hợp ranh giới không chắc.
- **Kết quả:** 📘 Có rule trong guideline — không gộp các object độc lập; phần bị che xử lý theo rule occlusion.

## P-005

**Vạch đôi `lane/double white`: chưa rõ vẽ một hay hai polyline**

- **Loại:** Guideline mơ hồ
- **Mục guideline:** Bounding Box §2, §4.2 — lane marking dùng Polyline; polyline đi theo tim/biên lane marking.
- **Người phát hiện:** @spameverytime, @nnq2412 · 17/09/2026
- **Link CVAT:**
  - https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351?frame=49 — vạch kẻ dạng đôi/ô vuông, cần xác nhận cách biểu diễn.
- **Mô tả:** Guideline xác định `lane/double white` thuộc nhóm lane marking và phải dùng Polyline, nhưng chưa nói rõ vạch đôi cần vẽ hai polyline theo tim từng vạch hay một polyline đại diện cho cả cặp vạch.
- **Các cách hiểu:**
  1. Vẽ hai polyline riêng, mỗi polyline đi theo tim một vạch trắng.
  2. Vẽ một polyline ở giữa để đại diện cho cả cặp vạch.
  3. Vẽ theo biên ngoài của cả cặp vạch, nhưng cách này có thể biến lane marking thành một vùng thay vì một đường.
- **Câu hỏi gửi Mentor:** Với `lane/double white`, cần vẽ một hay hai polyline? Nếu vẽ hai polyline, mỗi polyline có dùng cùng class `lane/double white` không? Có nối qua khoảng trống giữa hai vạch không?
- **Xử lý tạm trong lúc chờ:** không dùng Bounding Box hoặc Polygon; ghi lại case và chờ Mentor chốt trước khi áp dụng cho các frame tương tự.
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