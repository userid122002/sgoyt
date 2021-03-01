import bgg

cd = bgg.CompileData()
cd.create_game_data_json()
cd.create_yearmonth_data_json()
cd.generate_top_games_graphql()