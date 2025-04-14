
import NavBar from './components/NavBar'
import './App.css'

function App() {
  console.log(import.meta.env.VITE_CANISTER_ID_BACKEND)
  return (
    <>
      <div>
        <NavBar/>
        
      </div>
      
    </>
  )
}

export default App
