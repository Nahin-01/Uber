import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedData() {
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "https://dev-rfpqaxunspryydeu.us.auth0.com/api/v2/",
        });

        const response = await fetch("http://localhost:5000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setMessage(data.message);
      } catch (e) {
        setMessage("Error fetching data");
      }
    };

    fetchProtected();
  }, [getAccessTokenSilently]);

  return <div>{message}</div>;
}

export default ProtectedData;
