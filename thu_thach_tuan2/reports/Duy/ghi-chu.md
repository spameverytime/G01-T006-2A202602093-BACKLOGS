#Check list for Face Landmark: với mỗi ảnh bạn đảm bảo các việc sau đã xong:
- Trạng thái điểm:
    - Đã thiết lập trạng thái cho từng điểm point theo đúng $4.1, $4.1
- Lông mày:
    - Đã gán tất cả các nhãn theo guideline
    - Đã đặt điểm lên mép lông, không đặt vào giữa đám lông và không đặt lên da trán.
    - Các point ID của lông mày theo thứ tự tăng dần
    - Point ngoài sense đã Outside

- Sống mũi:
    - Điểm 13 của nằm ở khoảng 72% quãng đường từ điểm 10 xuống đường nối hai cánh mũi, tức phía trên lỗ mũi và chưa chạm chóp mũi.

- Mắt:
    - Điểm đầu tiên của Mắt trái có ID=14
    - Điểm đầu chuỗi, 14 hoặc 22, có toạ độ x nhỏ nhất trong 8 điểm.
    - Điểm khoé còn lại, 18 hoặc 26, có toạ độ x lớn nhất.
    - Mỗi điểm mí trên cao hơn hoặc bằng điểm mí dưới đối diện: 15 với 21, 16 với 20, 17 với 19, và 23 với 29, 24 với 28, 25 với 27.
    - Contour không có đường bắt chéo tạo thành hình chữ X.
- Môi:
    - Điểm 33 và 39 gần chính giữa miệng nhất
    - moitrong luôn nằm hoàn toàn bên trong moingoai

- Đeo kính:
    - Điểm sau kính đã Occluded

- Skeleton:
    - Cả skeleton Outside


5. Quy trình
5.1. Phần A — 50 ảnh có pre-label
1.Mở đúng task được phân công, đối chiếu mã nhóm. Ảnh và điểm gợi ý đã có sẵn.
2.Chạy kiểm tra ở mục 5.2 trên 5 ảnh đầu. Nếu có mục nào không đạt thì dừng và báo mentor, chưa sửa hàng loạt.
3.Sửa từng ảnh theo thứ tự ở mục 5.5.
4.Tự kiểm tra theo mục 7 rồi nộp.
5.2. Kiểm tra 5 ảnh đầu trước khi làm hàng loạt
Mở 5 ảnh đầu của task và soát:
•Có đủ 7 skeleton trên mỗi frame.
•Không có label Face, đúng như thiết kế.
•Hai mắt tạo thành vòng kín, không có đường bắt chéo.
•mattrai nằm ở nửa trái khung hình.
•Toạ độ x của các điểm 0 đến 9 tăng dần.
•moitrong nằm trong moingoai.
•Không có điểm nào rơi ra ngoài khuôn mặt.

7. Tự kiểm tra trước khi nộp
7.1. Từng frame
•Đủ 7 skeleton và 50 điểm.
•mattrai và longmaytrai ở nửa trái khung hình.
•Toạ độ x của các điểm 0 đến 9 tăng dần khi mặt gần chính diện.
•Hai mắt là vòng kín, không bắt chéo.
•Mí trên cao hơn hoặc bằng mí dưới ở cả ba cặp đối diện của mỗi mắt.
•Điểm 13 nằm trên lỗ mũi, chưa chạm chóp mũi.
•Ba đoạn của songmui chia gần đều.
•moitrong nằm trong moingoai.
•Không có điểm nào nằm trên gọng kính, tóc hoặc nền phía sau.
•Mọi điểm đã có trạng thái.
•Điểm Occluded có toạ độ ước lượng hợp lý, không giữ nguyên vị trí sai của pre-label.
7.2. Cả job
•Đã làm đủ 70 ảnh.
•Đã đối chiếu schema ở phần B: đúng 7 label, 50 sublabel, tên trùng khít với phần A.
•Đã rà lại ít nhất 10 frame, trong đó có 1 frame nghiêng mạnh, 1 frame miệng mở, 1 frame nheo mắt, 1 frame kính loá.
•Đã lướt toàn bộ job theo thứ tự frame để phát hiện điểm nhảy bất thường.
•Mọi trường hợp không chắc đã mở Issue thay vì tự đặt luật mới.

9. Lỗi thường gặp
Lỗi	Nguyên nhân	Xử lý
Đi tìm label Face không thấy	Tài liệu cũ mô tả sai	Schema không có Face, xem mục 1.1
Đảo trái phải toàn bộ job	Dùng convention giải phẫu hoặc đổi convention khi mặt nghiêng	Giữ Left/Right theo khung hình/khuôn mặt trên ảnh, xem mục 2.1
Mắt thành hình chữ X	Sai thứ tự nối điểm	Kiểm tra thứ tự 14→21 và 22→29
Đặt điểm 13 ở chóp mũi	Không có định nghĩa trong tài liệu cũ	Điểm 13 là chân sống mũi, xem mục 3.2
Xoá moitrong khi miệng đóng	Tưởng là lỗi	Miệng đóng chiếm 80% số ảnh, xem mục 6.4
Đặt điểm lên gọng kính	Gọng dễ nhìn hơn bờ mi	Luôn đặt lên bờ mi thật rồi đánh Occluded, xem mục 6.5
Quên đặt trạng thái	Pre-label đã gán visible sẵn nên trông như đã xong	Phải đặt mới toàn bộ, xem mục 1.1
Reset point ID theo từng skeleton	Hiểu nhầm về skeleton	ID toàn cục 0–49, xem mục 2.2
Tự nạp annotation rồi mất hết công	Upload ghi đè dữ liệu trên task	Không dùng upload annotation, xem mục 1.2
Copy nhãn giữa các frame liên tiếp	Ảnh gần giống nhau	Xem mục 6.9
Schema phần B đặt sublabel là 0–7 cho mỗi skeleton	Reset ID theo từng skeleton	Dùng point ID toàn cục, xem mục 5.3
Hai người cùng sửa Labels, schema bị ghi đè	Không phân công ai dựng	Một người dựng, cả nhóm kiểm tra, xem mục 5.3
Chia đôi toàn bộ frame để xác định trái/phải	Khuôn mặt có thể lệch khỏi tâm ảnh	Xác định trái/phải theo bố cục của khuôn mặt trên ảnh, không theo tâm frame

#Check list for Human Pose
- Chỉ gán nhãn người lái.
- Không tự nạp annotation lên task
- xác định trái/phải theo KHUNG HÌNH
- Vùng đầu:
    - Chóp mũi. Mặt nghiêng vẫn là chóp mũi, không dời về giữa mặt.
    - Tâm đồng tử của mắt nằm phía đúng trong guideline $3.1
    - Ống tai nằm đúng phía trong guidline $3.1
    - Khi tóc phủ kín tai tôi đã Occluded hoặc Outside
    - 

- Chi trên:
    - Tâm khớp vai đặt đúng vị trí guideline $3.2
    - Tâm khớp khuỷu tay nằm đúng vị trí guideline $3.2
    - Tâm khớp cổ tay nằm đúng vị trí guideline $3.2
    - Tay đặt trên vô-lăng: Cổ tay vẫn đặt ở nếp gấp cổ tay
    - 

- Chi dưới:
    - Tâm khớp háng nằm phía PHẢI/TRÁI khung hình, không phải mép ngoài hông hay cạp quần.
    - Tâm khớp gối nằm phía PHẢI/TRÁI khung hình, giữa xương bánh chè.
    - Tâm khớp cổ chân nằm phía PHẢI/TRÁI khung hình, ngang mắt cá.
    - chi dưới bị che:
        - Thấy đường đùi hoặc cẳng chân qua quần	Occluded, ước lượng theo trục chi
        - Chỉ thấy hông, chi dưới khuất hẳn	Outside
        - Chi dưới bị khung hình cắt	Outside 
    - Không đặt điểm lên ghế, cần số hay sàn xe chỉ vì cần chỗ để đặt. Không ước lượng vị trí gối và cổ chân chỉ dựa vào tỉ lệ cơ thể khi không thấy bất cứ phần nào của chi.
- Hai khớp khác nhau không thể trùng toạ độ khi cả hai đều Visible. Tách ra đúng vị trí, hoặc đánh lại trạng thái cho điểm không thực sự nhìn thấy.
- Kiểm tra từng điểm gối và cổ chân xem có nằm trên cơ thể người không. 
- Ảnh bị xoay 90° không làm thay đổi quy ước Left/Right: trái ảnh vẫn là L, phải ảnh vẫn là R. Chỉ hướng đầu–chân của cơ thể bị xoay; không xoay lại quy ước trái/phải theo cơ thể.
- Khi người lái vặn mình hoặc quay lưng, KHÔNG đảo quy ước trái/phải theo giải phẫu. Điểm nào nằm phía phải khung hình vẫn thuộc nhóm R; điểm nào nằm phía trái khung hình vẫn thuộc nhóm L.
- Người thứ hai trong khung Mặc định chỉ gán nhãn người lái.
- Nếu tối đến mức không phân biệt được người với ghế, mở Issue.
- 

Quy trình:
5.1. Phần A — 40 ảnh có pre-label
1.Mở đúng task được phân công, đối chiếu mã nhóm. Ảnh và điểm gợi ý đã có sẵn.
2.Chạy kiểm tra ở mục 5.2 trên 5 ảnh đầu. Nếu có mục nào không đạt thì dừng và báo mentor.
3.Sửa từng ảnh theo thứ tự ở mục 5.5.
4.Tự kiểm tra theo mục 7 rồi nộp.
5.2. Kiểm tra 5 ảnh đầu trước khi làm hàng loạt
•Có skeleton person với đủ 17 sublabel, được đánh số 1 đến 17.
•Số skeleton khớp số người cần gán, mặc định là một người lái.
•Không có skeleton nào lệch toàn bộ so với người trong ảnh.
•Đã nhận ra chùm điểm ở góc trên-trái.
•Trái/phải chưa bị đảo: R ở phía phải khung hình, L ở phía trái khung hình.

5.5. Thứ tự đặt điểm trong một ảnh
Dùng chung cho cả phần A và phần B:
1.Kiểm tra trái/phải theo khung hình: R ở bên phải ảnh, L ở bên trái ảnh.
2.Chỉ ở phần A: xử lý các điểm ở góc (0, 0), quyết định từng điểm theo mục 4.1. Đây là phần nặng nhất nên làm sớm.
3.Đặt thân mình: hai vai và hai hông. Bốn điểm này định khung cho phần còn lại.
4.Đặt chi trên: khuỷu và cổ tay.
5.Đặt vùng đầu: mũi, mắt, tai.
6.Đặt chi dưới, làm cuối cùng khi đã có khung thân.
7.Đặt trạng thái cho cả 17 điểm.
8.Lưu trước khi sang ảnh tiếp theo.

7. Tự kiểm tra trước khi nộp
7.1. Từng frame
•Đúng một skeleton cho người lái, trừ khi mentor yêu cầu khác.
•Đủ 17 keypoint, mỗi điểm có trạng thái rõ ràng.
•Không còn điểm nào ở góc (0, 0) hoặc sát góc trên-trái.
•Trái/phải đúng theo khung hình VinFast: R ở bên phải ảnh, L ở bên trái ảnh.
•Mỗi cánh tay và mỗi chân tạo thành chuỗi liền mạch, không bắt chéo sang bên kia thân.
•Không có hai điểm khác nhau trùng toạ độ khi cả hai đều Visible.
•Không có điểm nào nằm trên ghế, vô-lăng, cần số hay bảng táp-lô.
•Điểm Occluded có toạ độ ước lượng hợp lý.
•Điểm Outside đúng là ngoài khung hoặc không suy ra được.
7.2. Cả job
•Đã làm đủ 60 ảnh.
•Đã đối chiếu schema ở phần B: đúng 1 label và 17 sublabel, tên trùng khít với phần A.
•Đã rà lại ít nhất 10 frame, trong đó có 1 frame chi dưới khuất, 1 frame người vặn mình, 1 frame thiếu sáng, 1 frame pre-label có nhiều điểm ở (0, 0).
•Mọi trường hợp không chắc đã mở Issue thay vì tự đặt luật mới.

Lỗi thường gặp
Lỗi	Nguyên nhân	Xử lý
Đảo trái phải toàn bộ job	Dùng quy ước giải phẫu/COCO thay vì quy ước VF theo khung hình	R phải ở bên phải ảnh, L ở bên trái ảnh; xem mục 2.1
Kéo điểm (0, 0) cho gần đúng	Tưởng toạ độ có ý nghĩa	Toạ độ không mang thông tin, quyết định lại từ đầu, xem mục 6.1
Đặt gối hoặc cổ chân lên ghế, cần số	Cần chỗ để đặt điểm	Không thấy thì Outside, xem mục 6.3
Đặt cổ tay lên vành vô-lăng	Vô-lăng dễ nhìn hơn cổ tay	Cổ tay ở nếp gấp cổ tay, xem mục 3.2
Đặt hông ở cạp quần	Nhầm mốc giải phẫu	Hông là tâm khớp háng, xem mục 3.3
Đặt tai ở chóp vành tai	Nhầm mốc giải phẫu	Tai là ống tai, xem mục 3.1
Nhầm trên dưới của cơ thể	Khung hình xoay 90°	Xác định đầu–chân theo trục cơ thể, nhưng Left/Right vẫn theo khung hình; xem mục 6.5
Dùng Hidden thay Outside	Nhầm chức năng CVAT	Hidden chỉ ẩn hiển thị, xem mục 4
Gán nhãn cả hành khách	Không có luật	Chỉ gán người lái, xem mục 6.7
Sửa tay 40 ảnh bị lệch hệ thống	Không nhận ra lỗi hệ thống	Báo mentor, xem mục 6.9
Schema phần B đặt node R/L sai phía khung vẽ	Dùng thói quen giải phẫu hoặc COCO	R ở nửa phải, L ở nửa trái khung vẽ; xem mục 5.3
Hai người cùng sửa Labels, schema bị ghi đè	Không phân công ai dựng	Một người dựng, cả nhóm kiểm tra, xem mục 5.3

