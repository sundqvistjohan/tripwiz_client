import React, { useEffect, useState } from "react";
import { getHighScoreData } from "../modules/destination.js";

const Ranking = () => {
  
  const [highScoreData, setHighScoreData] = useState(null);

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
      <h5>Top rated destination by:</h5>
      {highScoreData && highScoreData["destination"][0] && (
        <div className="highscore-div">
          <h5>Destination!</h5>
          <p>{highScoreData["destination"][0].destination}</p>
          <p>{highScoreData["destination"][0].rating}</p> <br />
          <p>
            {highScoreData["destination"][1] &&
              highScoreData["destination"][1].destination}
          </p>
          <p>
            {highScoreData["destination"][1] &&
              highScoreData["destination"][1].rating}
          </p>{" "}
          <br />
          <p>
            {highScoreData["destination"][2] &&
              highScoreData["destination"][2].destination}
          </p>
          <p>
            {highScoreData["destination"][2] &&
              highScoreData["destination"][2].rating}
          </p>{" "}
          <br />
        </div>
      )}
      {highScoreData && highScoreData["activities"][0] && (
        <div className="highscore-div">
          <h5>Activities!</h5>
          <p>
            {highScoreData["activities"][0].destination}{" "}
            {highScoreData.activities[0].activity}
          </p>
          <p>{highScoreData["activities"][0].rating}</p> <br />
          <p>
            {highScoreData["activities"][1] &&
              highScoreData["activities"][1].destination}{" "}
            {highScoreData["activities"][1] &&
              highScoreData["activities"][1].activity}
          </p>
          <p>
            {highScoreData["activities"][1] &&
              highScoreData["activities"][1].rating}
          </p>{" "}
          <br />
          <p>
            {highScoreData["activities"][2] &&
              highScoreData["activities"][2].destination}{" "}
            {highScoreData["activities"][2] &&
              highScoreData["activities"][2].activity}
          </p>
          <p>
            {highScoreData["activities"][2] &&
              highScoreData["activities"][2].rating}
          </p>{" "}
          <br />
        </div>
      )}
      {highScoreData && highScoreData["restaurants"][0] && (
        <div className="highscore-div">
          <h5>Restaurants!</h5>
          <p>{highScoreData["restaurants"][0].destination}</p>
          <p>{highScoreData["restaurants"][0].rating}</p> <br />
          <p>
            {highScoreData["restaurants"][1] &&
              highScoreData["restaurants"][1].destination}
          </p>
          <p>
            {highScoreData["restaurants"][1] &&
              highScoreData["restaurants"][1].rating}
          </p>{" "}
          <br />
          <p>
            {highScoreData["restaurants"][2] &&
              highScoreData["restaurants"][2].destination}
          </p>s
          <p>
            {highScoreData["restaurants"][2] &&
              highScoreData["restaurants"][2].rating}
          </p>{" "}
          <br />
        </div>
      )}
      {highScoreData && highScoreData["hotel"][0] && (
        <div className="highscore-div">
          <h5>Hotel!</h5>
          <p>{highScoreData["hotel"][0].destination}</p>
          <p>{highScoreData["hotel"][0].rating}</p> <br />
          <p>
            {highScoreData["hotel"][1] && highScoreData["hotel"][1].destination}
          </p>
          <p>{highScoreData["hotel"][1] && highScoreData["hotel"][1].rating}</p>{" "}
          <br />
          <p>
            {highScoreData["hotel"][2] && highScoreData["hotel"][2].destination}
          </p>
          <p>{highScoreData["hotel"][2] && highScoreData["hotel"][2].rating}</p>{" "}
          <br />
        </div>
      )}
    </div>
  );
};

export default Ranking
