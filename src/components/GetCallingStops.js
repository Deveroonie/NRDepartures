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
    function reload() {
      window.location.reload(false)
    }
    if(data.id == "ERRNOSRVCES") {
      return (
        <div>
          Failed to load services. <a onClick={reload} className="cursor-pointer underline">Click here to retry</a> or <a href="/?utm_source=internal&utm_medium=link&utm_campaign=go_to_homepage_error" className="cursor-pointer underline">  click here to return to the homepage</a>.
        </div>
      )
    } else {
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

    
    
}