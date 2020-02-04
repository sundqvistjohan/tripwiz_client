import React, { useState } from 'react'
import { sendDestination } from "../modules/destination";

const SendDestination = () => {
  let [message, setMessage] = useState("")

  const submitPlace = async (e) => {
    e.preventDefault();
    const response = await sendDestination(
      e.target.place.value
    )
    debugger
    if (response == 200) {
      setMessage("Destination Submitted")
    } else {
      setMessage(response.errors)
    }
  }

  return (
    <>
      <form onSubmit={submitPlace} id="place-form">
        <label>Choose Destination</label>
        <input name="place" type="text" id="place"></input>
        <button id="submit">Submit</button>
      </form>
      {message}
    </>
  )
}

export default SendDestination