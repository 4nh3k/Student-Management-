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
export function isoStringToDdMmYyyy(isoString: string) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
