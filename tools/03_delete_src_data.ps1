$DataDir = "D:\BGG\sgoyt\src\data"
$CSVDataDir = "$($DataDir)\CSV"
$JSONDataDir = "$($DataDir)\JSON"

Remove-Item "$($CSVDataDir)\data_refresh_date.csv"
Remove-Item "$($JSONDataDir)\game_data\*.json"
Remove-Item "$($JSONDataDir)\guild_data\*.json"
Remove-Item "$($JSONDataDir)\top_contributors_data\*.json"
Remove-Item "$($JSONDataDir)\top_hosts_data\*.json"
Remove-Item "$($JSONDataDir)\year_month_data\*.json"
