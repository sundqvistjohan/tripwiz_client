const hotelTriangulator = response => {
  let museumLat = []
  let museumLng = []

  response.data.forEach(hotel => {
    museumLat.push(parseFloat(hotel.lat));
    museumLng.push(parseFloat(hotel.lng));
  });

  const averager = (array) => {
    return array.reduce((a,b) => (a + b)) / array.length
  }

  let hotelLat = averager(museumLat)
  let hotelLng = averager(museumLng)

  let hotelArray = [hotelLat, hotelLng]

  return (hotelArray)
};

export { hotelTriangulator };
