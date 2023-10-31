import React, { createContext } from 'react';
// Create a new context
const DashboardContext = createContext();

const DashBoardProvider = ({ children }) => {


    const dashboardContextValue =
    {

    };

    return (
        <DashboardContext.Provider value={dashboardContextValue}>
            {children}
        </DashboardContext.Provider>
    );
}; export { DashboardContext, DashBoardProvider };
