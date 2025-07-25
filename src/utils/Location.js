// Haversine distance calculation
export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function findNearestStop(userLat, userLng, stops) {
  let nearestStop = null;
  let minDistance = Infinity;

  stops.forEach(stop => {
    const distance = getDistance(
      userLat,
      userLng,
      stop.lat,
      stop.lng
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestStop = stop.name;
    }
  });

  return nearestStop;
}