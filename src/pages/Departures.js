import '../App.css';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GetStops from '../components/GetCallingStops';
import GetProperNameAndManager from '../components/GetProperNameAndManager';
import ShowDelayWarning from '../components/ShowDelayWarning';

export default function Departures() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState([]);
    const { id } = useParams();
    const limit = searchParams.get('limit');

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://huxley2.azurewebsites.net/departures/${id}/${limit || 10}`);
          setResponse(response.data.trainServices);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, []);
    return (
        <div className="container mx-auto p-8 m-10">
        <ShowDelayWarning stname={id} type="departures" limit={limit} />
            <h1 className='text-white text-center text-3xl'>National Rail Departures</h1><br />
            <p className='text-white text-center text-lg'><a href={`/arrivals/${id}?limit=${limit || 10}`}>Switch to arrivals</a></p><br />
            <GetProperNameAndManager stname={id} type="Departures" />
        <div className="grid grid-cols-6 grid-rows-1 gap-4 text-white text-md">
        <div >Operator</div>
        <div >Destination</div>
        <div >Platform</div>
        <div >Coaches</div>
        <div >Due</div>
        <div >Expected</div>
        </div>            
        <div className="grid grid-cols-1 gap-4 text-white" style={{paddingTop: "16px"}}>
            {response.map((data) => (
                 <div key={data.serviceIdUrlSafe} className="bg-gray-800 rounded-lg p-4">
                
                    <div className="grid grid-cols-6 grid-rows-1 gap-4">
                        <div >{data.operatorCode}</div>
                        <div >{data.destination.map((d) => (
                            <p>{d.locationName} {d.via}</p>
                        ))}</div>
                        <div >{data.platform || "-"}</div>
                        <div >{data.length}</div>
                        <div >{data.std}</div>
                        <div >{getBadge(data.std,data.etd)}</div>
                        
                    </div>
                    <div ><GetStops id={data.serviceIdUrlSafe} /> {data.cancelReason || data.delayReason}  </div>
                 </div>
                 
            ))}
        </div>
        </div>
    )
    function getBadge(std,etd) {
        if(std !== etd && etd !== "Cancelled" && etd !== "On time") {
            return (<span className="bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{etd}</span>)
        } else if (etd === "Cancelled") {
            return (<span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">Cancelled</span>)
        } else if(etd === "On time") {
            return "On time"
        }
    }
}