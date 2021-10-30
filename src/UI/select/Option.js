import React from 'react'

function Option(obj) {
    return (
        <option className={obj.class} value={obj.text}>{obj.text}</option>
    )
}

export default Option
