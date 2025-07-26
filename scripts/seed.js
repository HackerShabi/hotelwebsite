const { execSync } = require('child_process');
const path = require('path');

// Set NODE_ENV to development for seeding
process.env.NODE_ENV = 'development';

// Run the TypeScript seeding script
try {
  console.log('🌱 Starting database seeding...');
  
  // Use ts-node to run the TypeScript file
  execSync('npx ts-node --project tsconfig.json src/lib/seedData.ts', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  
  console.log('✅ Database seeding completed successfully!');
} catch (error) {
  console.error('❌ Database seeding failed:', error.message);
  process.exit(1);
}