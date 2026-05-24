import os
import re

def walk(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".js") and "page.js" in file:
                yield os.path.join(root, file)

target_dir = r"c:\Users\Tristan\Dropbox\My PC (LAPTOP-GJ0R1U3J)\Downloads\Sports Data\frontend\src\app\[sport]"

for file_path in walk(target_dir):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    
    # Regex to capture the useEffect containing setTimeout
    pattern = re.compile(r"useEffect\(\(\) => \{\s*.*?const timer = setTimeout\(\(\) => \{(.*?setData\(([\s\S]*?)\);.*?)\}?,\s*1000\);.*?(return \(\) => clearTimeout\(timer\);|)\s*\}, \[(.*?)\]\);", re.DOTALL | re.MULTILINE)
    
    def repl(m):
        full_set_data_block = m.group(1)
        mock_data = m.group(2)
        deps = m.group(4)
        
        endpoint = "'/dashboard'"
        if "standings" in file_path: endpoint = "'/standings?year=' + year"
        elif "schedule" in file_path: endpoint = "'/schedule?year=' + year"
        elif "teams" in file_path: endpoint = "'/teams'"
        elif "predictions" in file_path: endpoint = "'/predictions'"
        elif "trends" in file_path: endpoint = "'/trends'"
        elif "rankings" in file_path: endpoint = "'/rankings'"
        elif "recruiting" in file_path: endpoint = "'/recruiting'"
        
        return f"""useEffect(() => {{
    setLoading(true);
    fetch('/api/v1/' + params.sport.toLowerCase() + {endpoint})
      .then(res => res.json())
      .then(apiData => {{
        if (!apiData || Object.keys(apiData).length === 0 || apiData.detail) {{
          setData({mock_data});
        }} else {{
          setData(apiData);
        }}
        setLoading(false);
      }})
      .catch(err => {{
        console.error(err);
        setData({mock_data});
        setLoading(false);
      }});
  }}, [{deps}]);"""
        
    content = pattern.sub(repl, content)
    
    if content != original:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Migrated to fetch: {file_path}")
