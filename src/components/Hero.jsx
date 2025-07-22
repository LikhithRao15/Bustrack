import { useState, useEffect } from 'react';
import { FaCrosshairs, FaExclamationCircle, } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { busStops } from '../utils/busStop';
import { findNearestStop } from '../utils/Location';


const allStops = busStops.map(stop => stop.name);

export default function Hero({ onSearch }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [errors, setErrors] = useState({});
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Update suggestions list
  useEffect(() => {
    let suggestions = [];
    if (from) {
      suggestions = allStops.filter(stop => 
        stop.toLowerCase().includes(from.toLowerCase())
      );
    } else {
      suggestions = [...allStops];
    }

    // Always add "Current Location" as first option
    suggestions = [
      { type: 'current-location', label: 'Current Location' },
      ...suggestions
    ];

    setFromSuggestions(suggestions);
  }, [from]);

  useEffect(() => {
    if (to) {
      const filtered = allStops.filter(stop =>
        stop.toLowerCase().includes(to.toLowerCase()) && stop !== from
      );
      setToSuggestions(filtered);
    } else {
      setToSuggestions(allStops.filter(stop => stop !== from));
    }
  }, [to, from]);

  const handleCurrentLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = findNearestStop(
          position.coords.latitude,
          position.coords.longitude,
          busStops
        );
        setFrom(nearest);
        toast.success(`Nearest stop: ${nearest}`);
        setIsLocating(false);
        setShowFromSuggestions(false);
      },
      (error) => {
        toast.error(`Location error: ${error.message}`);
        setIsLocating(false);
      }
    );
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!from) newErrors.from = 'Please enter departure';
    if (!to) newErrors.to = 'Please enter destination';
    if (from && to && from === to) newErrors.to = 'Destination must be different';
    if (from && !allStops.includes(from)) newErrors.from = 'Invalid departure point';
    if (to && !allStops.includes(to)) newErrors.to = 'Invalid destination point';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) onSearch(from, to);
  };

  const handleFromSelect = (item) => {
    if (item.type === 'current-location') {
      handleCurrentLocation();
    } else {
      setFrom(item);
      setShowFromSuggestions(false);
      if (errors.from) setErrors({...errors, from: ''});
    }
  };

  const handleToSelect = (stop) => {
    setTo(stop);
    setShowToSuggestions(false);
    if (errors.to) setErrors({...errors, to: ''});
  };

  return (
    <section className="hero bg-blue-50 py-12 md:py-16">
      <div className="hero-content text-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Bus</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">From</span>
              </label>
              <input
                type="text"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setShowFromSuggestions(e.target.value.length>0);
                  if (errors.from) setErrors({...errors, from: ''});
                }}
                onFocus={() => {
                  if(to.length>0) setShowToSuggestions(true)
                }} 
                className={`input w-full ${errors.from ? 'input-error' : 'input-bordered'}`}
                placeholder="Enter departure point"
              />
              {errors.from && (
                <label className="label">
                  <span className="label-text-alt text-error flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.from}
                  </span>
                </label>
              )}
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full text-black bg-white shadow-lg rounded-box max-h-60 overflow-auto">
                  {fromSuggestions.map((item, index) => (
                    <li 
                      key={index === 0 ? 'current-location' : `from-${item}`}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        index === 0 ? 'bg-blue-50 font-medium' : ''
                      }`}
                      onClick={() => handleFromSelect(item)}
                    >
                      {index === 0 ? (
                        <div className="flex items-center">
                          <span> <FaCrosshairs className="inline mr-1" /> {item.label}</span>
                          {isLocating && <span className="loading loading-spinner loading-xs ml-2"></span>}
                        </div>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">To</span>
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setShowToSuggestions(e.target.value.length>0);
                  if (errors.to) setErrors({...errors, to: ''});
                }}
                onFocus={() => {
                  if(to.length>0) setShowToSuggestions(true)
                }}
                className={`input w-full ${errors.to ? 'input-error' : 'input-bordered'}`}
                placeholder="Enter destination point"
                disabled={!from}
              />
              {errors.to && (
                <label className="label">
                  <span className="label-text-alt text-error flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.to}
                  </span>
                </label>
              )}
              {showToSuggestions && toSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full text-black bg-white shadow-lg rounded-box max-h-60 overflow-auto">
                  {toSuggestions.map(stop => (
                    <li 
                      key={`to-${stop}`} 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleToSelect(stop)}
                    >
                      {stop}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Search Buses
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}