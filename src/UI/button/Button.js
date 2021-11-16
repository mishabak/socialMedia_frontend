import React from 'react'

function Button(obj) {
    return (
        <button style={obj.style} title={obj.title} className={obj.class} type={obj.type} onClick={obj.click}>{obj.text}</button>
    )
}

export default Button
