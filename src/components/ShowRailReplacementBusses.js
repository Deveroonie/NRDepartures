import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GetStops from './GetCallingStops';
import GetBadge from './GetBadge';
export default function ShowRailReplacementBusses(data) {
    const [response, setResponse] = useState([]);
    const [isBusses, setBusStatus] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://huxley2.azurewebsites.net/${data.type}/${data.stname}/${data.limit}`)
            if(response.data.busServices == null) {
                setBusStatus(false)
            } else {
                setBusStatus(true)
                setResponse(response.data.busServices)
            }
        }

        fetchData()
    }, [])

    if(isBusses) {
        return (
            <div className="grid grid-cols-1 gap-4 text-white">
                <h3 className="text-center text-md">Rail Replacement Busses</h3>
                {response.map((data) => (
                 <div key={data.serviceIdUrlSafe} className="bg-gray-800 rounded-lg p-4">
                    
                    <div className="grid grid-cols-6 grid-rows-1 gap-4">
                        <div>{data.operatorCode}</div>
                        <div>{data.destination.map((d) => (
                            <p>{d.locationName} {d.via}</p>
                        ))}</div>
                        <div>{data.platform || "-"}</div>
                        <div>{data.length}</div>
                        <div>{data.std}</div>
                        <div><GetBadge std={data.std} etd={data.etd}></GetBadge></div>
                        
                    </div>
                    <div ><GetStops id={data.serviceIdUrlSafe} /> {data.cancelReason || data.delayReason}  </div>
                 </div>
                 
            ))}
            </div>
        )
    } else return(<div></div>)
}