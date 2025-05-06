import hashlib


def group_name_from_secret(secret) -> str:
    hashed = hashlib.sha256(str(secret).encode()).hexdigest()
    return f"edit_{hashed}"
