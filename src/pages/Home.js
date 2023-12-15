import '../App.css';
import { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
function DeparturesForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [limit, setLimit] = useState("10")
  
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate(`/departures/${name}?limit=${limit}&utm_source=internal&utm_medium=form&utm_campaign=view_departures_homepage`)
    }
  
    return (
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
          <input 
            type="text" 
            value={name}
            placeholder="The station name"
            onChange={(e) => setName(e.target.value)}
            required
            className="p-4 rounded-lg"
          /><br /><br />
          <input 
            type="number" 
            placeholder="The limit to the departures (default: 10)"
            onChange={(e) => setLimit(e.target.value)}
            min="1"
            max="150"
            className="p-4 mt-1 rounded-lg"
          />
        <input type="submit" />
      </form>
    )
  }
  function ArrivalsForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [limit, setLimit] = useState("10")
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate(`/arrivals/${name}?limit=${limit}&utm_source=internal&utm_medium=form&utm_campaign=view_arrivals_homepage`)
    }
  
    return (
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
          <input 
            type="text" 
            value={name}
            placeholder="The station name"
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-lg"
          />
          <br /><br />
          <input 
            type="number" 
            placeholder="The limit to the departures (default: 10)"
            onChange={(e) => setLimit(e.target.value)}
            min="1"
            max="150"
            className="p-4 mt-1 rounded-lg"
          />
        <input type="submit" />
      </form>
    )
  }
export default function Home() {
    return (
        <div className="container mx-auto p-8 m-10">
            <h1 className='text-white text-center text-3xl'>National Rail Departures</h1><br /><br /><br /><br /><br /><br />
            <h2 className='text-white text-center text-2xl'>Enter a station name or code</h2>
            <p className='text-white text-center text-lg'>Departures</p>
            <DeparturesForm />
            <p className='text-white text-center text-lg'>Arrivals</p>
            <ArrivalsForm />
        </div>
    )
}