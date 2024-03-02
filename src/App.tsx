import AuthLayout from './_auth/forms/AuthLayout';
import SignUpForms from './_auth/forms/SignUpForms';
import SigninForms from './_auth/forms/SigninForms';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import './globals.css';
import {Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}

            <Route element={<AuthLayout/>}>
        
        <Route path='/sign-in' element={<SigninForms/>}/>
        <Route path='/sign-up' element={<SignUpForms/>}/>
        </Route>


            {/* private Routes */}
            <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            </Route>
        </Routes>
    </main>
  )
}

export default App