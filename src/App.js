import './App.css';
import RootLayout from './Components/RootLayout/RootLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Student from './Components/Student/Student';
import Mentor from './Components/Mentor/Mentor';
import Admin from './Components/Admin/Admin';
import AdmProfile from './Components/Admin/AdminSidebar/AdmProfile/AdmProfile';
import StdProfile from './Components/Student/StudentSidebar/StdProfile/StdProfile'
import StdAssignments from './Components/Student/StudentSidebar/StdAssignments/StdAssignments'
import StdClasses from './Components/Student/StudentSidebar/StdClasses/StdClasses'
import AdmAssignments from './Components/Admin/AdminSidebar/AdmAssignments/AdmAssignments';
import AdmAttendance from './Components/Admin/AdminSidebar/AdmAttendance/AdmAttendance';
import AdmBatchReport from './Components/Admin/AdminSidebar/AdmBatchReport/AdmBatchReport';
import MtrProfile from './Components/Mentor/MentorSidebar/MtrProfile/MtrProfile';
import MtrAssignments from './Components/Mentor/MentorSidebar/MtrAssignments/MtrAssignments';
import MtrBatchReport from './Components/Mentor/MentorSidebar/MtrBatchReport/MtrBatchReport';
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
          path:"/student",
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
          path:"/mentor",
          element:<Mentor />,
          children:[
            {
              path:'profile1',
              element:<MtrProfile />
            },{
              path:'assignments1',
              element:<MtrAssignments />
            },
            {
              path:'batch-report1',
              element:<MtrBatchReport />
            }
          ]
        },
        {
          path:"/admin",
          element:<Admin />,
          children:[
            {
              path:'profile',
              element:<AdmProfile />
            },{
              path:'assignments',
              element:<AdmAssignments />
            },
            {
              path:'attendance',
              element:<AdmAttendance />
            },
            {
              path:'batch-report',
              element:<AdmBatchReport />
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