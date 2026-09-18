# KINH NGHIỆM GÁN NHÃN THỰC CHIẾN (BATTLE-TESTED ANNOTATION HANDBOOK)
## Cẩm nang nhập môn & Bí quyết 10.000 giờ dành cho Data Annotator
> **Dự án AI20K • Quy chuẩn G01-T006**  
> *Đúc kết từ thực chiến gán nhãn Computer Vision (2D BBox, Polygon, Lane Polyline, Semantic Segmentation)*

---

## Lời nói đầu: Tư duy của một Data Annotator chuyên nghiệp

Nếu bạn mới bắt đầu, bạn có thể nghĩ gán nhãn (labeling) đơn giản chỉ là "vẽ hộp quanh cái xe" hay "chấm điểm bo quanh con người". Nhưng với hơn 10.000 giờ ngồi trước màn hình kiểm thử cho các mô hình tự hành và thị giác máy tính, sự thật là:

> **"Annotator không phải là thợ vẽ tranh. Annotator là người lập trình nhận thức đầu vào cho AI."**

Mô hình AI (YOLO, Mask R-CNN, BEVFormer, v.v.) chỉ thông minh bằng chính những pixel mà bạn "dạy" cho nó. Một bounding box vẽ ẩu, một polygon thừa 3 pixel viền nền, hay việc bỏ sót một người đi bộ trong bóng râm đều có thể dẫn đến hậu quả AI phanh gấp vô cớ hoặc gây tai nạn chết người ngoài đời thực.

Tài liệu này không lặp lại lý thuyết sách vở, mà chia sẻ **quy trình tư duy từng bước trên mỗi bức ảnh** cùng những **mẹo thực chiến đắt giá** giúp bạn tăng gấp đôi tốc độ mà vẫn đạt độ chính xác >98%.

---

## 1. Quy trình chuẩn 5 bước khi mở 1 bức ảnh mới

Hầu hết người mới bắt đầu đều mắc sai lầm chí mạng: **Mở ảnh lên là vội vàng chọn công cụ vẽ ngay vào vật thể đầu tiên đập vào mắt**. Hậu quả là hình vẽ đè lộn xộn, bỏ sót vật thể nhỏ ở rìa, và phải liên tục click chuột sửa lại các lớp (layer).

Một Senior Annotator luôn làm theo trình tự chuẩn 5 bước sau:

```
[BƯỚC 0] Quét toàn cảnh 3s & Chỉnh ánh sáng (Scene Scan)
    │
    ▼
[BƯỚC 1] Layering: Gán nhãn từ NỀN (Background) ra TIỀN CẢNH (Foreground)
    │
    ▼
[BƯỚC 2] Kích thước: Đi từ VẬT THỂ LỚN đến VẬT THỂ NHỎ
    │
    ▼
[BƯỚC 3] Quét không gian: Quét theo lưới hình chữ Z / Sâu phối cảnh
    │
    ▼
[BƯỚC 4] 60 giây Self-QC (Kiểm tra chất lượng trước khi Submit)
```

---

### Bước 0: Quét toàn cảnh 3 giây & Cân chỉnh hiển thị (Scene Scan)
Trước khi chạm vào bất kỳ công cụ vẽ nào:
1. **Định vị bối cảnh**: Ảnh chụp ban ngày, chập tối, đêm hay ngược sáng? Có mưa, sương mù hay tuyết không? Mật độ giao thông thưa thớt hay kẹt xe tắc nghẽn?
2. **Cân chỉnh màn hình trên CVAT**:
   - Nếu ảnh bị chìm trong bóng râm hoặc cảnh ban đêm: Bấm tổ hợp phím chỉnh **Brightness** (Độ sáng) tăng 10-20%, **Contrast** (Độ tương phản) tăng 10%. Đừng cố căng mắt nhìn vào vùng tối khi bạn có thể tăng sáng giao diện!
3. **Xác định đường chân trời (Vanishing Point)**: Giúp não bạn tự động dự đoán tỷ lệ và kích thước của các vật thể ở xa.

---

### Bước 1: Chiến thuật "Layering" – Từ NỀN (Background) đến PHÍA TRƯỚC (Foreground)

Đây là bí mật số 1 về năng suất và tổ chức dữ liệu: **Luôn gán nhãn theo chiều sâu không gian từ xa lại gần, từ nền móng đến chi tiết nổi.**

| Thứ tự Layer | Nhóm đối tượng / Nhãn | Dạng Shape | Tại sao phải làm trước? |
|:---:|---|:---:|---|
| **Lớp 1 (Nền sâu)** | `area/drivable`, `area/alternative`, `sidewalk`, `sky` | Polygon / Brush | Tạo khung nền tham chiếu không gian. Nếu vẽ xe cộ trước rồi mới vẽ mặt đường, các điểm polygon đường sẽ đè lên box xe, gây click nhầm cực kỳ khó chịu khi chỉnh sửa. |
| **Lớp 2 (Hạ tầng tĩnh)** | `lane/*` (vạch kẻ đường, curb), dải phân cách | Polyline | Bám sát mặt đường, nằm phẳng dưới đáy các phương tiện. |
| **Lớp 3 (Cột & Biển báo)** | `traffic light`, `traffic sign`, cột đèn, biển báo treo cao | BBox / Polygon | Nằm cố định trên nền trời/vỉa hè, ít khi bị xe che khuất hoàn toàn. |
| **Lớp 4 (Vật thể tĩnh / Đỗ)** | Xe đỗ bên lề, chướng ngại vật tĩnh | BBox | Định hình ranh giới luồng giao thông. |
| **Lớp 5 (Phương tiện di chuyển)** | `car`, `truck`, `bus`, `train` | BBox | Các đối tượng tiền cảnh chiếm diện tích lớn, thường đóng vai trò là "vật che khuất" (occluder) các vật thể phía sau. |
| **Lớp 6 (Tiền cảnh & Đối tượng nhỏ)** | `motorcycle`, `bicycle`, `rider`, `pedestrian` | BBox | Thường di chuyển đan xen, nằm ở lớp trước cùng hoặc bị các xe to che một phần. |

> [!TIP]
> **Mẹo thao tác trên CVAT & Cách "Cứu nguy khi lỡ vẽ đè layer" (Z-Order Hack):**  
> 1. **Khi mới vẽ:** Sau khi vẽ xong Lớp 1 (Drivable Area / Sky) và Lớp 2 (Lane Marking), hãy dùng tính năng **Lock Layer (phím L)** hoặc giảm Opacity (độ trong suốt) xuống 20-30%. Lúc này bạn hoàn toàn yên tâm vẽ các đối tượng bên trên mà không sợ bấm trúng điểm polygon của nền!
> 2. **Lỡ vẽ lớp nền đè lên vật thể chi tiết? TUYỆT ĐỐI KHÔNG XÓA:**
>    - **Cách 1 (Chỉnh Z-Order):** Chọn đối tượng bị che $\rightarrow$ Nhìn sang bảng `Objects` ở thanh bên phải $\rightarrow$ Tìm ô **`Z Order`** (mặc định = 0) $\rightarrow$ Tăng lên `1`, `2` hoặc `10`. Ngay lập tức đối tượng sẽ nổi lên trên đè ngược lại lớp nền!
>    - **Cách 2 (Phím tắt nhanh):** Chọn đối tượng và bấm phím `+` (hoặc `Shift + +`) để đẩy layer lên trên, phím `-` để hạ layer xuống dưới.
>    - **Cách 3 (Ẩn tạm thời để sửa viền):** Bấm phím **`H`** (Hide) để ẩn tạm đối tượng bên trên, thoải mái sửa viền đối tượng bên dưới rồi bấm `H` lần nữa để hiện lại.
> 3. **Quy tắc vàng của Semantic Segmentation:** Pixel của hình có Z-Order cao hơn sẽ tự động chiếm quyền ưu tiên và đè lên hình có Z-Order thấp hơn khi export dữ liệu mask. Do đó bạn **không bao giờ phải mất công cắt xén viền tiếp giáp giữa các lớp!**

---

### Bước 2: Nguyên tắc kích thước – Từ ĐỐI TƯỢNG LỚN đến ĐỐI TƯỢNG NHỎ

Trong cùng một lớp đối tượng (ví dụ: nhóm phương tiện giao thông):

1. **Vẽ vật thể lớn trước (Truck, Bus, Van, SUV to lớn)**:
   - Các vật thể này có cạnh và hình khối rất rõ ràng.
   - Chúng đóng vai trò là "mỏ neo thị giác" (Visual Anchors). Khi bạn xác định đúng khung của một chiếc xe tải, bạn sẽ dễ dàng biết phần đầu xe máy ló ra bên cạnh thuộc về đối tượng nào.
2. **Vẽ vật thể trung bình (Sedan, Compact Car)**.
3. **Vẽ vật thể nhỏ và linh hoạt cuối cùng (`motorcycle`, `bicycle`, `rider`, `pedestrian`)**:
   - Đối tượng nhỏ và người đi bộ thường có tư thế phức tạp, dễ bị che khuất (occluded). Khi các hộp xe lớn đã được cố định, bạn chỉ cần căn chỉnh hộp của người sát theo mép xe mà không sợ bị lấn ranh giới.

---

### Bước 3: Chiến thuật quét không gian "Z-Scan" & "Phối cảnh chiều sâu"

Người mới hay bị tình trạng **"nhìn đâu vẽ đó"**, dẫn tới việc bỏ sót các góc ảnh hoặc những xe nhỏ ở xa. Người có 10.000 giờ kinh nghiệm quét ảnh theo 1 trong 2 kỹ thuật sau:

#### Kỹ thuật 1: Z-Scan (Chia lưới Ziczac)
- Mắt di chuyển từ **Góc trên trái ➔ Trượt ngang sang Phải ➔ Đi chéo xuống Trái ➔ Trượt ngang sang Phải**.
- Phù hợp nhất cho các ảnh tĩnh, ảnh chụp flycam hoặc ảnh phong cảnh rộng.

#### Kỹ thuật 2: Vanishing Point Outward (Quét từ điểm tụ ra rìa - Dành cho camera hành trình ô tô)
1. **Vùng trung tâm & Điểm tụ (Xa nhất)**: Bắt các đối tượng nhỏ li ti ở cuối con đường (những đốm xe cách 50-100m).
2. **Vùng dòng chảy (Tầm trung 15-30m)**: Các làn đường chính bên trái và bên phải.
3. **Vùng cận cảnh (Dưới 10m)**: Nắp capo xe chủ, người đi sát lề đường, xe vượt mặt ở 2 mép biên ảnh.

---

## 2. Kinh nghiệm thực chiến 10.000 giờ: Những lỗi "nhìn tưởng đúng nhưng AI sẽ trượt"

### 2.1. Độ khít của Bounding Box (Tightness Principle)
* **Quy tắc vàng:** *"Hộp phải chạm vào pixel ngoài cùng của vật thể, không thiếu 1 pixel của vật, không thừa 1 pixel của nền."*
* **Lỗi Newbie thường gặp:** Vẽ hộp quá rộng (chứa cả bóng xe, cột đèn phía sau) hoặc cắt lẹm mất gương chiếu hậu, mũi giày người đi bộ, ăng-ten xe.
* **Quy ước cho gương chiếu hậu & bánh xe:**
  - Gương chiếu hậu (side mirrors) **phải nằm trọn trong box** của xe.
  - Phần lốp xe tiếp xúc mặt đường phải nằm sát đáy box. **Không bao gồm bóng đổ (drop shadow)** trên mặt đường vào trong box!

### 2.2. Xử lý "Bóng ma" và "Hình phản chiếu" (Reflection & Decals)
- **Hình in trên thân xe buýt/xe tải:** Hình một cô gái hoặc người mẫu in quảng cáo trên thân xe buýt **TUYỆT ĐỐI KHÔNG** dán nhãn là `pedestrian`. AI sẽ bị ảo giác nếu bạn gán nhãn đó!
- **Bóng phản chiếu trên kính/vũng nước:** Không dán nhãn hình phản chiếu qua gương kính tòa nhà hoặc mặt nước.
- **Tượng, mannequin (ma-nơ-canh):** Xem kỹ guideline dự án; thông thường mannequin không cử động sẽ đưa vào nhóm cảnh báo hoặc bỏ qua (trừ khi dự án thời trang).

### 2.3. Cặp đôi ác mộng: Occluded (Bị che) & Truncated (Bị cắt)

Hãy thuộc nằm lòng bảng quyết định này:

```
                  ┌──────────────────────────────┐
                  │ Đối tượng có nằm trọn trong  │
                  │        khung ảnh không?      │
                  └──────────────┬───────────────┘
                                 │
                 ┌───────────────┴───────────────┐
               Có                               Không
                 │                               │
                 ▼                               ▼
     ┌───────────────────────┐       ┌───────────────────────┐
     │ Có bị vật khác che    │       │ Truncated = TRUE      │
     │ khuất phần nào không? │       └───────────┬───────────┘
     └───────────┬───────────┘                   │
                 │                   ┌───────────┴───────────┐
         ┌───────┴───────┐           │ Có bị vật khác che    │
       Có               Không        │ thêm phần nào không?  │
         │               │           └───────────┬───────────┘
         ▼               ▼                       │
   Occluded = TRUE     Bình thường       ┌───────┴───────┐
   Truncated = FALSE  (Cả hai FALSE)   Có               Không
                                         │               │
                                         ▼               ▼
                                   Cả hai = TRUE   Truncated = TRUE
                                                   Occluded = FALSE
```

> [!WARNING]
> **Vật thể bị che bao nhiêu % thì bỏ qua? (The 20% Visibility Rule):**  
> Nếu một vật thể bị che khuất hơn 80% (chỉ thấy một góc bánh xe hoặc một chỏm nón bảo hiểm) và không thể phân biệt chắc chắn 100% bằng mắt người đó là class gì ➔ **ĐỪNG ĐOÁN!** Hãy ghi nhận vào `problem-backlog.md` hoặc gắn cờ UNCERTAIN_BOUNDARY để xin ý kiến Reviewer/Mentor.

### 2.4. Phân biệt nhãn nhạy cảm: `pedestrian` vs `rider`
- Một người đang cưỡi trên xe máy, xe đạp, xe trượt scooter:
  - Nếu xe máy đó đang chạy hoặc người đó đang ngồi trên yên xe điều khiển: Người đó là **`rider`**, chiếc xe bên dưới là **`motorcycle`** / **`bicycle`** (Vẽ 2 box riêng biệt đè nhau!).
  - Nếu người đó xuống xe dắt bộ, đứng cạnh xe sửa chữa: Người đó là **`pedestrian`**!

---

## 3. Bí kíp làm chủ công cụ CVAT & Công thái học (Ergonomics)

Làm việc 8 tiếng một ngày với hàng nghìn bức ảnh đòi hỏi bạn phải tối ưu thao tác chuột và bàn phím như một game thủ eSports:

### 3.1. Phím tắt "khắc cốt ghi tâm" trên CVAT
- `N` (hoặc `Shift + N`): Tạo annotation mới nhanh chóng với class vừa dùng.
- `Space + Kéo chuột`: Di chuyển khung hình (Pan) mượt mà mà không làm méo hình vẽ.
- `Con lăn chuột (Scroll)`: Zoom in/Zoom out tức thì vào chi tiết.
- `H`: Ẩn/Hiện tất cả nhãn (cực kỳ quan trọng để kiểm tra xem bên dưới box có sót vật thể nào không).
- `Del`: Xóa nhanh shape sai.
- `Ctrl + Z` / `Ctrl + Y`: Undo / Redo khi chấm polygon sai điểm.

### 3.2. Quy tắc Zoom Level "Vàng"
* **Đừng zoom quá sâu (>300%):** Khi zoom quá lớn, ảnh bị vỡ thành từng điểm ảnh (pixelation/noise). Bạn sẽ bị mất cảm giác về tổng thể vật thể và tốn gấp 3 lần thời gian chỉ để chỉnh 1 pixel vô nghĩa.
* **Đừng vẽ ở mức 100% khi vật nhỏ hơn 30px:** Luôn zoom vào vùng làm việc ở mức **150% - 200%**. Đây là khoảng cân bằng hoàn hảo giữa độ sắc nét biên và tốc độ di chuột.

### 3.3. Bảo vệ mắt và sức bền thể lực
- Áp dụng quy tắc **20-20-20**: Cứ 20 phút nhìn màn hình, hãy nhìn xa 20 feet (6m) trong 20 giây.
- Điều chỉnh độ tương phản màn hình ở mức ấm dịu (Night light nhẹ nếu làm việc ban đêm). Mắt mỏi dẫn đến tỉ lệ reject tăng gấp 4 lần sau 4 tiếng làm việc liên tục.

---

## 4. Checklist 60 giây Self-QC (Tự kiểm trước khi bấm Submit)

Trước khi chuyển sang ảnh tiếp theo, hãy dành đúng 60 giây chạy qua bộ tiêu chí **"3 KHÔNG - 3 ĐỦ"**:

```markdown
### CHECKLIST 60s TỰ REVIEW

[ ] 1. KHÔNG SÓT (No Missing):
    - Đã quét kỹ 2 mép viền ảnh chưa? (Xe bị cắt mép)
    - Đã quét vùng xa chân trời chưa? (Xe nhỏ li ti)
    - Đã quét người đi bộ núp sau thân cây / trụ đèn chưa?

[ ] 2. KHÔNG THỪA (No False Positive):
    - Có vô tình đóng khung hình in quảng cáo trên thùng xe tải không?
    - Có đóng khung bóng đổ trên đường không?
    - Có box rác / box trống vô tình tạo ra khi click nhầm không?

[ ] 3. KHÔNG LỎNG (No Loose Box):
    - Các cạnh của box đã chạm sát điểm ngoài cùng của vật chưa?
    - Gương chiếu hậu đã nằm bên trong chưa?
    - Chân bánh xe có bị hở so với mặt đường không?

[ ] 4. ĐỦ ATTRIBUTES:
    - Các xe bị che khuất đã bật `occluded = true` chưa?
    - Các xe chạm mép viền ảnh đã bật `truncated = true` chưa?

[ ] 5. ĐỦ ĐÚNG TAXONOMY:
    - Có nhầm lẫn giữa Car (xe con) và Truck (xe bán tải/tải thùng) không?
    - Người ngồi trên xe máy đã chọn đúng `rider` chưa (thay vì `pedestrian`)?

[ ] 6. ĐỦ CHUẨN POLYGON / POLYLINE:
    - Polygon mặt đường (`area/drivable`) có bị tự cắt chéo (self-intersect) không?
    - Polyline vạch kẻ đường có đi đúng tim đường và ngắt ở chỗ đứt đoạn không?
```

---

## 5. Khi gặp bế tắc: Nguyên tắc "30 Giây & Escalate"

> [!IMPORTANT]
> **Nguyên tắc 30 Giây:**  
> Nếu bạn nhìn vào một vật thể quá 30 giây mà vẫn phân vân: *"Đây là xe tải hay xe bus?", "Phần mờ này là người hay thùng rác?"*  
> ➔ **DỪNG LẠI NGAY! ĐỪNG NGỒI ĐOÁN MÒ.**

Ngồi đoán mò 5-10 phút chỉ làm bạn kiệt sức và làm sai lệch tập dữ liệu. Hãy thực hiện quy trình sau:

1. **Tra cứu [so-quyet-dinh.md](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/so-quyet-dinh.md)**: Xem tình huống này đã có tiền lệ giải quyết chưa.
2. **Nếu là tình huống hoàn toàn mới:**
   - Tạo ngay một mã lỗi trong [problem-backlog.md](file:///home/dp/Documents/projects/WORKSHOPS/G01-T006-2A202602093-BACKLOGS/problem-backlog.md) theo cú pháp:
     - `P-xxx | UNCERTAIN_CLASS` hoặc `P-xxx | UNCERTAIN_BOUNDARY`.
   - Gắn cờ (flag / issue) ngay trên frame ảnh CVAT để Reviewer và Mentor xử lý.
   - Tiếp tục hoàn thành các phần rõ ràng khác của ảnh hoặc chuyển sang ảnh tiếp theo.

---

## 6. Lời kết: Đỉnh cao của sự chính xác là tính nhất quán (Consistency)

Một annotator giỏi không phải là người vẽ nhanh nhất trong 1 giờ đầu tiên, mà là người có nhãn vẽ ở **ảnh thứ 500 đồng nhất và chuẩn xác như ảnh số 1**. 

Hãy rèn luyện thói quen:
- **Tập trung vào lớp nền trước.**
- **Bao quát từ lớn đến nhỏ.**
- **Cẩn thận từng pixel đường biên.**
- **Luôn tự kiểm trước khi bàn giao.**

Chúc bạn thành công trên hành trình trở thành một Data Annotator chuyên nghiệp hàng đầu!
