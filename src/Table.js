import React from 'react';
import './Table.css';

function Table({countires}) {

    
    return (
        <div className="table">
            {countires.map(({country,cases})=>(
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>


            ))}
        </div>
    )
}

export default Table;
