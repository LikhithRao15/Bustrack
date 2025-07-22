import { useLocation } from "react-router-dom";
import BusList from "../components/BusList";

export default function ResultsPage() {
  const { state } = useLocation();
  const buses = state?.buses || [];
  const searchQuery = state?.searchQuery || "";
  const searchTime = state?.searchTime || "";

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Results for: {searchQuery}</h2>
      <p className="text-gray-600 mb-6">
        {buses.length > 0 
          ? `Showing the next ${buses.length} buses after ${searchTime}`
          : `No upcoming buses found (current time: ${searchTime})`
        }
      </p>
      
      {buses.length > 0 ? (
        <BusList buses={buses} />
      ) : (
        <div className="alert alert-warning">
          No buses available for this route after {searchTime}
        </div>
      )}
    </main>
  );
}