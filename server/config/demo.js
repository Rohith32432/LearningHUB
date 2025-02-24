
// 1
import { PrismaClient } from '@prisma/client'
const prisma=new PrismaClient()

async function main() {
    const user = await prisma.user.findFirst({
        select:{ }
    })
    console.log(user);

}
main()
    .catch((e) => {
        console.log('hi');

    }).finally(async () => {
        await prisma.$disconnect()
    })