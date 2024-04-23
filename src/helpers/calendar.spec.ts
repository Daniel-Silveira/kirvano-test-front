import dayjs, { Dayjs } from "dayjs";
import {
  classNames,
  generateArrayNumber,
  shortString,
  ucFirst,
  formatDate,
  parseFormattedDate,
  getFirstDayInMonth,
  getLastDayInMonth,
  getDaysInMonth,
  nextMonth,
  previousMonth,
  getFirstElementsInArray,
  getLastElementsInArray,
  getNumberOfDay,
  getLastDaysInMonth,
  getFirstDaysInMonth,
  dateIsValid,
} from "./calendar";

describe("classNames function", () => {
  it("should concatenate classes with spaces", () => {
    const result = classNames("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should filter out falsy values", () => {
    const result = classNames(
      "class1",
      null,
      undefined,
      "class2",
      false,
      "class3"
    );
    expect(result).toBe("class1 class2 class3");
  });
});

describe("generateArrayNumber function", () => {
  it("should generate an array of numbers", () => {
    const result = generateArrayNumber(1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("shortString function", () => {
  it("should return the first three characters of a string", () => {
    const result = shortString("hello world");
    expect(result).toBe("hel");
  });

  it("should return the specified number of characters", () => {
    const result = shortString("hello world", 5);
    expect(result).toBe("hello");
  });
});

describe("ucFirst function", () => {
  it("should capitalize the first letter of a string", () => {
    const result = ucFirst("hello");
    expect(result).toBe("Hello");
  });
});

describe("formatDate function", () => {
  it("should format date correctly", () => {
    const date: Dayjs = dayjs("2022-12-31");
    const result = formatDate(date, "YYYY-MM-DD");
    expect(result).toBe("2022-12-31");
  });
});

describe("parseFormattedDate function", () => {
  it("should parse formatted date correctly", () => {
    const result = parseFormattedDate("2022-12-31", "YYYY-MM-DD");
    expect(result.isValid()).toBe(true);
  });
});

describe("getFirstDayInMonth function", () => {
  it("should get the first day of the month", () => {
    const result = getFirstDayInMonth("2022-12-31");
    expect(result.ddd).toBe("Thu");
    expect(result.basic).toBe("2022-12-01");
    expect(result.object.isValid()).toBe(true);
  });
});

describe("getLastDayInMonth function", () => {
  it("should get the last day of the month", () => {
    const result = getLastDayInMonth("2022-12-31");
    expect(result.ddd).toBe("Sat");
    expect(result.basic).toBe("2022-12-31");
    expect(result.object.isValid()).toBe(true);
  });
});

describe("getDaysInMonth function", () => {
  it("should get an array of days in the month", () => {
    const result = getDaysInMonth("2022-12-31");
    expect(result).toHaveLength(31);
  });
});

describe("nextMonth function", () => {
  it("should get the next month", () => {
    const result = nextMonth(dayjs("2022-12-31"));
    expect(result.month()).toBe(0);
    expect(result.year()).toBe(2023);
  });
});

describe("previousMonth function", () => {
  it("should get the previous month", () => {
    const result = previousMonth(dayjs("2022-12-31"));
    expect(result.month()).toBe(10);
    expect(result.year()).toBe(2022);
  });
});

describe("getFirstElementsInArray function", () => {
  it("should get the first elements in the array", () => {
    const result = getFirstElementsInArray([1, 2, 3, 4, 5], 3);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("getLastElementsInArray function", () => {
  it("should get the last elements in the array", () => {
    const result = getLastElementsInArray([1, 2, 3, 4, 5], 3);
    expect(result).toEqual([3, 4, 5]);
  });
});

describe("getNumberOfDay function", () => {
  it("should get the number of the day", () => {
    const result = getNumberOfDay("Wed", "Sun");
    expect(result).toBe(3);
  });
});

describe("getLastDaysInMonth function", () => {
  it("should get the last days in the month", () => {
    const result = getLastDaysInMonth("2022-12-31", 5);
    expect(result).toEqual([27, 28, 29, 30, 31]);
  });
});

describe("getFirstDaysInMonth function", () => {
  it("should get the first days in the month", () => {
    const result = getFirstDaysInMonth("2022-12-31", 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("dateIsValid function", () => {
  it("should check if date is valid", () => {
    const result = dateIsValid(new Date());
    expect(result).toBe(true);
  });

  it("should check if date is invalid", () => {
    const result = dateIsValid(new Date("invalid"));
    expect(result).toBe(false);
  });
});
