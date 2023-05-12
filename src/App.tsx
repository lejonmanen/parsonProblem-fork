import './App.css'
import Input from './components/Input'
import Parson from './components/Parson';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Input />
        } />
        <Route path="/:parsonId" element={
          <Parson />
        } />
      </Routes>
    </>
  )
}

export default App
