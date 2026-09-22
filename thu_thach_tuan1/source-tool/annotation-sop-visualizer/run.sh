#!/usr/bin/env bash

# Khởi chạy Annotation SOP Visualizer trên cổng 9002
PORT=9002
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "========================================================"
echo "  Khởi chạy Annotation SOP & Quality Visualizer"
echo "  Cổng mạng: http://localhost:$PORT"
echo "========================================================"

cd "$DIR"

# Mở trình duyệt nếu có hỗ trợ
if which xdg-open > /dev/null; then
  xdg-open "http://localhost:$PORT" &
fi

python3 -m http.server $PORT
