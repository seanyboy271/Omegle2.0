import React from 'react'


function MessageDisplayer({message} : {message:string}) {

    return (
        <div>
            {
                message.split('\n').map((value) => {
                    return <p>{value}</p>
                })
            }
        </div>
    )

}

export default MessageDisplayer