import bgg

CREATE_GUILD_DATA = False

cd = bgg.CompileData()
cd.create_game_data_json()
cd.create_yearmonth_data_json()
cd.generate_top_games_graphql()
cd.generate_game_details_graphql()
cd.create_top_sgoyt_host_data()
cd.create_top_sgoyt_contributor_data()
if CREATE_GUILD_DATA:
    cd.create_one_player_guild_user_data()
else:
    cd.update_one_player_guild_user_data()