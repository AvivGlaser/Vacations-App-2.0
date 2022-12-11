import bcrypt from "bcrypt"

export async function isPasswordMatch(currentUser: string | any, password:string) {
  // ignore dummy users from bcrypt validations...
  if(currentUser.user_name === "admin@admin.com" || currentUser.user_name === "user@user.com"){
    return true;
  } else {
    // compares between plain password (password) and crypted password (currentUser.password)
    const result = await bcrypt.compare(password, currentUser.password);
    return result;
  }
  }