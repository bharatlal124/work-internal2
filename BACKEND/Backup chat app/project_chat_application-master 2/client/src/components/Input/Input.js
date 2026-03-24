import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, handleImageChange }) => (
  <form className="form">
  <input
    className="input"
    type="text"
    placeholder="Type a message..."
    value={message}
    onChange={({ target: { value } }) => setMessage(value)}
    onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
  />
  
  <input type="file" accept="image/*" onChange={handleImageChange} />

  <button className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
</form>

)

export default Input;