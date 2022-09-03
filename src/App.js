import './App.css';
import {useState} from 'react';
import io from "socket.io-client";
import Chat from './components/Chat';

const socket = io.connect("http://localhost:5000");


function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [room,setRoom] = useState('');
  const [userName,setUserName] = useState('');

  const joinRoom = () => {
    if ( userName!== '' && room !== '' ){
      socket.emit("join_room", room);
      setLoggedIn(true);
    }
  }


  return (
    <div className='App'>
      { !loggedIn ? (
          <div className='joinChatContainer'>
              <h3>Join A Chat</h3>
              <input type='text' placeholder='Name...' onChange={(e)=> (setUserName(e.target.value))} />
              <input type='text' placeholder='Room...' onChange={(e)=> (setRoom(e.target.value))} />
              <button onClick={joinRoom}>Enter Chat</button>
          </div>
      ):(
          <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
