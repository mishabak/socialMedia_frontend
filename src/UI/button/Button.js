import React from 'react'

function Button(obj) {
    return (
        <button style={obj.style} className={obj.class} type={obj.type} onclick={obj.click}>{obj.text}</button>
    )
}

export default Button
