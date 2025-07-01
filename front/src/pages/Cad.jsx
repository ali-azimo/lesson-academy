import React from 'react'
import { Link } from 'react-router-dom';

export default function Cad() {
  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Cadastro</h1>
      <form action="" className='flex flex-col gap-2'>
        <input type="text" placeholder='username' className='border border-gray-300 rounded-lg p-2  outline-none' />
        <input type="email" placeholder='email' className='border border-gray-300 rounded-lg p-2 outline-none mt-3' />
        <input type="password" placeholder='password' className='border border-gray-300 rounded-lg p-2 outline-none mt-3' />
        <button className='bg-blue-500 text-white p-2 rounded-lg mt-3 cursor-pointer hover:bg-blue-600 uppercase'>Cadastrar</button>
      </form>
      <div className="flex gap-4 mt-4">
        <p className='text-center mt-3'>Já tem uma conta?</p>

        <Link to={"/login"} >
          <p className='text-blue-500 font-semibold mt-3 hover:underline'>Faça login</p>
        </Link>
      </div>
    </div>
  )
}
