import axios from 'axios';
import React, {useEffect, useState} from 'react';

export default function GetStops(data) {

    const [response, setResponse] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://huxley2.azurewebsites.net/service/${data.id}`);
          if(response.data.subsequentCallingPoints == null) {
            setResponse([
              {
                "locationName": "No stops found. Does this train terminate here?",
                "st": "",
              }])
          } else {
            setResponse(response.data.subsequentCallingPoints[0].callingPoint);
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, []);


    return (
      <div>
        Calling at:&nbsp;
        {response.map((data, index, array) => (
          <span key={index}>
            {data.locationName}
            {data.st !== "" && ` (${data.st})`}
            {index !== array.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    );
    
    
}