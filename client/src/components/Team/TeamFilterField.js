import React from 'react';

export default (value) => {
    return (
        <div>
            <label>
                {value.label}
            </label>
            <input {...value.input} />
        </div>
    )
}