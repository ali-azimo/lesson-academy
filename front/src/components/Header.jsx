import {FaSearch} from  'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-black/600 px-3 py-2 shadow-md sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
           <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex-wrap cursor-pointer'>
                    <span className='text-slate-500 '>Family</span>
                    <span className='text-slate-700'>Shopping</span>
                </h1>
           </Link>
            <form 
               
                 className='border border-blue-300 p-2 rounded-lg flex items-center cursor-pointer'>
                <input type="text" placeholder='Pesquisar...' className='bg-transparent focus:outline-none w-30 sm:w-64' 
                
                />
                <button>
                    <FaSearch className='text-slate-600'/> 
                </button>
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
                </Link>
                <Link to='/login'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
