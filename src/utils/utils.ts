import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';

export const isAxiosUnprocessableEntityError = <FormError>(
  error: unknown
): error is AxiosError<FormError> =>
  isAxiosError(error) &&
  error.response?.status === HttpStatusCode.UnprocessableEntity;

export const isActiveRoute = (pathname: string, keyword: string) => {
  return pathname.split('/')[1] === keyword;
};

export const formatGrade = (grade: number) => {
  const formattedGrade = Number.isInteger(grade)
    ? grade.toString()
    : grade.toFixed(1);
  return formattedGrade;
};

export const averageGrade = (grades: number[]) => {
  const total = grades.reduce((acc, grade) => acc + grade, 0);
  return formatGrade(total / grades.length);
};

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function getWeekday(date: Date) {
  // Create a new Date object from the input string

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Array of weekday names
  const weekdays = ['CN', '2', '3', '4', '5', '6', '7'];

  // Return the corresponding weekday name
  return weekdays[dayOfWeek];
}

export const calculateSemesterFilter = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  let tenHocKy = '';
  let tenNamHoc = '';

  if ((currentMonth >= 9 && currentMonth <= 12) || currentMonth === 1) {
    tenHocKy = 'kỳ 1';
    tenNamHoc =
      currentMonth === 1
        ? `${currentDate.getFullYear() - 1}-${currentDate.getFullYear()}`
        : `${currentDate.getFullYear()}-${currentDate.getFullYear() + 1}`;
  } else if (currentMonth >= 2 && currentMonth <= 6) {
    // Từ tháng 2 đến tháng 7 là kỳ 2 của năm học hiện tại
    tenHocKy = 'kỳ 2';
    tenNamHoc = `${currentDate.getFullYear() - 1}-${currentDate.getFullYear()}`;
  } else if (currentMonth >= 7 && currentMonth <= 8) {
    // Từ tháng 8 đến tháng 9 là kỳ hè của năm học hiện tại
    tenHocKy = 'kỳ hè';
    tenNamHoc = `${currentDate.getFullYear()}-${currentDate.getFullYear() + 1}`;
  }

  return {
    filterBy: {
      tenHocKy,
      tenNamHoc
    }
  };
};

export function isoStringToDdMmYyyy(isoString: string) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function validateName(name: string) {
  let isValidName = true;
  if (
    /[!@#$%^&*(),.?":{}|<>]/g.test(name) ||
    !/^[A-Z]/.test(name) ||
    /\d+/g.test(name)
  ) {
    isValidName = false;
  }
  return isValidName;
}

export function validateEmail(inputEmail: string) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the input email against the regular expression
  return emailRegex.test(inputEmail);
}

export function validateAge(inputDob: string) {
  const birthDate = new Date(inputDob);
  const currentDate = new Date();

  // Calculate the age based on the difference in years
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Validate that the age is between 18 and 65
  return age >= 18 && age <= 65;
}

export const validateAccountNumber = inputString => {
  // Regular expression for validating a string with only numbers and length between 9 and 14
  const regex = /^\d{9,14}$/;

  // Test the input string against the regular expression
  return regex.test(inputString);
};
