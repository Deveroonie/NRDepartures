import React, {useState,useEffect} from "react";
import axios from "axios";

export default function ShowDelayWarning(data) {
  const [response, setResponse] = useState([]);
  useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://nrdeparturesdelaysapi.cyclic.app/api/v1/${data.type}/${data.stname}?limit=${data.limit}`)
          //const response = await axios.get(`http://localhost:5000/api/v1/${data.type}/${data.stname}?limit=${data.limit}`)

          setResponse(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
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