import create from "zustand";

interface Student {
  user_id: string;
  status: string;
}

interface AttendanceStore {
  students: Student[];
  addStudent: (user_id: string, status?: string) => void;
  updateStatus: (user_id: string, status: string) => void;
  getStatus: (user_id: string) => string | undefined;
}

const useAttendanceStore = create<AttendanceStore>((set, get) => ({
  students: [],

  addStudent: (user_id, status = "ATTENDANCE") => {
    set((state) => ({
      students: [...state.students, { user_id, status }],
    }));
  },

  updateStatus: (user_id, status) => {
    set((state) => ({
      students: state.students.map((student) =>
        student.user_id === user_id ? { ...student, status } : student
      ),
    }));
  },

  getStatus: (user_id) => {
    return get().students.find((student) => student.user_id === user_id)
      ?.status;
  },
}));

export default useAttendanceStore;
