import hashlib


def group_name_from_server_id(server_id) -> str:
    hashed = hashlib.sha256(str(server_id).encode()).hexdigest()
    return f"edit_{hashed}"
