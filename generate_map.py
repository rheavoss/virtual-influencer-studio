import os
import json
from pathlib import Path

# Target directory
ROOT_DIR = "/Users/user/Desktop/Instagram"
OUTPUT_FILE = "/Users/user/Desktop/Instagram/project_map.html"

# Directories to ignore
IGNORE_DIRS = {".git", "node_modules", ".next", "venv", "__pycache__", ".vercel", "graphify-out", ".bun", ".gbrain"}

def get_node_type(filename):
    ext = Path(filename).suffix.lower()
    if ext in ['.md', '.txt', '.pdf']:
        return "document"
    elif ext in ['.png', '.jpg', '.jpeg', '.mp4', '.gif']:
        return "media"
    elif ext in ['.js', '.py', '.ts', '.jsx', '.tsx', '.css', '.html', '.json']:
        return "code"
    return "other"

def build_tree(dir_path, name="Jasmine Project"):
    node = {"name": name, "type": "folder", "children": []}
    
    try:
        entries = sorted(os.scandir(dir_path), key=lambda e: (not e.is_dir(), e.name))
        for entry in entries:
            if entry.name.startswith('.') and entry.name not in ['.env']:
                continue
            if entry.is_dir() and entry.name in IGNORE_DIRS:
                continue
                
            if entry.is_dir():
                child_node = build_tree(entry.path, entry.name)
                if child_node["children"]:  # Only add non-empty folders
                    node["children"].append(child_node)
            else:
                node["children"].append({
                    "name": entry.name,
                    "type": get_node_type(entry.name),
                    "path": entry.path.replace(ROOT_DIR, "")
                })
    except PermissionError:
        pass
        
    return node

print("Scanning directory...")
tree_data = build_tree(ROOT_DIR)

html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jasmine Project - Bird's-Eye View</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        :root {{
            --bg: #0f111a;
            --text: #e2e8f0;
            --folder: #475569;
            --document: #3b82f6; 
            --media: #ec4899;
            --code: #10b981;
            --other: #64748b;
            --line: #334155;
        }}
        body {{
            margin: 0;
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', system-ui, sans-serif;
            overflow: hidden;
        }}
        #legend {{
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(15, 17, 26, 0.8);
            backdrop-filter: blur(10px);
            padding: 15px 20px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.1);
        }}
        .legend-item {{ display: flex; align-items: center; margin-bottom: 8px; font-size: 13px; }}
        .legend-color {{ width: 12px; height: 12px; border-radius: 50%; margin-right: 10px; }}
        svg {{ width: 100vw; height: 100vh; }}
        .node circle {{ cursor: pointer; stroke: var(--bg); stroke-width: 2px; }}
        .node text {{ font-size: 12px; fill: var(--text); pointer-events: none; }}
        .link {{ fill: none; stroke: var(--line); stroke-width: 1.5px; opacity: 0.6; }}
    </style>
</head>
<body>
    <div id="legend">
        <h3 style="margin-top:0; margin-bottom:10px; font-size:14px; font-weight:600; color:white;">Holistic Map</h3>
        <div class="legend-item"><div class="legend-color" style="background:var(--document)"></div>Strategy & Docs</div>
        <div class="legend-item"><div class="legend-color" style="background:var(--media)"></div>Images & Video</div>
        <div class="legend-item"><div class="legend-color" style="background:var(--code)"></div>Code & Config</div>
        <div class="legend-item"><div class="legend-color" style="background:var(--folder)"></div>Folders</div>
    </div>
    <svg id="map"></svg>

    <script>
        const treeData = {json.dumps(tree_data)};
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const svg = d3.select("svg")
            .call(d3.zoom().scaleExtent([0.1, 3]).on("zoom", (e) => g.attr("transform", e.transform)))
            .append("g")
            .attr("transform", "translate(100, " + height/2 + ")");
            
        const g = d3.select("g");
        
        const tree = d3.tree().nodeSize([25, 200]);
        const root = d3.hierarchy(treeData);
        
        // Collapse all to start clean
        root.descendants().forEach(d => {{
            if (d.depth > 1) d._children = d.children;
            if (d.depth > 1) d.children = null;
        }});

        let i = 0;

        function update(source) {{
            tree(root);
            
            const nodes = root.descendants();
            const links = root.links();
            
            // Nodes
            const node = g.selectAll(".node")
                .data(nodes, d => d.id || (d.id = ++i));
                
            const nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${{source.y0 || source.y}},${{source.x0 || source.x}})`)
                .on("click", (event, d) => {{
                    if (d.children) {{ d._children = d.children; d.children = null; }} 
                    else {{ d.children = d._children; d._children = null; }}
                    update(d);
                }});

            nodeEnter.append("circle")
                .attr("r", d => d.data.type === 'folder' ? 6 : 4)
                .style("fill", d => {{
                    if (d.data.type === 'folder') return "var(--folder)";
                    if (d.data.type === 'document') return "var(--document)";
                    if (d.data.type === 'media') return "var(--media)";
                    if (d.data.type === 'code') return "var(--code)";
                    return "var(--other)";
                }});

            nodeEnter.append("text")
                .attr("dy", ".35em")
                .attr("x", d => d.children || d._children ? -10 : 10)
                .style("text-anchor", d => d.children || d._children ? "end" : "start")
                .text(d => d.data.name);

            const nodeUpdate = nodeEnter.merge(node)
                .transition().duration(400)
                .attr("transform", d => `translate(${{d.y}},${{d.x}})`);

            const nodeExit = node.exit()
                .transition().duration(400)
                .attr("transform", d => `translate(${{source.y}},${{source.x}})`)
                .remove();

            // Links
            const link = g.selectAll(".link")
                .data(links, d => d.target.id);

            const linkEnter = link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", d => {{
                    const o = {{x: source.x0 || source.x, y: source.y0 || source.y}};
                    return diagonal({{source: o, target: o}});
                }});

            linkEnter.merge(link)
                .transition().duration(400)
                .attr("d", diagonal);

            link.exit()
                .transition().duration(400)
                .attr("d", d => {{
                    const o = {{x: source.x, y: source.y}};
                    return diagonal({{source: o, target: o}});
                }})
                .remove();

            nodes.forEach(d => {{ d.x0 = d.x; d.y0 = d.y; }});
        }}

        function diagonal(s, t) {{
            const x = s.target ? s.target.x : s.x;
            const y = s.target ? s.target.y : s.y;
            const px = s.source ? s.source.x : s.x;
            const py = s.source ? s.source.y : s.y;
            return `M ${{y}} ${{x}} C ${{(y + py) / 2}} ${{x}}, ${{(y + py) / 2}} ${{py}}, ${{py}} ${{py}}`;
        }}

        root.x0 = height / 2;
        root.y0 = 0;
        update(root);
    </script>
</body>
</html>
"""

with open(OUTPUT_FILE, 'w') as f:
    f.write(html_template)

print(f"Map successfully generated at: {OUTPUT_FILE}")
