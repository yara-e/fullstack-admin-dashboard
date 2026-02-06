import {prisma }from "../common/db/client"

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email ,
isDeleted: false
        }
    });
}


