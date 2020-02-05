import React from 'react'
import { getCoords, initializeTrip } from "../modules/destination";
import { connect } from 'react-redux'


const Destination = props => {

  const submitPlace = async (e) => {
    e.preventDefault();
    let response = await getCoords(
      e.target.place.value
    )
    if (!response.error) {
      if (response.data.status != "ZERO_RESULTS") {
        response = response.data.results[0]
        props.setName(response.formatted_address);
        props.setLat(response.geometry.location.lat);
        props.setLng(response.geometry.location.lng);
        props.setMessage("Destination successfully selected");
      } else {
        props.setMessage("Can't go there. Zero Results");
      }
    } else {
      props.setMessage(response.message);
    }
  }

  const onClickHandler = async () => {
    const response = await initializeTrip(props)
    if (response.ok) {
      return response.status
    } else {
      return props.setMessage("Something went wrong.")
    }
  }

  return (
    <>
      <h2>To get started...</h2>
      <form onSubmit={submitPlace} id="place-form">
        <label>Choose your destination here! </label>
        <input name="place" type="text" id="place" placeholder="City"></input>
        <button id="submit">Submit</button>
      </form>
      <p>Or pick a spot on the map!</p>
      {props.message}
      <button id="create-trip" onClick={onClickHandler}>Let's Go!</button>
    </>
  )
}

const mapStateToProps = state => {
  return {
    lat: state.lat,
    lng: state.lng,
    name: state.name,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLat: lat => {
      dispatch({ type: "CHANGE_LAT", payload: lat })
    },
    setLng: lng => {
      dispatch({ type: "CHANGE_LNG", payload: lng })
    },
    setName: name => {
      dispatch({ type: "SET_NAME", payload: name });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Destination);