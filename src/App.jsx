import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Livetrack from './pages/Livetrack';

const stopTimes = {
  "Belthangady-Guruvayanakere": 10,
  "Guruvayanakere-Shaktinagar": 12,
  "Shaktinagar-Badyar": 8,
  "Badyar-Padangady": 15,
  "Padangady-Gardadi": 10,
  "Gardadi-Golyangady": 12,
  "Golyangady-Venoor": 10,
  "Venoor-Paddandadka": 15,
  "Paddandadka-Perinje": 10,
  "Perinje-Hosangady": 8,
  "Hosangady-Gantalkatte": 12,
  "Gantalkatte-Moodbidri": 15
};

const stopHaltingTimes = {
  "Belthangady": 5,
  "Guruvayanakere": 2,
  "Shaktinagar": 2,
  "Badyar": 3,
  "Padangady": 2,
  "Gardadi": 2,
  "Golyangady": 2,
  "Venoor": 3,
  "Paddandadka": 2,
  "Perinje": 3,
  "Hosangady": 2,
  "Gantalkatte": 2,
  "Moodbidri": 10
};

const allRoutes = [
  {
    id: 1,
    name: "Sarala",
    stops: ["Belthangady", "Guruvayanakere", "Shaktinagar", "Badyar", "Padangady", "Gardadi", "Golyangady", "Venoor", "Paddandadka", "Perinje", "Hosangady", "Gantalkatte", "Moodbidri"],
    trips: [
      {
        direction: "up",
        departureTime: "07:00",
        returnDepartureTime: "08:10",
        fare: "₹120-₹250"
      },
      {
        direction: "down",
        departureTime: "13:10",
        returnDepartureTime: "09:20",
        fare: "₹120-₹250"
      }
    ]
  },
  {
    id: 2,
    name: "Shanthi Sagar",
    stops: ["Belthangady", "Guruvayanakere", "Shaktinagar", "Badyar", "Padangady", "Gardadi", "Golyangady", "Venoor", "Paddandadka", "Perinje", "Hosangady", "Gantalkatte", "Moodbidri"],
    trips: [
      {
        direction: "up",
        departureTime: "07:10",
        returnDepartureTime: "08:30",
        fare: "₹120-₹250"
      },
      {
        direction: "down",
        departureTime: "09:40",
        returnDepartureTime: "09:45",
        fare: "₹120-₹250"
      }
    ]
  },
  {
    id: 3,
    name: "Jolly",
    stops: ["Belthangady", "Guruvayanakere", "Shaktinagar", "Badyar", "Padangady", "Gardadi", "Golyangady", "Venoor", "Paddandadka", "Perinje", "Hosangady", "Gantalkatte", "Moodbidri"],
    trips: [
      {
        direction: "up",
        departureTime: "07:45",
        returnDepartureTime: "15:00",
        fare: "₹120-₹250"
      },
      {
        direction: "down",
        departureTime: "10:10",
        returnDepartureTime: "11:35",
        fare: "₹120-₹250"
      }
    ]
  },
  
  
];

function convertToMinutes(timeStr) {
  const [hours, mins] = timeStr.split(':').map(Number);
  return hours * 60 + mins;
}

function convertToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const mins = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

const routesWithTimings = allRoutes.map(route => {
  const tripsWithTimings = route.trips.map(trip => {
    if (trip.direction === "up") {
      let timeInMinutes = convertToMinutes(trip.departureTime);
      const upTimings = [];
      
      route.stops.forEach((stop, index) => {
        upTimings.push(convertToTime(timeInMinutes));
        if (index < route.stops.length - 1) {
          timeInMinutes += stopHaltingTimes[stop] || 0;
          const nextStop = route.stops[index + 1];
          timeInMinutes += stopTimes[`${stop}-${nextStop}`] || 15;
        }
      });

      const returnTimings = [];
      if (trip.returnDepartureTime) {
        timeInMinutes = convertToMinutes(trip.returnDepartureTime);
        for (let i = route.stops.length - 1; i >= 0; i--) {
          returnTimings.push(convertToTime(timeInMinutes));
          if (i > 0) {
            const currentStop = route.stops[i];
            timeInMinutes += stopHaltingTimes[currentStop] || 0;
            const prevStop = route.stops[i - 1];
            timeInMinutes += stopTimes[`${prevStop}-${currentStop}`] || 15;
          }
        }
      }

      return { ...trip, upTimings, returnTimings };
    } else {
      let timeInMinutes = convertToMinutes(trip.departureTime);
      const downTimings = [];
      
      [...route.stops].reverse().forEach((stop, index) => {
        downTimings.push(convertToTime(timeInMinutes));
        if (index < route.stops.length - 1) {
          timeInMinutes += stopHaltingTimes[stop] || 0;
          const nextStop = [...route.stops].reverse()[index + 1];
          timeInMinutes += stopTimes[`${nextStop}-${stop}`] || 15;
        }
      });

      return { ...trip, downTimings };
    }
  });
  return { ...route, trips: tripsWithTimings };
});

function App() {
  const navigate = useNavigate();

  const handleSearch = (fromStop, toStop) => {
    const now = new Date();
    const currentTime = convertToMinutes(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    
    const filteredBuses = routesWithTimings.flatMap(route => {
      const fromIndex = route.stops.indexOf(fromStop);
      const toIndex = route.stops.indexOf(toStop);
      if (fromIndex === -1 || toIndex === -1) return [];

      return route.trips.flatMap(trip => {
        const isUpDirection = fromIndex < toIndex;
        const timings = isUpDirection ? trip.upTimings : (trip.downTimings || trip.returnTimings || []);
        if (!timings || !timings[fromIndex] || !timings[toIndex]) return [];

        const departureTime = convertToMinutes(timings[fromIndex]);
        
        if (departureTime >= currentTime) {
          return {
            ...route,
            tripId: `${route.id}-${trip.direction}`,
            displayStops: isUpDirection
              ? route.stops.slice(fromIndex, toIndex + 1)
              : route.stops.slice(toIndex, fromIndex + 1).reverse(),
            departure: timings[fromIndex],
            arrival: timings[toIndex],
            direction: isUpDirection ? 'up' : 'down',
            fare: trip.fare
          };
        }
        return [];
      });
    });

    const upcomingBuses = filteredBuses
      .sort((a, b) => convertToMinutes(a.departure) - convertToMinutes(b.departure))
      .slice(0, 4);

    navigate('/results', { 
      state: { 
        buses: upcomingBuses,
        searchQuery: `${fromStop} → ${toStop}`,
        searchTime: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage onSearch={handleSearch} />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/livetrack" element={<Livetrack />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}