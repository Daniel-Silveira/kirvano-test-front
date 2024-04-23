import { createContext } from "react";

import { Period, DateValueType, DateType } from "../types";
import dayjs from "dayjs";

interface DatepickerStore {
  period: Period;
  showFooter?: boolean;
  placeholder?: string | null;
  value: DateValueType;
  disabled?: boolean;
  minDate?: DateType | null;
  maxDate?: DateType | null;
  dayHover: string | null;
  toggleVisibilityDatepicker: () => void;
  changePeriod: (period: Period) => void;
  changeDayHover: (day: string | null) => void;
  updateFirstDate: (date: dayjs.Dayjs) => void;
  changeDatepickerValue: (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => void;
}

const DatepickerContext = createContext<DatepickerStore>({
  period: { start: null, end: null },
  showFooter: false,
  value: null,
  disabled: false,
  minDate: null,
  maxDate: null,
  dayHover: null,
  changePeriod: (period) => {},
  toggleVisibilityDatepicker: () => {},
  changeDayHover: (day: string | null) => {},
  updateFirstDate: (date) => {},
  changeDatepickerValue: (
    value: DateValueType,
    e: HTMLInputElement | null | undefined
  ) => {},
});

export default DatepickerContext;
