
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import MyBookings from './Pages/MyBookings'
import Footer from './Components/Footer'
import Layout from './Pages/Owner/Layout'
import DashBoard from './Pages/Owner/DashBoard'
import ManageBooking from './Pages/Owner/ManageBooking'
import Login from './Components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Properties from './Pages/Properties'
import PropertyDetails from './Pages/PropertyDetails'
import AddProperty from './Pages/Owner/AddProperty'
import ManageProperty from './Pages/Owner/ManageProperty'

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