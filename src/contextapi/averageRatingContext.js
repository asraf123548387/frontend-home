import React, { createContext, useContext, useState } from 'react';

const AverageRatingContext = createContext();

export const useAverageRating = () => useContext(AverageRatingContext);

export const AverageRatingProvider = ({ children }) => {
  const [averageRating, setAverageRating] = useState(0);

  return (
    <AverageRatingContext.Provider value={{ averageRating, setAverageRating }}>
      {children}
    </AverageRatingContext.Provider>
  );
};
