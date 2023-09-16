const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

async function main() {
}

main().then(() => {
  console.log('Success!');
})
  .catch((e) => {
    console.log(e.message)
  }).finally(async () => {
    await prisma.$disconnect()
  })