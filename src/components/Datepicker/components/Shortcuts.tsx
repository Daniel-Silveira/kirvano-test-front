import dayjs from "dayjs";
import { memo, useCallback, useContext } from "react";
import { Period, ShortcutsItem } from "../../../types";

import DEFAULT_SHORTCUTS from "../../../constants/shortcuts";
import DatepickerContext from "../../../contexts/DatepickerContext";

interface ItemTemplateProps {
  children: JSX.Element;
  key: number;
  item: { period: Period | any };
}

const ItemTemplate = memo((props: ItemTemplateProps) => {
  const {
    period,
    changePeriod,
    updateFirstDate,
    dayHover,
    changeDayHover,
    changeDatepickerValue,
  } = useContext(DatepickerContext);

  const chosePeriod = useCallback(
    (item: Period) => {
      if (dayHover) {
        changeDayHover(null);
      }
      if (period.start || period.end) {
        changePeriod({
          start: null,
          end: null,
        });
      }
      changePeriod(item);
      changeDatepickerValue &&
        changeDatepickerValue({
          startDate: item.start,
          endDate: item.end,
        });
      updateFirstDate(dayjs(item.start));
    },
    [
      changeDatepickerValue,
      changeDayHover,
      changePeriod,
      dayHover,
      period.end,
      period.start,
      updateFirstDate,
    ]
  );

  const children = props?.children;

  return (
    <li
      className="whitespace-nowrap w-1/2 md:w-1/3 lg:w-auto transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded cursor-pointer text-zinc-400"
      onClick={() => {
        chosePeriod(props?.item.period);
      }}
    >
      {children}
    </li>
  );
});

const Shortcuts: React.FC = () => {
  const shortcutOptions = Object.entries(DEFAULT_SHORTCUTS);

  const printItemText = useCallback((item: ShortcutsItem) => {
    return item?.text ?? null;
  }, []);

  return shortcutOptions?.length ? (
    <div className="mb-3 lg:mb-0  pr-1">
      <ul className="w-full tracking-wide flex flex-wrap lg:flex-col p-3">
        {shortcutOptions.map(([, item], index: number) =>
          Array.isArray(item) ? (
            item.map((item, index) => (
              <ItemTemplate key={index} item={item}>
                <>{item.text}</>
              </ItemTemplate>
            ))
          ) : (
            <ItemTemplate key={index} item={item}>
              <>{printItemText(item)}</>
            </ItemTemplate>
          )
        )}
      </ul>
    </div>
  ) : null;
};

export default Shortcuts;
