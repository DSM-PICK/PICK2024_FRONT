import { useState } from "react";

interface Student {
  user_id: string;
  name: string;
}

interface ManageListSelectionHook {
  selectedStudents: string[];
  selectedStudentNames: string[];
  modifiedStudents: { user_id: string; status_type: string }[];
  handleManageListClick: (
    user_id: string,
    status_type: string,
    name: string
  ) => void;
}

const useManageListSelection = (): ManageListSelectionHook => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentNames, setSelectedStudentNames] = useState<string[]>(
    []
  );
  const [modifiedStudents, setModifiedStudents] = useState<
    { user_id: string; status_type: string }[]
  >([]);

  const handleManageListClick = (
    user_id: string,
    status_type: string,
    name: string
  ) => {
    setModifiedStudents((prevModifiedStudents) => [
      ...prevModifiedStudents,
      { user_id, status_type },
    ]);

    const isStudentSelected = selectedStudents.includes(user_id);
    if (isStudentSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter(
          (selectedStudent) => selectedStudent !== user_id
        )
      );
      setSelectedStudentNames((prevSelectedStudentNames) =>
        prevSelectedStudentNames.filter(
          (selectedStudentName) => selectedStudentName !== name
        )
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        user_id,
      ]);
      setSelectedStudentNames((prevSelectedStudentNames) => [
        ...prevSelectedStudentNames,
        name,
      ]);
    }
  };

  return {
    selectedStudents,
    selectedStudentNames,
    modifiedStudents,
    handleManageListClick,
  };
};

export default useManageListSelection;
