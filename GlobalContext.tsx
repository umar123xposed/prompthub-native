import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
type GlobalContextType = {
  ID: { id: string | null }; // ID can be null initially
  setID: (newID: { id: string }) => void; // Function to update ID
};

// Create the context with a default value
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [ID, setID] = useState<{ id: string | null }>({ id: null });

  return (
    <GlobalContext.Provider value={{ ID, setID }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for accessing context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
