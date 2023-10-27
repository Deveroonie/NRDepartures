import axios from "axios";
import React, {useEffect, useState} from 'react';

export default function GetProperNameAndManager(data) {
    const [response, setResponse] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`https://huxley2.azurewebsites.net/staffdepartures/${data.stname}`)
            setResponse(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);

      return (
        <p className="text-white text-center">{data.type} for {response.locationName} (managed by {response.stationManager})</p>
      )
}