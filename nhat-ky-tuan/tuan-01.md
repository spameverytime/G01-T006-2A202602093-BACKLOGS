# Nhật ký tuần 01 · 14/09 – 20/09/2026


**Lead tuần này:**  - Nguyễn Đại Hoàng @davidhevn
**Dữ liệu / task CVAT:** Ảnh giao thông đô thị — [task 125](https://cvat.note.transformerlabs.ai/tasks/125), [task 178](https://cvat.note.transformerlabs.ai/tasks/178)

## Thành viên và phân công


| Thành viên                       | Vị trí                  | Phân công tuần này                                                                                                                                                                                    |
| ---------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nguyễn Đại Hoàng (@davidhevn) | Lead, Annotator, Reviewer | Chia job, chốt edge case, review xác suất 25% cho mỗi job trong[task 125](https://cvat.note.transformerlabs.ai/tasks/125), gán job[ 1562](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1562) |
| Nguyễn Như Quỳnh (@nnq2412)    | Annotator                 | Job[1352](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352), [1565](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1565)                                                                     |
| Trương Trọng Đức (@TTDucAI18) | Annotator                 | Job[1353](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1353) ,[1567](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1567)                                                                    |
| Phạm Xuân Duy (@spameverytime)  | Annotator                 | Job[1351](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351),[1564](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1564)                                                                      |
| Thân Vĩnh Trọng (@thantrong)   | Annotator, Reviewer       | Review mỗi job trong[task 178](https://cvat.note.transformerlabs.ai/tasks/178), gán job [1350](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1350), viết báo cáo                              |

Phạm Thị D vừa review vừa gán, nên job 105 do Lead review.

## Công việc


| #  | Nội dung công việc                                                                                                                                                                                                                                                                                                                                  | Annotator      | Reviewer   | Hoàn thành | Ghi chú                                                                     |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ---------- | ------------ | ---------------------------------------------------------------------------- |
| 1  | Job[1350](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1350)— 25 ảnh, bbox ` pedestrian, rider, car, truck, bus, train, motorcycle, bicycle, traffic light, traffic sign, area/drivable, area/alternative, lane/crosswalk, lane/double white, lane/double yellow, lane/road curb, lane/single other, lane/single white, lane/single yellow ` | @thantrong     | @davidhevn | 🟡 80%       | Dừng chờ review                                                            |
| 2  | Job[1351](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1351) — 25 ảnh, cùng nhãn bbox                                                                                                                                                                                                                                                       | @spameverytime | @davidhevn | 🟡 70%       | Dừng chờ review                                                            |
| 3  | Job[1352](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1352) — 25 ảnh, cùng nhãn bbox                                                                                                                                                                                                                                                      | @nnq2412       | @davidhevn | 🟡 80%       | Đã xong 25 ảnh, Dừng chờ review                                         |
| 4  | Job[1353](https://cvat.note.transformerlabs.ai/tasks/125/jobs/1353)— 25 ảnh, cùng nhãn bbox                                                                                                                                                                                                                                                        | @TTDucAI18     | @davidhevn | ⬜ 0%       | Làm sau job[1567](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1567) |
| 5  | Job[1562](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1562) — 25 ảnh, segment `road, sidewalk, building, wall, fence, pole, traffic_light, traffic_sign, vegetation, terrain, sky, person, rider, car, truck, bus, train, motorcycle, bicycle`                                                                                               | @davidhevn     | @thantrong | 🟡 30%       | Đang làm                                                                   |
| 6  | Job[1564](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1564) — 25 ảnh, cùng bộ nhãn segment                                                                                                                                                                                                                                                | @spameverytime | @thantrong | 🟡 60%       | Dừng chờ review                                                            |
| 7  | Job[1565](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1565) — 25 ảnh, cùng bộ nhãn segment                                                                                                                                                                                                                                                | @nnq2412       | @thantrong | ⬜  0%      | Làm sau job 1352                                                            |
| 8  | Job[1567](https://cvat.note.transformerlabs.ai/tasks/178/jobs/1567) — 25 ảnh, cùng bộ nhãn segment                                                                                                                                                                                                                                                | @TTDucAI18     | @thantrong | 🟡 75%       | Dừng chờ review                                                            |
| 9  | Review các job trong[Task 178](https://cvat.note.transformerlabs.ai/tasks/178)                                                                                                                                                                                                                                                                        | @thantrong     | @davidhevn | 🟡 20%       | Đang review                                                                 |
| 10 | Review các job trong Task 125                                                                                                                                                                                                                                                                                                                         | @davidhevn     | —         | 🟡 10%       | Làm sau job 1562                                                            |
| 11 | Viết báo cáo công việc trong tuần                                                                                                                                                                                                                                                                                                                | @thantrong     | —         | 🟡 50%       | Viết báo cáo đợt 1                                                      |

Mức hoàn thành: ✅ xong **và đã qua review** · 🟡 đang làm (ghi %) · ⛔ bị chặn (ghi lý do) · ⬜ chưa bắt đầu

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