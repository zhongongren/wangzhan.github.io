import re

files = [
    "lipstick-virtual-tryon-detail.html",
    "glasses-virtual-tryon-detail.html",
    "glasses-virtual-tryon-case1-detail.html",
    "swimming-goggles-tryon-detail.html",
    "swimming-goggles-virtual-tryon-detail.html"
]

for filename in files:
    print(f"Processing {filename}...")
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove ?token= parameter and everything after it until the quote
        content = re.sub(r'\?token=[^"]*', '', content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ Completed!")
    except Exception as e:
        print(f"  ❌ Error: {e}")

print("\n✅ All files processed!")
