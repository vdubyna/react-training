import {createContext, useCallback, useMemo, useState} from "react";

export const AuthContext = createContext(null);

const AuthContextProfider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState("");

    const handleAuthorize = useCallback((username) => {
        // TODO verify if user is authorized
        setIsAuth(true);
        setUsername(username);
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuth(false);
        setUsername("");
    }, []);

    const contextValue = useMemo(() => ({
        isAuth: isAuth,
        onAuthorize: handleAuthorize,
        onLogout: handleLogout,
        username: username
    }), [isAuth, username, handleAuthorize, handleLogout]);

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};
export default AuthContextProfider;