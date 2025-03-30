import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Pastes from './components/Pastes'
import { ViewPaste } from './components/ViewPaste'
import '@fontsource/bona-nova-sc'; 


const router = createBrowserRouter(
  [
    {path: '/',
      element: 
      <div>
        <Nav/>
        <Home/>
      </div>
    },

    {path: '/pastes',
      element: 
      <div>
        <Nav/>
        <Pastes/>
      </div>
    },

    {path: '/pastes/:id',
      element: 
      <div>
        <Nav/>
        <ViewPaste/>
      </div>
    },

    {path: '*',
      element: 
      <div>
        Error, Page not found
      </div>
    },
  ])

function App() {
  return (
    <>
      <RouterProvider router = {router}/>
    </>
  )
}

export default App
