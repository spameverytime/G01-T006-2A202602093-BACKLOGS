# Sổ quyết định

Ghi lại những gì đội đã chốt, và **vì sao**. Ba tuần sau không ai còn nhớ vì sao box lại vẽ
kiểu này — người mới vào đội lại càng không.

**Quyết định đã ghi thì không sửa nội dung.** Đổi ý thì ghi một quyết định mới, và chuyển
trạng thái quyết định cũ thành *Bị thay bởi QĐ-xxx*. Nhờ vậy vẫn truy được vì sao các job
cũ được gán theo cách cũ.

> Các mục bên dưới là **ví dụ**. Mẫu trống để copy nằm cuối file.

## Danh sách

| Mã | Quyết định | Ngày | Xuất phát từ | Trạng thái |
|---|---|---|---|---|
| [QĐ-001](#qđ-001) | Người ngồi sau xe máy có box `nguoi` riêng | 17/09/2026 | [P-001](problem-backlog.md#p-001) | Hiệu lực |
| [QĐ-002](#qđ-002) | Reviewer trả nguyên job khi mẫu kiểm có trên 10% ảnh sai | 19/09/2026 | Họp tuần 01 | Hiệu lực |
| [QĐ-003](#qđ-003) | Vẽ polyline bám theo biên ngoài của vạch kẻ đôi | 17/09/2026 | [P-008](problem-backlog.md#p-008) | Bị thay bởi [QĐ-005](#qđ-005) |
| [QĐ-004](#qđ-004) | Vạch liền bị mờ đứt đoạn: ngắt polyline theo bằng chứng thị giác, không nối tắt | 17/09/2026 | [P-009](problem-backlog.md#p-009) | Hiệu lực |
| [QĐ-005](#qđ-005) | Vẽ polyline vạch kẻ đôi vàng theo tim giữa 2 vạch | 17/09/2026 | [P-008](problem-backlog.md#p-008) · Thay [QĐ-003](#qđ-003) | Hiệu lực |
| [QĐ-006](#qđ-006) | Vạch đơn `lane/single yellow/white` vẽ theo tim vạch | 17/09/2026 | Quy ước đội (theo §4.2) | Hiệu lực |

**Trạng thái:** Hiệu lực · Bị thay bởi QĐ-xxx · Huỷ (ghi lý do)

---

## QĐ-001

**Người ngồi sau xe máy có box `nguoi` riêng**

- **Ngày:** 17/09/2026
- **Người tham gia:** @thanh-vien-a (chốt), @thanh-vien-b, @thanh-vien-c, @thanh-vien-d
- **Xuất phát từ:** [P-001](problem-backlog.md#p-001)
- **Bối cảnh:** §3.2 của guideline nói mỗi người một box, nhưng hình minh hoạ lại vẽ chung một box.
  Hai annotator đang làm theo hai cách khác nhau.
- **Các phương án đã cân nhắc:**
  1. *Gộp chung một box với xe* — nhanh hơn, nhưng mất số người trên xe, trong khi dữ liệu dùng để
     đếm người tham gia giao thông. Loại.
  2. *Box `nguoi` riêng cho từng người* — đúng câu chữ §3.2 và giữ được số người. **Chọn.**
- **Quyết định:** Mỗi người trên xe máy, kể cả người ngồi sau chỉ lộ đầu, có một box `nguoi` riêng.
  Box xe máy vẫn vẽ như bình thường.
- **Việc phải làm theo:**
  - [x] Rà lại job 101, sửa 37 ảnh đã gộp (@thanh-vien-b)
  - [x] Báo cả đội, ghim trong kênh chat của đội
- **Trạng thái:** Hiệu lực

## QĐ-002

**Reviewer trả nguyên job khi mẫu kiểm có trên 10% ảnh sai**

- **Ngày:** 19/09/2026
- **Người tham gia:** @thanh-vien-a (chốt), @thanh-vien-d
- **Xuất phát từ:** Họp tổng kết tuần 01 — không phải từ backlog
- **Bối cảnh:** Job 101 bị sửa rải rác từng ảnh qua ba vòng review, tốn thời gian của cả hai bên.
- **Các phương án đã cân nhắc:**
  1. *Sửa từng ảnh như cũ* — ổn khi lỗi lẻ tẻ, nhưng khi lỗi có hệ thống thì reviewer đang làm hộ
     annotator. Loại.
  2. *Kiểm mẫu 20%, trên 10% sai thì trả nguyên job* — annotator tự rà cả job theo lỗi đã chỉ ra.
     **Chọn.**
- **Quyết định:** Reviewer kiểm ngẫu nhiên 20% ảnh của mỗi job. Trên 10% số ảnh kiểm bị sai thì trả
  nguyên job kèm danh sách lỗi mẫu; từ 10% trở xuống thì sửa từng ảnh.
- **Việc phải làm theo:**
  - [ ] Áp dụng từ job 106 trở đi (@thanh-vien-d)
- **Trạng thái:** Hiệu lực

## QĐ-003

**Vẽ polyline bám theo biên ngoài của vạch kẻ đôi**

- **Ngày:** 17/09/2026
- **Người tham gia:** @thanh-vien-a (chốt), @thanh-vien-d
- **Xuất phát từ:** [P-008](problem-backlog.md#p-008)
- **Bối cảnh:** §4.2 của guideline chỉ ghi chung chung "đi theo đúng tim/biên theo quy ước của bài", chưa làm rõ vẽ tim hay biên ngoài cho vạch đôi (`lane/double yellow`, `lane/double white`) dẫn đến mỗi người vẽ một kiểu.
- **Các phương án đã cân nhắc:**
  1. *Vẽ 1 đường chạy dọc tim chính giữa 2 vạch* — khó căn chỉnh tâm chính xác tuyệt đối khi khoảng cách 2 vạch biến đổi theo phối cảnh góc nhìn xa gần. Loại.
  2. *Vẽ polyline bám theo biên ngoài của cụm vạch đôi* — dễ bám theo ranh giới thị giác rõ ràng của vạch trên mặt đường, đảm bảo tính nhất quán cao. **Chọn.**
- **Quyết định:** Khi vẽ vạch đôi (`lane/double yellow`, `lane/double white`), vẽ 1 đường polyline bám sát theo mép biên ngoài của cụm vạch đôi.
- **Việc phải làm theo:**
  - [ ] Báo cả đội quy ước vẽ biên ngoài vạch đôi (@thanh-vien-a)
  - [ ] Rà soát lại các frame có vạch đôi trong job tuần 01 (@thanh-vien-d)
- **Trạng thái:** Bị thay bởi [QĐ-005](#qđ-005)

## QĐ-004

**Vạch liền bị mờ đứt đoạn: ngắt polyline theo bằng chứng thị giác, không nối tắt**

- **Ngày:** 17/09/2026
- **Người tham gia:** @thanh-vien-a (chốt), @thanh-vien-d
- **Xuất phát từ:** [P-009](problem-backlog.md#p-009)
- **Bối cảnh:** Vạch kẻ liền (`lane/double yellow`) bị mòn mờ từng đoạn ngắn; băn khoăn giữa việc vẽ nối liền theo logic để giữ tính liên tục làn đường cho xe tự lái hay ngắt đoạn theo bằng chứng thị giác.
- **Các phương án đã cân nhắc:**
  1. *Nối liền xuyên suốt theo logic* — giữ ngữ nghĩa liên tục cho xe tự lái nhưng vi phạm checklist §6 ("không nhảy qua vùng không có evidence") và làm sai lệch dữ liệu ground truth quan sát được. Loại.
  2. *Ngắt polyline tại mọi điểm mất dấu thị giác* — tuân thủ nghiêm ngặt quy tắc §4.2 và checklist chất lượng §6. **Chọn.**
- **Quyết định:** Khi vạch liền bị mòn/mờ mất dấu, kết thúc polyline tại điểm hết bằng chứng thị giác. Chỉ vẽ trên các đoạn còn nhìn thấy rõ, tuyệt đối không tự ý suy đoán vẽ nối tắt qua vùng mặt đường trống.
- **Việc phải làm theo:**
  - [ ] Phổ biến cho các annotator quy tắc không vẽ nối tắt khi vạch bị đứt đoạn (@thanh-vien-a)
- **Trạng thái:** Hiệu lực

## QĐ-005

**Vẽ polyline vạch kẻ đôi vàng (`lane/double yellow`) theo tim giữa 2 vạch, không vẽ biên ngoài hay bao quanh**

- **Ngày:** 17/09/2026
- **Người tham gia:** @thanh-vien-a (chốt), @thanh-vien-d
- **Xuất phát từ:** [P-008](problem-backlog.md#p-008) · Thay thế [QĐ-003](#qđ-003)
- **Bối cảnh:** Trước đây QĐ-003 chọn vẽ bám theo biên ngoài của vạch đôi. Tuy nhiên sau khi nghiên cứu lại yêu cầu về tính đại diện tim dải phân cách làn đường cho bài toán xe tự lái, đội thống nhất điều chỉnh lại: vẽ 1 đường polyline chạy dọc chính giữa tim của cụm vạch đôi.
- **Các phương án đã cân nhắc:**
  1. *Vẽ bám theo biên ngoài hoặc bao quanh* — làm lệch tim đường thực tế sang một bên làn hoặc vi phạm quy tắc polyline lane marking. Loại.
  2. *Vẽ tim chính giữa 2 vạch vàng* — thể hiện chuẩn xác vị trí phân cách hai chiều di chuyển, phù hợp nhất với logic dẫn đường tự hành. **Chọn.**
- **Quyết định:** Với vạch kẻ đôi vàng (`lane/double yellow`), vẽ 1 đường polyline duy nhất chạy dọc theo tim chính giữa của 2 vạch vàng. Tuyệt đối không vẽ theo biên ngoài và không vẽ bao quanh vạch.
- **Việc phải làm theo:**
  - [ ] Thông báo cho toàn đội áp dụng quy ước vẽ tim 2 vạch cho `lane/double yellow` (@thanh-vien-a)
  - [ ] Rà soát và sửa lại các frame đã vẽ theo biên ngoài (@thanh-vien-d)
- **Trạng thái:** Hiệu lực

## QĐ-006

**Vạch đơn `lane/single yellow` và `lane/single white` vẽ theo tim vạch**

- **Ngày:** 17/09/2026
- **Người tham gia:** @thanh-vien-a (chốt), @thanh-vien-d
- **Xuất phát từ:** Chuẩn hóa quy ước của đội (theo §4.2)
- **Bối cảnh:** §4.2 của guideline yêu cầu polyline phải đi theo đúng tim/biên theo quy ước của bài. Nhằm đồng bộ với quy ước vẽ tim vạch đôi ([QĐ-005](#qđ-005)) và đảm bảo tính nhất quán trên toàn bộ dataset, đội thống nhất quy chuẩn vẽ cho toàn bộ các vạch đơn.
- **Các phương án đã cân nhắc:**
  1. *Vẽ bám theo mép/biên một bên của vạch* — dễ gây bất đối xứng và không nhất quán giữa các annotator (người vẽ mép trái, người vẽ mép phải). Loại.
  2. *Vẽ theo tim chính giữa vạch* — xác định đúng trục tọa độ trung tâm của vạch sơn, dễ căn chỉnh nhất quán. **Chọn.**
- **Quyết định:** Tất cả các loại vạch kẻ làn đơn (`lane/single yellow`, `lane/single white`) được vẽ bằng 1 đường polyline chạy dọc chính giữa tim của vạch.
- **Việc phải làm theo:**
  - [ ] Thông báo cho toàn đội quy chuẩn vẽ tim vạch cho `lane/single yellow` và `lane/single white` (@thanh-vien-a)
- **Trạng thái:** Hiệu lực

---

## Mẫu để copy

```markdown
## QĐ-NNN

**Quyết định trong một dòng**

- **Ngày:** dd/mm/yyyy
- **Người tham gia:** @ (chốt), @, @
- **Xuất phát từ:** [P-NNN](problem-backlog.md#p-nnn) | Họp tuần NN | …
- **Bối cảnh:** vì sao phải quyết định
- **Các phương án đã cân nhắc:**
  1. *Phương án* — ưu / nhược. Loại hoặc **Chọn.**
  2. *Phương án* — ưu / nhược. Loại hoặc **Chọn.**
- **Quyết định:** đủ rõ để người không dự họp vẫn làm đúng
- **Việc phải làm theo:**
  - [ ] việc (@người phụ trách)
- **Trạng thái:** Hiệu lực
```

Nhớ thêm một dòng vào bảng **Danh sách** ở đầu file, và đóng mục P-xxx tương ứng trong backlog.
