import React, {useState,useEffect} from "react";
import axios from "axios";
import ReactGA4 from 'react-ga4';

export default function ShowDelayWarning(data) {
  const [response, setResponse] = useState([]);
  const [nrccExists, setNrccExists] = useState([])
  const [nrcc, setNrcc] = useState([])
  useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://nrdeparturesdelaysapi.cyclic.app/api/v1/${data.type}/${data.stname}?limit=${data.limit || 10}`)
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
      async function fetchNRCCMessages() {
        const response = await axios.get(`https://huxley2.azurewebsites.net/staffdepartures/${data.stname}`)
        if(response.data.nrccMessages == null) {
          setNrccExists(false)
        } else {
          setNrccExists(true)
          setNrcc(response.data.nrccMessages)
        }
      }
      fetchNRCCMessages();
      fetchData();
    }, []);
    
    function ShowNrccMessages() {
      if(nrccExists == false) { 
        return(
          <div></div>
        )
      } else {
        return(
          <div>
            {nrcc.map((data) => (
          <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
          <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: data.xhtmlMessage.replace(/\n/g, "") }} />
            </div>
          </div>
        </div>
        ))}
          </div>
        )
      }
    }
    if(response.mostServicesDelayed && !response.areOperatorsDelayed) { // most trains delayed: yes, operator delayed: no
      return (
        <div>
          <ShowNrccMessages />
          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Delay warning</p>
            <p>Most trains are delayed or cancelled.</p>
          </div>
        </div>
      )
    } else if (response.areOperatorsDelayed && !response.mostServicesDelayed) { // most trains delayed: no, operator delayed: yes
      return (
        
      <div>
      <ShowNrccMessages />
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
          <ShowNrccMessages />
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
    } else if(!response.areOperatorsDelayed && !response.mostServicesDelayed) {
      return (
        <div>
          <ShowNrccMessages />
        </div>
      )
    }

}
