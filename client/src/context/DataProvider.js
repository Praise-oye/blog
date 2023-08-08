import { createContext, useState } from "react";

// Create a context for sharing data
export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({ name: '', username: '' });

    return (
        // Provide the account state and setAccount function to the children components through the DataContext
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;
