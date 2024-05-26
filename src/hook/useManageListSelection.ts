import { useState } from "react";

interface ManageListSelectionHook {
  selectedStudents: string[];
  selectedStudentName: string[];
  handleManageListClick: (
    user_id: string,
    status_type: string,
    name: string
  ) => void;
}

const useManageListSelection = (): ManageListSelectionHook => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);

  const handleManageListClick = (
    user_id: string,
    status_type: string,
    name: string
  ) => {
    setSelectedStudents((prevSelectedStudents) => {
      const isStudentSelected = prevSelectedStudents.includes(user_id);
      if (isStudentSelected) {
        return prevSelectedStudents.filter(
          (selectedStudent) => selectedStudent !== user_id
        );
      } else {
        return [...prevSelectedStudents, user_id];
      }
    });

    setSelectedStudentName((prevSelectedStudentName) => {
      const isStudentSelected = prevSelectedStudentName.includes(name);
      if (isStudentSelected) {
        return prevSelectedStudentName.filter(
          (selectedStudentName) => selectedStudentName !== name
        );
      } else {
        return [...prevSelectedStudentName, name];
      }
    });
  };

  return { selectedStudents, selectedStudentName, handleManageListClick };
};

export default useManageListSelection;
