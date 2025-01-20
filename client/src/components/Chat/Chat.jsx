import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

import InfoBar from '../InfoBar/InfoBar.jsx';
import Input from '../Input/Input.jsx';
import Messages from '../../components/Messages/Messages.jsx';
let socket;

import './Chat.css'


function Chat() {
  const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOIN = "http://localhost:3000";
  useEffect(() => {
      const {name,room} = queryString.parse(location.search);

      socket = io(ENDPOIN);

      setName(name);
      setRoom(room);

      socket.emit('join',{name,room},()=>{
       
      })  

      return () => {
        socket.disconnect();

        socket.off(); 
      }
      
  },[ENDPOIN,location.search]);



  useEffect(() => {
    socket.on('message',(message)=>{
      setMessages([...messages,message]);
    });
  },[messages])


  //function send messages

  const sendMessage = (e) => {
    e.preventDefault();
    if(message){
      socket.emit('sendMessage',message,() => setMessage(''));
    }
  }


  console.log(message,messages);
  


  return (
    <div className='outerContainer'>
      <div className='container'>


        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
        
        

      </div>

    </div>
  )
}

export default Chat



