import Calendar from "../Calendar/CalendarView";
import Footer from "./components/Footer";
import Shortcuts from "./components/Shortcuts";
import DatepickerContext from "../../contexts/DatepickerContext";
import { DatepickerType } from "../../types";
import { useDatepicker } from "./Datepicker";
import { Button } from "../shared/Button";

const Datepicker: React.FC<DatepickerType> = ({
  value = null,
  onChange,
  showFooter = false,
  showShortcuts = false,
}) => {
  const {
    contextValues,
    firstDate,
    previousMonthFirst,
    nextMonthFirst,
    changeFirstMonth,
    changeFirstYear,
    secondDate,
    previousMonthSecond,
    nextMonthSecond,
    changeSecondMonth,
    changeSecondYear,
    show,
    toggleVisibilityDatepicker,
  } = useDatepicker({
    value,
    onChange,
    showFooter,
  });
  return (
    <DatepickerContext.Provider value={contextValues}>
      <div className="relative w-full text-gray-700">
        <Button
          primary
          onClick={toggleVisibilityDatepicker}
          label="Abrir/Fechar"
        />
        {show && (
          <div className="absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4">
            <div className="mt-2.5 shadow-sm border border-gray-300 px-1 py-0.5 bg-white dark:bg-zinc-950 dark:text-white dark:border-slate-600 rounded-lg">
              <div className="flex flex-col lg:flex-row py-2">
                {showShortcuts && <Shortcuts />}

                <div
                  className={`flex items-stretch flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1.5 ${
                    showShortcuts ? "md:pl-2" : "md:pl-1"
                  } pr-2 lg:pr-1`}
                >
                  <Calendar
                    date={firstDate}
                    onClickPrevious={previousMonthFirst}
                    onClickNext={nextMonthFirst}
                    changeMonth={changeFirstMonth}
                    changeYear={changeFirstYear}
                  />

                  <Calendar
                    date={secondDate}
                    onClickPrevious={previousMonthSecond}
                    onClickNext={nextMonthSecond}
                    changeMonth={changeSecondMonth}
                    changeYear={changeSecondYear}
                  />
                </div>
              </div>

              {showFooter && <Footer />}
            </div>
          </div>
        )}
      </div>
    </DatepickerContext.Provider>
  );
};

export default Datepicker;
