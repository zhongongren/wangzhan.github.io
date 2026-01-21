#!/bin/bash
# 批量移除所有详情页中的token参数

# 需要修复的文件列表
files=(
  "hongyan-switch-detail.html"
  "black-gold-rack-detail.html"
  "hongyan-e9-detail.html"
  "mengbao-thermos-detail.html"
  "daily-cup-detail.html"
  "yunxi-live-detail.html"
  "yunxi-618-detail.html"
  "yunxi-jd-detail.html"
  "henglin-chair-animation-detail.html"
  "yunxi-zhitong-pro-detail.html"
  "clothing-virtual-tryon-detail.html"
  "socks-virtual-tryon-detail.html"
  "glasses-virtual-tryon-detail.html"
  "swimming-goggles-tryon-detail.html"
  "lipstick-virtual-tryon-detail.html"
  "digital-product-rendering-detail.html"
  "glasses-virtual-tryon-case1-detail.html"
  "swimming-goggles-virtual-tryon-detail.html"
  "black-gold-dryer-detail.html"
  "ergonomic-chair-detail.html"
)

# 正则表达式：匹配 ?token=后面的所有字符直到引号
# 替换为空字符串
for file in "${files[@]}"; do
  echo "Processing: $file"
  sed -i 's/?token=[^"]*//g' "$file"
done

echo "All files processed!"
