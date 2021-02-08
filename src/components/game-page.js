import React from "react"
import { Link } from "gatsby"

export default function GamePage( {data, game_name} ) {
    const entry_count = data.length
    const back_link = '<--back'
    return (
        <div>
            <h2>{game_name}</h2>
            <p><Link to="/">{back_link}</Link></p>
            <p>SGOYT entries: {entry_count}</p>
            {data.map(function(data_item) {
                return <div>
                    <tr>
                        <td padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            <a href={data_item.geeklistitem} target="_blank" rel="noreferrer">[sgoyt]</a>
                        </td>
                        <td padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            {data_item.yearmonth}
                        </td>
                        <td padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            {data_item.user}
                        </td>
                    </tr>
                </div>
            })}
        </div>
    )
}