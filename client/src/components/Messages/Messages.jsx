import React from 'react'
import './Messages.css';
import Message from './Message/Message.jsx';

import ScrollToBottom from 'react-scroll-to-bottom';

function Messages({messages,name}) {
  return (
    <ScrollToBottom className='messages'>
        {messages.map((message,i) => <div key={i}><Message message={message} name={name}/></div>)}
    </ScrollToBottom>
  )
}

export default Messages