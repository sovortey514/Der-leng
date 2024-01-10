import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const contextValue = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}