import dayjs from "dayjs";

import { LANGUAGE, MONTHS } from "../../../constants";
import { RoundedButton } from "./shared/RoundedButton";

interface Props {
  currentMonth: number;
  onClick: (month: number) => void;
}

const Months: React.FC<Props> = ({ currentMonth, onClick }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {MONTHS.map((item) => (
        <RoundedButton
          key={item}
          padding="py-3"
          onClick={() => {
            onClick(item);
          }}
          active={currentMonth === item}
        >
          <>{dayjs(`2024-${item}-01`).locale(LANGUAGE).format("MMM")}</>
        </RoundedButton>
      ))}
    </div>
  );
};

export default Months;
