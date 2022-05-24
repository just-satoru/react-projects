import React, { useState, useEffect } from 'react';
import './App.css';
const { io } = require("socket.io-client");


const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);


  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join_room', room);
      setShowChat(true);
    }

  };

  const sendMessage = async () => {
    if (currentMessage !== '') {
        const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
                new Date(Date.now()).getHours() +
                ':' +
                new Date(Date.now()).getMinutes(),
        };

        await socket.emit('send_message', messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage('');
    }
};

useEffect(() => {
    socket.on('receive_message', (data) => {
        console.log(data);
        setMessageList((list) => [...list, data]);
    });
}, [socket]);


  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type='text'
            placeholder='John...'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a room</button>

        </div>
      )
        : (
          <div className="chat-window">
            <div className="chat-header">
              <p>Live chat</p>
            </div>
            <div className="chat-body">
              <div className="message-container">
                {messageList.map((messageContent) => {

                  return <div className="message" id={username === messageContent.author ? 'you' : 'other'}>
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id='time'>{messageContent.time}</p>
                        <p id='author'>{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
            <div className="chat-footer">
              <input
                type='text'
                value={currentMessage}
                placeholder='Hey...'
                onChange={(event) => setCurrentMessage(event.target.value)}
                onKeyPress={(event) => {
                  event.key === 'Enter' && sendMessage();
                }}
              />
              <button onClick={sendMessage} type='button'>&#9658;</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
