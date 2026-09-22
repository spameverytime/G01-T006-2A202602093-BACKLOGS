Theo kế hoạch, BTC sẽ công bố thử thách mới gồm các nhiệm vụ gán nhãn dữ liệu để các đội triển khai theo quy trình làm việc đã xây dựng. Kết quả và chất lượng công việc của từng đội sẽ được nghiệm thu vào cuối tuần.

Deadline: Thứ 7 ngày 26/09

Thông tin triển khai thử thách Tuần 2 như sau:

👉 Dữ liệu thử thách

Dữ liệu và các tài nguyên đã cập nhật trên hệ thống Phoenix:
https://phoenix.note.transformerlabs.ai/resources

👉 Nền tảng gán nhãn CVAT

Các thành viên sử dụng đúng tài khoản do BTC cấp để đăng nhập và thực hiện nhiệm vụ tại:
https://cvat.note.transformerlabs.ai/

👉 Phân công nhiệm vụ trong đội

Tuần này có 2 nhiệm vụ: Human-Pose và Face Landmark chia thành 4 tasks with pre-label và without pre-label. 
BTC đã phân bổ dữ liệu mặc định cho từng thành viên 2 lead đảm nhận 2 nhiệm vụ ở mỗi team. Tuy nhiên, Nhóm trưởng có thể chủ động điều chỉnh khối lượng công việc và phân công lại các vai trò phù hợp với kế hoạch của đội, bao gồm Annotator, Reviewer và các vai trò liên quan.

👉 Báo cáo tiến độ bắt buộc

BTC đã chuẩn bị sẵn biểu mẫu và cấu trúc báo cáo tại:
https://github.com/AI20K-Build-Phase-Cohort-4A/labeling-team-template

👉 Open Issue trên CVAT

Khi phát hiện lỗi hoặc nội dung cần trao đổi trong quá trình gán nhãn, các thành viên sử dụng tính năng Open Issue trên CVAT để đánh dấu trực tiếp tại frame hoặc đối tượng liên quan, giúp đội dễ dàng theo dõi và xử lý.

👉 Xem quy trình Annotate: ⁠📚-tài-nguyên⁠

📚-tài-nguyên⁠

Quy trình Annotate:
Luồng đi của một Job thường diễn ra như sau:

Bước 1: Gắn nhãn (Annotation)
Annotator nhận Job, chuyển State sang in progress để làm.
Khi xong, chuyển State sang completed.
Bước 2: Kiểm tra chéo (Validation)
Lead đổi Stage sang Validation và đổi Assignee sang người Review (Validator).
Validator kiểm tra:
Nếu Fail: Tạo Issue trên CVAT, trả Stage về Annotation và State về rejected. Annotator sẽ vào sửa dựa trên Issue đó.
Nếu Pass: Chuyển Stage sang Acceptance.
Bước 3: Nghiệm thu (Acceptance)
Xác nhận cuối cùng, chuyển State sang completed. Đây là trạng thái sẵn sàng để export dữ liệu nghiệm thu.

# Kế hoạch của team
## Danh sách các Tasks (Tổng quan)
- **Task #339: W2-POSEPRE-G1-T1** | Người tạo: admin (September 21st 2026) | Cập nhật: 10 hours ago | Tiến độ: 4 annotating • 4 total
- **Task #338: W2-POSE-G1-T1** | Người tạo: admin (September 21st 2026) | Cập nhật: an hour ago | Tiến độ: 4 annotating • 4 total
- **Task #341: ---** | Người tạo: admin (September 21st 2026) | Cập nhật: an hour ago | Tiến độ: 4 annotating • 4 total


## Danh sách Tasks và Jobs chi tiết
- **Task #339: W2-POSEPRE-G1-T1** | Người tạo: admin (Sep 21st 2026) | Assignee: `2A202602093` | Subset: Input subset | Tổng: 4 Jobs (40 frames)
  - **Job #2194**: Assignee: `2A202602208` | Frame range: 0-9 (10 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 10:01
  - **Job #2195**: Assignee: `2A202602262` | Frame range: 10-19 (10 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 00:11
  - **Job #2196**: Assignee: `2A202602336` | Frame range: 20-29 (10 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 00:11
  - **Job #2197**: Assignee: `2A202602172` | Frame range: 30-39 (10 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 01:21

- **Task #341: ---** | Người tạo: admin (Sep 21st 2026) | Assignee: `2A202602336` | Subset: Input subset | Tổng: 4 Jobs (40 frames)  
  - **Job #2198**: Assignee: `2A202602093` | Frames: 5 | Stage and state: annotation in progress
  - **Job #2202**: Assignee: `2A202602093` | Frames: 13 | Stage and state: annotation in progress

- **Task #338: W2-POSE-G1-T1** | Người tạo: admin (Sep 21st 2026) | Assignee: `2A202602093` | Subset: Input subset | Tổng: 4 Jobs (20 frames)
  - **Job #2190**: Assignee: `2A202602208` | Frame range: 0-4 (5 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 10:01
  - **Job #2191**: Assignee: `2A202602262` | Frame range: 5-9 (5 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 08:54
  - **Job #2192**: Assignee: `2A202602336` | Frame range: 10-14 (5 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 10:08
  - **Job #2193**: Assignee: `2A202602172` | Frame range: 15-19 (5 frames, 25%) | Thời lượng: 10 hours | Tạo: Sep 21st 2026 23:41 | Cập nhật: Sep 22nd 2026 00:11

|Job ID| Số lượng labels|
|-----|---------------|
|2202|8|
|2198|8|
|2197|8|
|2196|8|
|2195|8|
|2194|8|
|2193|8|
|2192|8|
|2191|8|
|2190|8|

|#|label name|
|1|person|
|2|longmaytrai|
|3|longmayphai|
|4|songmui|
|5|mattrai|
|6|matphai|
|7|moingoai|
|8|moitrong|


## Tổng quan công việc của các thành viên

| TT | Họ và tên | MSSV | Số frames | Số labels | Thời lượng |
|:---:|---|:---:|:---:|:---:|:---:|
| 1 | NGUYỄN ĐẠI HOÀNG | 2A202602208 | 15 frames | 8 | 20 hours |
| 2 | THÂN VĨNH TRỌNG | 2A202602262 | 15 frames | 8 | 20 hours |
| 3 | TRƯƠNG TRỌNG ĐỨC | 2A202602172 | 15 frames | 8 | 20 hours |
| 4 | NGUYỄN NHƯ QUỲNH | 2A202602336 | 15 frames | 8 | 20 hours |
| 5 | PHẠM XUÂN DUY | 2A202602093 | 15 frames | 8 | 20 hours |

