import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "./component/pages/LandingPage"
import DashBoard from "./component/pages/DashBoard"
import { Signup } from "./component/pages/Signup"
import { Signin } from "./component/pages/Signin"
import { Share } from "./component/pages/Share"
import { ThemeProvider } from "./context/ThemeContext"
import { Layout } from "./component/Layout"


import { Toaster } from 'react-hot-toast';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return <GoogleOAuthProvider clientId="819342017971-qo4gdfl7sh8h916o3fo9ega029rgnk36.apps.googleusercontent.com">
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/share/:shareId" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </GoogleOAuthProvider>
}

export default App
