import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashBoard from "./component/pages/DashBoard"
import { Signup } from "./component/pages/Signup"
import { Signin } from "./component/pages/Signin"
import { Share } from "./component/pages/Share"


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/share/:shareId" element={<Share/>}/>

    </Routes>
  </BrowserRouter>

}

export default App
