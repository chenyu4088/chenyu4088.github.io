import json
import os

path = r"C:\Users\辰宇\Documents\deepseek-harness\default-workspace\mc33-site\content\server-plugins\inventory.json"
with open(path, encoding="utf-8") as handle:
    inventory = json.load(handle)

lines = []
for item in inventory:
    commands = item["commands"]
    if not commands:
        continue
    lines.append(f"## {item['plugin']} ({item['version']})")
    for command in commands:
        aliases = ", ".join(command["aliases"])
        lines.append(
            f"- {command['name']} | aliases={aliases or '-'} | permission={command['permission'] or '-'} | default={command['default'] or '-'} | {command['description'] or ''} | usage={command['usage'] or ''}"
        )
    lines.append("")

with open(
    r"C:\Users\辰宇\Documents\deepseek-harness\default-workspace\mc33-site\content\server-plugins\commands.txt",
    "w",
    encoding="utf-8",
) as handle:
    handle.write("\n".join(lines))

print("plugins with commands:", sum(1 for item in inventory if item["commands"]))
print("commands:", sum(len(item["commands"]) for item in inventory))
print("plugins without commands:", ", ".join(item["plugin"] for item in inventory if not item["commands"]))
