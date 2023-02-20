import { weekDays } from "@/common/constants/date";

export const dateIntToString = (num: number) => {
  const str = num.toString();
  return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6)}`;
};

export const dayInWeek = (num: number) => {
  const day = new Date(dateIntToString(num)).getDay();
  return weekDays[day];
};

export const debounce = (fn: Function, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
