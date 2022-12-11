import { IVacations } from "./interfaces";

export function calcTotalPrice(items: IVacations[]) {
  return items?.reduce(
    (ack: number, item) => ack + item.amount * item.price,
    0
  );
}
