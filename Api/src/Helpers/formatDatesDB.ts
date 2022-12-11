export function formatDatesDB(departDate: any, returnDate: any) {
  // configuring frontend dates type to mysql server dates type
    const fixedDepartDate = new Date(departDate).toLocaleDateString("sv");
    const  fixedReturnDate = new Date(returnDate).toLocaleDateString("sv");
    return [fixedDepartDate, fixedReturnDate];
  }