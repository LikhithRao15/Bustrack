export default function BusList({ buses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buses.map((bus) => {
        const limitedStops = bus.displayStops.length > 6 
          ? [
              bus.displayStops[0],
              '...',
              ...bus.displayStops.slice(
                Math.floor(bus.displayStops.length/2) - 1, 
                Math.floor(bus.displayStops.length/2) + 1
              ),
              '...',
              bus.displayStops[bus.displayStops.length - 1]
            ]
          : bus.displayStops;

        return (
          <div key={bus.tripId} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h3 className="card-title">{bus.name}</h3>
                <span className={`badge ${
                  bus.direction === 'up' 
                    ? 'badge-primary' 
                    : 'badge-secondary'
                }`}>
                  {bus.direction === 'up' ? '→ Moodbidri' : '← Belthangady'}
                </span>
              </div>

              <div className="flex items-center gap-1 my-2 overflow-x-auto py-2 no-scrollbar">
                {limitedStops.map((stop, idx) => (
                  <div key={idx} className="flex items-center shrink-0">
                    {stop === '...' ? (
                      <div className="text-gray-500 px-1">...</div>
                    ) : (
                      <>
                        <div
                          className={`rounded-full min-w-6 h-6 px-1 flex items-center justify-center text-xs ${
                            idx === 0
                              ? "bg-primary text-white"
                              : idx === limitedStops.length - 1
                              ? "bg-secondary text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          {stop}
                        </div>
                        {idx < limitedStops.length - 1 && stop !== '...' && (
                          <div className="w-4 h-1 bg-gray-300"></div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Dep:</span> {bus.departure}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Arr:</span> {bus.arrival}
                  </p>
                </div>
                
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-primary">
                  Track my Bus
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}