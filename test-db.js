// Simple script to test the Prisma database connection
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  console.log('Testing database connection...')

  try {
    // Test connection with a simple query
    console.log('Attempting to query Product model...')
    const productCount = await prisma.product.count()
    console.log(`Found ${productCount} products in the database.`)

    // Test connection to Employee model
    console.log('Attempting to query Employee model...')
    const employeeCount = await prisma.employee.count()
    console.log(`Found ${employeeCount} employees in the database.`)

    // Try to create a test employee
    console.log('Attempting to create a test employee...')
    const testEmployee = await prisma.employee.create({
      data: {
        name: 'Test Employee',
        phone: '1234567890',
        position: 'Tester',
      },
    })
    console.log('Successfully created test employee:', testEmployee)

    // Clean up - delete the test employee
    await prisma.employee.delete({
      where: {
        id: testEmployee.id,
      },
    })
    console.log('Test employee deleted successfully')

  } catch (error) {
    console.error('Database test failed with error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .then(() => console.log('Database test completed'))
  .catch((e) => {
    console.error('Script error:', e)
    process.exit(1)
  });
