interface ManageStateProps {
  state: "출석" | "현체" | "귀가" | "취업" | "자퇴";
}

export const ManageState: React.FC<ManageStateProps> = ({ state }) => {
  const stateStyle = () => {
    switch (state) {
      case "출석":
        return " bg-neutral-900 text-button-S text-neutral-300";
      case "귀가":
        return " bg-primary-800 text-label1 text-white";
      case "자퇴":
        return " bg-error-400 text-label1 text-white";
      case "취업":
        return " bg-tertiary-500 text-button-S text-white";
      case "현체":
        return " bg-primary-500 text-button-S text-white";
    }
  };
  return (
    <div className={` w-max rounded-lg py-2 px-6 ${stateStyle()}`}>
      <div>{state}</div>
    </div>
  );
};
