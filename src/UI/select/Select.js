import React from 'react'

function Select(obj) {
    return (
        <select onChange={obj.onChange} className={obj.class} name={obj.name} id={obj.id}>
            {obj.children}
        </select>
    )
}

export default Select
