# Download all external assets to public/assets/
$ErrorActionPreference = "Continue"
$base = "d:\project\old_and_new\elderstech\public\assets"

function Download($url, $path) {
    if (Test-Path $path) { Write-Host "SKIP (exists): $path"; return }
    Write-Host "Downloading: $url -> $path"
    try {
        Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -TimeoutSec 60
        Write-Host "  OK ($((Get-Item $path).Length) bytes)"
    } catch {
        Write-Host "  FAILED: $_"
    }
}

# ===== HERO =====
Download "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1" "$base\hero\hero-video.mp4"
Download "https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg" "$base\hero\hero-poster.jpg"
Download "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS" "$base\hero\hero-bg.jpg"

# ===== AVATARS (team members) =====
Download "https://husteread.com/storage/files/elderstech/profile/杨佳怡.jpg" "$base\avatars\yangjiayi.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/何佳欢.jpg" "$base\avatars\hejiahuan.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/丁文轩.jpg" "$base\avatars\dingwenxuan.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/赵梓舒.jpg" "$base\avatars\zhaozishu.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/李文龙.jpg" "$base\avatars\liwenlong.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/张星睿.jpg" "$base\avatars\zhangxingrui.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/罗宇然.jpg" "$base\avatars\luoyuran.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/周嘉琦.jpg" "$base\avatars\zhoujiaqi.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/孔德羽.jpg" "$base\avatars\kongdeyu.jpg"
Download "https://husteread.com/storage/files/elderstech/profile/杨静萱.jpg" "$base\avatars\yangjingxuan.jpg"

# Instructors
Download "https://husteread.com/storage/files/elderstech/profile/田.png" "$base\avatars\tian.png"
Download "https://husteread.com/storage/files/elderstech/profile/刘.png" "$base\avatars\liu.png"
Download "https://husteread.com/storage/files/elderstech/profile/王卉.jpg" "$base\avatars\wanghui.jpg"

# ===== TIMELINE (PPT images) =====
Download "https://husteread.com/storage/files/elderstech/PPT/07.png" "$base\timeline\ppt-07.png"
Download "https://husteread.com/storage/files/elderstech/PPT/011.png" "$base\timeline\ppt-011.png"
Download "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1200&q=80" "$base\timeline\map-bg.jpg"

# Timeline carousel images
Download "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop" "$base\timeline\step1-img1.jpg"
Download "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop" "$base\timeline\step1-img2.jpg"
Download "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1661&auto=format&fit=crop" "$base\timeline\step2-img1.jpg"
Download "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1674&auto=format&fit=crop" "$base\timeline\step2-img2.jpg"
Download "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1740&auto=format&fit=crop" "$base\timeline\step3-img.jpg"
Download "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1742&auto=format&fit=crop" "$base\timeline\step4-img.jpg"

# ===== GALLERY (arc images 400w) =====
Download "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-01.jpg"
Download "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-02.jpg"
Download "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-03.jpg"
Download "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-04.jpg"
Download "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-05.jpg"
Download "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-06.jpg"
Download "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-07.jpg"
Download "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-08.jpg"
Download "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-09.jpg"
Download "https://images.unsplash.com/photo-1502303756762-ae2bc5d2c2a1?auto=format&fit=crop&w=400&q=80" "$base\gallery\images\arc-10.jpg"

# Gallery media items (800w images)
Download "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\gallery-01.jpg"
Download "https://images.unsplash.com/photo-1580281657527-47f249e8f0a7?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\gallery-03.jpg"
Download "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\gallery-04.jpg"
Download "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\gallery-06.jpg"

# Gallery videos
Download "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4" "$base\gallery\videos\gallery-02.mp4"
Download "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4" "$base\gallery\videos\gallery-05.mp4"
Download "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4" "$base\gallery\videos\gallery-07.mp4"

# ===== INTERACTIVE SELECTOR (800w) =====
Download "https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\selector-01.jpg"
# selector-02 = gallery-01 (same unsplash photo)
# selector-03 = arc-04 same at 800w
Download "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\selector-03.jpg"
# selector-04 = gallery-03 (same unsplash photo)
Download "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" "$base\gallery\images\selector-05.jpg"

# ===== PARTNERS =====
Download "https://husteread.com/wp-content/uploads/2026/01/华中科技大学.png" "$base\partners\hust-logo.png"
Download "https://ts1.tc.mm.bing.net/th/id/OIP-C.cec2gr3VkKoczOk5EsNcRQHaHM?rs=1&pid=ImgDetMain&o=7&rm=3" "$base\partners\tongji-logo.jpg"

# ===== ICONS =====
Download "https://husteread.com/wp-content/uploads/2026/01/短信.png" "$base\icons\email.png"
Download "https://husteread.com/wp-content/uploads/2026/01/QQ.png" "$base\icons\qq.png"

# ===== ABOUT =====
Download "http://husteread.com/storage/files/elderstech/team.capture.example/cooperation.png" "$base\about\cooperation.png"

# ===== SITE LOGO =====
Download "http://husteread.com/wp-content/uploads/2025/11/cropped-jimeng-2025-11-26-2200-将图片调整为512x512像素.png" "$base\icons\site-logo.png"

Write-Host ""
Write-Host "===== Download complete ====="
Write-Host "Total files:"
Get-ChildItem -Recurse -File "$base" | Measure-Object | Select-Object -ExpandProperty Count
