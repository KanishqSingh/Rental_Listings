
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router'

import MyBookings from './pages/MyBookings'
import Footer from './Components/Footer'
import Layout from './pages/Owner/Layout'
import DashBoard from './pages/Owner/DashBoard'
import ManageBooking from './pages/Owner/ManageBooking'
import Login from './Components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import AddProperty from './pages/Owner/AddProperty'
import ManageProperty from './pages/Owner/ManageProperty'
import Home from './pages/Home'

const App = () => {

  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  
  return (
    <>
    <Toaster/>
      {
        showLogin && <Login />
      }
      
      {!isOwnerPath && <Navbar />}



      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/property-details/:id' element={<PropertyDetails />}></Route>
        <Route path='/properties' element={<Properties/>}></Route>
        <Route path='/my-bookings' element={<MyBookings />}></Route>

        <Route path='/owner' element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path='add-property' element={<AddProperty />} />
          <Route path='manage-property' element={<ManageProperty />} />
          <Route path='manage-bookings' element={<ManageBooking />} />

        </Route>

      </Routes>

      <Footer />

    </>
  )
}

export default App