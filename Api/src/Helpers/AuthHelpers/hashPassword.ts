import bcrypt from "bcrypt";

export async function hashPassword(plaintextPassword: string){
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(plaintextPassword, salt);
    return hashedPassword
    
}