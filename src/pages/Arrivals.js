import '../App.css';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactGA4 from 'react-ga4';
import GetStops from '../components/GetCallingStops';
import GetBadge from '../components/GetBadge';
import GetProperNameAndManager from '../components/GetProperNameAndManager';
import ShowDelayWarning from '../components/ShowDelayWarning';
import ShowRailReplacementBusses from '../components/ShowRailReplacementBusses';

export default function Arrivals() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState([]);
    const { id } = useParams();
    const limit = searchParams.get('limit');


    useEffect(() => {
        async function sendToGA() {
            ReactGA4.send({
                hitType: 'event',
                eventCategory: ``,
                eventAction: 'Arrivals View',
                eventLabel: ``,
                stationViewed: id,
                limit: limit || 10
              });
           }
      async function fetchData() {
        try {
          const response = await axios.get(`https://huxley2.azurewebsites.net/arrivals/${id}/${limit || 10}`);
          console.log(response.data)
          if(response.data.trainServices == null && response.data.busServices == null) {
            setResponse([
                {
                    "operatorCode": "",
                    "destination": [
                        {
                            "locationName": ""
                        }
                    ],
                    "platform": " ",
                    "length": "",
                    "std": "",
                    "etd": "",
                    "serviceIdUrlSafe": "ERRNOSRVCES"
                }
            ])
          } else {
            if(response.data.trainServices == null && response.data.busServices !== null) {
                console.log("NO TS // IS BS")
                setResponse([
                    {
                        "operatorCode": "",
                        "destination": [
                            {
                                "locationName": ""
                            }
                        ],
                        "platform": " ",
                        "length": "",
                        "std": "",
                        "etd": "",
                        "serviceIdUrlSafe": "ERRDONTDISPLAY"
                    }
                ])
            } else {
                console.log("WE ARE AT THE POINT")
                setResponse(response.data.trainServices);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      sendToGA()
      fetchData();

      console.log(response)
    }, []);
    return (
        <div className="container mx-auto p-8 m-10">
                    <ShowDelayWarning stname={id} type="arrivals" limit={limit} />
            <h1 className='text-white text-center text-3xl'>National Rail Departures</h1><br />
            <p className='text-white text-center text-lg'><a href={`/departures/${id}?limit=${limit || 10}`}>Switch to departures</a></p><br />
            <GetProperNameAndManager stname={id} type="Arrivals" />
            <div className="grid grid-cols-6 grid-rows-1 gap-4 text-white text-md">
        <div>Operator</div>
        <div>Destination</div>
        <div>Platform</div>
        <div>Coaches</div>
        <div>Due</div>
        <div>Expected</div>
        </div>            
        <div className="grid grid-cols-1 gap-4 text-white" style={{paddingTop: "16px"}}>
            {response.map((data) => (
                data.serviceIdUrlSafe !== 'ERRDONTDISPLAY' && (
                  <div key={data.serviceIdUrlSafe} className="bg-gray-800 rounded-lg p-4">
                    <div className="grid grid-cols-6 grid-rows-1 gap-4">
                      <div>{data.operatorCode}</div>
                      <div>
                        {data.destination.map((d) => (
                          <p>
                            {d.locationName} {d.via}
                          </p>
                        ))}
                      </div>
                      <div>{data.platform || "-"}</div>
                      <div>{data.length}</div>
                      <div>{data.sta}</div>
                      <div>
                        <GetBadge std={data.std} etd={data.etd}></GetBadge>
                      </div>
                    </div>
                    <div>
                      <GetStops id={data.serviceIdUrlSafe} /> {data.cancelReason || data.delayReason}
                    </div>
                  </div>
  )
))}

            <ShowRailReplacementBusses type="arrivals" stname={id} limit={limit || 10}></ShowRailReplacementBusses>
        </div>
        </div>
    )
}
