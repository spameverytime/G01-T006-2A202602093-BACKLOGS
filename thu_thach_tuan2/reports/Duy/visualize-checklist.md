# BẢNG TRỰC QUAN HÓA CHECKLIST GÁN NHÃN (WEEK 2)
> **Nguồn trích xuất:** `thu_thach_tuan2/reports/Duy/ghi-chu.md`  
> **Tài liệu đối chiếu:** `Week2_Guideline_Face_Landmark_VF50_HocVien_v1.3.md` & `Week2_Guideline_HumanPose17_HocVien_v1.1.md`  
> **Nguyên tắc cốt lõi:** Xác định Trái (L) / Phải (R) theo **KHUNG HÌNH TRÊN ẢNH** (không theo giải phẫu người). Tuyệt đối không tự nạp annotation lên task. Không dùng Hidden thay cho Outside.

---

## MỤC LỤC TRỰC QUAN

1. [Cây Quyết Định Trạng Thái Điểm (Áp dụng chung)](#1-cây-quyết-định-trạng-thái-điểm-áp-dụng-chung)
2. [PHẦN 1: VF-50 Face Landmark (50 Landmark - 7 Skeleton)](#2-phần-1-vf-50-face-landmark-50-landmark---7-skeleton)
   - [2.1 Sơ đồ Cấu trúc & Phân bổ Point ID](#21-sơ-đồ-cấu-trúc--phân-bổ-point-id)
   - [2.2 Quy trình 4 bước thực hiện](#22-quy-trình-4-bước-thực-hiện)
   - [2.3 Quy trình 5 bước đặt điểm trong 1 ảnh](#23-quy-trình-5-bước-đặt-điểm-trong-1-ảnh)
   - [2.4 Bảng Checklist Kiểm Tra Chi Tiết Face Landmark](#24-bảng-checklist-kiểm-tra-chi-tiết-face-landmark)
   - [2.5 Ma trận Xử lý Tình huống đặc biệt & Ngưỡng Skeleton](#25-ma-trận-xử-lý-tình-huống-đặc-biệt--ngưỡng-skeleton)
   - [2.6 Bảng Tra cứu Lỗi Thường Gặp Face Landmark](#26-bảng-tra-cứu-lỗi-thường-gặp-face-landmark)
3. [PHẦN 2: HumanPose-17 Body Keypoints (17 Keypoints - 1 Skeleton)](#3-phần-2-humanpose-17-body-keypoints-17-keypoints---1-skeleton)
   - [3.1 Sơ đồ Topology & Quy tắc Khung hình VinFast](#31-sơ-đồ-topology--quy-tắc-khung-hình-vinfast)
   - [3.2 Quy trình 4 bước thực hiện](#32-quy-trình-4-bước-thực-hiện)
   - [3.3 Thứ tự 8 bước đặt điểm trong 1 ảnh](#33-thứ-tự-8-bước-đặt-điểm-trong-1-ảnh)
   - [3.4 Bảng Checklist Kiểm Tra Chi Tiết Human Pose](#34-bảng-checklist-kiểm-tra-chi-tiết-human-pose)
   - [3.5 Ma trận Xử lý Chùm điểm (0,0) & Chi dưới che khuất](#35-ma-trận-xử-lý-chùm-điểm-00--chi-dưới-che-khuất)
   - [3.6 Bảng Tra cứu Lỗi Thường Gặp Human Pose](#36-bảng-tra-cứu-lỗi-thường-gặp-human-pose)

---

## 1. Cây Quyết Định Trạng Thái Điểm (Áp dụng chung)

Quy tắc quyết định trạng thái điểm theo §4.1:

```mermaid
flowchart TD
    Start([Xét 1 điểm Keypoint / Landmark]) --> Q1{Nằm trong khung hình?}
    Q1 -- Không --> ST_OUT1[Trạng thái: OUTSIDE<br/>outside = 1<br/>Không dùng toạ độ]
    Q1 -- Có --> Q2{Nhìn thấy trực tiếp khớp / bờ viền?}
    Q2 -- Có --> ST_VIS[Trạng thái: VISIBLE<br/>outside = 0, occluded = 0<br/>Toạ độ phải đúng tuyệt đối]
    Q2 -- Không --> Q3{Suy ra được vị trí từ điểm liền kề / trục chi / tỉ lệ?}
    Q3 -- Có --> ST_OCC[Trạng thái: OCCLUDED<br/>occluded = 1, outside = 0<br/>Đặt điểm ở vị trí ước lượng hợp lý]
    Q3 -- Không --> ST_OUT2[Trạng thái: OUTSIDE<br/>outside = 1<br/>Khi không chắc: chọn Outside]

    style ST_VIS fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
    style ST_OCC fill:#fff3cd,stroke:#ffc107,stroke-width:2px,color:#856404
    style ST_OUT1 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
    style ST_OUT2 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
```

> **Lưu ý quan trọng:** Không dùng thuộc tính `Hidden` của CVAT thay cho `Outside`. Không dùng `confidence` để quyết định trạng thái.

---

## 2. PHẦN 1: VF-50 Face Landmark (50 Landmark - 7 Skeleton)

### 2.1 Sơ đồ Cấu trúc & Phân bổ Point ID

Quy ước: **KHÔNG CÓ BBOX FACE**. ID toàn cục chạy liên tục từ **0 đến 49**. Nhóm `*trai` nằm ở nửa trái ảnh (x nhỏ hơn), nhóm `*phai` nằm ở nửa phải ảnh.

```mermaid
graph TB
    subgraph FaceLandmark["VF-50 Face Landmark (7 Skeleton - 50 Điểm)"]
        direction TB
        subgraph TopLeft["Phía Trái Khung Hình (x nhỏ)"]
            L1["longmaytrai (0 - 4)<br/>5 điểm | Hở 2 đầu<br/>0: đuôi ngoài -> 4: đầu trong"]
            L2["mattrai (14 - 21)<br/>8 điểm | Vòng kín<br/>14: khoé ngoài -> 18: khoé trong"]
        end

        subgraph Center["Trục Giữa Khung Hình"]
            M1["songmui (10 - 13)<br/>4 điểm | Hở 2 đầu<br/>10: đỉnh -> 13: chân sống mũi (72%)"]
            M2["moingoai (30 - 41)<br/>12 điểm | Vòng kín<br/>30: khoé trái -> 36: khoé phải"]
            M3["moitrong (42 - 49)<br/>8 điểm | Vòng kín<br/>Hoàn toàn trong moingoai"]
        end

        subgraph TopRight["Phía Phải Khung Hình (x lớn)"]
            R1["longmayphai (5 - 9)<br/>5 điểm | Hở 2 đầu<br/>5: đầu trong -> 9: đuôi ngoài"]
            R2["matphai (22 - 29)<br/>8 điểm | Vòng kín<br/>22: khoé trong -> 26: khoé ngoài"]
        end
    end

    style TopLeft fill:#e8f4fd,stroke:#2b6cb0,stroke-width:2px
    style Center fill:#f0f4f8,stroke:#4a5568,stroke-width:2px
    style TopRight fill:#edfdf4,stroke:#2f855a,stroke-width:2px
```

---

### 2.2 Quy trình 4 bước thực hiện

```mermaid
sequenceDiagram
    autonumber
    actor Annotator as Người gán nhãn
    participant Task as CVAT Task
    participant Step52 as Mục 5.2: Soát 5 ảnh đầu
    participant Step55 as Mục 5.5: Sửa từng ảnh
    participant Step7 as Mục 7: Tự kiểm tra & Nộp

    Annotator->>Task: Mở đúng task, đối chiếu mã nhóm (50 ảnh có pre-label)
    Annotator->>Step52: Kiểm tra 5 ảnh đầu tiên (Gate Check)
    alt Có mục không đạt ở 5 ảnh đầu
        Step52-->>Annotator: DỪNG LẠI và báo Mentor ngay (chưa sửa hàng loạt)
    else Đạt toàn bộ 5 ảnh đầu
        Step52-->>Step55: Tiến hành làm hàng loạt từng ảnh theo thứ tự 5.5
        loop Sửa từng frame (50 ảnh Phần A / 20 ảnh Phần B)
            Annotator->>Step55: Kiểm tra L/R -> Đặt 12 điểm neo -> Điểm contour -> Trạng thái -> Lưu
        end
        Step55->>Step7: Tự kiểm tra trước khi nộp
        Note over Step7: Soát đủ checklist Từng frame (7.1) & Cả job 70 ảnh (7.2)
        Step7-->>Annotator: Nộp bài hoàn tất
    end
```

---

### 2.3 Quy trình 5 bước đặt điểm trong 1 ảnh (Mục 5.5)

```mermaid
flowchart LR
    S1["1. Kiểm tra Trái/Phải<br/>mattrai bên trái<br/>matphai bên phải"] --> S2["2. Đặt 12 điểm neo<br/>0, 4, 5, 9, 10, 13,<br/>14, 18, 22, 26, 30, 36"]
    S2 --> S3["3. Đặt điểm contour<br/>Giữ tỉ lệ chia chuẩn<br/>(Zoom >= 200% mắt/môi)"]
    S3 --> S4["4. Đặt trạng thái<br/>Visible / Occluded / Outside<br/>cho cả 50 điểm"]
    S4 --> S5["5. Lưu (Save)<br/>trước khi chuyển ảnh"]

    style S1 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style S2 fill:#fff8e1,stroke:#f57f17,stroke-width:2px
    style S3 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style S4 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style S5 fill:#fbe9e7,stroke:#d84315,stroke-width:2px
```

---

### 2.4 Bảng Checklist Kiểm Tra Chi Tiết Face Landmark

#### A. Gate Check: Soát 5 ảnh đầu trước khi làm hàng loạt (Mục 5.2)
- [ ] Có đủ **7 skeleton** trên mỗi frame (`longmaytrai`, `longmayphai`, `songmui`, `mattrai`, `matphai`, `moingoai`, `moitrong`).
- [ ] **Không có label Face** (đúng theo thiết kế hệ thống).
- [ ] Hai mắt tạo thành **vòng kín**, không có đường bắt chéo tạo thành hình chữ X.
- [ ] `mattrai` nằm ở **nửa trái khung hình**, `matphai` nằm ở **nửa phải khung hình**.
- [ ] Toạ độ `x` của các điểm từ **0 đến 9 tăng dần** khi mặt gần chính diện.
- [ ] `moitrong` nằm hoàn toàn **bên trong `moingoai`**.
- [ ] Không có điểm nào **rơi ra ngoài khuôn mặt**.

#### B. Kiểm tra từng bộ phận trên mỗi Frame (Ghi chú & Mục 3, 4, 7.1)
- [ ] **Trạng thái điểm (Point Status):**
  - [ ] Mọi điểm (50/50 điểm) đều đã được gán trạng thái rõ ràng (không để mặc định Visible của máy).
  - [ ] Điểm `Occluded` có toạ độ ước lượng hợp lý, không giữ nguyên vị trí sai lệch của pre-label.
  - [ ] Không có điểm nào gán `Hidden` thay vì `Outside`.
- [ ] **Lông mày (longmaytrai: 0–4, longmayphai: 5–9):**
  - [ ] Đã gán đủ tất cả các nhãn theo guideline.
  - [ ] Đặt điểm lên **mép lông** (bờ trên ranh giới với da trán), **không** đặt vào giữa đám lông, **không** đặt lên da trán.
  - [ ] Point ID của lông mày theo thứ tự tăng dần (`longmaytrai`: 0 ngoài -> 4 trong; `longmayphai`: 5 trong -> 9 ngoài).
  - [ ] Point ngoài sense đã đánh `Outside` (hoặc Outside cả skeleton nếu thấy dưới 3/5 điểm).
- [ ] **Sống mũi (songmui: 10–13):**
  - [ ] Điểm 10 đặt tại đỉnh sống mũi (lõm giữa 2 mắt, ngang khoé mắt trong).
  - [ ] **Điểm 13:** Nằm ở khoảng **72% quãng đường** từ điểm 10 xuống đường nối hai cánh mũi (nằm phía trên lỗ mũi, **chưa chạm chóp mũi**).
  - [ ] Ba đoạn 10–11, 11–12, 12–13 **chia gần đều nhau** (tỉ lệ max/min ~ 1.01).
- [ ] **Mắt (mattrai: 14–21, matphai: 22–29):**
  - [ ] Điểm đầu tiên của `mattrai` có ID = 14 (khoé ngoài); điểm đầu `matphai` có ID = 22 (khoé trong).
  - [ ] Điểm đầu chuỗi (14 hoặc 22) có toạ độ `x` **nhỏ nhất** trong 8 điểm của mắt đó.
  - [ ] Điểm khoé còn lại (18 hoặc 26) có toạ độ `x` **lớn nhất** trong 8 điểm của mắt đó.
  - [ ] **Mí trên cao hơn hoặc bằng mí dưới đối diện:**
    - `mattrai`: điểm 15 ≥ 21, điểm 16 ≥ 20, điểm 17 ≥ 19.
    - `matphai`: điểm 23 ≥ 29, điểm 24 ≥ 28, điểm 25 ≥ 27.
  - [ ] Contour là vòng kín, **không có đường bắt chéo tạo thành hình chữ X**.
  - [ ] Điểm đặt trên **bờ mi** (ranh giới da mi và nhãn cầu), không đặt lên lông mi hay lòng trắng.
- [ ] **Môi (moingoai: 30–41, moitrong: 42–49):**
  - [ ] Điểm 33 (môi trên) và điểm 39 (môi dưới) nằm **gần chính giữa miệng nhất**.
  - [ ] `moitrong` luôn **nằm hoàn toàn bên trong `moingoai`** ($x_{42} > x_{30}$ và $x_{46} < x_{36}$).
  - [ ] Khi **miệng đóng** (chiếm ~80% ảnh): **Không xoá** `moitrong`, giữ nguyên 8 điểm chạy dọc đường khép môi.
  - [ ] Khi **miệng mở**: Điểm đặt trên mép môi, không đặt lên răng/lưỡi.
- [ ] **Đeo kính & Vật cản:**
  - [ ] Điểm bờ mi bị gọng kính che: đặt lên bờ mi thật phía sau kính và đánh `Occluded`.
  - [ ] **Tuyệt đối không** đặt điểm lên gọng kính, tóc hoặc nền phía sau.
  - [ ] Nếu kính phản quang che kín không còn nhìn thấy khoé mắt nào: đánh `Outside` cả skeleton mắt.

#### C. Tự kiểm tra toàn bộ Job trước khi nộp (Mục 7.2)
- [ ] Đã hoàn thành đủ **70 ảnh** (50 ảnh phần A + 20 ảnh phần B).
- [ ] Đã đối chiếu Schema phần B: đúng **7 label**, **50 sublabel** (tên chuỗi số 0–49), tên trùng khít tuyệt đối với phần A.
- [ ] Đã rà soát kỹ ít nhất **10 frame đặc biệt**:
  - [ ] Ít nhất 1 frame mặt nghiêng mạnh.
  - [ ] Ít nhất 1 frame miệng mở.
  - [ ] Ít nhất 1 frame nheo mắt / nhắm mắt.
  - [ ] Ít nhất 1 frame kính loá / phản quang.
- [ ] Đã lướt toàn bộ job theo thứ tự frame để kiểm tra độ mượt, phát hiện điểm nhảy bất thường (**> 15 px**).
- [ ] Mọi trường hợp không chắc chắn đã **mở Issue** thay vì tự tiện đặt quy ước mới.

---

### 2.5 Ma trận Xử lý Tình huống đặc biệt & Ngưỡng Skeleton

| Skeleton / Tình huống | Điều kiện quan sát | Hành động xử lý | Trạng thái ghi nhận |
| :--- | :--- | :--- | :--- |
| **mattrai / matphai** | Thấy ≥ 4/8 điểm | Đặt đủ contour 8 điểm, điểm khuất suy luận từ bờ mi | Điểm thấy: `Visible`<br/>Điểm khuất: `Occluded` |
| **mattrai / matphai** | Thấy < 4/8 điểm | Không đoán mò | Đánh `Outside` cả skeleton |
| **longmaytrai / longmayphai** | Thấy ≥ 3/5 điểm | Đặt đủ cung lông mày theo mép trên | Điểm thấy: `Visible`<br/>Điểm khuất: `Occluded` |
| **longmaytrai / longmayphai** | Thấy < 3/5 điểm | Không đoán mò | Đánh `Outside` cả skeleton |
| **moingoai** | Thấy ≥ 6/12 điểm | Đặt đủ contour viền môi | Điểm khuất đánh `Occluded` |
| **moitrong** | Thấy ≥ 4/8 điểm | Đặt đủ mép trong môi | Điểm khuất đánh `Occluded` |
| **songmui** | Bị che một phần | Đặt 4 điểm chia đều; 13 ở chân sống mũi (72%) | Chỉ `Outside` khi cả sống mũi khuất hẳn |
| **Miệng đóng (80% ảnh)** | Hai môi khép sát | Đặt 8 điểm dọc đường khép môi, cho phép cặp đối diện trùng toạ độ y | `Visible` (Không xoá moitrong) |
| **Nheo / Nhắm mắt** | Mí khép lại | 8 điểm tạo vòng kín, mí trên & dưới trùng khe mí, giữ 2 khoé | `Visible` nếu thấy khe mí |
| **Gọng kính cắt mí** | Gọng đè lên mi | Đặt điểm lên bờ mi thật phía sau gọng | `Occluded` |

---

### 2.6 Bảng Tra cứu Lỗi Thường Gặp Face Landmark (Mục 9)

| Lỗi gặp phải | Nguyên nhân gốc rễ | Cách xử lý chuẩn xác |
| :--- | :--- | :--- |
| **Đi tìm label Face không thấy** | Tài liệu cũ mô tả sai | Schema thiết kế **không có Face**, chỉ dùng 7 skeleton. |
| **Đảo trái/phải toàn bộ job** | Dùng giải phẫu người hoặc đổi khi mặt nghiêng | Luôn giữ Left/Right theo **khung hình / khuôn mặt trên ảnh**. |
| **Mắt thành hình chữ X** | Sai thứ tự nối điểm | Kiểm tra và nối đúng vòng: 14→21 và 22→29. |
| **Đặt điểm 13 ở chóp mũi** | Nhầm định nghĩa chân sống mũi | Điểm 13 là **chân sống mũi** (ở 72% quãng đường từ 10 xuống cánh mũi, trên lỗ mũi). |
| **Xoá moitrong khi miệng đóng** | Tưởng miệng đóng là không có moitrong | Miệng đóng chiếm 80% ảnh; vẫn giữ đủ 8 điểm `moitrong` nằm trong `moingoai`. |
| **Đặt điểm lên gọng kính** | Gọng kính dễ nhìn hơn bờ mi | Phải đặt lên bờ mi thật rồi đánh trạng thái `Occluded`. |
| **Quên đặt trạng thái** | Pre-label đã để mặc định Visible | Phải rà soát và đặt mới toàn bộ trạng thái cho cả 50 điểm. |
| **Reset point ID theo từng skeleton** | Hiểu nhầm quy tắc sublabel | Point ID chạy **toàn cục 0–49** xuyên suốt 7 skeleton. |
| **Tự nạp annotation làm mất bài** | Upload file ghi đè dữ liệu task | Tuyệt đối **không dùng nút upload annotation**. |
| **Copy nhãn giữa các frame liên tiếp** | Thấy các ảnh liên tiếp gần giống nhau | Không copy nguyên nhãn; nhãn mượt nhưng phải kiểm tra từng frame. |
| **Schema phần B sublabel 0–7** | Reset ID theo từng skeleton | Dùng đúng ID toàn cục (ví dụ `mattrai` là 14–21). |
| **Hai người cùng sửa Labels** | Không phân công ai phụ trách | Một người dựng/đối chiếu, cả nhóm kiểm tra. |
| **Chia đôi frame máy móc tìm L/R** | Khuôn mặt lệch khỏi tâm ảnh | Xác định trái/phải theo **bố cục khuôn mặt trên ảnh**, không theo tâm frame. |

---

## 3. PHẦN 2: HumanPose-17 Body Keypoints (17 Keypoints - 1 Skeleton)

### 3.1 Sơ đồ Topology & Quy tắc Khung hình VinFast

Quy ước: **Chỉ gán người lái**. Trái/Phải theo **KHUNG HÌNH** (R ở bên phải ảnh, L ở bên trái ảnh).
- Điểm chẵn (**R**): 2, 4, 6, 8, 10, 12, 14, 16 nằm ở phía **PHẢI** khung hình.
- Điểm lẻ (**L**): 3, 5, 7, 9, 11, 13, 15, 17 nằm ở phía **TRÁI** khung hình.

```mermaid
graph TD
    subgraph Head["VÙNG ĐẦU"]
        P1["1: Nose (Chóp mũi)"]
        P2["2: R Eye (Phải KH)"] --- P4["4: R Ear (Ống tai P)"]
        P3["3: L Eye (Trái KH)"] --- P5["5: L Ear (Ống tai T)"]
        P1 --- P2
        P1 --- P3
    end

    subgraph Torso["THÂN MÌNH (Định khung)"]
        P6["6: R Shoulder (Khớp vai P)"] --- P7["7: L Shoulder (Khớp vai T)"]
        P6 --- P12["12: R Hip (Khớp háng P)"]
        P7 --- P13["13: L Hip (Khớp háng T)"]
        P12 --- P13
    end

    subgraph UpperLimbs["CHI TRÊN"]
        P6 --- P8["8: R Elbow (Khuỷu P)"] --- P10["10: R Wrist (Cổ tay P)"]
        P7 --- P9["9: L Elbow (Khuỷu T)"] --- P11["11: L Wrist (Cổ tay T)"]
    end

    subgraph LowerLimbs["CHI DƯỚI"]
        P12 --- P14["14: R Knee (Gối P)"] --- P16["16: R Ankle (Cổ chân P)"]
        P13 --- P15["15: L Knee (Gối T)"] --- P17["17: L Ankle (Cổ chân T)"]
    end

    P4 --- P6
    P5 --- P7

    style Head fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style Torso fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style UpperLimbs fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style LowerLimbs fill:#fbe9e7,stroke:#d84315,stroke-width:2px
```

---

### 3.2 Quy trình 4 bước thực hiện

```mermaid
sequenceDiagram
    autonumber
    actor Annotator as Người gán nhãn
    participant Task as CVAT Task
    participant GateCheck as Mục 5.2: Kiểm tra 5 ảnh đầu
    participant FixStep as Mục 5.5: 8 bước đặt điểm
    participant SubmitCheck as Mục 7: Tự kiểm tra & Nộp

    Annotator->>Task: Mở đúng task, đối chiếu mã nhóm (40 ảnh có pre-label)
    Annotator->>GateCheck: Chạy kiểm tra 5 ảnh đầu (Gate Check)
    alt Skeleton lệch toàn bộ hoặc sai schema
        GateCheck-->>Annotator: DỪNG LẠI và báo Mentor ngay (Lỗi hệ thống)
    else Đạt toàn bộ 5 ảnh đầu
        GateCheck-->>FixStep: Bắt đầu sửa hàng loạt theo 8 bước chuẩn
        loop Sửa từng frame (40 ảnh Phần A / 20 ảnh Phần B)
            Annotator->>FixStep: Check L/R -> Xử lý (0,0) -> Đặt Thân -> Chi trên -> Đầu -> Chi dưới -> Trạng thái -> Lưu
        end
        FixStep->>SubmitCheck: Tự kiểm tra trước khi nộp
        Note over SubmitCheck: Soát đủ checklist Từng frame (7.1) & Cả job 60 ảnh (7.2)
        SubmitCheck-->>Annotator: Hoàn tất nộp bài
    end
```

---

### 3.3 Thứ tự 8 bước đặt điểm trong 1 ảnh (Mục 5.5)

```mermaid
flowchart TD
    Step1["1. Kiểm tra Trái/Phải theo khung hình<br/>R ở bên phải ảnh, L ở bên trái ảnh"] --> Step2["2. Xử lý các điểm ở góc (0, 0)<br/>Quyết định từng điểm theo §4.1 (làm sớm)"]
    Step2 --> Step3["3. Đặt thân mình (Định khung cơ thể)<br/>Hai vai (6, 7) và Hai hông (12, 13)"]
    Step3 --> Step4["4. Đặt chi trên<br/>Khuỷu tay (8, 9) và Cổ tay (10, 11)"]
    Step4 --> Step5["5. Đặt vùng đầu<br/>Mũi (1), Mắt (2, 3), Tai (4, 5)"]
    Step5 --> Step6["6. Đặt chi dưới (Làm cuối cùng)<br/>Gối (14, 15) và Cổ chân (16, 17)"]
    Step6 --> Step7["7. Đặt trạng thái cho cả 17 điểm<br/>Visible / Occluded / Outside"]
    Step7 --> Step8["8. Lưu (Save) dữ liệu<br/>trước khi chuyển sang ảnh tiếp theo"]

    style Step1 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Step2 fill:#ffebee,stroke:#c62828,stroke-width:2px
    style Step3 fill:#fff8e1,stroke:#f9a825,stroke-width:2px
    style Step4 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Step5 fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
    style Step6 fill:#fbe9e7,stroke:#d84315,stroke-width:2px
    style Step7 fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style Step8 fill:#eceff1,stroke:#37474f,stroke-width:2px
```

---

### 3.4 Bảng Checklist Kiểm Tra Chi Tiết Human Pose

#### A. Gate Check: Soát 5 ảnh đầu trước khi làm hàng loạt (Mục 5.2)
- [ ] Có skeleton `person` với **đủ 17 sublabel** được đánh số từ **1 đến 17**.
- [ ] Số lượng skeleton **khớp số người cần gán**: Mặc định duy nhất **1 người lái**.
- [ ] **Không có skeleton nào lệch toàn bộ** so với người trong ảnh (nếu dịch chuyển cả cụm -> báo mentor).
- [ ] Đã nhận diện được **chùm điểm lỗi ở góc trên-trái (0, 0)**.
- [ ] Trái/phải **chưa bị đảo**: Điểm R ở phía phải khung hình, điểm L ở phía trái khung hình.

#### B. Kiểm tra từng bộ phận trên mỗi Frame (Ghi chú & Mục 3, 6, 7.1)
- [ ] **Quy tắc khung hình & Không gian:**
  - [ ] Điểm R (chẵn) ở bên phải ảnh, điểm L (lẻ) ở bên trái ảnh (bất kể người vặn mình, quay lưng).
  - [ ] Ảnh bị xoay 90°: Xác định đầu–chân theo cơ thể, nhưng **Left/Right vẫn theo khung hình**.
  - [ ] Duy nhất 1 skeleton cho người lái; **không gán nhãn hành khách/người thứ 2**.
- [ ] **Xử lý chùm điểm góc (0, 0) & Trùng toạ độ:**
  - [ ] Không còn bất kỳ điểm nào nằm ở góc (0, 0) hoặc sát góc trên-trái (**vùng 50 px**).
  - [ ] Không kéo nhẹ điểm (0, 0) cho gần đúng; phải xác định lại từ đầu trên ảnh.
  - [ ] **Không có hai điểm khác nhau trùng toạ độ** khi cả hai đều `Visible` (ví dụ tai đè lên mũi).
- [ ] **Vùng đầu (Keypoint 1–5):**
  - [ ] **1 - Nose:** Đặt ở **chóp mũi** (mặt nghiêng vẫn là chóp mũi, không dời về giữa mặt).
  - [ ] **2 - R Eye / 3 - L Eye:** Đặt ở **tâm đồng tử** mắt; nếu mắt nhắm đặt ở **tâm khe mí**.
  - [ ] **4 - R Ear / 5 - L Ear:** Đặt ở **ống tai** (không đặt ở chóp vành tai hay dái tai).
  - [ ] Khi tóc phủ kín tai: Nếu còn ước lượng được từ hàm/thái dương -> đánh `Occluded`, không thì `Outside`.
- [ ] **Chi trên (Keypoint 6–11):**
  - [ ] **6 - R Shoulder / 7 - L Shoulder:** Đặt tại **tâm khớp vai** (điểm xoay cánh tay).
  - [ ] **8 - R Elbow / 9 - L Elbow:** Đặt tại **tâm khớp khuỷu tay**.
  - [ ] **10 - R Wrist / 11 - L Wrist:** Đặt tại **tâm khớp cổ tay** (nếp gấp cổ tay).
  - [ ] **Tay đặt trên vô-lăng:** Cổ tay vẫn đặt ở **nếp gấp cổ tay**, **tuyệt đối không** dời lên vành vô-lăng.
  - [ ] Chuỗi vai – khuỷu – cổ tay liền mạch, **không bắt chéo** sang bên kia thân.
- [ ] **Chi dưới (Keypoint 12–17):**
  - [ ] **12 - R Hip / 13 - L Hip:** Đặt tại **tâm khớp háng** (không phải mép ngoài hông hay cạp quần).
  - [ ] **14 - R Knee / 15 - L Knee:** Đặt tại **tâm khớp gối** (giữa xương bánh chè).
  - [ ] **16 - R Ankle / 17 - L Ankle:** Đặt tại **tâm khớp cổ chân** (ngang mắt cá).
  - [ ] Kiểm tra từng điểm gối và cổ chân xem có **nằm trên cơ thể người** không.
  - [ ] **Tuyệt đối không** đặt điểm lên ghế, vô-lăng, cần số, bảng táp-lô hay sàn xe.
- [ ] **Trạng thái điểm (Point Status):**
  - [ ] Đủ 17 keypoint, mỗi điểm có trạng thái rõ ràng (`Visible`, `Occluded`, `Outside`).
  - [ ] Điểm `Occluded` có toạ độ ước lượng hợp lý theo trục chi / tư thế.
  - [ ] Điểm `Outside` đúng là nằm ngoài khung hình hoặc hoàn toàn không suy ra được.

#### C. Tự kiểm tra toàn bộ Job trước khi nộp (Mục 7.2)
- [ ] Đã hoàn thành đủ **60 ảnh** (40 ảnh phần A + 20 ảnh phần B).
- [ ] Đã đối chiếu Schema phần B: đúng **1 label person**, **17 sublabel** (số 1 đến 17), tên trùng khít tuyệt đối với phần A.
- [ ] Đã rà soát kỹ ít nhất **10 frame đặc biệt**:
  - [ ] 1 frame chi dưới bị khuất.
  - [ ] 1 frame người lái vặn mình / quay lưng.
  - [ ] 1 frame thiếu sáng / nhoè.
  - [ ] 1 frame pre-label có nhiều điểm dồn ở (0, 0).
- [ ] Mọi trường hợp nghi ngờ, không chắc chắn (ví dụ quá tối không phân biệt được người với ghế) đã **mở Issue** thay vì tự đặt luật mới.

---

### 3.5 Ma trận Xử lý Chùm điểm (0,0) & Chi dưới che khuất

```mermaid
graph TD
    subgraph ZeroProblem["XỬ LÝ ĐIỂM Ở GÓC (0,0)"]
        Z0["Điểm nằm ở góc (0,0)<br/>(Thường gặp: 4-Tai P, 16-Cổ chân P, 17-Cổ chân T)"] --> Z1{Toạ độ có mang thông tin?}
        Z1 -- Không --> Z2["Tuyệt đối KHÔNG kéo nhẹ cho gần đúng!"]
        Z2 --> Z3{Tìm khớp trên ảnh thực tế}
        Z3 -- Thấy khớp --> Z_Vis["Kéo về vị trí đúng + Đánh VISIBLE"]
        Z3 -- Khuất nhưng suy ra được --> Z_Occ["Kéo về vị trí ước lượng + Đánh OCCLUDED"]
        Z3 -- Khuất hẳn / Ngoài khung --> Z_Out["Đánh OUTSIDE (Không để lại góc 50px)"]
    end

    subgraph LegProblem["XỬ LÝ CHI DƯỚI BỊ CHE KHUẤT"]
        L0["Quan sát Chi dưới trong cabin"] --> L1{Nhìn thấy được gì?}
        L1 -- Thấy đường đùi / cẳng chân qua quần --> L_Occ["OCCLUDED<br/>(Ước lượng theo trục chi)"]
        L1 -- Chỉ thấy hông, chi dưới khuất hẳn --> L_Out1["OUTSIDE<br/>(Không đoán mò)"]
        L1 -- Chi dưới bị khung hình cắt --> L_Out2["OUTSIDE"]
    end

    style Z_Vis fill:#d4edda,stroke:#28a745,stroke-width:2px
    style Z_Occ fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    style Z_Out fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    style L_Occ fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    style L_Out1 fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    style L_Out2 fill:#f8d7da,stroke:#dc3545,stroke-width:2px
```

---

### 3.6 Bảng Tra cứu Lỗi Thường Gặp Human Pose (Mục 9)

| Lỗi gặp phải | Nguyên nhân gốc rễ | Cách xử lý chuẩn xác |
| :--- | :--- | :--- |
| **Đảo trái/phải toàn bộ job** | Dùng quy ước giải phẫu/COCO thay vì quy ước VinFast | Điểm **R phải ở bên phải ảnh**, điểm **L phải ở bên trái ảnh**. |
| **Kéo điểm (0, 0) cho gần đúng** | Tưởng toạ độ (0, 0) có ý nghĩa | Toạ độ máy vứt ở góc là vô nghĩa; phải tự xác định lại từ đầu trên người thật. |
| **Đặt gối / cổ chân lên ghế, cần số** | Cần tìm chỗ để ghim điểm | Nếu không thấy chi trên người thì đánh `Outside`, không đặt lên vật thể. |
| **Đặt cổ tay lên vành vô-lăng** | Vành vô-lăng dễ nhìn hơn cổ tay | Cổ tay phải đặt tại **nếp gấp cổ tay**. |
| **Đặt hông ở cạp quần** | Nhầm mốc giải phẫu | Hông là **tâm khớp háng**, không phải cạp quần hay mép ngoài hông. |
| **Đặt tai ở chóp vành tai** | Nhầm mốc giải phẫu | Tai là **ống tai**, không phải vành tai hay dái tai. |
| **Nhầm trên/dưới cơ thể khi xoay 90°** | Khung hình bị xoay ngang | Xác định đầu–chân theo trục cơ thể, nhưng **Left/Right vẫn giữ theo khung hình**. |
| **Dùng Hidden thay Outside** | Nhầm lẫn chức năng của CVAT | `Hidden` chỉ ẩn tạm trên giao diện không lưu data; phải chọn thuộc tính `Outside`. |
| **Gán nhãn cả hành khách** | Thấy người thứ 2 trong cabin | Mặc định **chỉ gán nhãn duy nhất người lái**. |
| **Sửa tay 40 ảnh bị lệch hệ thống** | Không nhận ra toàn bộ skeleton bị dịch | Cả skeleton lệch đều sang một bên là lỗi hệ thống -> **báo ngay cho Mentor**. |
| **Schema phần B đặt node R/L sai phía** | Dùng thói quen giải phẫu / COCO | Node R ở nửa phải, node L ở nửa trái khung vẽ trình dựng. |
| **Hai người cùng sửa Labels** | Không phân công ai dựng | Một người dựng schema, cả nhóm đối chiếu kiểm tra. |
