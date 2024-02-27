interface Time {
  hour: number;
  minute: number;
}

export const getTimeString = ({ hour, minute }: Time): string =>
  `${hour}:${minute}`;

interface Student {
  grade: number;
  class_num: number;
  num: number;
  username: string;
}

export const getStudentString = ({
  grade,
  class_num,
  num,
  username,
}: Student): string => `${grade}-${class_num}-${num}-${username}`;
