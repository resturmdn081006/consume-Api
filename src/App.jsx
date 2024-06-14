import React, { useState } from 'react'
import Title from "./components/Title"
import Card from './components/Card'
import Case from './components/Case'

export default function App() {
  const [name, setName] = useState('PPLG') //state = variable
  return (
    <Case>
    <div className='bg-gray-900 flex flex-col items-center justify-center min-h-screen'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6 mb-4" >
          <Title name= "Dashboard" page="Home" lang="ReactJS" />
            <h4 className='text-white text-2xl'>Hello {name}</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>A JavaScript library for building user interfaces</p>
 
        </div>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
           <Card judul="Profuktif ReactJS" content="React JS adalah library JavaScript yang digunakan untuk membangun UI website atau aplikasi.  React JS hanya mengurusi semua hal yang berkaitan dengan tampilan dan logika di sekitarnya"/>
</div>
    </div>
    </Case>

  )
}