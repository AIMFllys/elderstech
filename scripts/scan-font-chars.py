"""
Scan all .ts/.tsx/.css files in the project for Chinese characters
and any ASCII characters used in text content.
Output a deduplicated text file of all unique characters.
"""
import os
import re
import sys

ROOT = r"d:\project\old_and_new\elderstech"
SCAN_DIRS = ["app", "components", "lib"]
EXTENSIONS = {".ts", ".tsx", ".css"}

chars = set()

# Add common punctuation and ASCII that might render in ZCOOL XiaoWei
ascii_chars = set("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
punctuation = set("，。！？、：；""''（）《》【】—…·｜～￥%+ -/")
chars.update(ascii_chars)
chars.update(punctuation)

for scan_dir in SCAN_DIRS:
    full_dir = os.path.join(ROOT, scan_dir)
    for dirpath, _, filenames in os.walk(full_dir):
        for fname in filenames:
            ext = os.path.splitext(fname)[1]
            if ext not in EXTENSIONS:
                continue
            fpath = os.path.join(dirpath, fname)
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                # Extract all CJK Unified Ideographs
                cjk = re.findall(r'[\u4e00-\u9fff\u3400-\u4dbf]', content)
                chars.update(cjk)
                # Also grab CJK punctuation
                cjk_punct = re.findall(r'[\u3000-\u303f\uff00-\uffef]', content)
                chars.update(cjk_punct)
            except Exception as e:
                print(f"SKIP {fpath}: {e}", file=sys.stderr)

# Sort and write
sorted_chars = sorted(chars)
out_path = os.path.join(ROOT, "scripts", "font-chars.txt")
with open(out_path, "w", encoding="utf-8") as f:
    f.write("".join(sorted_chars))

print(f"Unique characters: {len(sorted_chars)}")
print(f"Written to: {out_path}")
# Print a sample
print(f"Sample: {''.join(sorted_chars[:80])}")
