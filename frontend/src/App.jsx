import { useContext, useEffect, useState } from "react";
import Routers from "./components/Routers";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import useClient from "./config/useClient";
import Cookies from 'universal-cookie'


function App() {
  const cookies = new Cookies()
  const [accessToken, setAccessToken] = useState(() => {
    if (cookies.get("access_token")) {
      return cookies.get("access_token");
    }
    return null});
  const [refreshToken, setRefreshToken] = useState(() => {
    if (cookies.get("refresh_token")) {
      return cookies.get("refresh_token");
    }
    return null;
  });
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const client = useClient(accessToken)

  console.log(accessToken)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        console.log('1');
        const response = await client.get("/auth/users/details");
        if (response.status === 200) {
          console.log(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        navigate('/login')
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    console.log('1')
    console.log(accessToken)
  }, [])

  return (
    <>
      <Routers />
    </>
  );
}

export default App;
