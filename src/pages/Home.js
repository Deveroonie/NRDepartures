import '../App.css';
import { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
function DeparturesForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate(`/departures/${name}`)
    }
  
    return (
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <input type="submit" />
      </form>
    )
  }
  function ArrivalsForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate(`/arrivals/${name}`)
    }
  
    return (
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
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