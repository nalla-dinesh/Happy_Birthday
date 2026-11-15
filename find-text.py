#!/usr/bin/env python3
"""
find-text.py — search / list every piece of copy on the site.

    python3 find-text.py                     # list every text in the magazine file
    python3 find-text.py "My only"           # where is this text?
    python3 find-text.py --file last.html    # dump all copy in one file
    python3 find-text.py --grep music        # case-insensitive search, all files

The site is a static Next.js export: all copy is baked into minified JS inside
_next/static/chunks/*.js plus the three HTML pages. This script makes that
grep-able without you having to open a 400 KB single-line file.
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

FILES = (
    sorted(glob.glob(os.path.join(ROOT, "_next/static/chunks/*.js")))
    + sorted(glob.glob(os.path.join(ROOT, "*.html")))
    + sorted(glob.glob(os.path.join(ROOT, "songs/*.js")))
    + sorted(glob.glob(os.path.join(ROOT, "_patch.js")))
    + sorted(glob.glob(os.path.join(ROOT, "_magpdf.js")))
)

MAGAZINE_FILE = os.path.join(ROOT, "_next/static/chunks/2njl4qrpzxs9l.js")

# strings that are code noise, not copy
NOISE = re.compile(
    r"^(use strict|__esModule|default|function|object|string|number|meta|"
    r"utf-8|charset|viewport|width=device-width|name|charSet|itemProp|"
    r"httpEquiv|ImageConfigContext|RouterContext|)($|[-_/])"
)

LITERAL = re.compile(r'"((?:[^"\\]|\\.){4,600})"')
CHILD = re.compile(r'children:"((?:[^"\\]|\\.){3,600})"')


def looks_like_copy(text: str) -> bool:
    if len(text) < 4:
        return False
    if NOISE.match(text):
        return False
    if not any(c.isalpha() for c in text):
        return False
    # CSS / class soup
    if any(tok in text for tok in ("px", "rgba(", "flex", "fontFamily", "--tw")):
        if text.count(" ") < 3:
            return False
    if text.startswith("/") or text.startswith("http"):
        return False
    return True


def rel(path: str) -> str:
    return os.path.relpath(path, ROOT)


def scan(path: str):
    try:
        src = open(path, encoding="utf-8", errors="ignore").read()
    except OSError:
        return []
    hits = []
    for m in CHILD.finditer(src):
        t = m.group(1)
        if looks_like_copy(t):
            hits.append((m.start(), t))
    if not hits:  # html pages keep copy in plain text nodes
        for m in re.finditer(r">([^<>{}]{6,300})<", src):
            t = m.group(1).strip()
            if looks_like_copy(t):
                hits.append((m.start(), t))
    return hits


def cmd_search(term: str, case=True):
    pat = re.compile(re.escape(term), 0 if case else re.IGNORECASE)
    found = 0
    for f in FILES:
        try:
            src = open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        for m in pat.finditer(src):
            found += 1
            a = max(0, m.start() - 70)
            ctx = src[a:m.end() + 70].replace("\n", " ")
            print(f"\n{rel(f)}  @ {m.start()}")
            print(f"   …{ctx}…")
    if not found:
        print(f'"{term}" not found in any file.')
    else:
        print(f"\n{found} hit(s).")


def cmd_file(path: str):
    full = path if os.path.isabs(path) else os.path.join(ROOT, path)
    hits = scan(full)
    print(f"{rel(full)} — {len(hits)} text item(s)\n")
    for off, t in hits:
        print(f"{off:>8}  {t[:110]}")


def cmd_list_magazine():
    hits = scan(MAGAZINE_FILE)
    print(f"{rel(MAGAZINE_FILE)} — {len(hits)} text item(s)\n")
    print("offset     text")
    print("-" * 78)
    for off, t in hits:
        print(f"{off:>8}   {t[:100]}")


def main():
    args = sys.argv[1:]
    if not args:
        cmd_list_magazine()
    elif args[0] == "--file":
        cmd_file(args[1])
    elif args[0] == "--grep":
        cmd_search(" ".join(args[1:]), case=False)
    elif args[0] in ("-h", "--help"):
        print(__doc__)
    else:
        cmd_search(" ".join(args))


if __name__ == "__main__":
    main()
