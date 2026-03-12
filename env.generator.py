import os
import secrets
import hashlib
import re

TEMPLATE_FILE = "env.template"
ENV_FILE = ".env"
VERSION_FILE = "env.version"

def random_url_safe_password(length=48):
    return secrets.token_urlsafe(length)

def file_hash(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def load_version():
    if not os.path.exists(VERSION_FILE):
        return None
    with open(VERSION_FILE) as f:
        return f.read().strip()

def save_version(hash_value):
    with open(VERSION_FILE, "w") as f:
        f.write(hash_value)

def generate_env():
    with open(TEMPLATE_FILE) as f:
        template = f.read()

    def replacer(match):
        return random_url_safe_password()

    template = re.sub(r"\{\{RANDOM_URL_SAFE_PASSWORD(?:_\d+)?\}\}", replacer, template)

    with open(ENV_FILE, "w") as f:
        f.write(template)

def main():
    if not os.path.exists(TEMPLATE_FILE):
        raise SystemExit("env.template not found")

    current_hash = file_hash(TEMPLATE_FILE)
    stored_hash = load_version()

    if current_hash != stored_hash or not os.path.exists(ENV_FILE):
        generate_env()
        save_version(current_hash)
        print("✓ .env regenerated")
    else:
        print("✓ .env already up to date")

if __name__ == "__main__":
    main()