const sliderChoice = (event) => {
  Array.from(
    document.getElementsByClassName(`range-values-${event.target.name}`)[0]
      .children
  ).forEach((div) => (div.style.color = "black"));
  let divId = `${event.target.name}${event.target.value}`;
  if (event.target.name === "hotel") {
    document.getElementById(divId).style.color = "gold";
  } else if (event.target.name === "food") {
    document.getElementById(divId).style.color = "green";
  } else {
    document.getElementById(divId).style.color = "blue";
  }
};

const capitalize = (str) => {
  str = str.toLowerCase();
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  return str.join(" ");
};

export { sliderChoice, capitalize };
