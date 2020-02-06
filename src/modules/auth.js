import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "http://localhost:3000/",
  //host: process.env.REACT_APP_BASEURL,
  debug: false
});

export default auth;