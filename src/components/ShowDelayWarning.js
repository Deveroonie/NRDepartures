import React, {useState,useEffect} from "react";
import axios from "axios";
import ReactGA4 from 'react-ga4';

export default function ShowDelayWarning(data) {
  const [response, setResponse] = useState([]);
  useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://nrdeparturesdelaysapi.cyclic.app/api/v1/${data.type}/${data.stname}?limit=${data.limit}`)
          //const response = await axios.get(`http://localhost:5000/api/v1/${data.type}/${data.stname}?limit=${data.limit}`)
          ReactGA4.send({
            hitType: 'event',
            eventCategory: ``,
            eventAction: 'Show Delay Warning',
            eventLabel: ``,
            stationViewed: data.stname,
            type: data.type,
            limit: data.limit || 10,
            services: response.data.services,
            delayedServices: response.data.delayedServices,
            onTimeServices: response.data.onTimeServices,
            operators: response.data.operators,
            delayedOperators: response.data.delayedOperators,
            mostServicesDelayed: response.data.mostServicesDelayed,
            areOperatorsDelayed: response.data.areOperatorsDelayed
          });
          setResponse(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      async function sendToGA() {
        
      }
      
      fetchData();
      sendToGA();
    }, []);
    if(response.mostServicesDelayed && !response.areOperatorsDelayed) { // most trains delayed: yes, operator delayed: no
      return (
        <div>
          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Delay warning</p>
            <p>Most trains are delayed or cancelled.</p>
          </div>
        </div>
      )
    } else if (response.areOperatorsDelayed && !response.mostServicesDelayed) { // most trains delayed: no, operator delayed: yes
      return (
      <div>
      <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold">Delay warning</p>
        <p>Some or all operators that call at this station have delays ({response.delayedOperators.map((data) => (
          <span>{data}, </span>
        ))}). Please check <a href="https://nrstatus.deveroonie.uk">the National Rail status</a> for more information.</p>
      </div>
    </div>
      )
    } else if (response.areOperatorsDelayed && response.mostServicesDelayed) { // most trains delayed: yes, operator delayed: yes
      return (
        <div>
          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Delay warning</p>
            <p>Most trains are delayed or cancelled.</p>
          </div>
          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p>Some or all operators that call at this station have delays ({response.delayedOperators.map((data) => (
          <span>{data}, </span>
        ))}). Please check <a href="https://nrstatus.deveroonie.uk">the National Rail status</a> for more information.</p>
      </div>
        </div>
      )
    }

}