import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, userName, room }) => {

    const [currentMessage,setCurrentMessage] = useState('');
    const [messageList,setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== ''){
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list,messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list,data]);
        });
    },[socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
        {messageList.map((messageContent) => {
            return <div className='message' id={userName === messageContent.author ? "you": "other"}>
                <div>
                    <div className='message-content'>
                        <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                        <p id='time'>{messageContent.time}</p>
                        <p id='author'>{messageContent.author}</p>
                    </div>
                </div>
            </div>
        })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input 
        type='text' 
        value={currentMessage}
        placeholder='Type Here...' 
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={(e) => { e.key === "Enter" && sendMessage();}}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
