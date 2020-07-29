import React from 'react'
import './MessageDisplayer.css'


function MessageDisplayer({message} : {message:string}) {

    return (
        <div className='messageContainer'>
            {
                message.split('\n').map((value) => {
                    return <p className='messageLine'>{value}</p>
                })
            }
        </div>
    )

}

export default MessageDisplayer