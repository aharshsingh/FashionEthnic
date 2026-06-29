/**
 * Seed script — inserts ~50 ethnic-wear products into the products collection.
 *
 * Usage (from the Backend directory):
 *   node seed/seedProducts.js          # add 50 products (keeps existing)
 *   node seed/seedProducts.js --fresh  # delete ALL products, then add 50
 *
 * Images: the Product model's `image` getter prepends APP_URL, and the server
 * serves /uploads statically, so we reference the files already in /uploads.
 */
const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const Product = require('../models/product');

// Existing, server-served upload images (cycled across products).
const IMAGES = [
  'uploads/1714333738465-NaN.png',
  'uploads/1714627335903-NaN.png',
  'uploads/1714627810303-NaN.webp',
  'uploads/1714732730715-NaN.webp',
  'uploads/1714732747757-NaN.webp',
];

// Curated catalogue templates: { name, gender, about, material, fit }
const CATALOGUE = [
  // Women
  { name: 'Banarasi Silk Saree', gender: 'Women', about: 'Handwoven Banarasi silk saree with intricate zari border and pallu.', material: 'Pure Banarasi Silk', fit: 'Regular Fit' },
  { name: 'Kanjeevaram Silk Saree', gender: 'Women', about: 'Traditional Kanjeevaram saree with contrast border and temple motifs.', material: 'Mulberry Silk', fit: 'Regular Fit' },
  { name: 'Chanderi Cotton Saree', gender: 'Women', about: 'Lightweight Chanderi saree with subtle gold buti work.', material: 'Chanderi Cotton', fit: 'Regular Fit' },
  { name: 'Georgette Designer Saree', gender: 'Women', about: 'Flowy georgette saree with sequin embellishments for parties.', material: 'Georgette', fit: 'Regular Fit' },
  { name: 'Bandhani Print Saree', gender: 'Women', about: 'Vibrant Rajasthani bandhani tie-dye saree in pure cotton.', material: 'Cotton', fit: 'Regular Fit' },
  { name: 'Anarkali Suit Set', gender: 'Women', about: 'Floor-length Anarkali kurta with churidar and dupatta.', material: 'Viscose Rayon', fit: 'Flared Fit' },
  { name: 'Straight Cotton Kurta', gender: 'Women', about: 'Everyday straight kurta with block prints and side slits.', material: 'Cotton', fit: 'Straight Fit' },
  { name: 'Embroidered Palazzo Set', gender: 'Women', about: 'Kurta paired with embroidered palazzo and chiffon dupatta.', material: 'Rayon Blend', fit: 'Relaxed Fit' },
  { name: 'Bridal Lehenga Choli', gender: 'Women', about: 'Heavily embroidered bridal lehenga with can-can flare.', material: 'Velvet & Net', fit: 'Flared Fit' },
  { name: 'Festive Sharara Set', gender: 'Women', about: 'Mirror-work kurta with flared sharara and organza dupatta.', material: 'Art Silk', fit: 'Flared Fit' },
  { name: 'Patiala Salwar Suit', gender: 'Women', about: 'Printed kurti with classic Patiala salwar and dupatta.', material: 'Cotton', fit: 'Regular Fit' },
  { name: 'Chikankari Kurti', gender: 'Women', about: 'Lucknowi chikankari hand-embroidered kurti.', material: 'Cotton Mulmul', fit: 'A-Line Fit' },
  // Men
  { name: 'Silk Blend Sherwani', gender: 'Men', about: 'Regal sherwani with thread embroidery and matching stole.', material: 'Silk Blend', fit: 'Slim Fit' },
  { name: 'Cotton Kurta Pyjama', gender: 'Men', about: 'Comfortable solid kurta with pyjama for daily wear.', material: 'Cotton', fit: 'Regular Fit' },
  { name: 'Pathani Suit', gender: 'Men', about: 'Classic Pathani kurta set with full sleeves.', material: 'Cotton Blend', fit: 'Regular Fit' },
  { name: 'Nehru Jacket Set', gender: 'Men', about: 'Kurta paired with a printed Nehru jacket.', material: 'Silk Blend', fit: 'Slim Fit' },
  { name: 'Linen Short Kurta', gender: 'Men', about: 'Breathable linen short kurta for casual occasions.', material: 'Pure Linen', fit: 'Slim Fit' },
  { name: 'Jodhpuri Bandhgala', gender: 'Men', about: 'Tailored Jodhpuri suit for weddings and receptions.', material: 'Polyester Viscose', fit: 'Tailored Fit' },
  { name: 'Dhoti Kurta Set', gender: 'Men', about: 'Traditional kurta with pre-stitched dhoti.', material: 'Art Silk', fit: 'Regular Fit' },
  { name: 'Printed Festive Kurta', gender: 'Men', about: 'Festive kurta with all-over ethnic print.', material: 'Cotton Silk', fit: 'Regular Fit' },
  // Kids / Unisex
  { name: 'Kids Ethnic Kurta Set', gender: 'Kids', about: 'Soft cotton kurta set for festive occasions.', material: 'Cotton', fit: 'Regular Fit' },
  { name: 'Girls Lehenga Set', gender: 'Kids', about: 'Adorable lehenga choli with sequin work for little ones.', material: 'Art Silk', fit: 'Flared Fit' },
  { name: 'Handloom Cotton Stole', gender: 'Unisex', about: 'Handloom stole with tassel detailing.', material: 'Handloom Cotton', fit: 'Free Size' },
  { name: 'Embroidered Dupatta', gender: 'Women', about: 'Statement organza dupatta with gota patti border.', material: 'Organza', fit: 'Free Size' },
];

const COLOURS = ['Maroon', 'Royal Blue', 'Emerald Green', 'Mustard Yellow', 'Coral Pink', 'Ivory', 'Teal', 'Wine', 'Saffron', 'Navy', 'Blush', 'Rust'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const CARE = 'Dry clean only. Do not bleach. Store in a cool, dry place.';
const RATINGS = ['4.1', '4.2', '4.3', '4.5', '4.6', '4.7', '4.8', '5.0'];
const DISCOUNTS = [0, 5, 10, 15, 20, 25, 30, 40, 50];

const TARGET = 50;

function buildProducts() {
  const products = [];
  for (let i = 0; i < TARGET; i++) {
    const base = CATALOGUE[i % CATALOGUE.length];
    const colour = COLOURS[i % COLOURS.length];
    const variant = i < CATALOGUE.length ? '' : ` - ${colour} Edition`;
    const price = 799 + ((i * 137) % 6500); // spread ₹799 – ₹7299
    products.push({
      name: `${base.name}${variant}`,
      price,
      about: base.about,
      material: base.material,
      care: CARE,
      colour,
      gender: base.gender,
      fit: base.fit,
      size: SIZES[i % SIZES.length],
      rating: RATINGS[i % RATINGS.length],
      discount: DISCOUNTS[i % DISCOUNTS.length],
      image: IMAGES[i % IMAGES.length],
    });
  }
  return products;
}

async function run() {
  const fresh = process.argv.includes('--fresh');
  try {
    await mongoose.connect(DB_URL);
    console.log('DB connected...');

    const before = await Product.countDocuments();
    console.log(`Existing products: ${before}`);

    if (fresh) {
      const { deletedCount } = await Product.deleteMany({});
      console.log(`--fresh: removed ${deletedCount} existing products.`);
    }

    const products = buildProducts();
    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products.`);

    const after = await Product.countDocuments();
    console.log(`Total products now: ${after}`);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('DB disconnected.');
  }
}

run();
