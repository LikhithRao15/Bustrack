import { FaBus, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar bg-base-100 shadow-lg px-4 sm:px-8 sticky top-0 z-50">
      <div className="flex-1 flex gap-2">
        <a className='flex gap-2' href="/">
          <FaBus className="text-2xl text-primary" />
        <span className="text-xl font-bold">TrackMyBus</span>
          </a>
      </div>
      
      <nav className="hidden md:flex">
        <ul className="menu menu-horizontal space-x-2">
          <li><Link to="/" className="font-medium">Bus Schedule</Link></li>
          <li><Link to="/livetrack" className="font-medium">Live Track</Link></li>
          <li><a className="font-medium" onClick={()=>{toast.success('comming soon')}}>Fares</a></li>
          <li><Link to="/contact" className="font-medium">Contact</Link></li>
        </ul>
      </nav>

      <div className="md:hidden">
        <button 
          className="btn btn-ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-4 text-black bg-white shadow-lg rounded-box p-4 z-50 w-56 md:hidden">
          <ul className="menu space-y-2">
            <li><a className="font-medium">Bus Schedule</a></li>
            <li><a className="font-medium">Spot My Bus</a></li>
            <li><a className="font-medium" onClick={()=>{toast.success('comming soon')}}>Fares</a></li>
            <li><a className="font-medium">Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}