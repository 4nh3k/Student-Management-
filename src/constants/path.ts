const path = {
  dashboard: '/dashboard',
  all_students: '/all-students',
  add_student: '/add-student',
  login: '/login',
  admin_login: '/admin-login',
  all_lecturers: '/all-lecturers',
  add_lecturer: '/add-lecturer',
  fee_list: '/fee-list',
  add_fee: '/add-fee',
  course_management: '/course-management',
  timetable_management: '/timetable-management',
  exam_schedule_management: '/exam-schedule-management',
  print_transcript: '/print-transcript',
  course_registration: '/course-registration',
  course_confirmation: '/course-confirmation',
  course_registered: '/course-registered',
  student_dashboard: '/student-dashboard',
  student_learning_result: '/student-learning-result',
  student_fee_info: '/student-fee-info',
  student_schedule: '/student-schedule',
  student_test_schedule: '/student-test-schedule',
  student_conduct_points: '/student-conduct-points',
  student_register_graduation: '/student-register-graduation',
  student_transcript: '/student-transcript',
  all: '*'
} as const;

export default path;
