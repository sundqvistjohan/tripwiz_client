import React, { useState } from 'react'
import { sendDestination } from "../modules/destination";

const SendDestination = () => {
  let [message, setMessage] = useState("")

  const submitPlace = async (e) => {
    e.preventDefault();
    const response = await sendDestination(
      e.target.place.value
    )
    
    if (response == 200) {
      setMessage("Destination Submitted")
    } else {
      setMessage(response.message)
    }
  }

  return (
    <>
      <h2>To get started...</h2>
      <form onSubmit={submitPlace} id="place-form">
        <label>Choose your destination! </label>
        <input name="place" type="text" id="place" placeholder="City"></input>
        <button id="submit">Submit</button>
      </form>
      {message}
      <p>Or pick a spot on the map!</p>
    </>
  )
}

export default SendDestination