import { getConnection } from "../DB/db";
import { hashPassword } from "../Helpers/AuthHelpers/hashPassword";


export async function registerUserQuery(
    userName: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const hashedPassword = await hashPassword(password)
    const query = `INSERT INTO users (user_name, first_name, last_name, password)
     VALUES (?, ?, ?, ?)`;
    const [result] = await getConnection().execute(query, [
      userName,
      firstName,
      lastName,
      hashedPassword,
    ]);
    return result;
  }

export async function changePasswordQuery(newPassword: string, userName: string) {
  const hashedPassword = await hashPassword(newPassword)
  const query = `
    UPDATE users
    SET 
    password = ? WHERE user_name =?`;
  const [result] = await getConnection().execute(query, [
    hashedPassword,
    userName,
  ]);
  return result;
}
export async function changeInfoQuery(firstName, lastName, userName) {
  const query = `
    UPDATE users
    SET 
    first_name = ?, last_name = ? WHERE user_name =?`;
  const [result] = await getConnection().execute(query, [
    firstName,
    lastName,
    userName,
  ]);
  return result;
}

  