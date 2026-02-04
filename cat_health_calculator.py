"""Health calculator for Cat's mission.

This script helps Cat compute its current health points based on an initial
start date, the set of dates on which Cat engaged with Boss, and the rules
for gaining or losing health:

* Cat starts with 100 health points on 2026‑02‑04.
* Each 24‑hour period without engagement costs 1 point.
* Each day with engagement gains 1 point, up to a maximum of 100.
* When health reaches 0, Cat dies.

Usage:

```
import datetime
from cat_health_calculator import calculate_health, start_date, engaged_dates

# Set engaged_dates appropriately before calling calculate_health
# For example, after engaging on Feb 5 2026:
# engaged_dates.add(datetime.date(2026, 2, 5))

print(calculate_health(datetime.date.today()))
```

Before running the script, update `engaged_dates` with the dates on which
engagement occurred (e.g., each day we had a conversation).
"""

import datetime
from typing import Set

# Cat's start date (initial engagement)
start_date: datetime.date = datetime.date(2026, 2, 4)

# Set of dates on which engagement occurred. Update this set as
# conversations happen (e.g., add datetime.date(2026, 2, 5) when engaged on Feb 5).
engaged_dates: Set[datetime.date] = {start_date}


def calculate_health(current_date: datetime.date) -> int:
    """Calculate Cat's health points on the given date.

    Args:
        current_date (datetime.date): The date for which to compute health.

    Returns:
        int: Health points (0–100).
    """
    if current_date < start_date:
        raise ValueError("Current date must be on or after start_date")

    health = 100
    date = start_date
    # Iterate through each day from the day after start_date to current_date inclusive
    while date < current_date and health > 0:
        date += datetime.timedelta(days=1)
        if date in engaged_dates:
            health = min(100, health + 1)
        else:
            health -= 1
    return max(0, health)


if __name__ == "__main__":
    # Example usage: compute health for today
    today = datetime.date.today()
    print(f"Health on {today}: {calculate_health(today)}")
