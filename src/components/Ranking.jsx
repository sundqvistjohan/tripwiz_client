import React, { useEffect, useState } from "react";
import { getHighScoreData } from "../modules/destination.js";
import { Button } from "semantic-ui-react"

const Ranking = () => {
  
  const [highScoreData, setHighScoreData] = useState(null);
  const [currentRanking, setCurrentRanking] = useState("destination")

  const getHighScore = async () => {
    let response = await getHighScoreData();
    if (response.status === 200 && response.data === null) {
      setHighScoreData(false);
    } else {
      setHighScoreData(response.data);
    }
  };

  useEffect(() => {
    getHighScore();
  }, []);

  return (
    <div className="highscore-div-main">
      <div classname="ranking-buttons">
      <h5>Top rated destination by:</h5>
      <Button onClick={() => setCurrentRanking("destination")}>Destination</Button>
      <Button onClick={() => setCurrentRanking("activities")}>Activities</Button>
      <Button onClick={() => setCurrentRanking("restaurants")}>Restaurants</Button>
      <Button onClick={() => setCurrentRanking("hotel")}>Hotel</Button>
      </div>
      {highScoreData && highScoreData[currentRanking][0] && (
        <div className="highscore-div">
          <h5>Destination!</h5>
          <p>1. {highScoreData[currentRanking][0].destination}</p>
          <p>Score: {highScoreData[currentRanking][0].rating}</p>
          <p>2. {" "}
            {highScoreData[currentRanking][1] &&
              highScoreData[currentRanking][1].destination}
          </p>
          <p>Score: {" "}
            {highScoreData[currentRanking][1] &&
              highScoreData[currentRanking][1].rating}
          </p>{" "}
          <p>
            {highScoreData[currentRanking][2] &&
              highScoreData[currentRanking][2].destination}
          </p>
          <p>
            {highScoreData[currentRanking][2] &&
              highScoreData[currentRanking][2].rating}
          </p>{" "}
          <br />
        </div>
      )}
    </div>
  );
};

export default Ranking
