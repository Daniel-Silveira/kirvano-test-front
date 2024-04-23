import dayjs from "dayjs";
import { useCallback, useContext } from "react";

import DatepickerContext from "../../../contexts/DatepickerContext";
import {
  formatDate,
  nextMonth,
  previousMonth,
  classNames as cn,
} from "../../../helpers/calendar";
type DateType = "current" | "previous" | "next";

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

export const useDays = ({
  calendarData,
  onClickDay,
  onClickNextDays,
  onClickPreviousDays,
}: Props) => {
  const { period, changePeriod, dayHover, changeDayHover } =
    useContext(DatepickerContext);

  const currentDateClass = useCallback(
    (item: number): string => {
      const { date } = calendarData;
      const formattedItem = item >= 10 ? item : `0${item}`;
      const itemDate = `${date.year()}-${date.month() + 1}-${formattedItem}`;

      const currentDate = dayjs();
      const itemDateFormatted = dayjs(itemDate);

      if (formatDate(currentDate) !== formatDate(itemDateFormatted)) return "";

      return "text-primary";
    },
    [calendarData.date]
  );

  const activeDateData = useCallback(
    (day: number) => {
      const { date } = calendarData;
      const fullDay = `${date.year()}-${date.month() + 1}-${day}`;
      let className = "";
      const isStart = dayjs(fullDay).isSame(period.start);
      const isEnd = dayjs(fullDay).isSame(period.end);
      const isHover = dayjs(fullDay).isSame(dayHover);
      const isStartHover = isStart && isHover && !period.end;
      const isEndHover = isEnd && isHover && !period.start;

      if (isStart && isEnd) {
        className = ` bg-primary text-white font-medium rounded-lg`;
      } else if (isStart) {
        className = ` bg-primary text-white font-medium ${
          isStartHover ? "rounded-lg" : "rounded-l-lg"
        }`;
      } else if (isEnd) {
        className = ` bg-primary text-white font-medium ${
          isEndHover ? "rounded-lg" : "rounded-r-lg"
        }`;
      }

      return {
        active: isStart || isEnd,
        className: className,
      };
    },
    [calendarData.date, dayHover, period.end, period.start]
  );

  const hoverClassByDay = useCallback(
    (day: number) => {
      const fullDay = `${calendarData.date.year()}-${calendarData.date.month() + 1}-${day >= 10 ? day : "0" + day}`;
      let className = currentDateClass(day);

      if (period.start && period.end) {
        if (dayjs(fullDay).isBetween(period.start, period.end, "day", "[)")) {
          return ` bg-primary ${className} dark:bg-white/10`;
        }
      }

      if (!dayHover) {
        return className;
      }

      if (
        period.start &&
        dayjs(fullDay).isBetween(period.start, dayHover, "day", "[)")
      ) {
        className = ` bg-primary ${className} dark:bg-white/10`;
      }

      if (
        period.end &&
        dayjs(fullDay).isBetween(dayHover, period.end, "day", "[)")
      ) {
        className = ` bg-primary ${className} dark:bg-white/10`;
      }

      if (dayHover === fullDay) {
        className = ` transition-all duration-500 text-white font-medium bg-primary ${period.start ? "rounded-r-lg" : "rounded-l-lg"}`;
      }

      return className;
    },
    [calendarData.date, currentDateClass, dayHover, period.end, period.start]
  );

  const getMetaData = useCallback(() => {
    const { date } = calendarData;
    return {
      previous: previousMonth(date),
      current: date,
      next: nextMonth(date),
    };
  }, [calendarData.date]);

  const buttonClass = useCallback(
    (day: number, type: "current" | "next" | "previous") => {
      const baseClass =
        "flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10";
      if (type === "current") {
        return cn(
          baseClass,
          !activeDateData(day).active
            ? hoverClassByDay(day)
            : activeDateData(day).className
        );
      }
      return cn(baseClass, "text-gray-400");
    },
    [activeDateData, hoverClassByDay]
  );

  const hoverDay = useCallback(
    (day: number, type: string) => {
      const object = getMetaData();
      const newDate = object[type as keyof typeof object];
      const newHover = `${newDate.year()}-${newDate.month() + 1}-${
        day >= 10 ? day : "0" + day
      }`;

      if (period.start && !period.end) {
        const hoverPeriod = { ...period, end: newHover };
        if (dayjs(newHover).isBefore(dayjs(period.start))) {
          hoverPeriod.start = newHover;
          hoverPeriod.end = period.start;
          changePeriod({
            start: null,
            end: period.start,
          });
        }
        changeDayHover(newHover);
      }

      if (!period.start && period.end) {
        const hoverPeriod = { ...period, start: newHover };
        if (dayjs(newHover).isAfter(dayjs(period.end))) {
          hoverPeriod.start = period.end;
          hoverPeriod.end = newHover;
          changePeriod({
            start: period.end,
            end: null,
          });
        }
        changeDayHover(newHover);
      }
    },
    [changeDayHover, changePeriod, getMetaData, period]
  );

  const handleClickDay = useCallback(
    (day: number, type: DateType) => {
      function continueClick() {
        const typesToFunction = {
          previous: () => onClickPreviousDays(day),
          current: () => onClickDay(day),
          next: () => onClickNextDays(day),
        };

        typesToFunction[type]();
      }

      continueClick();
    },
    [
      dayHover,
      getMetaData,
      onClickDay,
      onClickNextDays,
      onClickPreviousDays,
      period.end,
      period.start,
    ]
  );

  return {
    buttonClass,
    handleClickDay,
    hoverDay,
  };
};
