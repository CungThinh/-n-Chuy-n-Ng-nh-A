import { createContext, useContext, useState } from "react";

const FlightContext = createContext();

export const useFlight = () => useContext(FlightContext);

export const FlightProvider = ({ children }) => {
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

  return (
    <FlightContext.Provider
      value={{
        selectedOutboundFlight,
        setSelectedOutboundFlight,
        selectedReturnFlight,
        setSelectedReturnFlight,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
