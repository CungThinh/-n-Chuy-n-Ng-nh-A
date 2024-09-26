import React from 'react';
import SortOptions from './components/SortOptions';
import ProgressSteps from './components/ProgressStep';
import FlightResult from './components/FlightResult';

const FlightSearchResult = () => {
  return (
    <div>
        <ProgressSteps>
        </ProgressSteps>
        <SortOptions>
        </SortOptions>
        <FlightResult>
        </FlightResult>
    </div>
  )
};

export default FlightSearchResult;