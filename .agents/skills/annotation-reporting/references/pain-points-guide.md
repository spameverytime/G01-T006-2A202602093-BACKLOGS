# Hướng Dẫn Chi Tiết & Template Mẫu Cho Sổ Pain Points (`pain-points.md`)

Tài liệu này hướng dẫn cách ghi nhận, phân loại và chuẩn hóa các nỗi đau (Pain Points) của người gán nhãn vào file [`pain-points.md`](../../../pain-points.md).

---

## 1. Mẫu Dòng Danh Sách (Bảng `## 2. Bảng Danh Sách Nỗi Đau`)

```markdown
| [PP-NNN](#pp-nnn) | <Tóm tắt ngắn gọn nỗi đau> | <Phân loại chuẩn> | <Mức độ chuẩn> | <Trạng thái chuẩn> | <Hướng giải quyết / Tool hỗ trợ> |
```

---

## 2. Mẫu Section Chi Tiết (Thêm vào phần nội dung `## 4. Các Pain Point Của Tôi` hoặc sau mã PP trước đó)

```markdown
### PP-NNN

**<Tóm tắt nỗi đau trong một câu súc tích>**

- **Phân loại:** <🛠️ Công cụ & Hạ tầng | 📘 Đặc tả & Guideline | 🩺 Thể chất & Thao tác | ⚖️ Review & Phản hồi | 📷 Chất lượng Dữ liệu>
- **Mức độ tác động:** <🚨 Nghiêm trọng | ⚠️ Cao | ⚡ Trung bình | 💡 Thấp>
- **Người ghi nhận:** @<github_username> · <dd/mm/yyyy>
- **Tần suất xuất hiện:** <Mỗi khi làm bài / Khi nhiều ảnh phức tạp / Khi mạng chập chờn...>
- **Triệu chứng & Bối cảnh:**
  - <Mô tả chi tiết hiện tượng, cảm xúc ức chế, các bước thao tác dẫn tới sự cố hoặc sự mệt mỏi>
- **Nguyên nhân gốc rễ (Root Cause):**
  - <Phân tích nguyên nhân sâu xa: do phần mềm CVAT, mạng, thiếu hướng dẫn visual, hay thiết bị...>
- **Tác động thực tế:**
  - <Đo lường thời gian lãng phí, giảm năng suất %, tỷ lệ lỗi sai hoặc ảnh hưởng thể chất>
- **Giải pháp tạm thời (Workaround):**
  - <Cách annotator đang áp dụng ngay lúc này để né hoặc giải quyết tạm thời>
- **Giải pháp dài hạn đề xuất:**
  - <Đề xuất phát triển tool, bổ sung guideline, tinh chỉnh cấu hình hoặc quy trình review>
- **Trạng thái:** <🔴 Đang gặp | 🟡 Giải pháp tạm | 🛠️ Đang làm tool | ✅ Đã giải quyết>
```

---

## 3. Bảng Phân Loại Chuẩn (Chỉ chọn 1 trong 5 nhóm)

| Phân loại | Biểu tượng & Tên | Định nghĩa & Bối cảnh sử dụng |
|---|---|---|
| `tooling` | `🛠️ Công cụ & Hạ tầng` | Lỗi CVAT gián đoạn lưu, timeout, render chậm, thiếu phím tắt hoặc danh sách nhãn rối rắm. |
| `guideline` | `📘 Đặc tả & Guideline` | Hướng dẫn mông lung, thiếu ảnh ví dụ, quy tắc mâu thuẫn hoặc ranh giới đối tượng không rõ ràng. |
| `ergonomics` | `🩺 Thể chất & Thao tác` | Mỏi mắt, đau cổ tay (hội chứng RSI), mỏi vai gáy do click chuột lặp đi lặp lại hàng trăm lần. |
| `review` | `⚖️ Review & Phản hồi` | Reviewer bắt bẻ cảm tính, không có tiêu chí định lượng sai số, feedback trễ gây sửa lại hàng loạt. |
| `data` | `📷 Chất lượng Dữ liệu` | Ảnh mờ, nhòe chuyển động, thiếu sáng, lóa đèn pha hoặc góc quay bị che khuất nghiêm trọng. |

---

## 4. Bảng Mức Độ Tác Động Chuẩn (Severity)

| Mức độ | Định nghĩa | Tiêu chí nhận biết |
|---|---|---|
| `🚨 Nghiêm trọng` | Critical | Gây mất dữ liệu hoàn toàn, chặn đứng tiến độ, gây ức chế cực độ khiến annotator không thể tiếp tục. |
| `⚠️ Cao` | High | Làm giảm >50% năng suất gán nhãn, tăng cao tỷ lệ sai sót hoặc gây đau mỏi thể chất nhanh. |
| `⚡ Trung bình` | Medium | Làm chậm 15% - 30% tốc độ làm việc, thao tác rườm rà nhưng vẫn tiếp tục được. |
| `💡 Thấp` | Low | Bất tiện nhỏ về mặt trải nghiệm, không ảnh hưởng lớn đến tiến độ. |

---

## 5. Bảng Trạng Thái Chuẩn (Status)

| Trạng thái | Diễn giải | Yêu cầu đi kèm |
|---|---|---|
| `🔴 Đang gặp` | Nỗi đau thường xuyên diễn ra, chưa có giải pháp | Cần phân tích nguyên nhân và đề xuất hướng xử lý |
| `🟡 Giải pháp tạm` | Đã có mẹo, phím tắt hoặc thủ thuật đối phó tạm | Bắt buộc ghi rõ mẹo ở mục *Giải pháp tạm thời* |
| `🛠️ Đang làm tool` | Đang viết phần mềm/script để gỡ pain point | Bắt buộc dẫn link tới thư mục `source-tool/<tên-tool>/` |
| `✅ Đã giải quyết` | Đã giải quyết dứt điểm bằng tool hoặc quy định mới | Bắt buộc dẫn link tới Tool hoặc Sổ Quyết Định `[QĐ-xxx]` |
