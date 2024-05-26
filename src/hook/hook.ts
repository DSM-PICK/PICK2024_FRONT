import { useState } from "react";

interface AcceptListSelection {
  selectedStudents: string[];
  selectedStudentName: string[];
  handleAcceptListClick: (id: string, name: string) => void;
}

const useAcceptListSelection = (): AcceptListSelection => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);

  const handleAcceptListClick = (id: string, name: string) => {
    const isStudentSelected = selectedStudents.includes(id);
    if (isStudentSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((selectedStudent) => selectedStudent !== id)
      );
      setSelectedStudentName((prevSelectedStudentName) =>
        prevSelectedStudentName.filter(
          (selectedStudentName) => selectedStudentName !== name
        )
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        id,
      ]);
      setSelectedStudentName((prevSelectedStudentName) => [
        ...prevSelectedStudentName,
        name,
      ]);
    }
  };

  return { selectedStudents, selectedStudentName, handleAcceptListClick };
};

export default useAcceptListSelection;
