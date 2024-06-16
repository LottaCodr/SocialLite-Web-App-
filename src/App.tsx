import AuthLayout from './_auth/forms/AuthLayout';
import SignUpForms from './_auth/forms/SignUpForms';
import SigninForms from './_auth/forms/SigninForms';
import RootLayout from './_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Explore, Home, LikedPost, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css';
import {Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster"




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
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:id' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profile/>}/>
            <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
            <Route path='/liked-post/:id' element={<LikedPost/>}/>
            </Route>
        </Routes>

        <Toaster/>
    </main>
  )
}

export default App