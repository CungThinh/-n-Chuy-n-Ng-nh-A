// FlightSearchResult.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import FlightList from "./components/FlightResult";
import LoadingComponent from "./components/LoadingSpinner";

const FlightSearchResult = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState("outbound");
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const engine = searchParams.get("engine");
    const departure_id = searchParams.get("departure_id");
    const arrival_id = searchParams.get("arrival_id");
    const outbound_date = searchParams.get("outbound_date");
    const return_date = searchParams.get("return_date");
    const currency = searchParams.get("currency");
    const hl = searchParams.get("hl");
    const api_key = searchParams.get("api_key");

    if (engine && departure_id && arrival_id && outbound_date && api_key) {
      fetchOutboundFlights({
        engine,
        departure_id,
        arrival_id,
        outbound_date,
        return_date, // Hide return_date when fetching outbound flights
        currency,
        hl,
        api_key,
      });
    }
  }, [searchParams]);

  // Trong hàm fetchOutboundFlights và fetchReturnFlights
  const fetchOutboundFlights = async (params) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/flights", { params });
      console.log("Outbound Flights Data:", response.data); // Thêm dòng này
      setOutboundFlights(response.data.best_flights || []);
    } catch (error) {
      console.error("Error fetching outbound flights:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReturnFlights = async (params) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/flights", { params });
      setReturnFlights(response.data.best_flights || []);
    } catch (error) {
      console.error("Error fetching return flights:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOutboundFlight = (flight) => {
    setSelectedOutboundFlight(flight);
    setStep("return");
    const engine = searchParams.get("engine");
    const departure_id = searchParams.get("departure_id");
    const arrival_id = searchParams.get("arrival_id");
    const return_date = searchParams.get("return_date");
    const currency = searchParams.get("currency");
    const hl = searchParams.get("hl");
    const api_key = searchParams.get("api_key");

    if (engine && departure_id && arrival_id && return_date && api_key) {
      fetchReturnFlights({
        engine,
        departure_id: arrival_id, // Swap departure and arrival
        arrival_id: departure_id,
        outbound_date: return_date, // Use return_date as outbound_date
        return_date, // Hide return_date when fetching return flights
        currency,
        hl,
        api_key,
      });
    }
  };

  const handleSelectReturnFlight = (flight) => {
    setSelectedReturnFlight(flight);
    // Proceed to the next step or display a summary
    // For example, redirect to a booking confirmation page
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      {step === "outbound" ? (
        <FlightList
          flights={outboundFlights}
          onSelectFlight={handleSelectOutboundFlight}
          leg="outbound"
        />
      ) : (
        <FlightList
          flights={returnFlights}
          onSelectFlight={handleSelectReturnFlight}
          leg="return"
        />
      )}
    </div>
  );
};

export default FlightSearchResult;
