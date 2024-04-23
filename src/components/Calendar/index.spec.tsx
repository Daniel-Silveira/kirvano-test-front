import { render, fireEvent, renderHook } from "@testing-library/react";
import Years from "./components/Years";
import Week from "./components/Week";
import Months from "./components/Months";
import { useDays } from "./components/Days";
import dayjs from "dayjs";
import Days from "./components/DaysView";

describe("[Calendar] components", () => {
  describe("Years component", () => {
    const mockOnClick = jest.fn();

    it("should render years within the specified range", () => {
      const { container } = render(
        <Years
          year={2010}
          currentYear={2024}
          minYear={2010}
          maxYear={2030}
          onClick={mockOnClick}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it("should call onClick when a year is clicked", () => {
      const { getByText } = render(
        <Years
          year={2024}
          currentYear={2024}
          minYear={2000}
          maxYear={2030}
          onClick={mockOnClick}
        />
      );

      const yearElement = getByText("2024");
      fireEvent.click(yearElement);

      expect(mockOnClick).toHaveBeenCalledWith(2024);
    });

    it("should disable years outside the minYear and maxYear range", () => {
      const { getByText, queryByText } = render(
        <Years
          year={2024}
          currentYear={2024}
          minYear={2025}
          maxYear={2030}
          onClick={mockOnClick}
        />
      );

      const disabledYear = getByText("2024");
      const enabledYear = queryByText("2025");

      expect(disabledYear).toBeDisabled();
      expect(enabledYear).not.toBeDisabled();
    });
  });

  describe("Week component", () => {
    it('should render days of the week starting from Sunday when startWeekOn is set to "sun"', () => {
      const { getByText } = render(<Week />);

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      days.forEach((day) => {
        const dayElement = getByText(day);
        expect(dayElement).toBeInTheDocument();
      });
    });
  });

  describe("Months component", () => {
    const mockOnClick = jest.fn();

    it("should render buttons for all months", () => {
      const { container } = render(
        <Months currentMonth={1} onClick={mockOnClick} />
      );

      expect(container).toMatchSnapshot();
    });

    it("should call onClick with the correct month when a month button is clicked", () => {
      const { getByText } = render(
        <Months currentMonth={1} onClick={mockOnClick} />
      );

      const februaryButton = getByText("Feb");
      fireEvent.click(februaryButton);

      expect(mockOnClick).toHaveBeenCalledWith(2);
    });
  });

  describe("useDays hook", () => {
    const calendarData: any = {
      date: dayjs("2022-11-01"),
      days: {
        previous: [],
        current: [1, 2, 3, 4, 5, 6, 7],
        next: [],
      },
    };

    const onClickPreviousDays = jest.fn();
    const onClickDay = jest.fn();
    const onClickNextDays = jest.fn();

    it("should return buttonClass, handleClickDay, and hoverDay functions", () => {
      const { result } = renderHook(() =>
        useDays({
          calendarData,
          onClickPreviousDays,
          onClickDay,
          onClickNextDays,
        })
      );

      expect(result.current.buttonClass).toBeDefined();
      expect(result.current.handleClickDay).toBeDefined();
      expect(result.current.hoverDay).toBeDefined();
    });
  });
  describe("Days component", () => {
    const mockCalendarData = {
      date: dayjs("2022-11-01"),
      days: {
        previous: [27, 28, 29, 30],
        current: [1, 2, 3, 4, 5, 6, 7],
        next: [8, 9, 10, 11, 12],
      },
    };

    const mockOnClickPreviousDays = jest.fn();
    const mockOnClickDay = jest.fn();
    const mockOnClickNextDays = jest.fn();

    it("should render buttons for all days", () => {
      const { getByText } = render(
        <Days
          calendarData={mockCalendarData}
          onClickPreviousDays={mockOnClickPreviousDays}
          onClickDay={mockOnClickDay}
          onClickNextDays={mockOnClickNextDays}
        />
      );

      mockCalendarData.days.previous.forEach((day) => {
        expect(getByText(day.toString())).toBeInTheDocument();
      });

      mockCalendarData.days.current.forEach((day) => {
        expect(getByText(day.toString())).toBeInTheDocument();
      });

      mockCalendarData.days.next.forEach((day) => {
        expect(getByText(day.toString())).toBeInTheDocument();
      });
    });

    it("should call onClickDay when a day button is clicked", () => {
      const { getByText } = render(
        <Days
          calendarData={mockCalendarData}
          onClickPreviousDays={mockOnClickPreviousDays}
          onClickDay={mockOnClickDay}
          onClickNextDays={mockOnClickNextDays}
        />
      );

      fireEvent.click(getByText("1"));

      expect(mockOnClickDay).toHaveBeenCalledWith(1);
    });

    it("should call hoverDay when mouse is over a day button", () => {
      const { getByText } = render(
        <Days
          calendarData={mockCalendarData}
          onClickPreviousDays={mockOnClickPreviousDays}
          onClickDay={mockOnClickDay}
          onClickNextDays={mockOnClickNextDays}
        />
      );

      fireEvent.mouseOver(getByText("1"));
    });
  });
});
