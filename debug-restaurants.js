// Debug script to test restaurant categorization
const Papa = require('papaparse');
const fs = require('fs');

// Read the CSV file
const csvContent = fs.readFileSync('./dist/data/enriched_businesses.csv', 'utf8');

// Parse CSV
const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true
});

console.log('Total businesses in CSV:', parsed.data.length);

// Test the categorization logic
function categorizeBusinessFromTypes(business) {
  const name = (business.name || '').toLowerCase();
  const types = (business.types || '').toLowerCase();
  const query = (business.query || '').toLowerCase();
  const address = (business.address || '').toLowerCase();
  
  // Entertainment & Recreation - Check FIRST (before restaurants)
  if (types.includes('bar') || types.includes('night_club') || types.includes('amusement') || 
      types.includes('entertainment') || types.includes('movie_theater') || types.includes('gym') ||
      types.includes('bowling_alley') || types.includes('casino') || types.includes('stadium') ||
      query.includes('bar') || query.includes('entertainment') || query.includes('recreation') ||
      query.includes('club') || query.includes('cinema') || query.includes('music') ||
      name.includes('bar') || name.includes('nightclub') || name.includes('casino') ||
      name.includes('cinema') || name.includes('theatre') || name.includes('gym') ||
      name.includes('fitness') || name.includes('dance') || name.includes('sports') ||
      name.includes('club') || name.includes('disco') || name.includes('lounge') ||
      name.includes('maquis') || name.includes('buvette') || name.includes('espace')) {
    return 'Entertainment';
  }
  
  // Food & Restaurants (after entertainment check)
  if (types.includes('food') || types.includes('restaurant') || types.includes('meal_takeaway') ||
      (name.includes('restaurant') && !name.includes('bar')) || 
      (name.includes('food') && !name.includes('bar')) || name.includes('cuisine') ||
      (query.includes('restaurant') && !query.includes('bar')) || 
      (query.includes('food') && !query.includes('bar'))) {
    return 'Restaurants';
  }
  
  return 'Other';
}

// Find restaurants
const restaurants = parsed.data.filter(business => {
  const category = categorizeBusinessFromTypes(business);
  return category === 'Restaurants';
});

console.log('Restaurants found:', restaurants.length);

// Test specific businesses
const testBusinesses = [
  'Makoomba',
  'Les Plats De Anna',
  'Fair Bar'
];

testBusinesses.forEach(businessName => {
  const business = parsed.data.find(b => b.name === businessName);
  if (business) {
    const category = categorizeBusinessFromTypes(business);
    console.log(`\n${businessName}:`);
    console.log('  Name:', business.name);
    console.log('  Types:', business.types);
    console.log('  Query:', business.query);
    console.log('  Categorized as:', category);
  }
});

// Show first 5 restaurants
console.log('\nFirst 5 restaurants:');
restaurants.slice(0, 5).forEach(r => {
  console.log(`- ${r.name} (types: ${r.types}, query: ${r.query})`);
});