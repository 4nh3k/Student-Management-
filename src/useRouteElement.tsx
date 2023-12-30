import {
  Navigate,
  Outlet,
  useRoutes,
  type RouteObject
} from 'react-router-dom';
import path from './constants/path';
import { useAppContext } from './contexts/app.contexts';
import MainLayout from './layouts/MainLayout';
import CourseManagement from './pages/CourseManagement/CourseManagement';
import Dashboard from './pages/Dashboard/Dashboard';
import ExamScheduleManagement from './pages/ExamScheduleManagement/ExamScheduleManagement';
import AddFee from './pages/Fee/AddFee';
import FeeList from './pages/Fee/FeeList';
import AddLecturer from './pages/Lecturer/AddLecturer';
import AllLecturer from './pages/Lecturer/AllLecturer';
import Login from './pages/Login';
import AddStudentForm from './pages/Student/AddStudentForm';
import AllStudent from './pages/Student/AllStudent';
import Transcript from './pages/Transcript/Transcript';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
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
        {
          path: path.timetable_management,
          element: <Transcript />
        },
        {
          path: path.all,
          element: <Navigate to={path.dashboard} />
        },
        {
          path: '/student-dashboard',
          element: <StudentDashboard />
        }
      ]
    },
    {
      element: <Login />,
      path: path.login
    },
    {
      path: path.print_transcript,
      element: <Transcript isPrint={true} />
    }
  ]);

  return routeElement;
}
