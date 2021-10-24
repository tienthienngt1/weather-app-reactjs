import {createContext} from "react"

export const AppContext = createContext();

const AppProvider = ({children}) => {
    
    const data = {}
    return (
        <AppContext.Provider data = {data}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;