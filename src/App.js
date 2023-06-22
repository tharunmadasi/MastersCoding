import './App.css';
import RootLayout from './Components/RootLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Student from './Components/Student/Student';
import Mentor from './Components/Mentor/Mentor';
import Admin from './Components/Admin/Admin';
import Profile from './Components/SideBar/Profile/Profile';
import StdProfile from './Components/Student/StudentSidebar/Profile/Profile'
import StdAssignments from './Components/Student/StudentSidebar/Assignments/Assignments'
import StdClasses from './Components/Student/StudentSidebar/Classes/Classes'
import Assignments from './Components/SideBar/Assignments/Assignments';
import Attendance from './Components/SideBar/Attendance/Attendance';
import BatchReport from './Components/SideBar/BatchReport/BatchReport';
import Profile1 from './Components/SideBar1/Profile1/Profile1';
import Assignments1 from './Components/SideBar1/Assignments1/Assignments1';
import BatchReport1 from './Components/SideBar1/BatchReport1/BatchReport1';

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
          element:<Login />
        },
        {   
          path:"/Student",
          element:<Student />,
          children:[
            {
              path:'profile',
              element:<StdProfile/>
            },
            {
              path:'assignments',
              element:<StdAssignments/>
            },
            {
              path:'classes',
              element:<StdClasses/>
            }
          ]
        },
        {
          path:"/Mentor",
          element:<Mentor />,
          children:[
            {
              path:'profile1',
              element:<Profile1 />
            },{
              path:'assignments1',
              element:<Assignments1 />
            },
            {
              path:'batch-report1',
              element:<BatchReport1 />
            }
          ]
        },
        {
          path:"/Admin",
          element:<Admin />,
          children:[
            {
              path:'profile',
              element:<Profile />
            },{
              path:'assignments',
              element:<Assignments />
            },
            {
              path:'attendance',
              element:<Attendance />
            },
            {
              path:'batch-report',
              element:<BatchReport />
            }
          ]
        }
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