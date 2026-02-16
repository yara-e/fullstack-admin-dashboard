import AppError from "../common/error/appError";
import {findUserByEmail } from "./auth.repositry";
import { comparePassword } from "./utils/hash";
 import { createAccessToken  } from "./utils/jwt";

export const login = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        
        throw new AppError( "Invalid email or password" , 401);
    }   
   
    
const isPasswordValid = await comparePassword(password, user.password);         
    if (!isPasswordValid) {
        throw new AppError( "Invalid email or password" , 401);
    }

    const  token = createAccessToken({
        id: user.id,
         role: user.role,
    });

    return { token ,
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role}
    
    };


}