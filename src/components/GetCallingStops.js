import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function GetStops(data) {

    const [response, setResponse] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://huxley2.azurewebsites.net/service/${data.id}`);
          setResponse(response.data.subsequentCallingPoints[0].callingPoint);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, []);


    return(
        <div>
            Calling at:&nbsp;
        {response.map((data) => (
            <span>{data.locationName},&nbsp;</span>
        ))}
        </div>
    )
}