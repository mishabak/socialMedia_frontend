import React from 'react'

function Input(obj) {
    return (
      <input {...obj} onClick={obj.onclick}  className={obj.class} value={obj.value} name={obj.name} type={obj.type} onBlur={obj.onBlur} onChange={obj.onChange} placeholder={obj.placeholder}/>
    )
}

export default Input
