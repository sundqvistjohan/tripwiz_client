import React from 'react'
import { sendDestination } from "../modules/destination";

const SendDestination = () => {

  const submitPlace = async (e) => {
    e.preventDefault();
    const response = await sendDestination(
      e.target.place.value
    )
    if (response.ok) {
      return "Destination submitted"
    } else {
      return response.message
    }
  }

  return (
    <>
      <form onSubmit={submitPlace} id="place-form">
        <label>Choose Destination</label>
        <input name="place" type="text" id="place"></input>
        <button id="submit">Submit</button>
      </form>
    </>
  )
}

export default SendDestination