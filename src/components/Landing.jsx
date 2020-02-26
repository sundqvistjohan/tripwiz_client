import React, { useState, useEffect } from "react";
import FacebookLogin from "./FacebookLogin"
import { getTrips, getTrip } from "../modules/destination.js";

const Landing = () => {
  const [viewList, setViewList] = useState(null);
  const [images, setImages] = useState([]);

  const getTripsData = async () => {
    let response = await getTrips();
    if (response.status === 200) {
      setViewList(response.data);
    }
  };
  
  const getTripImage = () => { 
    let stuff = []
    viewList.forEach( async (element) => {
      let image = await getTrip(element.id)
      stuff.push(image)
      if (stuff.length === 5) {
        setImages(stuff)
      }
    })
  }

  useEffect(() => {
    getTripsData();
  }, []);

  useEffect(() => {
    if (viewList != null) {
      getTripImage()
    }
  }, [viewList]);

  let tripCards;

  if (images.length > 1) {
    tripCards = images.map( trip => {
      return (
        <div className="landing-cards">
          <div key={trip.id} className="ui card">
            <div className="image-landing">
              <img className="landing-img"
                // src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${trip.data.image}&sensor=false&maxwidth=400&key=${process.env.REACT_APP_GOOGLE_APIKEY}`}
              />
            </div>
            <div className="content">
              <div id="land" className="header">{trip.data.trip.destination}</div>
              <div className="description-landing">
                {Object.keys(trip.data.activity)[0]} get-away
                <br />
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="hero">
        <div className="greeting">
          <h1>"Welcome to TripWiz"</h1>
          <br />
          <h3>Some sentence about TripWiz maybe.</h3>
        </div>
        <div className="login"><FacebookLogin /></div>
      </div>
      <div className="landing">
        <h3>Our Popular Destinations!</h3>
        <div id="landing-grid" className="ui stackable four column grid">
          {tripCards}
        </div>
        <div className="grid-container">
          <div>
            <div className="left">
              <img style={{height: 450, paddingTop: 35}} src="../screenshots/fullmap.png" alt="Map"/>
            </div>
            <div className="right-top-bottom">
              <h3>Your hotels, activities, restaurants, based on your preferences, all conveniently placed on your map.</h3>
            </div>
          </div>
          <div>
            <div className="left-mid">
              <h3>Here you have options... We make the suggestions, you make the final decision.</h3>
            </div>
            <div className="right-mid">
              <img style={{height: 450, paddingTop: 35}} src="../screenshots/hotels.png" alt="Map"/>
            </div>
          </div>
          <div>
            <div className="left">
              <img style={{height: 450, paddingTop: 35}} src="../screenshots/activities.png" alt="Map"/>
            </div>
            <div className="right-top-bottom">
              <h3>Review each part of your custom itinerary, at any time, on your dashboard.</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-footer">
          <p>Made by a couple of guys.</p>
      </div>
    </>
  )
}

export default Landing;