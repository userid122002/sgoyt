import bgg

bg = bgg.BggClient()
d = bgg.CurrentDate()
bg.get_geeklist_items()
d.create_current_date_csv()