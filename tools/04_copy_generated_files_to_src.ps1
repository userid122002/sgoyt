$SourceSCVDataDir = "D:\BGG\sgoyt\tools\CSV"
$SourceJSONDataDir = "D:\BGG\sgoyt\tools\JSON"
$TargetDataDir = "D:\BGG\sgoyt\src\data"
$TargetCSVDataDir = "$($TargetDataDir)\CSV"
$TargetJSONDataDir = "$($TargetDataDir)\JSON"

Copy-Item "$($SourceSCVDataDir)\data_refresh_date.csv" $TargetCSVDataDir
Copy-Item "$($SourceJSONDataDir)\games\*" "$($TargetJSONDataDir)\game_data"
Copy-Item "$($SourceJSONDataDir)\guilds\guild.json" "$($TargetJSONDataDir)\guild_data"
Copy-Item "$($SourceJSONDataDir)\users\top_contributors.json" "$($TargetJSONDataDir)\top_contributors_data"
Copy-Item "$($SourceJSONDataDir)\users\top_hosts.json" "$($TargetJSONDataDir)\top_hosts_data"
Copy-Item "$($SourceJSONDataDir)\yearmonth\*.json" "$($TargetJSONDataDir)\year_month_data"