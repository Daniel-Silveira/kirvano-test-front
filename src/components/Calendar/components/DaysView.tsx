import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useDays } from "./Days";

dayjs.extend(isBetween);

interface Props {
  calendarData: {
    date: dayjs.Dayjs;
    days: {
      previous: number[];
      current: number[];
      next: number[];
    };
  };
  onClickPreviousDays: (day: number) => void;
  onClickDay: (day: number) => void;
  onClickNextDays: (day: number) => void;
}

const Days: React.FC<Props> = (props) => {
  const { previous, current, next } = props.calendarData.days;

  return (
    <div className="grid grid-cols-7 gap-y-0.5 my-1">
      {previous.map((item, index) => (
        <DateButton key={index} day={item} type="previous" {...props} />
      ))}

      {current.map((item, index) => (
        <DateButton key={index} day={item} type="current" {...props} />
      ))}

      {next.map((item, index) => (
        <DateButton key={index} day={item} type="next" {...props} />
      ))}
    </div>
  );
};

interface DateButtonProps extends Props {
  day: number;
  type: "previous" | "current" | "next";
}

const DateButton: React.FC<DateButtonProps> = ({
  day,
  type,
  calendarData,
  onClickPreviousDays,
  onClickDay,
  onClickNextDays,
}) => {
  const { buttonClass, handleClickDay, hoverDay } = useDays({
    calendarData,
    onClickPreviousDays,
    onClickDay,
    onClickNextDays,
  });

  return (
    <button
      type="button"
      className={buttonClass(day, type)}
      onClick={() => handleClickDay(day, type)}
      onMouseOver={() => {
        hoverDay(day, type);
      }}
    >
      {day}
    </button>
  );
};

export default Days;
