import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Create admin user
        const adminExists = await prisma.user.findUnique({
            where: {
                email: process.env.ADMIN_EMAIL,
            },
        })

        if (!adminExists) {
            await prisma.user.create({
                data: {
                    name: 'Admin',
                    email: process.env.ADMIN_EMAIL!,
                    password: await hash(process.env.ADMIN_PASSWORD!, 10),
                    isAdmin: true,
                },
            })
        }

        const productsCount = await prisma.product.count()

        if (productsCount === 0) {
            const products = [
                {
                    name: 'AVON Yama Gear Mountain Bike',
                    description:
                        'High-performance mountain bike with disc brakes and premium suspension for rough terrains.',
                    price: 599.99,
                    category: 'sports',
                    model: 'Yama Gear',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yama%20gear.jpg-890txwTfv568qaSOpFxGrxYhEHWdAF.jpeg',
                    featured: true,
                },
                {
                    name: 'Cyclelig Electric Bike',
                    description:
                        'Powerful electric bike with long-lasting battery and smooth ride for urban commuting.',
                    price: 1299.99,
                    category: 'electric',
                    model: 'E-Commuter',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ebike.jpg-xo9t2SKXTWyahFrBShVCSR27M9PeI4.webp',
                    featured: true,
                },
                {
                    name: 'Gang Catcher Mountain Bike',
                    description: 'Durable mountain bike with comfortable seating and reliable braking system.',
                    price: 449.99,
                    category: 'sports',
                    model: 'Catcher',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gang-catcher-sGBNLA36xzF79kJ6EIX8zDWUW1TONT.jpeg',
                    featured: true,
                },
                {
                    name: 'MYRO Kids Bicycle',
                    description: 'Colorful kids bike with training wheels and safety features for young riders.',
                    price: 199.99,
                    category: 'kids',
                    model: 'MYRO Junior',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MYRO.jpg-SaPANWbikcG3eanRc4yfDCbzQnzewE.jpeg',
                    featured: true,
                },
                {
                    name: 'RYNO Sports Bike',
                    description:
                        'Versatile sports bike with dual suspension for both city rides and off-road adventures.',
                    price: 529.99,
                    category: 'sports',
                    model: 'RYNO Pro',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ryno.jpg-iasiH6NeFBGOwduKWdUak9J0WJMS1D.jpeg',
                    featured: false,
                },
                {
                    name: 'Muffin Mountain Bike',
                    description: 'Sturdy mountain bike with fat tires for excellent traction on all terrains.',
                    price: 479.99,
                    category: 'sports',
                    model: 'Muffin X1',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/muffin.jpg-exsEcFSktRtqW8wtdLN9qy0ADof9gM.jpeg',
                    featured: false,
                },
                {
                    name: 'Waka-Waka Sports Bike',
                    description:
                        'Lightweight sports bike with water bottle holder and comfortable grip for long rides.',
                    price: 389.99,
                    category: 'sports',
                    model: 'Waka-Waka Pro',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wakawakasus.jpg-kRti9ljAH4iRjc2B20PayQe5pbMpiw.jpeg',
                    featured: false,
                },
                {
                    name: 'Zappier Kids Bike',
                    description:
                        'Stylish kids bike with adjustable seat height and durable construction for growing children.',
                    price: 249.99,
                    category: 'kids',
                    model: 'Zappier Junior',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zappier-K0DB0PAptYsYjZTpTst9xOc0Xf912e.jpeg',
                    featured: false,
                },
                {
                    name: 'Gang Benito Kids Bike',
                    description:
                        'Feature-rich kids bike with unique wheel design and comfortable seating for young riders.',
                    price: 279.99,
                    category: 'kids',
                    model: 'Benito Mini',
                    imageUrl:
                        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gang-bento-6MxAkQmdcKYlObUsbhIFR6VwJcQTra.jpeg',
                    featured: false,
                },
            ]

            await prisma.product.createMany({
                data: products,
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
        })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({ success: false, message: 'Failed to seed database' }, { status: 500 })
    }
}
