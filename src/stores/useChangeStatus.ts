import create from "zustand";

interface Student {
  user_id: string;
  status_list: string[];
}

interface AttendanceStore {
  students: Student[];
  addStudent: (user_id: string, status_list?: string[]) => void;
  updateStatus: (user_id: string, status_list: string[]) => void;
  getStatus: (user_id: string) => string[] | undefined;
}

const useAttendanceStore = create<AttendanceStore>((set, get) => ({
  students: [],

  addStudent: (user_id, status_list = ["ATTENDANCE"]) => {
    set((state) => ({
      students: [...state.students, { user_id, status_list }],
    }));
  },

  updateStatus: (user_id, status_list) => {
    set((state) => ({
      students: state.students.map((student) =>
        student.user_id === user_id ? { ...student, status_list } : student
      ),
    }));
  },

  getStatus: (user_id) => {
    return get().students.find((student) => student.user_id === user_id)
      ?.status_list;
  },
}));

export default useAttendanceStore;
