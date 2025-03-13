import React from 'react'

export const Button = ({style, content, icon, clickEvent}) => {
  return (
    <button className={style} onClick={clickEvent}>
        {icon} {content}
    </button>
  )
}
