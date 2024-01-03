const path = {
  dashboard: '/dashboard',
  all_students: '/all-students',
  add_student: '/add-student',
  login: '/login',
  all_lecturers: '/all-lecturers',
  add_lecturer: '/add-lecturer',
  fee_list: '/fee-list',
  add_fee: '/add-fee',
  course_management: '/course-management',
  timetable_management: '/timetable-management',
  exam_schedule_management: '/exam-schedule-management',
  print_transcript: '/print-transcript',
  all: '*',
  student_confirm_courses: '/student_confirm_courses',
  student_dashboard: '/student-dashboard',
  student_course_register: '/student-course-register',
  student_registered_courses: '/student-registered-courses',
  student_learning_result: '/student-learning-result',
  student_fee_info: '/student-fee-info',
  student_schedule: '/student-schedule',
  student_test_schedule: '/student-test-schedule',
  student_course_register_info: '/student_course_register_info',
  student_conduct_points: '/student-conduct-points',
  student_register_graduation: '/student-register-graduation'
} as const;

export default path;
