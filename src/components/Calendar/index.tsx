import dayjs from "dayjs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CALENDAR_SIZE, DATE_FORMAT, LANGUAGE } from "../../constants";
import DatepickerContext from "../../contexts/DatepickerContext";
import {
  formatDate,
  getDaysInMonth,
  getFirstDayInMonth,
  getFirstDaysInMonth,
  getLastDaysInMonth,
  getNumberOfDay,
  nextMonth,
  previousMonth,
} from "../../helpers/calendar";

import Days from "./components/DaysView";
import Months from "./components/Months";
import Week from "./components/Week";
import Years from "./components/Years";
import { DateType } from "../../types";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { RoundedButton } from "./components/shared/RoundedButton";

interface Props {
  date: dayjs.Dayjs;
  minDate?: DateType | null;
  maxDate?: DateType | null;
  onClickPrevious: () => void;
  onClickNext: () => void;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
}

const Calendar: React.FC<Props> = ({
  date,
  minDate,
  maxDate,
  onClickPrevious,
  onClickNext,
  changeMonth,
  changeYear,
}) => {
  const {
    period,
    changePeriod,
    changeDayHover,
    showFooter,
    changeDatepickerValue,
    toggleVisibilityDatepicker,
  } = useContext(DatepickerContext);

  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [year, setYear] = useState(date.year());
  const previous = useCallback(() => {
    return getLastDaysInMonth(
      previousMonth(date),
      getNumberOfDay(getFirstDayInMonth(date).ddd)
    );
  }, [date]);

  const current = useCallback(() => {
    return getDaysInMonth(formatDate(date));
  }, [date]);

  const next = useCallback(() => {
    return getFirstDaysInMonth(
      previousMonth(date),
      CALENDAR_SIZE - (previous().length + current().length)
    );
  }, [current, date, previous]);

  const hideMonths = useCallback(() => {
    showMonths && setShowMonths(false);
  }, [showMonths]);

  const hideYears = useCallback(() => {
    showYears && setShowYears(false);
  }, [showYears]);

  const clickMonth = useCallback(
    (month: number) => {
      setTimeout(() => {
        changeMonth(month);
        setShowMonths(!showMonths);
      }, 250);
    },
    [changeMonth, showMonths]
  );

  const clickYear = useCallback(
    (year: number) => {
      setTimeout(() => {
        changeYear(year);
        setShowYears(!showYears);
      }, 250);
    },
    [changeYear, showYears]
  );

  const clickDay = useCallback(
    (day: number, month = date.month() + 1, year = date.year()) => {
      const fullDay = `${year}-${month}-${day}`;
      let newStart;
      let newEnd = null;

      function chosePeriod(start: string, end: string) {
        changeDatepickerValue({
          startDate: dayjs(start).format(DATE_FORMAT),
          endDate: dayjs(end).format(DATE_FORMAT),
        });
        toggleVisibilityDatepicker();
      }

      if (period.start && period.end) {
        if (changeDayHover) {
          changeDayHover(null);
        }
        changePeriod({
          start: null,
          end: null,
        });
      }

      if ((!period.start && !period.end) || (period.start && period.end)) {
        if (!period.start && !period.end) {
          changeDayHover(fullDay);
        }
        newStart = fullDay;
      } else {
        if (period.start && !period.end) {
          const condition =
            dayjs(fullDay).isSame(dayjs(period.start)) ||
            dayjs(fullDay).isAfter(dayjs(period.start));
          newStart = condition ? period.start : fullDay;
          newEnd = condition ? fullDay : period.start;
        } else {
          const condition =
            dayjs(fullDay).isSame(dayjs(period.end)) ||
            dayjs(fullDay).isBefore(dayjs(period.end));
          newStart = condition ? fullDay : period.start;
          newEnd = condition ? period.end : fullDay;
        }

        if (!showFooter) {
          if (newStart && newEnd) {
            chosePeriod(newStart, newEnd);
          }
        }
      }

      if (!(newEnd && newStart) || showFooter) {
        changePeriod({
          start: newStart,
          end: newEnd,
        });
      }
    },
    [
      changeDatepickerValue,
      changeDayHover,
      changePeriod,
      date,
      toggleVisibilityDatepicker,
      period.end,
      period.start,
      showFooter,
    ]
  );

  const clickPreviousDays = useCallback(
    (day: number) => {
      const newDate = previousMonth(date);
      clickDay(day, newDate.month() + 1, newDate.year());
      onClickPrevious();
    },
    [clickDay, date, onClickPrevious]
  );

  const clickNextDays = useCallback(
    (day: number) => {
      const newDate = nextMonth(date);
      clickDay(day, newDate.month() + 1, newDate.year());
      onClickNext();
    },
    [clickDay, date, onClickNext]
  );

  useEffect(() => {
    setYear(date.year());
  }, [date]);

  const calendarData = useMemo(() => {
    return {
      date: date,
      days: {
        previous: previous(),
        current: current(),
        next: next(),
      },
    };
  }, [current, date, next, previous]);
  const minYear = React.useMemo(
    () => (minDate && dayjs(minDate).isValid() ? dayjs(minDate).year() : null),
    [minDate]
  );
  const maxYear = React.useMemo(
    () => (maxDate && dayjs(maxDate).isValid() ? dayjs(maxDate).year() : null),
    [maxDate]
  );

  return (
    <div className="w-full md:w-[296px] md:min-w-[296px]">
      <div className="flex items-center space-x-1.5 rounded-md px-2 py-1.5">
        {showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull={true}
              onClick={() => {
                setYear(year - 12);
              }}
            >
              <FiChevronsLeft className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        <div className="flex flex-1 items-center space-x-1.5">
          <div>
            <RoundedButton
              onClick={() => {
                setShowMonths(!showMonths);
                hideYears();
              }}
            >
              <>{calendarData.date?.locale(LANGUAGE).format("MMMM")}</>
            </RoundedButton>
          </div>

          <div>
            <RoundedButton
              onClick={() => {
                setShowYears(!showYears);
                hideMonths();
              }}
            >
              <>{calendarData.date.year()}</>
            </RoundedButton>
          </div>
        </div>
        {!showMonths && !showYears && (
          <div className="flex-none">
            <RoundedButton roundedFull={true} onClick={onClickPrevious}>
              <FiChevronLeft className="h-5 w-5" />
            </RoundedButton>
            <RoundedButton roundedFull={true} onClick={onClickNext}>
              <FiChevronRight className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        {showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull={true}
              onClick={() => {
                setYear(year + 12);
              }}
            >
              <FiChevronsRight className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}
      </div>

      <div className="px-0.5 sm:px-2 mt-0.5 min-h-[285px]">
        {showMonths && (
          <Months
            currentMonth={calendarData.date.month() + 1}
            onClick={clickMonth}
          />
        )}

        {showYears && (
          <Years
            year={year}
            minYear={minYear}
            maxYear={maxYear}
            currentYear={calendarData.date.year()}
            onClick={clickYear}
          />
        )}

        {!showMonths && !showYears && (
          <>
            <Week />

            <Days
              calendarData={calendarData}
              onClickPreviousDays={clickPreviousDays}
              onClickDay={clickDay}
              onClickNextDays={clickNextDays}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
