@echo off
chcp 65001
echo 图片批量下载脚本

:: 创建目录结构
if not exist "images\xuanxing" mkdir images\xuanxing
if not exist "images\guyongzhe" mkdir images\guyongzhe
if not exist "images\yunxi" mkdir images\yunxi
if not exist "images\scenes" mkdir images\scenes

echo 开始下载图片...

:: 下载玄星系列
echo 正在下载玄星系列...
curl -L "https://www.genspark.ai/api/files/s/tpxnZlqH" -o "images/xuanxing/玄星_01.jpg"
curl -L "https://www.genspark.ai/api/files/s/5UY40T7A" -o "images/xuanxing/玄星_02.jpg"
curl -L "https://www.genspark.ai/api/files/s/cPgh7BvJ" -o "images/xuanxing/玄星_03.jpg"
curl -L "https://www.genspark.ai/api/files/s/fucvR9Ft" -o "images/xuanxing/玄星_04.jpg"
curl -L "https://www.genspark.ai/api/files/s/JSis8r9S" -o "images/xuanxing/玄星_05.jpg"
curl -L "https://www.genspark.ai/api/files/s/uzngkqNA" -o "images/xuanxing/玄星_06.jpg"
curl -L "https://www.genspark.ai/api/files/s/UJyloOvg" -o "images/xuanxing/玄星_07.jpg"
curl -L "https://www.genspark.ai/api/files/s/jfgdXlCg" -o "images/xuanxing/玄星_08.jpg"
curl -L "https://www.genspark.ai/api/files/s/k82pkJFv" -o "images/xuanxing/玄星_09.jpg"
curl -L "https://www.genspark.ai/api/files/s/hmMv6ZCM" -o "images/xuanxing/玄星_10.jpg"
curl -L "https://www.genspark.ai/api/files/s/dqXfMHDA" -o "images/xuanxing/玄星_11.jpg"
curl -L "https://www.genspark.ai/api/files/s/Md8QMbDM" -o "images/xuanxing/玄星_12.jpg"
curl -L "https://www.genspark.ai/api/files/s/svYtB0VE" -o "images/xuanxing/玄星_13.jpg"
curl -L "https://www.genspark.ai/api/files/s/Dk5negtd" -o "images/xuanxing/玄星_14.jpg"
curl -L "https://www.genspark.ai/api/files/s/MPnWpYuz" -o "images/xuanxing/玄星_15.jpg"
curl -L "https://www.genspark.ai/api/files/s/9MiKHlUa" -o "images/xuanxing/玄星_16.jpg"

:: 下载孤勇者系列
echo 正在下载孤勇者系列...
curl -L "https://www.genspark.ai/api/files/s/qXs4Yl82" -o "images/guyongzhe/孤勇者_01.jpg"
curl -L "https://www.genspark.ai/api/files/s/XrFykQcN" -o "images/guyongzhe/孤勇者_02.jpg"
curl -L "https://www.genspark.ai/api/files/s/Lc1G6XyV" -o "images/guyongzhe/孤勇者_03.jpg"
curl -L "https://www.genspark.ai/api/files/s/xQFofRKK" -o "images/guyongzhe/孤勇者_04.jpg"
curl -L "https://www.genspark.ai/api/files/s/ptLs4MdR" -o "images/guyongzhe/孤勇者_05.jpg"
curl -L "https://www.genspark.ai/api/files/s/Vm1owqE8" -o "images/guyongzhe/孤勇者_06.jpg"
curl -L "https://www.genspark.ai/api/files/s/SGahPx7I" -o "images/guyongzhe/孤勇者_07.jpg"
curl -L "https://www.genspark.ai/api/files/s/xuT6qbE5" -o "images/guyongzhe/孤勇者_08.jpg"
curl -L "https://www.genspark.ai/api/files/s/psbgrrZF" -o "images/guyongzhe/孤勇者_09.jpg"
curl -L "https://www.genspark.ai/api/files/s/Si1mgdwl" -o "images/guyongzhe/孤勇者_10.jpg"
curl -L "https://www.genspark.ai/api/files/s/1lD9wKjB" -o "images/guyongzhe/孤勇者_11.jpg"

:: 下载云犀系列
echo 正在下载云犀系列...
curl -L "https://www.genspark.ai/api/files/s/O3EaEdVi" -o "images/yunxi/品宣.jpg"
curl -L "https://www.genspark.ai/api/files/s/ElS7tzmS" -o "images/yunxi/详情页第三版-内容.jpg"
curl -L "https://www.genspark.ai/api/files/s/iDxEklkO" -o "images/yunxi/详情页.jpg"

echo.
echo 下载完成！共30张图片
echo 文件保存在 images\ 目录下
pause
