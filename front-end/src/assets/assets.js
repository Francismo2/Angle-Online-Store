import F1 from './F1.png'
import F2 from './F2.png'
import F3 from './F3.png'
import F4 from './F4.png'
import F5 from './F5.png'
import F6 from './F6.png'
import F7 from './F7.png'
import F8 from './F8.png'
import F9 from './F9.png'
import F10 from './F10.png'
import F11 from './F11.png'
import F12 from './F12.png'
import F13 from './F13.png'
import F14 from './F14.png'
import F15 from './F15.png'
import F16 from './F16.png'
import F17 from './F17.png'
import F18 from './F18.png'
import F19 from './F19.png'
import F20 from './F20.png'
import M1 from './M1.png'
import M2 from './M2.png'
import M3 from './M3.png'
import M4 from './M4.png'
import M5 from './M5.png'
import M6 from './M6.png'
import M7 from './M7.png'
import M8 from './M8.png'
import M9 from './M9.png'
import M10 from './M10.png'
import M11 from './M11.png'
import M12 from './M12.png'
import M13 from './M13.png'
import M14 from './M14.png'
import M15 from './M15.png'
import M16 from './M16.png'
import M17 from './M17.png'
import M18 from './M18.png'
import M19 from './M19.png'
import M20 from './M20.png'
import SHO1 from './SHO2.png'
import SHO2 from './SHO2.png'
import SHO3 from './SHO3.png'
import ST1 from './ST1.png'
import ST2 from './ST2.png'
import ST3 from './ST3.png'
import ST4 from './ST4.png'
import ST5 from './ST5.png'
import ST6 from './ST6.png'
import ST7 from './ST7.png'
import ST8 from './ST8.png'
import ST9 from './ST9.png'
import ST10 from './ST10.png'
import ST11 from './ST11.png'
import ST12 from './ST12.png'
import ST13 from './ST13.png'
import ST14 from './ST14.png'
import ST15 from './ST15.png'
import ST16 from './ST16.png'
import ST17 from './ST17.png'
import ST18 from './ST18.png'
import ST19 from './ST19.png'
import ST20 from './ST20.png'

import add_cart_icon from './add_cart_icon.png'
import cart_icon from './cart_icon.png'
import cover from './cover.png'
import delivery_icon from './delivery_icon.png'
import instagram_icon from './instagram_icon.png'
import logo from './logo.png'
import menu_icon from './menu_icon.png'
import ph_icon from './ph_icon.png'
import profile_icon from './profile_icon.png'
import refund_icon from './refund_icon.png'
import search_icon from './search_icon.png'
import mainlogo from './AOS-Logo.png'


export const assets = {
    add_cart_icon,
    cart_icon,
    cover,
    delivery_icon,
    instagram_icon,
    logo,
    menu_icon,
    ph_icon,
    profile_icon,
    refund_icon,
    search_icon,
    mainlogo
}

export const products = [
    {
        _id: "aaaaaa",
        name: "Aesthetic Women Shirt",
        description: "A lightweight, knitted, pullover shirt, close-fitting.",
        price: 100,
        image: [F1, F2, F3, F4],
        category: "Women",
        sizes: ["S", "M", "L", "XL", "XXL"],
        details: `
                    Important Notice:
                    Please ensure that the quantity of items you are ordering does not exceed the available stock. If you select more items than what is available, your order will be automatically canceled. Here are the current available stocks:

                    Available Stocks:
                    S: 20 pcs
                    M: 12 pcs
                    L: 5 pcs
                    XL: 30 pcs
                    XXL: 38 pcs
                    `,
        stocks: 105,
        bestseller: true,
        active: true,
        date: 1716621345448
    },
    {
        _id: "aaaaab",
        name: "Trendy Women Top",
        description: "A trendy top for casual days with a comfortable fit.",
        price: 85,
        image: [F2],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for casual outfits.",
        stocks: 30,
        bestseller: false,
        active: true,
        date: 1716235423238
    },
    {
        _id: "aaaaac",
        name: "Chic Women Blouse",
        description: "A stylish blouse for formal and casual wear.",
        price: 120,
        image: [F3],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Can be worn at work or on casual outings.",
        stocks: 40,
        bestseller: false,
        active: false,
        date: 1716256794555
    },
    {
        _id: "aaaaad",
        name: "Casual Women Dress",
        description: "A relaxed fit dress perfect for weekend getaways.",
        price: 150,
        image: [F4],
        category: "Women",
        sizes: ["S", "M", "L"],
        details: "Flowy and elegant for everyday use.",
        stocks: 60,
        bestseller: true,
        active: true,
        date: 1716278947635
    },
    {
        _id: "aaaaae",
        name: "Sporty Women Hoodie",
        description: "A comfortable hoodie perfect for lounging or sports.",
        price: 95,
        image: [F5],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Ideal for active days or relaxed evenings.",
        stocks: 70,
        bestseller: true,
        active: false,
        date: 1716296781342
    },
    {
        _id: "aaaaaf",
        name: "Elegant Women Cardigan",
        description: "A cozy cardigan for layering over any outfit.",
        price: 110,
        image: [F6],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Soft and stylish for chilly evenings.",
        stocks: 50,
        bestseller: false,
        active: false,
        date: 1716312399850
    },
    {
        _id: "aaaaag",
        name: "Summer Women Skirt",
        description: "A light, breezy skirt perfect for summer days.",
        price: 80,
        image: [F7],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Comfortable and chic for the warm season.",
        stocks: 60,
        bestseller: true,
        active: false,
        date: 1716334984003
    },
    {
        _id: "aaaaah",
        name: "Vintage Women Jeans",
        description: "Classic vintage jeans for a retro look.",
        price: 135,
        image: [F8],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "A timeless piece with a modern twist.",
        stocks: 45,
        bestseller: false,
        active: false,
        date: 1716350542214
    },
    {
        _id: "aaaaai",
        name: "Charming Women Top",
        description: "A charming top for any casual day.",
        price: 90,
        image: [F9],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Simplicity at its finest.",
        stocks: 55,
        bestseller: true,
        active: false,
        date: 1716374418775
    },
    {
        _id: "aaaaaj",
        name: "Bohemian Women Tunic",
        description: "Boho-inspired tunic for a relaxed, carefree style.",
        price: 160,
        image: [F10],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Loosely fitted with a comfortable vibe.",
        stocks: 40,
        bestseller: true,
        active: true,
        date: 1716396801329
    },
    {
        _id: "aaaaak",
        name: "Cozy Women Sweater",
        description: "A cozy sweater for the colder months.",
        price: 140,
        image: [F11],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Comfortable and stylish for the winter.",
        stocks: 80,
        bestseller: false,
        active: true,
        date: 1716420341425
    },
    {
        _id: "aaaaal",
        name: "Elegant Women Jumpsuit",
        description: "An elegant jumpsuit for formal events.",
        price: 180,
        image: [F12],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Dress it up for a perfect evening look.",
        stocks: 30,
        bestseller: true,
        active: false,
        date: 1716440679826
    },
    {
        _id: "aaaaam",
        name: "Sophisticated Women Top",
        description: "A sophisticated top for professional settings.",
        price: 125,
        image: [F13],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Elegant and polished for office or meetings.",
        stocks: 70,
        bestseller: true,
        active: true,
        date: 1716465090314
    },
    {
        _id: "aaaaan",
        name: "Relaxed Women Shirt",
        description: "A relaxed fit shirt perfect for casual outings.",
        price: 95,
        image: [F14],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Comfortable and stylish for a laid-back day.",
        stocks: 60,
        bestseller: false,
        active: true,
        date: 1716485092287
    },
    {
        _id: "aaaaao",
        name: "Urban Women Jacket",
        description: "An urban jacket with a trendy design.",
        price: 160,
        image: [F15],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for chilly urban evenings.",
        stocks: 45,
        bestseller: true,
        active: false,
        date: 1716510425120
    },
    {
        _id: "aaaaap",
        name: "Sporty Women Sweatshirt",
        description: "A sporty sweatshirt for active days.",
        price: 90,
        image: [F16],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Great for workout or lounging.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716537658972
    },
    {
        _id: "aaaaaq",
        name: "Relaxed Women Pants",
        description: "Casual and comfy pants for every day.",
        price: 110,
        image: [F17],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Comfortable pants with a relaxed fit.",
        stocks: 40,
        bestseller: false,
        active: true,
        date: 1716564632221
    },
    {
        _id: "aaaaar",
        name: "Floral Women Dress",
        description: "A beautiful floral dress for spring outings.",
        price: 150,
        image: [F18],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Bright and cheerful for sunny days.",
        stocks: 55,
        bestseller: true,
        active: false,
        date: 1716582703905
    },
    {
        _id: "aaaaas",
        name: "Romantic Women Skirt",
        description: "A romantic skirt for formal or casual events.",
        price: 130,
        image: [F19],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Elegant and charming, the perfect addition.",
        stocks: 60,
        bestseller: false,
        active: true,
        date: 1716615491232
    },
    {
        _id: "aaaaat",
        name: "Trendy Women Blouse",
        description: "A trendy blouse to complement any outfit.",
        price: 105,
        image: [F20],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
        details: "Modern and fashionable for a chic appearance.",
        stocks: 70,
        bestseller: true,
        active: true,
        date: 1716630246840
    },
    // Category: Men (M1-M20) starts here
    {
        _id: "aaaaau",
        name: "Aesthetic Men Shirt",
        description: "A comfortable shirt for every day, a great addition to any wardrobe.",
        price: 100,
        image: [M1],
        category: "Men",
        sizes: ["S", "M", "L", "XL", "XXL"],
        details: "Casual yet stylish for any occasion.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716634324820
    },
    {
        _id: "aaaaav",
        name: "Trendy Men Top",
        description: "A trendy top that can be worn for both casual and semi-formal events.",
        price: 90,
        image: [M2],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for any season, a versatile wardrobe essential.",
        stocks: 60,
        bestseller: false,
        active: true,
        date: 1716639003125
    },
    {
        _id: "aaaaaw",
        name: "Casual Men T-Shirt",
        description: "A classic and simple t-shirt for everyday wear.",
        price: 45,
        image: [M3],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "A wardrobe staple for any casual look.",
        stocks: 80,
        bestseller: true,
        active: true,
        date: 1716642348237
    },
    {
        _id: "aaaaax",
        name: "Sporty Men Hoodie",
        description: "A comfortable hoodie perfect for any athletic activity or casual outing.",
        price: 120,
        image: [M4],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Ideal for post-workout or simply lounging around.",
        stocks: 40,
        bestseller: false,
        active: true,
        date: 1716645239872
    },
    {
        _id: "aaaaay",
        name: "Urban Men Jacket",
        description: "A sleek jacket designed for an urban look with added warmth.",
        price: 180,
        image: [M5],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for cool evenings or street style.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716648764392
    },
    {
        _id: "aaaaaz",
        name: "Athletic Men Shorts",
        description: "Perfect shorts for any sport or casual event.",
        price: 75,
        image: [M6],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Light and breathable for all-day comfort.",
        stocks: 70,
        bestseller: false,
        active: true,
        date: 1716652056547
    },
    {
        _id: "aaaaba",
        name: "Classic Men Jeans",
        description: "A pair of classic jeans for an everyday look.",
        price: 130,
        image: [M7],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Durable and versatile, perfect for any outfit.",
        stocks: 55,
        bestseller: true,
        active: true,
        date: 1716655320491
    },
    {
        _id: "aaaabb",
        name: "Modern Men Sweatshirt",
        description: "A modern sweatshirt for layering during cooler days.",
        price: 110,
        image: [M8],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Casual and cozy, perfect for any casual look.",
        stocks: 45,
        bestseller: false,
        active: true,
        date: 1716658502123
    },
    {
        _id: "aaaabc",
        name: "Relaxed Men Pants",
        description: "A pair of comfortable pants for everyday use.",
        price: 85,
        image: [M9],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Light and easy to wear, ideal for daily activities.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716661473712
    },
    {
        _id: "aaaabd",
        name: "Stylish Men Blazer",
        description: "A sharp blazer for a refined, sophisticated look.",
        price: 220,
        image: [M10],
        category: "Men",
        sizes: ["M", "L", "XL"],
        details: "Perfect for formal events or business meetings.",
        stocks: 30,
        bestseller: false,
        active: true,
        date: 1716664145648
    },
    {
        _id: "aaaabe",
        name: "Comfortable Men Polo",
        description: "A classic polo for both casual and smart-casual occasions.",
        price: 65,
        image: [M11],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "The perfect balance of comfort and style.",
        stocks: 60,
        bestseller: true,
        active: true,
        date: 1716667554765
    },
    {
        _id: "aaaabf",
        name: "Chic Men Button-Down Shirt",
        description: "A stylish button-down shirt for semi-formal occasions.",
        price: 140,
        image: [M12],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "A versatile piece that fits any occasion.",
        stocks: 40,
        bestseller: true,
        active: true,
        date: 1716670342678
    },
    {
        _id: "aaaabg",
        name: "Relaxed Men Shorts",
        description: "Casual shorts for lounging or hanging out with friends.",
        price: 60,
        image: [M13],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Comfortable and easy to wear.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716672908243
    },
    {
        _id: "aaaabh",
        name: "Sporty Men Tank Top",
        description: "A sporty tank top for workouts or casual outings.",
        price: 55,
        image: [M14],
        category: "Men",
        sizes: ["M", "L", "XL"],
        details: "Breathable fabric ideal for sports and fitness.",
        stocks: 70,
        bestseller: false,
        active: true,
        date: 1716675682196
    },
    {
        _id: "aaaabi",
        name: "Casual Men Hoodie",
        description: "A laid-back hoodie for a relaxed look.",
        price: 95,
        image: [M15],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Cozy and perfect for chilly days.",
        stocks: 60,
        bestseller: true,
        active: true,
        date: 1716679042645
    },
    {
        _id: "aaaabj",
        name: "Professional Men Suit",
        description: "A professional suit for business meetings and formal events.",
        price: 250,
        image: [M16],
        category: "Men",
        sizes: ["M", "L", "XL"],
        details: "Sharp and tailored to perfection for a professional look.",
        stocks: 30,
        bestseller: false,
        active: true,
        date: 1716681395472
    },
    {
        _id: "aaaabk",
        name: "Trendy Men Shirt",
        description: "A trendy shirt for fashion-forward individuals.",
        price: 90,
        image: [M17],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "A stylish piece that adds personality to any outfit.",
        stocks: 65,
        bestseller: false,
        active: true,
        date: 1716684037621
    },
    {
        _id: "aaaabl",
        name: "Athletic Men Pants",
        description: "Perfect pants for training and gym activities.",
        price: 115,
        image: [M18],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Designed for maximum comfort during workouts.",
        stocks: 45,
        bestseller: true,
        active: true,
        date: 1716687129390
    },
    {
        _id: "aaaabm",
        name: "Classic Men Jacket",
        description: "A classic jacket for any occasion, a wardrobe staple.",
        price: 150,
        image: [M19],
        category: "Men",
        sizes: ["M", "L", "XL"],
        details: "Durable and stylish for every season.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716690126143
    },
    {
        _id: "aaaabn",
        name: "Vintage Men T-shirt",
        description: "A retro-inspired t-shirt with unique graphics.",
        price: 85,
        image: [M20],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for adding a cool touch to any outfit.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716693781849
    },
    // SHORTS
    {
        _id: "aaaabo",
        name: "Comfortable Summer Shorts",
        description: "Perfect for hot days, these shorts keep you cool and comfortable.",
        price: 50,
        image: [SHO1],
        category: "Shorts",
        sizes: ["S", "M", "L"],
        details: "A must-have for warm weather.",
        stocks: 80,
        bestseller: true,
        active: true,
        date: 1716654123341
    },
    {
        _id: "aaaabp",
        name: "Trendy Casual Shorts",
        description: "Casual shorts for a relaxed and stylish look.",
        price: 45,
        image: [SHO2],
        category: "Shorts",
        sizes: ["S", "M", "L"],
        details: "Comfy and easy to pair with any top.",
        stocks: 65,
        bestseller: false,
        active: true,
        date: 1716675987345
    },
    {
        _id: "aaaabq",
        name: "Sporty Workout Shorts",
        description: "Perfect for sports and outdoor activities, offering great flexibility.",
        price: 55,
        image: [SHO3],
        category: "Shorts",
        sizes: ["S", "M", "L"],
        details: "Ideal for an active lifestyle.",
        stocks: 50,
        bestseller: true,
        active: true,
        date: 1716702334671
    },
    // STRIPED SHIRT(UNISEX)
    {
        _id: "aaaabr",
        name: "Classic Striped Unisex Shirt",
        description: "A timeless striped shirt perfect for all genders.",
        price: 70,
        image: [ST1],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Casual yet stylish for every occasion.",
        stocks: 100,
        bestseller: true,
        active: true,
        date: 1716801234451
    },
    {
        _id: "aaaabs",
        name: "Casual Striped Unisex T-Shirt",
        description: "A lightweight striped t-shirt for comfort and style.",
        price: 50,
        image: [ST2],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "Perfect for everyday wear, versatile for all seasons.",
        stocks: 90,
        bestseller: false,
        active: true,
        date: 1716824778010
    },
    {
        _id: "aaaabt",
        name: "Retro Striped Unisex Polo",
        description: "Vintage-inspired polo shirt with bold stripes.",
        price: 85,
        image: [ST3],
        category: "Striped Shirts(UNISEX)",
        sizes: ["M", "L", "XL"],
        details: "Bringing retro vibes into modern fashion.",
        stocks: 60,
        bestseller: true,
        active: true,
        date: 1716849001097
    },
    {
        _id: "aaaabu",
        name: "Striped Unisex Button-Down Shirt",
        description: "Button-down striped shirt for a smart-casual look.",
        price: 90,
        image: [ST4],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Ideal for a more formal casual outing.",
        stocks: 80,
        bestseller: false,
        active: true,
        date: 1716874029873
    },
    {
        _id: "aaaabv",
        name: "Bold Stripes Unisex T-Shirt",
        description: "Striking bold stripes on a relaxed fit t-shirt.",
        price: 60,
        image: [ST5],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "A standout piece to add to your wardrobe.",
        stocks: 95,
        bestseller: true,
        active: true,
        date: 1716895643191
    },
    {
        _id: "aaaabw",
        name: "Summer Striped Unisex Tee",
        description: "A cool, breathable striped tee for hot days.",
        price: 55,
        image: [ST6],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for a day out in the sun.",
        stocks: 110,
        bestseller: true,
        active: true,
        date: 1716923457672
    },
    {
        _id: "aaaabx",
        name: "Unisex Striped V-Neck Shirt",
        description: "A stylish v-neck striped shirt for all-day comfort.",
        price: 80,
        image: [ST7],
        category: "Striped Shirts(UNISEX)",
        sizes: ["M", "L", "XL"],
        details: "A classic piece for both casual and semi-formal occasions.",
        stocks: 70,
        bestseller: false,
        active: true,
        date: 1716947325612
    },
    {
        _id: "aaaaby",
        name: "Striped Unisex Long Sleeve Shirt",
        description: "Long sleeve striped shirt for cooler evenings.",
        price: 95,
        image: [ST8],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "Comfortable for layering or as a stand-alone piece.",
        stocks: 85,
        bestseller: false,
        active: true,
        date: 1716971445032
    },
    {
        _id: "aaaabz",
        name: "Striped Unisex Hoodie",
        description: "Cozy striped hoodie for casual and cool weather.",
        price: 120,
        image: [ST9],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for chilly evenings or lounging at home.",
        stocks: 60,
        bestseller: true,
        active: true,
        date: 1716993420085
    },
    {
        _id: "aaaaca",
        name: "Striped Unisex Tank Top",
        description: "A comfortable and breezy striped tank top.",
        price: 45,
        image: [ST10],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "Perfect for summer or workouts.",
        stocks: 100,
        bestseller: true,
        active: true,
        date: 1717019238724
    },
    {
        _id: "aaaacb",
        name: "Striped Unisex Sweatshirt",
        description: "A cozy sweatshirt featuring bold stripes.",
        price: 75,
        image: [ST11],
        category: "Striped Shirts(UNISEX)",
        sizes: ["M", "L", "XL"],
        details: "Soft and warm for colder days.",
        stocks: 65,
        bestseller: false,
        active: true,
        date: 1717042145769
    },
    {
        _id: "aaaacc",
        name: "Casual Striped Unisex Shirt",
        description: "A casual striped shirt that goes with everything.",
        price: 60,
        image: [ST12],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "Simple yet stylish for everyday wear.",
        stocks: 110,
        bestseller: true,
        active: true,
        date: 1717064893894
    },
    {
        _id: "aaaacd",
        name: "Comfortable Striped Unisex Shirt",
        description: "A comfortable striped shirt for everyday wear.",
        price: 65,
        image: [ST13],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Soft fabric for all-day comfort.",
        stocks: 90,
        bestseller: false,
        active: true,
        date: 1717090765532
    },
    {
        _id: "aaaace",
        name: "Classic Casual Striped Unisex Shirt",
        description: "A timeless, classic striped shirt with a casual look.",
        price: 70,
        image: [ST14],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for casual outings or relaxed weekends.",
        stocks: 95,
        bestseller: true,
        active: true,
        date: 1717113426701
    },
    {
        _id: "aaaacf",
        name: "Urban Striped Unisex Shirt",
        description: "A chic striped shirt for urban lifestyles.",
        price: 80,
        image: [ST15],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "A versatile shirt for city adventures.",
        stocks: 85,
        bestseller: true,
        active: true,
        date: 1717134979985
    },
    {
        _id: "aaaacg",
        name: "Vibrant Striped Unisex T-Shirt",
        description: "A vibrant t-shirt with bold stripes for a lively look.",
        price: 60,
        image: [ST16],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Liven up your wardrobe with this striped tee.",
        stocks: 100,
        bestseller: true,
        active: false,
        date: 1717158241357
    },
    {
        _id: "aaaach",
        name: "Striped Unisex Henley Shirt",
        description: "A striped Henley shirt with a cool and casual vibe.",
        price: 75,
        image: [ST17],
        category: "Striped Shirts(UNISEX)",
        sizes: ["M", "L", "XL"],
        details: "A comfortable yet stylish shirt for all-day wear.",
        stocks: 70,
        bestseller: false,
        active: true,
        date: 1717180567202
    },
    {
        _id: "aaaaci",
        name: "Striped Unisex Crewneck T-Shirt",
        description: "A classic crewneck t-shirt with subtle stripes.",
        price: 55,
        image: [ST18],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Perfect for layering or wearing alone.",
        stocks: 120,
        bestseller: true,
        active: true,
        date: 1717204857465
    },
    {
        _id: "aaaacj",
        name: "Retro Striped Unisex Shirt",
        description: "A retro-inspired striped shirt that never goes out of style.",
        price: 90,
        image: [ST19],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L"],
        details: "Vintage style with modern comfort.",
        stocks: 85,
        bestseller: false,
        active: true,
        date: 1717228721849
    },
    {
        _id: "aaaack",
        name: "Striped Unisex Casual Button-Down",
        description: "A button-down striped shirt for casual days and nights.",
        price: 95,
        image: [ST20],
        category: "Striped Shirts(UNISEX)",
        sizes: ["S", "M", "L", "XL"],
        details: "Smart casual style, perfect for any occasion.",
        stocks: 90,
        bestseller: true,
        active: true,
        date: 1717250076782
    }
]
