import os
import re

def walk(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith("page.js"):
                yield os.path.join(root, file)

target_dir = r"c:\Users\Tristan\Dropbox\My PC (LAPTOP-GJ0R1U3J)\Downloads\Sports Data\frontend\src\app\[sport]"

for file_path in walk(target_dir):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "fetch(" in content:
        continue
        
    original = content
    
    # We want to replace the whole useEffect body
    pattern = re.compile(r"useEffect\(\(\) => \{\s*setLoading\(true\);\s*const timer = setTimeout\(\(\) => \{(.*?set[A-Za-z]+\(([\s\S]*?)\);.*?)\}?,\s*1000\);.*?(return \(\) => clearTimeout\(timer\);|)\s*\}, \[(.*?)\]\);", re.DOTALL | re.MULTILINE)
    
    def repl(m):
        full_set_data_block = m.group(1)
        mock_data = m.group(2)
        deps = m.group(4)
        
        endpoint = "'/dashboard'"
        if "predictions" in file_path: endpoint = "'/predictions'"
        elif "rankings" in file_path: endpoint = "'/rankings'"
        elif "recruiting" in file_path: endpoint = "'/recruiting'"
        
        # Determine the setter name (setPredictions, setRankings, etc.)
        setter_match = re.search(r"(set[A-Za-z]+)\(", full_set_data_block)
        setter = setter_match.group(1) if setter_match else "setData"
        
        return f"""useEffect(() => {{
    setLoading(true);
    fetch('/api/v1/' + params.sport.toLowerCase() + {endpoint})
      .then(res => res.json())
      .then(apiData => {{
        if (!apiData || Object.keys(apiData).length === 0 || apiData.detail || (Array.isArray(apiData) && apiData.length === 0) || (apiData.predictions && apiData.predictions.length === 0)) {{
          {setter}({mock_data});
        }} else {{
          {setter}(apiData.data || apiData.predictions || apiData.rankings || apiData.recruiting || apiData);
        }}
        setLoading(false);
      }})
      .catch(err => {{
        console.error(err);
        {setter}({mock_data});
        setLoading(false);
      }});
  }}, [{deps}]);"""
        
    content = pattern.sub(repl, content)
    
    if content != original:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Migrated to fetch: {file_path}")
