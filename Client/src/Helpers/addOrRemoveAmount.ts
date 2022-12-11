import { IAddOrRemove, IVacations } from "./interfaces";

export default function addOrRemoveAmount(props: IAddOrRemove) {
  const { array, id, operator } = props;
  if (!operator) {
    return array.map((prod: IVacations) =>
      id === prod.id ? { ...prod, amount: (prod.amount -= 1) } : prod
    );
  } else {
    return array.map((prod: IVacations) =>
      id === prod.id ? { ...prod, amount: (prod.amount += 1) } : prod
    );
  }
}
