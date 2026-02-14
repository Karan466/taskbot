def detect_intent(message: str):
    msg = message.lower().strip()

    # ADD TASK
    if msg.startswith("add") or msg.startswith("create"):
        return "add"

    # LIST TASKS
    list_keywords = [
        "list", "show", "view",
        "my task", "my tasks",
        "tasks", "task"
    ]
    for kw in list_keywords:
        if kw in msg:
            return "list"

    # COMPLETE TASK
    if "complete" in msg or "done" in msg or "finish" in msg:
        return "complete"

    # DELETE TASK
    if "delete" in msg or "remove" in msg:
        return "delete"

    return "unknown"
