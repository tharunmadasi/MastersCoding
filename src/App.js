import './App.css';
import RootLayout from './Components/RootLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Student from './Components/Student/Student';
import Mentor from './Components/Mentor/Mentor';
import Admin from './Components/Admin/Admin';

function App() {
  const router= createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/login",
          element:<Login />,
        },
        {   
          path:"/Student",
          element:<Student />,
        },
        {
          path:"/Mentor",
          element:<Mentor />,
        },
        {
          path:"/Admin",
          element:<Admin />,
        },
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;