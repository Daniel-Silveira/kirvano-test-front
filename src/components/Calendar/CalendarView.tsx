import dayjs from "dayjs";

import Days from "./components/DaysView";
import Months from "./components/Months";
import Week from "./components/Week";
import Years from "./components/Years";
import { LANGUAGE } from "../../constants";
import { DateType } from "../../types";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { RoundedButton } from "./components/shared/RoundedButton";
import { useCalendar } from "./Calendar";

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
    showYears,
    setYear,
    year,
    setShowMonths,
    hideYears,
    showMonths,
    calendarData,
    setShowYears,
    hideMonths,
    minYear,
    clickMonth,
    maxYear,
    clickYear,
    clickDay,
    clickPreviousDays,
    clickNextDays,
  } = useCalendar({
    date,
    minDate,
    maxDate,
    onClickPrevious,
    onClickNext,
    changeMonth,
    changeYear,
  });
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
