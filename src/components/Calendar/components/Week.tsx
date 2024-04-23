import dayjs from "dayjs";
import { useMemo } from "react";

import { DAYS, LANGUAGE } from "../../../constants";
import { shortString, ucFirst } from "../../../helpers/calendar";

type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const Week: React.FC = () => {
  const startWeekOn = "sun";
  const startDateModifier = useMemo(() => {
    const startWeekOnMap: Record<WeekDay, number> = {
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
      sun: 0,
    };

    return (startWeekOnMap as Record<string, number>)[startWeekOn] || 0;
  }, [startWeekOn]);

  return (
    <div className="grid grid-cols-7 py-2">
      {DAYS.map((item) => (
        <div
          key={item}
          className={`tracking-wide text-gray-500 text-center ${(item === 0 || item === 6) && "text-red-400"}`}
        >
          {ucFirst(
            shortString(
              dayjs(`2022-11-${6 + (item + startDateModifier)}`)
                .locale(LANGUAGE)
                .format("ddd")
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Week;
