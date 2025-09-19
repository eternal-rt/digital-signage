import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signage from "./components/Signage.jsx"
import Admin from "./components/Admin.jsx"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}
