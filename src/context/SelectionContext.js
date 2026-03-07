/**
 * Context provider for managing selected items in the application.
 *
 * @typedef {object} SelectionContextProviderProps
 * @property {React.ReactNode} children - Child components that will have access to the context
 * 
 * @returns {JSX.Element} A context provider component
 */

import { createContext, useContext, useState } from "react";

const SelectionContext = createContext(0);

export default function SelectionContextProvider({ children }) {
    // Hooks
    const [selectedItem, setSelected] = useState({})

    // Provider
    return <SelectionContext.Provider value = {{ selectedItem, setSelected}}>{ children }</SelectionContext.Provider>
}

/**
 * Hook to access the selection context.
 * 
 * @returns {object} An object containing selectedItem and setSelected function
 * @throws {Error} If used outside of SelectionContextProvider
 */
export function useSelectionContext() {
  return useContext(SelectionContext);
}