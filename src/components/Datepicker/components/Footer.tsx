import { useContext } from "react";
import { DATE_FORMAT } from "../../../constants";
import { Button } from "../../shared/Button";

import dayjs from "dayjs";
import DatepickerContext from "../../../contexts/DatepickerContext";

const Footer: React.FC = () => {
  const { toggleVisibilityDatepicker, period, changeDatepickerValue } =
    useContext(DatepickerContext);

  return (
    <div className="flex items-center justify-end pb-2.5 pt-3">
      <div className="w-full md:w-auto flex items-center justify-center space-x-3">
        <Button
          onClick={() => {
            toggleVisibilityDatepicker();
          }}
          label="Cancel"
        />
        <Button
          onClick={() => {
            if (period.start && period.end) {
              changeDatepickerValue({
                startDate: dayjs(period.start).format(DATE_FORMAT),
                endDate: dayjs(period.end).format(DATE_FORMAT),
              });
              toggleVisibilityDatepicker();
            }
          }}
          label="Apply"
          primary
        />
      </div>
    </div>
  );
};

export default Footer;
