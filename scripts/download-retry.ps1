[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$base = "d:\project\old_and_new\elderstech\public\assets"

function DL($url, $rel) {
    $p = Join-Path $base $rel
    if (Test-Path $p) { Write-Host "SKIP: $rel"; return }
    Write-Host "DL: $url -> $rel"
    try {
        Invoke-WebRequest -Uri $url -OutFile $p -UseBasicParsing -TimeoutSec 60
        Write-Host "  OK ($((Get-Item $p).Length) bytes)"
    }
    catch {
        Write-Host "  FAIL: $_"
    }
}

# Team avatars (URL-encoded Chinese filenames)
DL "https://husteread.com/storage/files/elderstech/profile/%E6%9D%A8%E4%BD%B3%E6%80%A1.jpg" "avatars\yangjiayi.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E4%BD%95%E4%BD%B3%E6%AC%A2.jpg" "avatars\hejiahuan.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E4%B8%81%E6%96%87%E8%BD%A9.jpg" "avatars\dingwenxuan.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E8%B5%B5%E6%A2%93%E8%88%92.jpg" "avatars\zhaozishu.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E6%9D%8E%E6%96%87%E9%BE%99.jpg" "avatars\liwenlong.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E5%BC%A0%E6%98%9F%E7%9D%BF.jpg" "avatars\zhangxingrui.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E7%BD%97%E5%AE%87%E7%84%B6.jpg" "avatars\luoyuran.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E5%91%A8%E5%98%89%E7%90%A6.jpg" "avatars\zhoujiaqi.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E5%AD%94%E5%BE%B7%E7%BE%BD.jpg" "avatars\kongdeyu.jpg"
DL "https://husteread.com/storage/files/elderstech/profile/%E6%9D%A8%E9%9D%99%E8%90%B1.jpg" "avatars\yangjingxuan.jpg"

# Instructors
DL "https://husteread.com/storage/files/elderstech/profile/%E7%94%B0.png" "avatars\tian.png"
DL "https://husteread.com/storage/files/elderstech/profile/%E5%88%98.png" "avatars\liu.png"
DL "https://husteread.com/storage/files/elderstech/profile/%E7%8E%8B%E5%8D%89.jpg" "avatars\wanghui.jpg"

# Partner logos
DL "https://husteread.com/wp-content/uploads/2026/01/%E5%8D%8E%E4%B8%AD%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6.png" "partners\hust-logo.png"

# Icons
DL "https://husteread.com/wp-content/uploads/2026/01/%E7%9F%AD%E4%BF%A1.png" "icons\email.png"

# Site logo
DL "http://husteread.com/wp-content/uploads/2025/11/cropped-jimeng-2025-11-26-2200-%E5%B0%86%E5%9B%BE%E7%89%87%E8%B0%83%E6%95%B4%E4%B8%BA512x512%E5%83%8F%E7%B4%A0.png" "icons\site-logo.png"

# Pexels poster (alternate URL)
DL "https://images.pexels.com/videos/5752729/pexels-photo-5752729.jpeg?auto=compress&cs=tinysrgb&w=1280" "hero\hero-poster.jpg"

# Gallery missing images
DL "https://images.unsplash.com/photo-1580281657527-47f249e8f0a7?auto=format&fit=crop&w=800&q=80" "gallery\images\gallery-03.jpg"
DL "https://images.unsplash.com/photo-1502303756762-ae2bc5d2c2a1?auto=format&fit=crop&w=400&q=80" "gallery\images\arc-10.jpg"

Write-Host "`n===== Retry complete ====="
Get-ChildItem -Recurse -File $base | Measure-Object | Select-Object -ExpandProperty Count
