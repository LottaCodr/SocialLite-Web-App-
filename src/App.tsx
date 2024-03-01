import SigninForms from './_auth/forms/SigninForms';
import { Home } from './_root/pages';
import './globals.css';
import {Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}
        
        <Route path='/sign-in' element={<SigninForms/>}/>


            {/* private Routes */}
            <Route index element={<Home/>}/>
        </Routes>
    </main>
  )
}

export default App