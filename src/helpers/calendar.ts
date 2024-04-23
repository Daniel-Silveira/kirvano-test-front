import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

import { DATE_FORMAT } from "../constants";

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateArrayNumber(start = 0, end = 0): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function shortString(value: string, limit = 3): string {
  return value.slice(0, limit);
}

export function ucFirst(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

export function formatDate(date: Dayjs | string, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export function parseFormattedDate(date: string, format = DATE_FORMAT): Dayjs {
  return dayjs(date, format);
}

export function getFirstDayInMonth(date: Dayjs | string) {
  const startOfMonth = dayjs(date).startOf("month");
  return {
    ddd: formatDate(startOfMonth, "ddd"),
    basic: formatDate(startOfMonth),
    object: startOfMonth,
  };
}

export function getLastDayInMonth(date: Dayjs | string) {
  const endOfMonth = dayjs(date).endOf("month");
  return {
    ddd: formatDate(endOfMonth, "ddd"),
    basic: formatDate(endOfMonth),
    object: endOfMonth,
  };
}

export function getDaysInMonth(date: Dayjs | string): number[] {
  return generateArrayNumber(1, dayjs(date).daysInMonth());
}

export function nextMonth(date: Dayjs): Dayjs {
  return dayjs(date).date(1).add(1, "month");
}

export function previousMonth(date: Dayjs): Dayjs {
  return dayjs(date).date(1).subtract(1, "month");
}

export function getFirstElementsInArray(
  array: number[] = [],
  size = 0
): number[] {
  return array.slice(0, size);
}

export function getLastElementsInArray(
  array: number[] = [],
  size = 0
): number[] {
  return array.slice(-size);
}

export function getNumberOfDay(
  dayString: string,
  startWeekOn?: string | null | undefined
): number {
  let number = 0;

  let startDateModifier = 0;

  if (startWeekOn) {
    switch (startWeekOn) {
      case "mon":
        startDateModifier = 6;
        break;
      case "tue":
        startDateModifier = 5;
        break;
      case "wed":
        startDateModifier = 4;
        break;
      case "thu":
        startDateModifier = 3;
        break;
      case "fri":
        startDateModifier = 2;
        break;
      case "sat":
        startDateModifier = 1;
        break;
      case "sun":
        startDateModifier = 0;
        break;
      default:
        break;
    }
  }

  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].forEach((item, index) => {
    if (item.includes(dayString)) {
      number = (index + startDateModifier) % 7;
    }
  });

  return number;
}

export function getLastDaysInMonth(date: Dayjs | string, size = 0): number[] {
  return getLastElementsInArray(getDaysInMonth(date), size);
}

export function getFirstDaysInMonth(date: Dayjs | string, size = 0): number[] {
  return getFirstElementsInArray(getDaysInMonth(date), size);
}

export function dateIsValid(date: Date | number): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
