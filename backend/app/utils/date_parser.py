from datetime import datetime, timedelta

def parse_human_date(text: str):
    text = text.lower().strip()
    today = datetime.now()

    if "today" in text:
        return today

    if "tomorrow" in text:
        return today + timedelta(days=1)

    if "next week" in text:
        return today + timedelta(days=7)

    return None
