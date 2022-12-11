import { getConnection } from "../../DB/db";

export async function isUserExist(userName: string) {
    const query = `Select * FROM users where user_name = ?`;
    const [[result]] = await getConnection().execute(query, [userName]);
    return result;
}
