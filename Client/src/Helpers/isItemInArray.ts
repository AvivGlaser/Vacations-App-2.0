
export default function isItemInArray( array: Array<any>, id: number | undefined): boolean {
  const result: boolean = array.find((arr) => {
    if (arr.id === id) return true;
  });
  if (result !== undefined) return true;
  else return false;
}

export function returnItemInArray(array: Array<any>, id: number | undefined) {
  const matchedItem = array.find((v) => {
    if (v.id === id) {
      return v;
    }
  });
  return matchedItem;
}
