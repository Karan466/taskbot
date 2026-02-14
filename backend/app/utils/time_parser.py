import re

def parse_time(text: str):
    """
    Extracts time like:
    - 6 pm
    - 10 am
    - 18:30
    """
    match = re.search(r'(\d{1,2})(:\d{2})?\s?(am|pm)?', text)
    if not match:
        return None

    return match.group().strip()
