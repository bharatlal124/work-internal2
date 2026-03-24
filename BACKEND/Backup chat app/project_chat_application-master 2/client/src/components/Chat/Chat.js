import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
const ENDPOINT = 'ws://localhost:5000/';
// const ENDPOINT = 'https://real-time-chat-app-cisd.onrender.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [imageFile, setImageFile] = useState(null);


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error); 
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
};

  // const sendMessage = (event) => {
  //   event.preventDefault();

  //   if(message) {
  //     socket.emit('sendMessage', message, () => setMessage(''));
  //   }
  // }
  const sendMessage = (event) => {
    event.preventDefault();
  
    if (message || imageFile) {
      const reader = new FileReader();
  
      if (imageFile) {
        reader.onloadend = () => {
          // send message with image as base64
          socket.emit('sendMessage', {
            text: message,
            image: reader.result, // base64 encoded string
          }, () => {
            setMessage('');
            setImageFile(null); // reset image
          });
        };
        reader.readAsDataURL(imageFile); // convert image to base64
        console.log("image",imageFile);
      } else {
        socket.emit('sendMessage', {
          text: message,
          image: null,
        }, () => setMessage(''));
      }
    }
  };
  
  

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}  handleImageChange={handleImageChange} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
