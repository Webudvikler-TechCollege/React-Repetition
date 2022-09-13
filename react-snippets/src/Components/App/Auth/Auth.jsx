/**
 * Følgende kode laver et komponent (<AuthProvider>) som kan 
 * transportere data ned i gennem reacts komponent hieraki.
 * Det betyder at vi nemt kan hente en brugers logindata fra alle 
 * child components via et useState hook i et højere rangerende 
 * komponent. 
 * Derfor skal AuthProvider komponentet placeres 
 * så højt som muligt i hierakiet - eksempelvis i filen /src/index.js
 * Filens custom hook (useAuth) bruges desuden på Login siden.
 */
import { createContext, useContext, useEffect, useState } from "react";

// Initialiserer auth context
const AuthContext = createContext();

// Definerer Contekst Provider
// med props.children som tilstandsværdi
const AuthProvider = ({ children }) => {
	const [loginData, setLoginData] = useState('')

	// Opdater loginData med data fra sessionstorage hvis det findes
	useEffect(() => {
		if(sessionStorage.getItem('token')) {
			setLoginData(JSON.parse(sessionStorage.getItem('token')))
		}
	}, [children])

	// Returner provider
	// Alle childs af denne får adgang til logindata
	return (
		<AuthContext.Provider value={{loginData,setLoginData}}>
			{children}
		</AuthContext.Provider>
	)
}

// Definerer custom hook
// Gør at vi nemt kan kalde context
// Eksempel: const { loginData } = useAuth()
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth }