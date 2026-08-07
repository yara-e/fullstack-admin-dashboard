import {
    PrismaClient,
    OrderStatus,
    PaymentMethod,
    PaymentStatus,
    UserRole,
} from '@prisma/client';

const prisma = new PrismaClient();

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

async function main() {
    console.log('🌱 Starting 100-product database seeding...');

    // 1. Clean existing records
    await prisma.payment.deleteMany();
    await prisma.orderProduct.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create Users (2 Admins, 2 Managers, 50 Customers)
    console.log('Creating users...');
    await Promise.all([
        prisma.user.create({
            data: {
                name: 'Alex Rivera (Admin)',
                email: 'admin@example.com',
                role: UserRole.ADMIN,
                password: '$2b$10$M8NFHtkUs26dkoII4VNGge0XvgkjEJAkWwx5.8VHXqNLm5CyVMwCa',
                updatedAt: new Date(),
            },
        }),
        prisma.user.create({
            data: {
                name: 'Sarah Connor (Admin)',
                email: 'sarah.admin@example.com',
                role: UserRole.ADMIN,
                password: '$2b$10$M8NFHtkUs26dkoII4VNGge0XvgkjEJAkWwx5.8VHXqNLm5CyVMwCa',
                updatedAt: new Date(),
            },
        }),
        prisma.user.create({
            data: {
                name: 'Michael Scott (Manager)',
                email: 'manager@example.com',
                role: UserRole.MANAGER,
                password: '$2b$10$M8NFHtkUs26dkoII4VNGge0XvgkjEJAkWwx5.8VHXqNLm5CyVMwCa',
                updatedAt: new Date(),
            },
        }),
        prisma.user.create({
            data: {
                name: 'Dwight Schrute (Manager)',
                email: 'dwight.manager@example.com',
                role: UserRole.MANAGER,
                password: '$2b$10$M8NFHtkUs26dkoII4VNGge0XvgkjEJAkWwx5.8VHXqNLm5CyVMwCa',
                updatedAt: new Date(),
            },
        }),
    ]);

    const customerNames = [
        'Emma Watson', 'Liam Neeson', 'Olivia Wilde', 'Noah Centineo', 'Ava Max',
        'Ethan Hawke', 'Sophia Loren', 'Mason Mount', 'Isabella Rossellini', 'William Blake',
        'Mia Farrow', 'James Cameron', 'Harper Lee', 'Benjamin Franklin', 'Evelyn Waugh',
        'Lucas Vance', 'Abigail Spencer', 'Henry Cavill', 'Emily Blunt', 'Alexander Skarsgard',
        'Ella Purnell', 'Sebastian Stan', 'Scarlett Johansson', 'Jack Nicholson', 'Grace Kelly',
        'Daniel Craig', 'Chloe Grace Moretz', 'Matthew McConaughey', 'Victoria Beckham', 'David Beckham',
        'Penelope Cruz', 'Javier Bardem', 'Natalie Portman', 'Keanu Reeves', 'Charlize Theron',
        'Tom Hardy', 'Margot Robbie', 'Cillian Murphy', 'Florence Pugh', 'Timothée Chalamet',
        'Zendaya Coleman', 'Tom Holland', 'Sydney Sweeney', 'Jacob Elordi', 'Anya Taylor-Joy',
        'Austin Butler', 'Paul Mescal', 'Saoirse Ronan', 'Barry Keoghan', 'Andrew Garfield'
    ];

    const customers = await Promise.all(
        customerNames.map((name, index) =>
            prisma.user.create({
                data: {
                    name,
                    email: `user${index + 1}@example.com`,
                    role: UserRole.USER,
                    password: '$2b$10$YourHashedPasswordHere',
                    updatedAt: new Date(),
                },
            })
        )
    );

    // 3. Create Exactly 100 Products
    console.log('Creating 100 products...');
    const catalog100 = [
        // --- Category 1: Computer Hardware & Electronics (1-20) ---
        { name: 'Wireless Noise-Canceling Headphones', price: 199.99, stock: 85 },
        { name: 'Ultra-Wide 34-Inch Curved Monitor', price: 499.99, stock: 30 },
        { name: 'USB-C Dual 4K Docking Station', price: 89.99, stock: 150 },
        { name: 'HD Webcam with Dual Microphones', price: 74.95, stock: 110 },
        { name: 'Portable 2TB NVMe External SSD', price: 159.99, stock: 65 },
        { name: 'Portable 1TB NVMe External SSD', price: 99.99, stock: 120 },
        { name: 'Precision Wireless Laser Mouse', price: 49.99, stock: 200 },
        { name: 'High-Speed Wi-Fi 6E Router', price: 219.99, stock: 40 },
        { name: 'Surge Protector 12-Outlet Power Strip', price: 29.99, stock: 280 },
        { name: 'Thunderbolt 4 Cable 2m', price: 29.99, stock: 240 },
        { name: 'USB Flash Drive 256GB USB 3.2', price: 24.99, stock: 400 },
        { name: 'USB Flash Drive 512GB USB 3.2', price: 49.99, stock: 200 },
        { name: '1080p FHD External Monitor 15.6"', price: 149.99, stock: 55 },
        { name: 'Compact Bluetooth Keyboard', price: 39.99, stock: 180 },
        { name: 'Vertical Ergonomic Optical Mouse', price: 34.50, stock: 130 },
        { name: 'Multi-Port USB Hub 7-in-1', price: 27.99, stock: 220 },
        { name: 'SD Card Reader USB-C Dual Slot', price: 18.99, stock: 310 },
        { name: 'External DVD/CD Drive USB 3.0', price: 29.50, stock: 90 },
        { name: 'Wireless Presentation Clicker Remote', price: 19.99, stock: 175 },
        { name: 'Ethernet Cable Cat8 50ft', price: 22.99, stock: 260 },

        // --- Category 2: Office Furniture & Workspace Setup (21-40) ---
        { name: 'Executive Ergonomic Desk Chair', price: 349.99, stock: 45 },
        { name: 'Motorized Electric Standing Desk', price: 429.00, stock: 25 },
        { name: 'Aluminum Laptop Stand Riser', price: 39.99, stock: 210 },
        { name: 'Dual Monitor Arm Desk Mount', price: 69.99, stock: 90 },
        { name: 'Single Monitor Heavy Duty Arm Mount', price: 49.99, stock: 110 },
        { name: 'LED Desk Lamp with Wireless Charger', price: 45.50, stock: 130 },
        { name: 'Large Felt Desk Pad Leather Mat', price: 24.99, stock: 300 },
        { name: 'Under-Desk Cable Management Tray', price: 19.99, stock: 250 },
        { name: 'Memory Foam Lumbar Support Pillow', price: 29.95, stock: 160 },
        { name: 'Document Shredder 12-Sheet Cross-Cut', price: 84.99, stock: 40 },
        { name: 'Magnetic Whiteboard 36x24', price: 54.99, stock: 75 },
        { name: 'Adjustable Footrest Cushion Under Desk', price: 26.99, stock: 190 },
        { name: 'Balance Board for Standing Desk', price: 79.99, stock: 60 },
        { name: 'Desktop Organizer Box with Drawers', price: 32.50, stock: 140 },
        { name: 'Monitor Screen Bar Clip Light', price: 38.99, stock: 165 },
        { name: 'Ergonomic Seat Cushion Memory Foam', price: 35.00, stock: 210 },
        { name: 'Privacy Screen Filter 24-Inch', price: 42.99, stock: 80 },
        { name: 'Rolling File Cabinet 3-Drawer', price: 119.99, stock: 35 },
        { name: 'Desk Anti-Fatigue Mat', price: 44.99, stock: 95 },
        { name: 'Mesh Wastebasket Trash Can 3-Pack', price: 21.99, stock: 180 },

        // --- Category 3: Developer, Gaming & Accessories (41-60) ---
        { name: 'Ergonomic Mechanical Keyboard RGB', price: 129.50, stock: 120 },
        { name: 'Custom Artisan Keycap Set', price: 35.00, stock: 80 },
        { name: 'RGB Desktop Microphone Boom Arm', price: 119.99, stock: 70 },
        { name: 'Capture Card 4K 60FPS Pro', price: 179.99, stock: 55 },
        { name: 'Pro Gaming Headset 7.1 Surround', price: 139.95, stock: 100 },
        { name: 'Padded Gaming Wrist Rest', price: 15.99, stock: 220 },
        { name: 'Blue Light Blocking Glasses', price: 22.50, stock: 310 },
        { name: 'Stream Controller Deck 15-Key', price: 149.99, stock: 50 },
        { name: 'VR Headset Carrying Case', price: 39.00, stock: 85 },
        { name: 'Gaming Bungee Mouse Cable Holder', price: 14.99, stock: 260 },
        { name: 'Wireless Gaming Controller Bluetooth', price: 59.99, stock: 140 },
        { name: 'Ultra-Fast Gaming Mousepad XL', price: 29.99, stock: 280 },
        { name: 'Headphone Stand Mount RGB', price: 24.99, stock: 190 },
        { name: 'Hot-Swappable Mechanical Numpad', price: 32.99, stock: 105 },
        { name: 'PBT Double-Shot Keycaps Set', price: 29.99, stock: 150 },
        { name: 'Gaming Chair Lumbar Massager', price: 49.99, stock: 75 },
        { name: 'VR Silicone Face Cover Pad', price: 16.99, stock: 210 },
        { name: 'Cable Sleeve Organizer 10ft', price: 12.99, stock: 340 },
        { name: 'Flight Simulator Joystick', price: 129.99, stock: 25 },
        { name: 'Racing Wheel & Pedals Set', price: 249.99, stock: 20 },

        // --- Category 4: Audio, Smart Home & Studio (61-80) ---
        { name: 'Desktop Studio Monitor Speakers (Pair)', price: 249.99, stock: 35 },
        { name: 'Portable Bluetooth Waterproof Speaker', price: 68.50, stock: 140 },
        { name: 'Condenser Podcast USB Microphone', price: 99.99, stock: 95 },
        { name: 'Acoustic Foam Sound Panels 12-Pack', price: 32.99, stock: 190 },
        { name: 'Smart Home Hub Speaker with Screen', price: 99.00, stock: 140 },
        { name: 'Noise-Isolating In-Ear Earbuds', price: 79.99, stock: 180 },
        { name: 'Smart Fitness Watch Series 5', price: 229.00, stock: 95 },
        { name: 'Smart Plug Mini 4-Pack', price: 34.99, stock: 160 },
        { name: 'Smart Light Bulb RGB E26 2-Pack', price: 26.99, stock: 230 },
        { name: 'Smart LED Light Strip 16.4ft', price: 21.99, stock: 310 },
        { name: 'Audio Interface 2-Channel USB', price: 139.99, stock: 65 },
        { name: 'Pop Filter for Studio Microphone', price: 11.99, stock: 420 },
        { name: 'XLR Microphone Cable 10ft', price: 14.99, stock: 290 },
        { name: 'Earphone Travel Carrying Case', price: 9.99, stock: 500 },
        { name: 'Smart Indoor Security Camera 1080p', price: 39.99, stock: 130 },
        { name: 'Smart Door Sensor 2-Pack', price: 29.99, stock: 175 },
        { name: 'Smart Temperature Humidity Monitor', price: 19.99, stock: 240 },
        { name: 'Over-Ear Studio Reference Headphones', price: 149.00, stock: 50 },
        { name: 'Microphone Shock Mount Holder', price: 18.50, stock: 200 },
        { name: 'Wireless Audio Transmitter Adapter', price: 28.99, stock: 110 },

        // --- Category 5: Everyday Tech & Lifestyle Gear (81-100) ---
        { name: 'MagSafe Wireless Charging Pad 15W', price: 39.99, stock: 175 },
        { name: 'Stainless Steel Insulated Smart Tumbler', price: 38.00, stock: 130 },
        { name: 'Travel Tech Organizer Cable Bag', price: 27.99, stock: 210 },
        { name: 'Compact HEPA Air Purifier for Desk', price: 69.99, stock: 80 },
        { name: 'Electric Coffee Mug Warmer Plate', price: 21.50, stock: 190 },
        { name: 'UV Light Phone Sanitizer Box', price: 44.99, stock: 115 },
        { name: 'Laptop Backpack with USB Charging Port', price: 59.99, stock: 105 },
        { name: 'Rechargeable Hand Warmer Power Bank', price: 25.99, stock: 145 },
        { name: 'Smart Digital Bluetooth Scale', price: 31.99, stock: 160 },
        { name: 'Mini Desktop Vacuum Cleaner USB', price: 16.99, stock: 230 },
        { name: 'Personal Quiet Desk Fan USB', price: 28.50, stock: 175 },
        { name: 'Adjustable Aluminum Phone Stand Holder', price: 14.99, stock: 500 },
        { name: 'Cable Clips Desk Organizer 10-Pack', price: 9.99, stock: 650 },
        { name: 'Magnetic Wireless Power Bank 10000mAh', price: 45.99, stock: 125 },
        { name: 'Multi-Tool Stainless Steel Pen', price: 12.99, stock: 380 },
        { name: 'Screen Cleaning Kit with Microfiber Cloth', price: 11.50, stock: 450 },
        { name: 'Keyboard Cleaning Gel Putty', price: 8.99, stock: 600 },
        { name: 'Reusable Cable Straps Ties 50-Pack', price: 10.99, stock: 550 },
        { name: 'Insulated Stainless Water Bottle 32oz', price: 29.99, stock: 210 },
        { name: 'Compact Power Bank 20000mAh Dual Port', price: 39.99, stock: 160 }
    ];

    const products = await Promise.all(
        catalog100.map((prod) =>
            prisma.product.create({
                data: {
                    name: prod.name,
                    price: prod.price,
                    stock: prod.stock,
                    isActive: true,
                    isDeleted: false,
                },
            })
        )
    );

    // 4. Generate 90 Days of Orders (3 to 12 orders per day)
    console.log('Generating 90 days of transactions...');
    const now = new Date();
    let totalOrdersCreated = 0;

    for (let dayOffset = 90; dayOffset >= 0; dayOffset--) {
        const ordersTodayCount = getRandomNumber(3, 12);

        for (let i = 0; i < ordersTodayCount; i++) {
            const orderDate = new Date(now);
            orderDate.setDate(now.getDate() - dayOffset);
            orderDate.setHours(getRandomNumber(7, 23), getRandomNumber(0, 59), getRandomNumber(0, 59));

            const selectedUser = getRandomElement(customers);

            // Select 1 to 4 distinct products from the 100 available products
            const itemCount = getRandomNumber(1, 4);
            const chosenProducts = Array.from({ length: itemCount }, () => getRandomElement(products));

            let totalAmount = 0;
            const orderProductsData = chosenProducts.map((p) => {
                const qty = getRandomNumber(1, 3);
                totalAmount += p.price * qty;
                return {
                    productId: p.id,
                    quantity: qty,
                    price: p.price,
                };
            });

            // Status weighting: 75% COMPLETED, 15% PENDING, 10% CANCELLED
            const statusRoll = Math.random();
            let status: OrderStatus = OrderStatus.COMPLETED;
            if (statusRoll > 0.90) {
                status = OrderStatus.CANCELLED;
            } else if (statusRoll > 0.75) {
                status = OrderStatus.PENDING;
            }

            // Create Order & OrderProducts
            const order = await prisma.order.create({
                data: {
                    userId: selectedUser.id,
                    amount: parseFloat(totalAmount.toFixed(2)),
                    status,
                    createdAt: orderDate,
                    OrderProduct: {
                        createMany: {
                            data: orderProductsData,
                        },
                    },
                },
            });

            // Create associated Payment record
            if (status !== OrderStatus.CANCELLED) {
                const paymentStatus =
                    status === OrderStatus.COMPLETED
                        ? PaymentStatus.PAID
                        : PaymentStatus.PENDING;

                await prisma.payment.create({
                    data: {
                        orderId: order.id,
                        method: getRandomElement<PaymentMethod>([
                            PaymentMethod.CARD,
                            PaymentMethod.CARD,
                            PaymentMethod.CARD,
                            PaymentMethod.WALLET,
                            PaymentMethod.CASH,
                        ]),
                        status: paymentStatus,
                        paidAt: paymentStatus === PaymentStatus.PAID ? orderDate : null,
                        createdAt: orderDate,
                    },
                });
            }

            totalOrdersCreated++;
        }
    }

    console.log(`✅ Seeding complete! Created ${customers.length} users, ${products.length} products, and ${totalOrdersCreated} orders over 90 days.`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });