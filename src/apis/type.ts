export interface TodaySelfStudy {
  floor: number;
  teacher_name: string;
}

export interface TypeProp {
  out: number;
  request: number;
  class_move: number;
}

export interface Type {
  grade: number;
  class_num: number;
  num: number;
  name: string;
}

export interface ChangeStatus {
  id: string;
  status_list: string[];
}

export interface AfterStudent {
  id: string;
  grade: number;
  class_num: number;
  num: number;
  name: string;
  status1: string;
  status2: string;
  status3: string;
}

export interface ClubList {
  id: string;
  username: string;
  grade: number;
  class_num: number;
  num: number;
  status6: string;
  status7: string;
  status8: string;
  status9: string;
  status10: string;
}

export interface Students {
  name: string;
  grade: number;
  class_num: number;
  num: number;
}

export interface ChangeClub {
  user_id: string;
  status_list: string[];
}
