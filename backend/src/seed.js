require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const SiteSetting = require('./models/SiteSetting');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gstore');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  await connectDB();

  try {
    await User.deleteMany();
    await Product.deleteMany();
    await SiteSetting.deleteMany();

    const usersData = [
      {
        name: 'Main Admin',
        email: 'admin@gmail.com',
        password: 'admin@123',
        phone: '1234567890',
        address: 'G Store Headquarters',
        role: 'admin',
      },
      {
        name: 'Admin User',
        email: 'admin@gstore.com',
        password: 'Admin12345',
        phone: '1234567890',
        address: '123 Admin St, City',
        role: 'admin',
      },
      {
        name: 'Normal User',
        email: 'user@gstore.com',
        password: 'User12345',
        phone: '0987654321',
        address: '456 User St, City',
        role: 'user',
      }
    ];

    for (const u of usersData) {
      await User.create(u);
    }

    await Product.insertMany([
      {
        title: 'Classic White Custom Mug',
        slug: 'classic-white-custom-mug',
        description: 'A classic 11oz white mug customizable with your name and custom text.',
        price: 500,
        discountPrice: 450,
        category: 'Mugs',
        stock: 50,
        isFeatured: true,
        images: ['/uploads/products/default1.jpg'],
        customizationOptions: {
          allowNamePrint: true,
          allowCustomText: true,
          maxTextLength: 30,
          availableColors: ['White']
        }
      },
      {
        title: 'Magic Color Changing Mug',
        slug: 'magic-color-changing-mug',
        description: 'Pour hot liquid to reveal your hidden customized text.',
        price: 800,
        category: 'Magic Mugs',
        stock: 30,
        isFeatured: true,
        images: ['/uploads/products/default2.jpg'],
        customizationOptions: {
          allowNamePrint: false,
          allowCustomText: true,
          maxTextLength: 50,
          availableColors: ['Black', 'Blue', 'Red']
        }
      },
      {
        title: 'Couple Love Mug Set',
        slug: 'couple-love-mug-set',
        description: 'Set of 2 mugs for couples with customized names.',
        price: 1200,
        discountPrice: 1000,
        category: 'Couple Mugs',
        stock: 20,
        isFeatured: false,
        images: ['/uploads/products/default3.jpg'],
        customizationOptions: {
          allowNamePrint: true,
          allowCustomText: false,
          maxTextLength: 20,
          availableColors: ['White']
        }
      },
      {
        title: 'Corporate Logo Mug',
        slug: 'corporate-logo-mug',
        description: 'Print your company logo and custom text. Ideal for offices.',
        price: 600,
        category: 'Corporate',
        stock: 100,
        isFeatured: false,
        images: ['/uploads/products/default4.jpg'],
        customizationOptions: {
          allowNamePrint: false,
          allowCustomText: true,
          maxTextLength: 100,
          availableColors: ['White', 'Black']
        }
      },
      {
        title: 'Birthday Special Mug',
        slug: 'birthday-special-mug',
        description: 'Wish a happy birthday with this special customized mug.',
        price: 550,
        category: 'Occasions',
        stock: 40,
        isFeatured: true,
        images: ['/uploads/products/default5.jpg'],
        customizationOptions: {
          allowNamePrint: true,
          allowCustomText: true,
          maxTextLength: 40,
          availableColors: ['Pink', 'Blue', 'White']
        }
      },
      {
        title: 'Funny Quote Mug',
        slug: 'funny-quote-mug',
        description: 'Print any funny quote you like to start your morning with a smile.',
        price: 450,
        category: 'Mugs',
        stock: 60,
        isFeatured: false,
        images: ['/uploads/products/default6.jpg'],
        customizationOptions: {
          allowNamePrint: false,
          allowCustomText: true,
          maxTextLength: 60,
          availableColors: ['Yellow', 'White']
        }
      }
    ]);

    await SiteSetting.create({
      storeName: 'G Store',
      adminWhatsappNumber: '923001234567',
      currency: 'PKR',
      deliveryNote: 'Delivery within 3-5 working days',
      homepageHeroTitle: 'Premium Customized Mugs',
      homepageHeroSubtitle: 'Make your moments special with our high-quality customized printed mugs',
      homepageAnnouncement: 'Free shipping on orders over Rs. 2000'
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
