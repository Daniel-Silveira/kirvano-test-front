type ButtonProps = {
  onClick: () => void;
  label: string;
  primary?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  primary = false,
}) => {
  const buttonClasses = primary
    ? "bg-primary text-white font-medium border border-primary px-4 py-2 text-sm rounded-md"
    : "bg-transparent text-white font-medium border px-4 py-2 text-sm rounded-md";

  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
};
