#!/usr/bin/env bash
# Khởi chạy Problem Backlog Hub trên cổng 9001
PORT=9001
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "--------------------------------------------------------"
echo " Khởi chạy Problem Backlog Hub tại: http://localhost:$PORT"
echo " Thư mục: $DIR"
echo " Nhấn Ctrl+C để dừng server."
echo "--------------------------------------------------------"

cd "$DIR"
python3 -m http.server "$PORT"

