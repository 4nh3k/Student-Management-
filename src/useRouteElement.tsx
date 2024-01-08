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
import AddLecturer from './pages/Lecturer/AddLecturerForm';
import AllLecturer from './pages/Lecturer/AllLecturer';
import Login from './pages/Login';
import AddStudentForm from './pages/Student/AddStudentForm';
import AllStudent from './pages/Student/AllStudent';
import StudentConductPoints from './pages/StudentConductPoints/StudentConductPoints';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentFeeInfo from './pages/StudentFeeInfo/StudentFeeInfo';
import StudentTestSchedule from './pages/StudentTestSchedule/StudentTestSchedule';
import Transcript from './pages/Transcript/Transcript';
import CoursesRegistered from './pages/UserCourseManagement/CoursesRegistered/CoursesRegistered';
import CoursesRegistration from './pages/UserCourseManagement/CoursesRegistration/CoursesRegistration';
import { getProfileFromLS } from './utils/auth';
import AddCourseForm from './pages/CourseManagement/AddCourseForm';
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
    element: <Login userRole={'sv'} />
  },
  {
    path: path.admin_login,
    element: <Login userRole={'nv'} />
  }
];

function AdminRoute(adminElement: JSX.Element, studentElement: JSX.Element) {
  const isAdmin = getProfileFromLS()?.role === 'nv';
  return isAdmin ? adminElement : studentElement;
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <RejectedRoute />,
      children: AuthRouteChildren
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              element: AdminRoute(<Dashboard />, <StudentDashboard />),
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
              path: path.add_course_form,
              element: <AddCourseForm />
            },
            {
              path: path.exam_schedule_management,
              element: <ExamScheduleManagement />
            },
            {
              path: path.student_transcript,
              element: <Transcript />
            },
            {
              path: path.student_fee_info,
              element: <StudentFeeInfo />
            },
            {
              path: path.student_conduct_points,
              element: <StudentConductPoints />
            },
            {
              path: path.student_test_schedule,
              element: <StudentTestSchedule />
            },
            {
              path: path.all,
              element: <Navigate to={path.dashboard} />
            },
            {
              path: path.course_registration,
              element: <CoursesRegistration />
            },
            {
              path: path.course_registered,
              element: <CoursesRegistered />
            }
          ]
        },
        {
          path: path.print_transcript,
          element: <Transcript isPrint={true} />
        }
      ]
    }
  ]);

  return routeElement;
}
