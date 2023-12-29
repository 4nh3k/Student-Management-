import {
  Navigate,
  Outlet,
  type RouteObject,
  useRoutes
} from 'react-router-dom';
import path from './constants/path';
import Login from './pages/Login';
import { useAppContext } from './contexts/app.contexts';
import MainLayout from './layouts/MainLayout';
import AllStudent from './pages/Student/AllStudent';
import Dashboard from './pages/Dashboard/Dashboard';
import AddStudentForm from './pages/Student/AddStudentForm';
import AllLecturer from './pages/Lecturer/AllLecturer';
import AddLecturer from './pages/Lecturer/AddLecturer';
import FeeList from './pages/Fee/FeeList';
import AddFee from './pages/Fee/AddFee';
import CourseManagement from './pages/CourseManagement/CourseManagement';
import ExamScheduleManagement from './pages/ExamScheduleManagement/ExamScheduleManagement';
function ProtectedRoute() {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useAppContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

const AuthRouteChildren: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  }
];

export default function useRouteElement() {
  const routeElement = useRoutes([
    // {
    //   element: <RejectedRoute />,
    //   children: [
    //     {
    //       element: <MainLayout />,
    //       children: AuthRouteChildren
    //     }
    //   ]
    // },
    // Main Layout
    // {
    //   element: <ProtectedRoute />,
    //   children: [{}]
    // },
    //Handle Not Found page
    // {
    //   element: <NotFound />,
    //   path: path.all
    // }
    {
      element: <MainLayout />,
      children: [
        {
          element: <Dashboard />,
          path: path.dashboard
        },
        {
          element: <AllStudent />,
          path: path.all_students
        },
        {
          element: <AddStudentForm />,
          path: path.add_student
        },
        {
          path: path.all_lecturers,
          element: <AllLecturer />
        },
        {
          path: path.add_lecturer,
          element: <AddLecturer />
        },
        {
          path: path.fee_list,
          element: <FeeList />
        },
        {
          path: path.add_fee,
          element: <AddFee />
        },
        {
          path: path.course_management,
          element: <CourseManagement />
        },
        {
          path: path.exam_schedule_management,
          element: <ExamScheduleManagement />
        },
      ]
    },
    {
      element: <Login />,
      path: path.login
    }
  ]);

  return routeElement;
}
