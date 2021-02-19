import React from 'react'

function Comment({id, text, username}) {

    return (
        <div>
             <strong> {username} : </strong> {text}
        </div>

    )
}

export default Comment
