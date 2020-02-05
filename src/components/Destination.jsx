import React, { useState } from 'react'
import { getCoords, initializeTrip } from "../modules/destination";
import { connect } from 'react-redux'


const SendDestination = props => {
  let [message, setMessage] = useState("")

  const submitPlace = async (e) => {
    e.preventDefault();
    let response = await getCoords(
      e.target.place.value
    )
    if (!response.error) {
      if (response.data.status != "ZERO_RESULTS") {
        response = response.data.results[0]
        props.setName(response.formatted_address)
        props.changeCoords({
          lat: response.geometry.location.lat,
          lng: response.geometry.location.lng
        });
        setMessage("Destination Submitted")
      } else {
        setMessage("Can't go there. Zero Results")
        props.setName(null)
      }
    } else {
      setMessage(response.message)
    }
  }

  const onClickHandler = async () => {
    const response = await initializeTrip(props)
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

      {props.name && <p>You are going to {props.name}</p>}
      <button id="create-trip" onClick={onClickHandler}>Let's Go!</button>
    </>
  )
}

const mapStateToProps = state => {
  return {
    coords: state.coords,
    name: state.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCoords: coords => {
      dispatch({ type: "CHANGE_COORDS", payload: coords })
    },
    setName: name => {
      dispatch({ type: "SET_NAME", payload: name });
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SendDestination);