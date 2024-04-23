import { fireEvent, render } from "@testing-library/react";
import DatepickerContext from "../../contexts/DatepickerContext";
import Footer from "./components/Footer";

describe("[Datepicker] components", () => {
  describe("Footer component", () => {
    it("should render Cancel and Apply buttons", () => {
      const toggleVisibilityDatepicker = jest.fn();
      const changeDatepickerValue = jest.fn();
      const startDate = "2024-04-01";
      const endDate = "2024-04-15";

      const { getByText, container } = render(
        <DatepickerContext.Provider
          value={{
            toggleVisibilityDatepicker,
            period: { start: startDate, end: endDate },
            changeDatepickerValue,
          }}
        >
          <Footer />
        </DatepickerContext.Provider>
      );

      const cancelButton = getByText("Cancel");
      const applyButton = getByText("Apply");

      expect(cancelButton).toBeInTheDocument();
      expect(applyButton).toBeInTheDocument();

      fireEvent.click(cancelButton);
      expect(toggleVisibilityDatepicker).toHaveBeenCalledTimes(1);

      fireEvent.click(applyButton);
      expect(changeDatepickerValue).toHaveBeenCalledWith({
        startDate,
        endDate,
      });
      expect(toggleVisibilityDatepicker).toHaveBeenCalledTimes(2);
      expect(container).toMatchSnapshot();
    });

    it("should not call changeDatepickerValue if period start or end is missing", () => {
      const toggleVisibilityDatepicker = jest.fn();
      const changeDatepickerValue = jest.fn();

      const { getByText } = render(
        <DatepickerContext.Provider
          value={{
            toggleVisibilityDatepicker,
            period: { start: "", end: "" },
            changeDatepickerValue,
          }}
        >
          <Footer />
        </DatepickerContext.Provider>
      );

      const applyButton = getByText("Apply");

      fireEvent.click(applyButton);
      expect(changeDatepickerValue).not.toHaveBeenCalled();
      expect(toggleVisibilityDatepicker).not.toHaveBeenCalled();
    });
  });
});
