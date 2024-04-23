import { generateArrayNumber } from "../../../helpers/calendar";
import { RoundedButton } from "./shared/RoundedButton";

interface Props {
  year: number;
  currentYear: number;
  minYear: number | null;
  maxYear: number | null;
  onClick: (data: number) => void;
}

const Years: React.FC<Props> = ({
  year,
  currentYear,
  minYear,
  maxYear,
  onClick,
}) => {
  const dateLooking = "forward";
  const setupDate = {
    backward: {
      startDate: year - 11,
      endDate: year,
    },
    middle: {
      startDate: year - 4,
      endDate: year + 7,
    },
    forward: {
      startDate: year,
      endDate: year + 11,
    },
  };

  const startDate = setupDate[dateLooking].startDate;
  const endDate = setupDate[dateLooking].endDate;

  return (
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {generateArrayNumber(startDate, endDate).map((item, index) => (
        <RoundedButton
          key={index}
          padding="py-3"
          onClick={() => {
            onClick(item);
          }}
          active={currentYear === item}
          disabled={
            (maxYear !== null && item > maxYear) ||
            (minYear !== null && item < minYear)
          }
        >
          <>{item}</>
        </RoundedButton>
      ))}
    </div>
  );
};

export default Years;
