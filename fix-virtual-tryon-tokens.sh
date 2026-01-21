#!/bin/bash

# 批量移除虚拟试穿页面的token参数

files=(
    "lipstick-virtual-tryon-detail.html"
    "glasses-virtual-tryon-detail.html"
    "glasses-virtual-tryon-case1-detail.html"
    "swimming-goggles-tryon-detail.html"
    "swimming-goggles-virtual-tryon-detail.html"
)

for file in "${files[@]}"; do
    echo "Processing $file..."
    sed -i 's/\?token=[^"]*//g' "$file"
done

echo "✅ All token parameters removed!"
