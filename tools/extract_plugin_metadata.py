import json
import os
import re
import zipfile

import yaml

SERVER = r"C:\Users\辰宇\Desktop\测试服"
PLUGINS = os.path.join(SERVER, "plugins")
OUT = r"C:\Users\辰宇\Documents\deepseek-harness\default-workspace\mc33-site\content\server-plugins"
os.makedirs(OUT, exist_ok=True)


def text(value):
    if value is None:
        return ""
    if isinstance(value, list):
        return ", ".join(str(item) for item in value)
    return str(value).strip()


def normalize(value):
    if value is None:
        return []
    if isinstance(value, str):
        return [value]
    return [str(item) for item in value]


inventory = []
raw_dir = os.path.join(OUT, "plugin-yml")
os.makedirs(raw_dir, exist_ok=True)

for filename in sorted(os.listdir(PLUGINS)):
    if not filename.lower().endswith(".jar"):
        continue
    path = os.path.join(PLUGINS, filename)
    try:
        with zipfile.ZipFile(path) as archive:
            candidates = [
                name
                for name in archive.namelist()
                if name.lower() in ("plugin.yml", "paper-plugin.yml")
            ]
            if not candidates:
                inventory.append(
                    {
                        "jar": filename,
                        "plugin": os.path.splitext(filename)[0],
                        "version": "",
                        "main": "",
                        "commands": [],
                        "permissions": [],
                        "hasPluginYml": False,
                        "error": "no plugin.yml",
                    }
                )
                continue

            entry = candidates[0]
            raw = archive.read(entry).decode("utf-8", errors="replace")
            data = yaml.safe_load(raw) or {}
            if not isinstance(data, dict):
                data = {}

            plugin_name = text(data.get("name")) or os.path.splitext(filename)[0]
            safe_name = re.sub(r"[^A-Za-z0-9_.-]+", "_", os.path.splitext(filename)[0])
            with open(os.path.join(raw_dir, safe_name + ".yml"), "w", encoding="utf-8") as handle:
                handle.write(raw)

            permissions = {}
            raw_permissions = data.get("permissions") or {}
            if isinstance(raw_permissions, dict):
                for node, value in raw_permissions.items():
                    if isinstance(value, dict):
                        permission_default = text(value.get("default"))
                        description = text(value.get("description"))
                        children = value.get("children") or {}
                    else:
                        permission_default = text(value)
                        description = ""
                        children = {}
                    permissions[str(node)] = {
                        "default": permission_default,
                        "description": description,
                        "children": children,
                    }

            commands = []
            raw_commands = data.get("commands") or {}
            if isinstance(raw_commands, dict):
                for command_name, value in raw_commands.items():
                    if isinstance(value, dict):
                        command = {
                            "name": str(command_name),
                            "aliases": normalize(value.get("aliases")),
                            "description": text(value.get("description")),
                            "usage": text(value.get("usage")),
                            "permission": text(value.get("permission")),
                            "permissionMessage": text(value.get("permission-message")),
                            "default": "",
                        }
                    else:
                        command = {
                            "name": str(command_name),
                            "aliases": [],
                            "description": text(value),
                            "usage": "",
                            "permission": "",
                            "permissionMessage": "",
                            "default": "",
                        }
                    if command["permission"] in permissions:
                        command["default"] = permissions[command["permission"]]["default"]
                    commands.append(command)

            inventory.append(
                {
                    "jar": filename,
                    "plugin": plugin_name,
                    "version": text(data.get("version")),
                    "main": text(data.get("main")),
                    "apiVersion": text(data.get("api-version")),
                    "commands": commands,
                    "permissions": [
                        {
                            "node": node,
                            "default": value["default"],
                            "description": value["description"],
                        }
                        for node, value in permissions.items()
                    ],
                    "hasPluginYml": True,
                    "error": "",
                }
            )
    except Exception as error:  # noqa: BLE001
        inventory.append(
            {
                "jar": filename,
                "plugin": os.path.splitext(filename)[0],
                "version": "",
                "main": "",
                "commands": [],
                "permissions": [],
                "hasPluginYml": False,
                "error": str(error),
            }
        )

with open(os.path.join(OUT, "inventory.json"), "w", encoding="utf-8") as handle:
    json.dump(inventory, handle, ensure_ascii=False, indent=2)

with open(os.path.join(OUT, "inventory.md"), "w", encoding="utf-8") as handle:
    handle.write("# 测试服插件清单\n\n")
    handle.write(f"- 目录：`{PLUGINS}`\n")
    handle.write(f"- jar 数：{len(inventory)}\n")
    handle.write(f"- 有 plugin.yml：{sum(1 for item in inventory if item['hasPluginYml'])}\n\n")
    handle.write("| 插件 | 版本 | 命令数 | 玩家可能可用命令数 | jar |\n|---|---:|---:|---:|---|\n")
    for item in inventory:
        player_commands = [
            command
            for command in item["commands"]
            if not command["permission"] or command["default"].lower() in ("true", "yes", "")
        ]
        handle.write(
            f"| {item['plugin']} | {item['version']} | {len(item['commands'])} | {len(player_commands)} | {item['jar']} |\n"
        )

print("plugins:", len(inventory))
print("with plugin.yml:", sum(1 for item in inventory if item["hasPluginYml"]))
print("total commands:", sum(len(item["commands"]) for item in inventory))
