import { getConnection } from "../DB/db";
import { formatDatesDB } from "../Helpers/formatDatesDB";

export async function getVacationsQuery() {
  const query = `SELECT * FROM vacations order by created_at DESC`;
  const [result] = await getConnection().query(query);
  return result;
}
export async function getCategoriesQuery() {
  const query = `SELECT DISTINCT category FROM vacations`;
  const [result] = await getConnection().query(query);
  const categories = result?.map((c: string) => {
    return c["category"];
  });
  return categories;
}
export async function sortByDatesQuery(payload) {
  const { departDate, returnDate, stops } = payload;
  const [fixedDepartDate, fixedReturnDate] = formatDatesDB(
    departDate,
    returnDate
  );
  let query = "";
  if (stops) {
    query = `SELECT * FROM vacations WHERE depart_date BETWEEN ? and ? and stops = 0 order by depart_date`;
  } else
    query = `SELECT * FROM vacations WHERE depart_date BETWEEN ? and ? order by depart_date`;
  const [result] = await getConnection().query(query, [
    fixedDepartDate,
    fixedReturnDate,
  ]);

  return result;
}

export async function sortByCategoryQuery(category: string) {
  // sort relevant data with 'category' recieved
  let query = "";
  if (category.endsWith("high")) {
    query = `SELECT * FROM vacations order by price`;
  } else if (category.endsWith("low")) {
    query = `SELECT * FROM vacations order by price DESC;`;
  } else if (category.startsWith("Direct")) {
    query = `SELECT * FROM vacations where stops = 0`;
  } else if (category.endsWith("Soon")) {
    query = `SELECT * FROM vacations order by depart_date;`;
  } else query = `SELECT * FROM vacations where category = ?;`;
  const [result] = await getConnection().query(query, [category]);
  return result;
}

export async function deleteVacationQuery(id: number) {
  const query = `DELETE FROM vacations WHERE id= ? `;
  const [result] = await getConnection().execute(query, [id]);
  return result;
}
export async function getFollowersQuery() {
  const query = `SELECT destination, followers FROM vacations WHERE followers > 0 order by followers desc`;
  const [result] = await getConnection().execute(query);
  return result;
}
export async function addFollowerQuery(id: number) {
  const query = `
    UPDATE vacations
    SET
    followers = followers + 1,  is_following = 1 WHERE id = ?`;
  const [result] = await getConnection().execute(query, [id]);
  return result;
}
export async function removeFollowerQuery(id: number) {
  const query = `
  UPDATE vacations
  SET
  followers = followers - 1,  is_following = 0 WHERE id = ?`;
  const [result] = await getConnection().execute(query, [id]);
  return result;
}
export async function removeAllFollowersQuery() {
  const query = `
  UPDATE vacations
  SET 
  followers = 0, is_following = 0 WHERE followers = 1`;
  const [result] = await getConnection().execute(query);
  return result;
}

export async function editVacationQuery(payload: any) {
  const {
    description,
    destination,
    image,
    departDate,
    returnDate,
    price,
    category,
    airport,
    stops = true ? "1" : "0",
    id,
  } = payload;
  const [fixedDepartDate, fixedReturnDate] = formatDatesDB(
    departDate,
    returnDate
  );
  const query = ` 
  UPDATE vacations
  SET 
  description = ?, 
  destination = ?,
  image = ?,
  depart_date =?,
  return_date =?,
  price = ?,
  category = ?,
  airport = ?,
  stops = ?
  WHERE id =?`;
  const [result] = await getConnection().execute(query, [
    description,
    destination,
    image,
    fixedDepartDate,
    fixedReturnDate,
    price,
    category,
    airport,
    stops,
    id,
  ]);
  return result;
}

export async function addVacationQuery(payload: any) {
  const {
    id,
    description,
    destination,
    image,
    departDate,
    returnDate,
    price,
    category,
    airport,
    stops = true ? "1" : "0",
  } = payload;
  const [fixedDepartDate, fixedReturnDate] = formatDatesDB(
    departDate,
    returnDate
  );
  const query = `
    INSERT INTO vacations 
    (id, description, destination, image, depart_date, return_date, price, category, airport,stops) 
    VALUES (?,?,?,?,?,?,?,?,?,?)`;
  const [result] = await getConnection().execute(query, [
    id,
    description,
    destination,
    image,
    fixedDepartDate,
    fixedReturnDate,
    price,
    category,
    airport,
    stops,
  ]);
  return result;
}
