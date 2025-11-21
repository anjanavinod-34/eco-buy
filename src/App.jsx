
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import PurchasesList from './pages/PurchasesList'
import AddPurchase from './pages/AddPurchase'
import ImpactDashboard from './pages/ImpactDashboard'
import Edit from './pages/Edit'
import Pnf from './pages/Pnf'





function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/purchase' element={<PurchasesList />}> </Route>
        <Route path='/add' element={<AddPurchase />}> </Route>
        <Route path='/impact' element={<ImpactDashboard />}> </Route>
        <Route path='purchase/:id/edit' element={<Edit />}></Route>
        <Route path='/*' element={<Pnf />}> </Route>



      </Routes>

    </>
  )
}

export default App
