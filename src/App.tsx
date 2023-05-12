import { useState } from 'react'
import './App.css'
import Input from './components/Input'
import Parson from './components/Parson';


function App() {
  const INPUT = 'input', SHUFFLED = 'shuffled';
  const [currentScreen , setCurrentScreen ] = useState(INPUT);

  let content = null;

  switch (currentScreen ) {
    case INPUT :
      content = <Input nextScreen={() => setCurrentScreen(SHUFFLED)} />;
      break;
    case SHUFFLED :
      content = <Parson back={() => setCurrentScreen(INPUT)} />;
      break;
    default :
  }

  return (
    <>
      {content}
    </>
  )
}

export default App
