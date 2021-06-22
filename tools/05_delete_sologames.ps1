$DataDir = "D:\BGG\sologames"

Get-ChildItem $DataDir -Exclude ".git" | Remove-Item -Recurse