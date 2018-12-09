import React from 'react';
import '../../Styles/player.css';
export default (value) => {
    return (
        <div>
            <div>
                <label>
                    {value.label}
                </label>
            </div>
            
            <input {...value.input} className = 'FormBar'/>
        </div>
    )
}