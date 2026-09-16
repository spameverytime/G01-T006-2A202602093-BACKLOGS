# Nhật ký tuần 01 · 15/09 – 21/09/2026

**Học viên:** Phạm Xuân Duy (MSSV: `2A202602093`) — **Đội:** T006  
**Lead tuần này:** @thanh-vien-a  
**Dữ liệu / task CVAT:** Ảnh giao thông đô thị — [task 12](https://cvat.example.com/tasks/12)

## Thành viên và phân công

| Thành viên | Vị trí | Phân công tuần này |
|---|---|---|
| Phạm Xuân Duy (`2A202602093`) | Annotator | Job 1351 |
| Nguyễn Văn A (@thanh-vien-a) | Lead | Chia job, chốt edge case, review xác suất 10% mọi job |
| Trần Thị B (@thanh-vien-b) | Annotator | Job 101, 102 |
| Lê Văn C (@thanh-vien-c) | Annotator | Job 103, 104 |
| Phạm Thị D (@thanh-vien-d) | Reviewer · Annotator | Review job 101–104; gán job 105 |

Phạm Thị D vừa review vừa gán, nên job 105 do Lead review.

## Công việc

| # | Nội dung công việc | Annotator | Reviewer | Hoàn thành | Ghi chú |
|---|---|---|---|---|---|
| 1 | Job 101 — 250 ảnh, bbox `xe_may` / `o_to` / `nguoi` | @thanh-vien-b | @thanh-vien-d | ✅ 100% | Review trả lại 12 ảnh, đã sửa xong |
| 2 | Job 102 — 250 ảnh, cùng nhãn | @thanh-vien-b | @thanh-vien-d | 🟡 70% |  |
| 3 | Job 103 — 250 ảnh, cùng nhãn | @thanh-vien-c | @thanh-vien-d | ⛔ 30% | Dừng, chờ chốt [P-002](../problem-backlog.md#p-002) |
| 4 | Job 104 — 250 ảnh, cùng nhãn | @thanh-vien-c | @thanh-vien-d | ⬜ 0% | Làm sau job 103 |
| 5 | Job 105 — 250 ảnh, cùng nhãn | @thanh-vien-d | @thanh-vien-a | 🟡 40% |  |
| 6 | Đọc lại guideline §3, gom các ca chưa rõ | @thanh-vien-a | — | ✅ 100% | Ra P-001, P-002 |
| 7 | Rà lại job 101 theo QĐ-001 | @thanh-vien-b | @thanh-vien-d | ✅ 100% | Sửa 37 ảnh người ngồi sau |
| 8 | Job 1351 — Gán nhãn các đối tượng: `car`, `truck`, `traffic light`, `traffic sign`, `lane/double yellow`, `lane/double white`, `lane/single white`, `lane/single yellow`, `pedestrian`, `bicycle` | Phạm Xuân Duy | Lead | 🟡 Đang làm | 17/09: Đã xong các đối tượng trên; tiếp tục làm buổi trưa theo lịch nhóm |

Mức hoàn thành: ✅ xong **và đã qua review** · 🟡 đang làm (ghi %) · ⛔ bị chặn (ghi lý do) · ⬜ chưa bắt đầu

### Chi tiết tiến độ theo ngày (Phạm Xuân Duy)

#### Ngày 17/09/2026
- **Công việc thực hiện:** Gán nhãn **Job 1351**.
- **Tiến độ đã hoàn thành:** Đã hoàn thiện gán nhãn các lớp đối tượng:
  - **Phương tiện & Người:** `car`, `truck`, `pedestrian`, `bicycle`
  - **Đèn tín hiệu & Biển báo:** `traffic light`, `traffic sign`
  - **Vạch kẻ đường (Lanes):** `lane/double yellow`, `lane/double white`, `lane/single white`, `lane/single yellow`
- **Kế hoạch tiếp theo:** Tiếp tục hoàn thiện các đối tượng còn lại vào buổi trưa theo lịch phân công của nhóm.

## Tổng kết

- Đã gán: 425 / 1.250 ảnh (34%)
- Qua review lần đầu: 88% (trả lại 51 ảnh)
- Edge case mới: P-001, P-002, P-003 — đã chốt P-001 thành [QĐ-001](../so-quyet-dinh.md#qđ-001)

## Vướng mắc

- P-002 (xe bị che khuất) chưa chốt nên job 103 phải dừng. Lead đã gửi câu hỏi lên BTC.
- P-003: vẽ lại box y hệt qua các frame liên tiếp mất ~40% thời gian job 105.
  Đang cân nhắc làm tool trong [`source-tool/`](../source-tool/).

## Kế hoạch tuần 02

- Chốt P-002, mở lại job 103.
- Xong job 102, 104, 105.
- Quyết định có làm tool cho P-003 hay dùng chế độ Track sẵn có của CVAT.
