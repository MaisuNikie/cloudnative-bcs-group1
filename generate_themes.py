import os

SCHEMES_PATH = "frontend/node_modules/@donovanglover/base16-tailwind/schemes/base16"
OUTPUT_JS = "frontend/styles/themes/themes.js"
OUTPUT_TS = "frontend/styles/themes/themes.ts"

print(f"Current directory: {os.getcwd()}")
print(f"Schemes path exists: {os.path.exists(SCHEMES_PATH)}")
print(f"Output directory exists: {os.path.exists(os.path.dirname(OUTPUT_JS))}")

def get_themes():
    themes = []
    for filename in sorted(os.listdir(SCHEMES_PATH)):
        if filename.endswith(".yaml"):
            slug = filename.replace(".yaml", "")
            label = slug.replace("-", " ").title()
            themes.append((slug, label))
    return themes

def group_themes(themes):
    families = {}
    for slug, label in themes:
        family = slug.split("-")[0].capitalize()
        if family not in families:
            families[family] = []
        families[family].append((slug, label))
    return families

def generate_js(families):
    lines = []
    lines.append("// Auto-generated from @donovanglover/base16-tailwind schemes")
    lines.append("const themesByFamily = {")
    for family, members in sorted(families.items()):
        lines.append(f'  "{family}": [')
        for slug, label in members:
            lines.append(f'    {{ value: "base16-{slug}", label: "{label}" }},')
        lines.append("  ],")
    lines.append("};")
    lines.append("")
    lines.append("module.exports = { themesByFamily };")
    return "\n".join(lines)

def generate_ts(families):
    lines = []
    lines.append("// Auto-generated from @donovanglover/base16-tailwind schemes")
    lines.append("export const themesByFamily = {")
    for family, members in sorted(families.items()):
        lines.append(f'  "{family}": [')
        for slug, label in members:
            lines.append(f'    {{ value: "base16-{slug}", label: "{label}" }},')
        lines.append("  ],")
    lines.append("} as const;")
    lines.append("")
    lines.append("export type Theme = string;")
    return "\n".join(lines)

if __name__ == "__main__":
    themes = get_themes()
    families = group_themes(themes)

    with open(OUTPUT_JS, "w") as f:
        f.write(generate_js(families))
    print(f"Written to {OUTPUT_JS}")

    with open(OUTPUT_TS, "w") as f:
        f.write(generate_ts(families))
    print(f"Written to {OUTPUT_TS}")

    print(f"\nDone — {len(themes)} themes across {len(families)} families")
    for family, members in sorted(families.items()):
        print(f"  {family}: {len(members)} themes")