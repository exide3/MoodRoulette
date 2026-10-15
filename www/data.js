// Наша "шпаргалка" (Массив объектов)
export const aestheticsDB = [
    {
        id: 1,
        name: "Cyberpunk",
        description: "Neon lights, rain, high tech, low life.",
        color: "#00f3ff",
        tags: "cyberpunk,neon,city",
        pinterestQuery: "cyberpunk+aesthetic"
    },
    {
        id: 2,
        name: "Post-Apocalypse",
        description: "Rust, dust, survival, and abandoned cities.",
        color: "#ff9d00",
        tags: "postapocalypse,ruins,dystopia",
        pinterestQuery: "post+apocalyptic+art"
    },
    {
        id: 3,
        name: "Retro Wave",
        description: "Synthwave, 80s sunset, grids, and neon palms.",
        color: "#ff00ff",
        tags: "retrowave,synthwave,80s",
        pinterestQuery: "retrowave+synthwave"
    },
    {
        id: 4,
        name: "Dark Circus",
        description: "Velvet, gold, secrets, and a touch of madness.",
        color: "#ff0055",
        tags: "darkcircus,theater,vintage",
        pinterestQuery: "dark+circus+aesthetic"
    },
    {
        id: 5,
        name: "Ethereal Forest",
        description: "Mist, glowing mushrooms, ancient trees, magic.",
        color: "#00ff88",
        tags: "magicforest,mist,fantasy",
        pinterestQuery: "ethereal+forest+fantasy"
    },
    {
        id: 6,
        name: "Space Noir",
        description: "Deep space, lonely ships, jazz, and shadows.",
        color: "#7b2cbf",
        tags: "spacenoir,scifi,stars",
        pinterestQuery: "space+noir+scifi"
    }
];
export const characterSteps = [
    {
        id: 'vibe',
        title: 'General Aesthetic',
        options: [
            { 
                name: 'Sci-Fi Cyberfuturism', 
                color: '#00f3ff', 
                tags: 'cyberpunk,scifi,futuristic', 
                pinterest: 'scificyberfuturism',
                pinterestBoard: 'https://ru.pinterest.com/steamexide/scificyberfuturism/' 
            },
            { 
                name: 'Dark Circus', 
                color: '#ff0055', 
                tags: 'darkcircus,theater,vintage', 
                pinterest: 'dark+circus+aesthetic',
                pinterestBoard: 'https://www.pinterest.com/search/pins/?q=dark+circus+aesthetic' 
            },
            { 
                name: 'Ethereal Forest', 
                color: '#00ff88', 
                tags: 'magicforest,mist,fantasy', 
                pinterest: 'ethereal+forest+fantasy',
                pinterestBoard: 'https://www.pinterest.com/search/pins/?q=ethereal+forest+fantasy' 
            },
            { 
                name: 'Space Noir', 
                color: '#7b2cbf', 
                tags: 'spacenoir,scifi,stars', 
                pinterest: 'space+noir+scifi',
                pinterestBoard: 'https://www.pinterest.com/search/pins/?q=space+noir+scifi' 
            }
        ]
    },
    {
        id: 'eyes',
        title: 'Eye Color',
        options: [
            { name: 'Neon Blue', color: '#00f3ff', desc: 'Glowing like a hologram' },
            { name: 'Blood Red', color: '#ff0000', desc: 'Intense and predatory' },
            { name: 'Heterochromia', color: '#ff00ff', desc: 'One gold, one silver' },
            { name: 'Void Black', color: '#1a1a1a', desc: 'No sclera, pure darkness' }
        ]
    },
    {
        id: 'item',
        title: 'Key Accessory',
        options: [
            { name: 'Neural Jack', color: '#00f3ff', desc: 'Port at the base of the skull' },
            { name: 'Venetian Mask', color: '#ff0055', desc: 'Gold leaf and cracked porcelain' },
            { name: 'Glowing Amulet', color: '#00ff88', desc: 'Pulses with ancient magic' },
            { name: 'Rusty Monocle', color: '#ff9d00', desc: 'With a built-in scanner' }
        ]
    }
];