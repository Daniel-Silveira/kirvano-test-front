import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDate, nextMonth, previousMonth } from "../../helpers/calendar";
import { Period, DatepickerType } from "../../types";

export const useDatepicker = ({
  value,
  onChange,
  showFooter,
}: DatepickerType) => {
  const [firstDate, setFirstDate] = useState<dayjs.Dayjs>(dayjs());
  const [show, setShow] = useState(false);

  const [secondDate, setSecondDate] = useState<dayjs.Dayjs>(
    nextMonth(firstDate)
  );
  const [period, setPeriod] = useState<Period>({
    start: null,
    end: null,
  });
  const [dayHover, setDayHover] = useState<string | null>(null);

  const toggleVisibilityDatepicker = () => {
    setShow(!show);
  };

  const firstGotoDate = useCallback(
    (date: dayjs.Dayjs) => {
      const newDate = dayjs(formatDate(date));
      const reformatDate = dayjs(formatDate(secondDate));
      if (newDate.isSame(reformatDate) || newDate.isAfter(reformatDate)) {
        setSecondDate(nextMonth(date));
      }
      setFirstDate(date);
    },
    [secondDate]
  );

  const previousMonthFirst = useCallback(() => {
    setFirstDate(previousMonth(firstDate));
  }, [firstDate]);

  const nextMonthFirst = useCallback(() => {
    firstGotoDate(nextMonth(firstDate));
  }, [firstDate, firstGotoDate]);

  const changeFirstMonth = useCallback(
    (month: number) => {
      firstGotoDate(
        dayjs(`${firstDate.year()}-${month < 10 ? "0" : ""}${month}-01`)
      );
    },
    [firstDate, firstGotoDate]
  );

  const changeFirstYear = useCallback(
    (year: number) => {
      firstGotoDate(dayjs(`${year}-${firstDate.month() + 1}-01`));
    },
    [firstDate, firstGotoDate]
  );

  const secondGotoDate = useCallback(
    (date: dayjs.Dayjs) => {
      const newDate = dayjs(formatDate(date));
      const reformatDate = dayjs(formatDate(firstDate));
      if (newDate.isSame(reformatDate) || newDate.isBefore(reformatDate)) {
        setFirstDate(previousMonth(date));
      }
      setSecondDate(date);
    },
    [firstDate]
  );

  const previousMonthSecond = useCallback(() => {
    secondGotoDate(previousMonth(secondDate));
  }, [secondDate, secondGotoDate]);

  const nextMonthSecond = useCallback(() => {
    setSecondDate(nextMonth(secondDate));
  }, [secondDate]);

  const changeSecondMonth = useCallback(
    (month: number) => {
      secondGotoDate(
        dayjs(`${secondDate.year()}-${month < 10 ? "0" : ""}${month}-01`)
      );
    },
    [secondDate, secondGotoDate]
  );

  const changeSecondYear = useCallback(
    (year: number) => {
      secondGotoDate(dayjs(`${year}-${secondDate.month() + 1}-01`));
    },
    [secondDate, secondGotoDate]
  );

  useEffect(() => {
    if (value && value.startDate && value.endDate) {
      const startDate = dayjs(value.startDate);
      const endDate = dayjs(value.endDate);
      const validDate = startDate.isValid() && endDate.isValid();
      const condition =
        validDate && (startDate.isSame(endDate) || startDate.isBefore(endDate));
      if (condition) {
        setPeriod({
          start: formatDate(startDate),
          end: formatDate(endDate),
        });
      }
    }

    if (value && value.startDate === null && value.endDate === null) {
      setPeriod({
        start: null,
        end: null,
      });
    }
  }, [value]);

  const contextValues = useMemo(() => {
    return {
      toggleVisibilityDatepicker,
      period,
      changePeriod: (newPeriod: Period) => setPeriod(newPeriod),
      dayHover,
      changeDayHover: (newDay: string | null) => setDayHover(newDay),
      updateFirstDate: (newDate: dayjs.Dayjs) => firstGotoDate(newDate),
      changeDatepickerValue: onChange,
      showFooter,
      value,
      onChange,
    };
  }, [
    toggleVisibilityDatepicker,
    period,
    dayHover,
    onChange,
    showFooter,
    value,
    firstGotoDate,
  ]);

  return {
    contextValues,
    firstDate,
    secondDate,
    show,
    previousMonthFirst,
    nextMonthFirst,
    changeFirstMonth,
    changeFirstYear,
    previousMonthSecond,
    nextMonthSecond,
    changeSecondMonth,
    changeSecondYear,
    toggleVisibilityDatepicker,
  };
};
