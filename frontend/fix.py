import os
import re

def walk(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".js"):
                yield os.path.join(root, file)

target_dir = r"c:\Users\Tristan\Dropbox\My PC (LAPTOP-GJ0R1U3J)\Downloads\Sports Data\frontend\src\app\[sport]"

for file_path in walk(target_dir):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    
    # Check if we already fixed it
    if "use(params)" in content:
        continue
        
    # Match export default function Name({ params }) { ... }
    # Using regex
    pattern = re.compile(r"(export default function \w+\(\{\s*params(?:,\s*children)?\s*\}\) \{)")
    
    def repl(m):
        return f"import {{ use }} from 'react';\n{m.group(1)}\n  params = use(params);"
        
    content = pattern.sub(repl, content)
    
    # layout.js uses { children, params }
    pattern2 = re.compile(r"(export default function \w+\(\{\s*children(?:,\s*params)?\s*\}\) \{)")
    content = pattern2.sub(repl, content)

    if content != original:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed: {file_path}")
