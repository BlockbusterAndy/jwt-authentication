import {BrowserRouter, Route, Routes, redirect} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Register from "./pages/Register"
import Secret from "./pages/Secret"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/secret" element={<Secret />} />
      </Routes>
     </BrowserRouter>
  )
}

export default App
