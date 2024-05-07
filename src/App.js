import './App.css';
import PBIs from './components/PBIs/PBIs';
import Users from './components/Users/UserList';
import SprintList from './components/Sprints/SprintList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br/>
      <Routes>
        <Route path="pbis" element={<PBIs />} />
        <Route path="sprints" element={<SprintList />} />
        <Route path="users" element={<Users />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
