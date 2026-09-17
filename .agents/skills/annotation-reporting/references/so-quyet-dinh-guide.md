# Hướng Dẫn Chi Tiết & Template Mẫu Cho Sổ Quyết Định

## 1. Mẫu Dòng Danh Sách (Bảng đầu file `so-quyet-dinh.md`)

```markdown
| [QĐ-NNN](#qđ-nnn) | <Tóm tắt quyết định ngắn gọn> | <dd/mm/yyyy> | <[P-xxx](problem-backlog.md#p-xxx) hoặc Họp tuần NN> | <Hiệu lực | Bị thay bởi [QĐ-yyy](#qđ-yyy) | Huỷ (lý do)> |
```

## 2. Mẫu Section Chi Tiết (Thêm vào cuối danh sách quyết định)

```markdown
## QĐ-NNN

**<Quyết định trong một dòng súc tích>**

- **Ngày:** <dd/mm/yyyy>
- **Người tham gia:** @<lead> (chốt), @<thanh-vien-1>, @<thanh-vien-2>
- **Xuất phát từ:** [P-xxx](problem-backlog.md#p-xxx) *(hoặc Họp tuần NN, Chỉ đạo Mentor)*
- **Bối cảnh:** <Vì sao phải ra quyết định này, bối cảnh thực tế hoặc các tranh cãi trước đó>
- **Các phương án đã cân nhắc:**
  1. *<Phương án 1>* — <Ưu điểm / nhược điểm>. Loại hoặc **Chọn.**
  2. *<Phương án 2>* — <Ưu điểm / nhược điểm>. Loại hoặc **Chọn.**
- **Quyết định:** <Nội dung quy định cụ thể, chi tiết, đo lường được để mọi người trong đội đều làm đồng nhất>
- **Việc phải làm theo:**
  - [ ] <Nhiệm vụ cụ thể 1> (@<người phụ trách>)
  - [ ] <Nhiệm vụ cụ thể 2> (@<người phụ trách>)
- **Trạng thái:** Hiệu lực
```

## 3. Quy Trình Thay Thế Hoặc Hủy Quyết Định (Append-only)

> **QUY TẮC BẤT DI BẤT DỊCH:** Tuyệt đối không chỉnh sửa nội dung của quyết định cũ đã ban hành.

Khi đội thay đổi quy ước hoặc có quyết định mới:
1. Tạo một quyết định mới `QĐ-yyy`.
2. Trong phần **Xuất phát từ** hoặc **Bối cảnh** của `QĐ-yyy`, ghi rõ: *Thay thế cho `[QĐ-xxx](#qđ-xxx)`*.
3. Quay lại `QĐ-xxx` cũ:
   - Sửa dòng **Trạng thái** của `QĐ-xxx` thành: `Bị thay bởi [QĐ-yyy](#qđ-yyy)`.
   - Cập nhật cột **Trạng thái** của `QĐ-xxx` trong bảng đầu file.
4. Nếu quyết định bị hủy hoàn toàn mà không có quyết định thay thế, đổi trạng thái thành `Huỷ (<ghi lý do cụ thể>)`.
