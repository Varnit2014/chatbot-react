import {useState} from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

function ChatInput({chatMessages,setChatMessages}){
const [inputText, setInputText] = useState('')

  function saveInputText(event){
    setInputText(event.target.value)
  }

  function keyDownMessage(e){
    if(e.key === 'Enter'){
      sendMessage()
    } else if (e.key === 'Escape'){
      setInputText('')
    }
  }

  async function sendMessage(){

    setInputText('')
    const newChatMessages = [
    ...chatMessages,
    {
      message : inputText,
      sender : 'user',
      id: crypto.randomUUID()
    }
    ]

    setChatMessages([
      ...newChatMessages,
      {
        message : 'Loading...',
        sender : 'robot',
        id : crypto.randomUUID()
      }
    ])

    const response = await Chatbot.getResponseAsync(inputText)


    setChatMessages([
      ...newChatMessages,
      {
        message : response,
        sender : 'robot',
        id: crypto.randomUUID()
      }
      ])

      setInputText('')
    }

  return(
    <div className="input-components">
      <input
        placeholder="Send a message to Chatbot" 
        className = "chat-input"
        size="30"
        onChange= {saveInputText}
        value = {inputText}
        onKeyDown = {keyDownMessage}
      />
      <button
      onClick = {sendMessage}
      className = "send-button"
      >Send</button>
    </div>
  )
    
}
export default ChatInput