#!/bin/bash

# 批量移除所有HTML文件中的token参数

files=(
  "glasses-virtual-tryon-case1-detail.html"
  "swimming-goggles-virtual-tryon-detail.html"
  "swimming-goggles-tryon-detail.html"
  "glasses-virtual-tryon-detail.html"
  "lipstick-virtual-tryon-detail.html"
)

for file in "${files[@]}"; do
  echo "Processing $file..."
  sed -i 's/\?token=[^"]*//g' "$file"
  echo "✓ Completed $file"
done

echo ""
echo "所有图片token参数已移除!"
echo "总计处理 ${#files[@]} 个文件"
