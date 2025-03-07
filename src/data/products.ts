import { Product } from "../types/product";

const products: Product[] = [
    {
        id: 'sea-creature-charm',
        name: "Sea Creature Phone Charm",
        price: "$10.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/sea-creature-charm-tn.png",
        thumbnail2: "/images/sea-creature-charm-tn1.png",
        images: [
            "/images/sea-creature-charm1.png",
            "/images/sea-creature-charm2.png",
            "/images/sea-creature-charm3.png",
            "/images/sea-creature-charm4.png",
            "/images/sea-creature-charm5.png",
        ],
        description:
            "🐳 Adorable sea creature phone charms made with a mix of glass and acrylic beads! the fishies are ceramic beads :) 🐳\n\n" +
            "Can be used as a phone charm, bag charm, on any small bag :)\n\n" +
            "Please treat it gently as they are made of glass/ceramic beads 🌟\n\n" +
            "💓they are all a bit different so i listed them each as their own variation ✨so if it’s out of stock it’s gone for good!\n\n" +
            "for the whale, please refer to the whale keychain listing on my shop. I have too many variations which makes it tricky for me to set the prices for all the fish even though they are the same price ($10) but the whales are $15 each.\n\n" +
            "* I update this listing every 2-3 weeks! if there’s a fish you like that is sold out, please send me a message or come back to check!*",
        styles: [
            "Blue Fish", "Baby Blue Fish", "Dark Blue Fish", "Green Fish", "Purple Fish", "Orange Fish", 
            "Dark Blue Crab", "Light Blue Crab", "Red Crab", "Pink 2 Fish", "Red 2 Fish", "Gold Fish", 
            "Yellow 2 Fish", "Silver Fish", "White 1 Fish",
        ]
    },
    {
        id: 'lovebirds-fruits-keychain',
        name: "Lovebird Fruits Keychain",
        price: "$12.00 CAD",
        category: "Keychains",
        thumbnail: "/images/lovebirds-fruits-keychain-tn.png",
        thumbnail2: "/images/lovebirds-fruits-keychain-tn1.png",
        images: [
        "/images/lovebirds-fruits-keychain1.png",
        "/images/lovebirds-fruits-keychain2.png",
        "/images/lovebirds-fruits-keychain3.png",
        "/images/lovebirds-fruits-keychain4.png",
        "/images/lovebirds-fruits-keychain5.png",
        "/images/lovebirds-fruits-keychain6.png",
        ],
        videos: [
            "/videos/lovebirds-fruits-keychain.mp4",],
        description:
            "🍎 Cute lovebird keychains with an accompanying fruit based on their feather colour!\n\n" +
            "🍎Five bird options:\n" +
            "- Mango lovebird\n" +
            "- Banana lovebird\n" +
            "- Blueberry lovebird (based on my pet lovebird haha)\n" +
            "- Grape lovebird\n" +
            "- Pair of green lovebirds\n\n" +
            "🍎 2\" acrylic keychain (as in the longest dimension on each charm is 2 inches, based on the design its either the width or the height of the design that is 2\"\n\n" +
            "🍎The printed side is coated with glitter epoxy to add a beautiful glimmer and protect the printed image\n\n" +
            "🍎You can also purchase a sticker sheet with all 5 of these love birds, and each sticker on the sheet are 1.5-2 inch stickers",
        styles: ["Banana", "Grape", "Mango", "Blueberry", "Pair"],
    },
    {
        id: 'pokemon-charm',
        name: "Pokémon Phone Charm",
        price: "$14.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/pokemon-charm-tn.png",
        thumbnail2: "/images/pokemon-charm-tn1.png",
        images: [
            "/images/pokemon-charm1.png",
            "/images/pokemon-charm2.png",
            "/images/pokemon-charm3.png",
            "/images/pokemon-charm4.png",
        ],
        description:
            "✨ Adorable Pokémon phone charm made with glass beads ✨\n\n" +
            "Can be used as a phone charm, bag charm, or keychain :)\n\n" +
            "- placement/flower beads design are subject to change based on what I have!\n\n" +
            "- charm part is 7.5 cm, and can be detached from the strap for easy looping",
        styles: ["Squirtle", "Charmander", "Bulbasaur"],
    },
    {
        id: 'kawaii-kitty-charm',
        name: "Kawaii Kitty Phone Charm",
        price: "$13.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/kawaii-kitty-charm-tn.png",
        thumbnail2: "/images/kawaii-kitty-charm-tn1.png",
        images: [
            "/images/kawaii-kitty-charm1.png",
            "/images/kawaii-kitty-charm2.png",
            "/images/kawaii-kitty-charm3.png",
            "/images/kawaii-kitty-charm4.png",
            "/images/kawaii-kitty-charm5.png",
            "/images/kawaii-kitty-charm6.png",
        ],
        description: 
            "🐈 Adorable cat phone charm made with ceramic cat and glass beads 🐈\n\n" +
            "Panda 🐼 also available!\n\n" +
            "Can be used as a phone charm, bag charm, on any thing :)\n\n" +
            "Please treat it gently as they are glass/ceramic beads 🌟",
        styles: ["Tuxedo", "Pink", "Pink & White", "Panda", "Orange", "Calico", "Blue" ]
    },
    {
        id: 'kawaii-bunny-charm',
        name: "Kawaii Bunny Phone Charm",
        price: "$15.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/kawaii-bunny-charm-tn.png",
        thumbnail2: "/images/kawaii-bunny-charm-tn1.png",
        images: [
            "/images/kawaii-bunny-charm1.png",
            "/images/kawaii-bunny-charm2.png",
            "/images/kawaii-bunny-charm3.png",
            "/images/kawaii-bunny-charm4.png",
        ],
        description: 
            "🐰 Adorable bunny phone charm made with ceramic cat and glass beads 🐰\n\n" +
            "Can be used as a phone charm, bag charm, on any thing :)\n\n" +
            "Please treat it gently as they are glass/ceramic beads 🌟",
        styles: ["Light Green", "Dark Green", "Pink", "Red", "Purple", "Yellow", "Grey", "Black", "White"],
    },
    {
        id: 'elemental-stone-necklace',
        name: "Elemental Stone Necklace",
        price: "$24.00 CAD",
        category: "Jewelry",
        thumbnail: "/images/elemental-stone-necklace-tn.png",
        thumbnail2: "/images/elemental-stone-necklace-tn1.png",
        images: [
            "/images/elemental-stone-necklace1.png",
            "/images/elemental-stone-necklace2.png",
            "/images/elemental-stone-necklace3.png",
            "/images/elemental-stone-necklace4.png",
            "/images/elemental-stone-necklace5.png",
            "/images/elemental-stone-necklace6.png",
            "/images/elemental-stone-necklace7.png",
            "/images/elemental-stone-necklace8.png",
            "/images/elemental-stone-necklace9.png",
            "/images/elemental-stone-necklace10.png",
        ],
        description: 
            "💠Handmade Gemstone necklaces made with stainless steel chain and natural gemstones\n\n"+
            "💠 bead options:\n"+
            "- Blue sodalite\n"+
            "- Amethyst\n"+
            "- Rose quartz\n"+
            "- Fuchsia Stripe Agate\n"+
            "- Green aventurine\n"+
            "- Orange Sun stone\n"+
            "- Blue Tiger eye\n"+
            "- Pearls\n\n"+
            "💠length is minimum 16.5” and can be adjusted up to 18\n"+
            "💠will sit at collarbone to right under your collarbone\n\n"+
            "🔹UNIQUE FOR YOU 🔹\n"+
            "- due to the nature of the marbling on gems I use, each bracelet is slightly different and can never be replicated exactly the same!",
        styles: ["Blue Sodalite", "Amethyst", "Rose Quartz", "Fuchsia Stripe Agate", "Green Aventurine", "Orange Sun Stone", "Blue Tiger Eye", "Pearl"]    
    },
    {
        id: 'hello-kitty-charm',
        name: "Hello Kitty Phone Charm",
        price: "$12.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/hello-kitty-charm-tn.png",
        thumbnail2: "/images/hello-kitty-charm-tn1.png",
        images: [
            "/images/hello-kitty-charm1.png",
            "/images/hello-kitty-charm2.png",
            "/images/hello-kitty-charm3.png",
        ],
        description:
            "✨ Adorable hello hitty phone charms made with glass beads ✨\n\n" +
            "I think these are cute because it tells you “good job” 🥺🥺\n\n" +
            "Can be used as a phone charm, bag charm, or keychain :)\n\n" +
            "- charm part can be detached from the strap for easy looping",
        styles: ["Blue", "Red", "Pink", "Yellow"],
    },
    {
        id: 'playful-pets-sticker',
        name: "Playful Pets Sticker",
        price: "$1.50 CAD",
        category: "Stickers",
        thumbnail: "/images/playful-pets-sticker-tn.png",
        thumbnail2: "/images/playful-pets-sticker-tn1.png",
        images: [
            "/images/playful-pets-sticker1.png",
            "/images/playful-pets-sticker2.png",
            "/images/playful-pets-sticker3.png",
            "/images/playful-pets-sticker4.png",
            "/images/playful-pets-sticker5.png",
            "/images/playful-pets-sticker6.png",
        ],
        description: 
            "Adorable pet stickers, they are water proof and durable.\n\n" +
            "- Vinyl material, 1.5\n\n" +
            "* each sticker order will come with some minis/b-grades from my printing of a different design to offer variety :) -- they're freebies!",
        styles: ["Green Bird", "Blue Bird", "Yellow Bird", "Turquoise Bird", "Yellow Fish", "Blue Fish", "Brown Bunny", "White Bunny",
            "Brown Dog", "Pink Dog", "Black Dog", "Orange Cat", "Cream Cat"],
    },
    {
        id: 'kirby-charm',
        name: "Kirby Phone Charm",
        price: "$13.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/kirby-charm-tn.png",
        thumbnail2: "/images/kirby-charm-tn1.png",
        images: [
            "/images/kirby-charm1.png",
            "/images/kirby-charm2.png",
            "/images/kirby-charm3.png",
            "/images/kirby-charm4.png",
            "/images/kirby-charm5.png",
            "/images/kirby-charm6.png",
        ],
        description: 
            "✨ Adorable Kirby phone charm made with glass beads ✨\n\n" +
            "Can be used as a phone charm, bag charm, or keychain :)\n\n" +
            "- charm part is 7 cm\n\n" +
            "*The Phone Strap is the Default* So please let me know if you want a Ball Chain",
        styles: ["Kirby 1", "Kirby 2", "Kirby 3", "Kirby 4"],
    },
    {
        id: 'sanrio-charm',
        name: "Sanrio Phone Charm",
        price: "$14.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/sanrio-charm-tn.png",
        thumbnail2: "/images/sanrio-charm-tn1.png",
        images: [
            "/images/sanrio-charm1.png",
            "/images/sanrio-charm2.png",
            "/images/sanrio-charm3.png",
            "/images/sanrio-charm4.png",
            "/images/sanrio-charm5.png",
            "/images/sanrio-charm6.png",
            "/images/sanrio-charm7.png",
        ],
        description:
            "✨ Adorable Sanrio phone charms made with glass beads ✨\n\n" +
            "Can be used as a phone charm, bag charm, or keychain :)\n\n" +
            "*The Phone Strap is the Default* So please let me know if you want a Ball Chain",
        styles: ["Kuromi", "My Melody", "Hello Kitty", "Keroppi"]
    },
    {
        id: "glass-wrap-ring",
        name: "Glass Wrap Ring",
        price: "$12.00 CAD",
        category: "Jewelry",
        thumbnail: "/images/glass-wrap-ring-tn.png",
        thumbnail2: "/images/glass-wrap-ring-tn1.png",
        images: [
            "/images/glass-wrap-ring1.png",
            "/images/glass-wrap-ring2.png",
            "/images/glass-wrap-ring3.png",
            "/images/glass-wrap-ring4.png",
            "/images/glass-wrap-ring5.png",
            "/images/glass-wrap-ring6.png",
            "/images/glass-wrap-ring7.png",
        ],
        videos: [
            "/videos/glass-wrap-ring.mp4",],
        description:
            "💠Handmade glass rings made with tarnish resistant wire!\n\n" +
            "💠 four bead options: (more colours on the way!)\n"+
            "1. dark green\n"+
            "2. light green\n"+
            "3. light blue\n"+
            "4. cream\n\n"+
            "💠Two, tarnish resistant wire options:\n"+
            "- Gold colour copper\n"+
            "- Silver colour copper\n\n"+
            'In checkout, please specify the desired ring size (US sizes) and wire colour (Gold or Silver) in the "Order Special Instructions" input box.',
        styles: ["Dark Green", "Light Green", "Light Blue", "Cream"],
    },
    {
        id: "kawaii-sea-creature-sticker",
        name: "Kawaii Sea Creature Sticker",
        price: "$3.00 CAD",
        category: "Stickers",
        thumbnail: "/images/kawaii-sea-creature-sticker-tn.png",
        thumbnail2: "/images/kawaii-sea-creature-sticker-tn1.png",
        images: [
            "/images/kawaii-sea-creature-sticker1.png",
            "/images/kawaii-sea-creature-sticker2.png",
            "/images/kawaii-sea-creature-sticker3.png",
            "/images/kawaii-sea-creature-sticker4.png",
            "/images/kawaii-sea-creature-sticker5.png",
            "/images/kawaii-sea-creature-sticker6.png",
        ],
        description:
            "Adorable sea creature stickers, they are water proof and durable\n" +
            '- Vinyl material, 3" max width/length depending on the design\n\n' +
            "* each sticker order will come with some minis/b-grades from my printing of a different design to offer variety :) -- they're freebies!",  
        styles: ["Seal", "Whale Shark", "Whale", "Blue Octopus", "Pink Octopus", "Purple Octopus", "Squid"],
    },
    {
        id: "lovebirds-fruits-stickers",
        name: "Lovebirds Fruits Sticker Sheet",
        price: "$6.00 CAD",
        category: "Stickers",
        thumbnail: "/images/lovebirds-fruits-stickers-tn.png",
        thumbnail2: "/images/lovebirds-fruits-stickers-tn1.png",
        images: [
            "/images/lovebirds-fruits-stickers1.png",
            "/images/lovebirds-fruits-stickers2.png",
            "/images/lovebirds-fruits-stickers3.png",
        ],
        videos: [
            "/videos/lovebirds-fruits-stickers.mp4",],
        description:
            "🍎 Cute lovebird stickers with an accompanying fruit based on their feather colour!\n\n" +
            "🍎vinyl, laminated with holographic hearts to add a beautiful glimmer and protect the printed image (and of course how can I have love birds without love hearts!)\n\n" +
            "🍎each sticker on the sheet are 1.5-2 inch stickers (with the exception of the smaller heart and thought bubble)\n" +
            "- the entire sheet is 12 cm * 17 cm\n\n" +
            "🍎 you can also purchase a keychain of your favourite bird posted in a separate listing!",
    },
    {
        id: "tropical-toucan-charm",
        name: "Tropical Toucan Phone Charm",
        price: "$12.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/tropical-toucan-charm-tn.png",
        thumbnail2: "/images/tropical-toucan-charm-tn1.png",
        images: [
            "/images/tropical-toucan-charm1.png",
            "/images/tropical-toucan-charm2.png",
            "/images/tropical-toucan-charm3.png",
        ],
        videos: [
            "/videos/tropical-toucan-charm.mp4",],
        description: 
            "🦜 Adorable toucan phone charm made with ceramic toucan and glass beads 🦜\n\n" +
            "Can be used as a phone charm, bag charm, on any small bag :)\n\n" +
            "Please treat it gently as they are glass/ceramic beads 🌟",
        styles: ["Dark Blue", "Teal", "Yellow", "Red"],
    },
    {
        id: "elemental-stone-bracelet",
        name: "Elemental Stone Bracelet",
        price: "$12.00 CAD",
        category: "Jewelry",
        thumbnail: "/images/elemental-stone-bracelet-tn.png",
        thumbnail2: "/images/elemental-stone-bracelet-tn1.png",
        images: [
            "/images/elemental-stone-bracelet1.png",
            "/images/elemental-stone-bracelet2.png",
            "/images/elemental-stone-bracelet3.png",
            "/images/elemental-stone-bracelet4.png",
        ],
        description: 
        "💠Handmade Gemstone bracelets made with stainless steel chain and natural gemstones\n\n" +
        "💠 bead options:\n" +
        "- Blue sodalite\n" +
        "- Amethyst\n" +
        "- Rose quartz\n" +
        "- Fuchsia Stripe Agate\n" +
        "- Green aventurine\n" +
        "- Orange Sun stone\n" +
        "- Blue Tiger eye\n" +
        "- Pearls\n\n" +
        "💠length is minimum 14 cm and can be adjusted up to 19 cm\n\n" +
        "🔹UNIQUE FOR YOU 🔹\n" +
        "- due to the nature of the marbling on gems I use, each bracelet is slightly different and can never be replicated exactly the same!",
        styles: ["Blue Sodalite", "Amethyst", "Rose Quartz", "Fuchsia Stripe Agate", "Green Aventurine", "Orange Sun Stone", "Blue Tiger Eye", "Pearl"],
    },
    {
        id: "elemental-stone-ring",
        name: "Elemental Stone Ring",
        price: "$10.00 CAD",
        category: "Jewelry",
        thumbnail: "/images/elemental-stone-ring-tn.png",
        thumbnail2: "/images/elemental-stone-ring-tn1.png",
        images: [
            "/images/elemental-stone-ring1.png",
            "/images/elemental-stone-ring2.png",
            "/images/elemental-stone-ring3.png",
            "/images/elemental-stone-ring4.png",
            "/images/elemental-stone-ring5.png",
            "/images/elemental-stone-ring6.png",
            "/images/elemental-stone-ring7.png",
        ],
        videos: [
            "/videos/elemental-stone-ring.mp4",],
        description:
            "💠Handmade Gemstone rings made with tarnish resistant wire!\n" +
            "💠 nine bead options:\n" +
            "- Watermelon Tourmaline\n" +
            "- Rose Quartz\n" +
            "- Moss Agate\n" +
            "- Chinese jade\n" +
            "- Green aventurine\n" +
            "- Blue Sodalite\n" +
            "- Blue Sandstone\n" +
            "- Yellow aragonite\n" +
            "- Tiger eye\n\n" +
            "💠Two, tarnish resistant wire options:\n" +
            "- Gold colour copper\n" +
            "- Silver colour copper\n\n" +
            "🔹UNIQUE FOR YOU 🔹\n" +
            "- due to the nature of the marbling on gems I use, each ring is slightly different and can never be replicated exactly the same!\n\n" +
            "In checkout, please specify the desired ring size (US sizes) and wire colour (Gold or Silver) in the \"Order Special Instructions\" input box.\n\n" +
            "-[For the Moss Agate] please let me know if you want more Green compared to White or vice versa, if you want a less marbled stone in the centre :) ",
        styles: ["Tourmaline", "Tiger's Eye", "Rose Quartz", "Chinese Jade", "Blue Sandstone", "Aragonite", "Aventurine", "Moss Agate", "Blue Sodalite"],
    },
    {
        id: "sanrio-teddy-bear-charm",
        name: "Sanrio Teddy Bear Phone Charm",
        price: "$14.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/sanrio-teddy-bear-charm-tn.png",
        thumbnail2: "/images/sanrio-teddy-bear-charm-tn1.png",
        images: [
            "/images/sanrio-teddy-bear-charm1.png",
            "/images/sanrio-teddy-bear-charm2.png",
            "/images/sanrio-teddy-bear-charm3.png",
            "/images/sanrio-teddy-bear-charm4.png",
        ],
        description:
            "✨ Adorable Sanrio phone charms made with glass beads ✨\n\n" +
            "there is Hello Kitty, My Melody, Kuromi, Pompompurin, Cinnamoroll, and Pochacco available.\n\n" +
            "Can be used as a phone charm, bag charm, or keychain :)",
        styles: ["Cinnamoroll", "Pochacco", "Pompompurin", "Kuromi", "My Melody", "Hello Kitty"],
    },
    {
        id: "sanrio-mini-charm",
        name: "Sanrio Mini Phone Charm",
        price: "$9.00 CAD",
        category: "Phone Charms",
        thumbnail: "/images/sanrio-mini-charm-tn.png",
        thumbnail2: "/images/sanrio-mini-charm-tn1.png",
        images: [
            "/images/sanrio-mini-charm1.png",
            "/images/sanrio-mini-charm2.png",
            "/images/sanrio-mini-charm3.png",
            "/images/sanrio-mini-charm4.png",
            "/images/sanrio-mini-charm5.png",
            "/images/sanrio-mini-charm6.png",
            "/images/sanrio-mini-charm7.png",
        ],
        description:
            "✨ Adorable Sanrio phone charm made with enamel charms and glass beads ✨\n\n" +
            "Can be used as a phone charm, bag charm, on any thing :)\n\n" +
            "the size of these are small, about 1.25”! very cute and mini 💓",
        styles: ["Cinnamoroll", "Kuromi 1", "Kuromi 2", "My Melody 1", "My Melody 2", "Pompompurin", "Hello Kitty 1", "Hello Kitty 2"],
    },
    {
        id: "hatsune-miku-keychain",
        name: "Hatsune Miku Double-Sided Keychain",
        price: "$12.00 CAD",
        category: "Keychains",
        thumbnail: "/images/hatsune-miku-keychain-tn.png",
        thumbnail2: "/images/hatsune-miku-keychain-tn1.png",
        images: [
            "/images/hatsune-miku-keychain1.png",
            "/images/hatsune-miku-keychain2.png",
        ],
        description:
            "🌸 Cute Hatsune Miku Acrylic Charm\n" +
            "Perfect for any anime and vocaloid lovers. Perfect gift for a friend, or to attach to your bag!\n" +
            "-------------------------------------------------------\n\n" +
            "🌸 Product Details:\n" +
            "• Double-sided\n" +
            "• The flowers on the charm are translucent (you can see through it)\n" +
            "• Rose gold sakura flower clasp\n\n" +
            "🌸 Size:\n" +
            "• Dimensions: 2.5 in x 2.5 in\n\n" +
            "🌸 Shipping:\n" +
            "• Canada: 3 - 7 business days\n" +
            "• United States: 4 - 10 business days\n" +
            "• International: 2 - 4 weeks\n" +
            "• To keep costs low, a tracking number is not included\n" +
            "-------------------------------------------------------\n\n" +
            "If you have any questions or concerns, please feel free to reach out to me!",
    },
    {
        id: "silly-kitty-charm",
        name: "Silly Kitty Phone Charm",
        price: "$8.50 CAD",
        category: "Phone Charms",
        thumbnail: "/images/silly-kitty-charm-tn.png",
        thumbnail2: "/images/silly-kitty-charm-tn1.png",
        images: [
            "/images/silly-kitty-charm1.png",
            "/images/silly-kitty-charm2.png",
            "/images/silly-kitty-charm3.png",
        ],
        description: 
            "🐈 Adorable cat phone charm made with enamel charms and glass beads 🐈\n\n" +
            "Panda 🐼 also available!\n\n" +
            "Can be used as a phone charm, bag charm, on any thing :)\n\n" +
            "the size of these are small, about 1.5”! very cute and mini 💓",
        styles: ["Panda", "Black Cat", "White Cat"],
    },
    {
        id: "genshin-impact-sticker",
        name: "Genshin Impact Chibi Sticker",
        price: "$2.00 CAD",
        category: "Stickers",
        thumbnail: "/images/genshin-impact-sticker-tn.png",
        thumbnail2: "/images/genshin-impact-sticker-tn.png",
        images: [
            "/images/genshin-impact-sticker1.png",
        ],
        description:
            "Adorable genshin impact character stickers, they are water proof and durable\n\n" +
            "I have more characters I’m working on, so follow my instagram for updates on other characters!\n\n" +
            "- Vinyl material, 2\n\n" +
            "* each sticker order will come with some minis/b-grades from my printing of a different design to offer variety :) -- they're freebies!",
        styles: ["Chibi Kazuha", "Chibi Neuvillette"],
    }
];

export default products;