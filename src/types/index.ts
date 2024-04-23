export interface Period {
  start: string | null;
  end: string | null;
}

export interface ShortcutsItem {
  text: string;
  daysNumber?: number;
  period: {
    start: Date | string;
    end: Date | string;
  };
}

export type DateType = string | null | Date;

export type DateRangeType = {
  startDate: DateType;
  endDate: DateType;
};

export type DateValueType = DateRangeType | null;

export interface DatepickerType {
  value?: DateValueType;
  onChange?: (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => void;
  showFooter?: boolean;
  showShortcuts?: boolean;
}
