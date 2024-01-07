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
export const calculateSemesterFilter = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  let tenHocKy = '';
  let tenNamHoc = '';

  console.log(currentMonth);

  if ((currentMonth >= 9 && currentMonth <= 12) || currentMonth === 1) {
    console.log('a');
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
