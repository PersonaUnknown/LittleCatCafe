const sprites = [
    "sprites/Backgrounds/debug_title.png",
    "sprites/Neko Cafe Asset Pack/Characters/cat-black-front.png"
]
const TitleBackground = new TileInfo(
    vec2(0, 0),
    vec2(2304, 1536),
    0
)
const PlayerTile = new TileInfo(
    vec2(0, 0),
    vec2(16, 16),
    1
)

const PlayerAnims = new Animator(
    {
        "front" : [
            new TileInfo(vec2(0, 16), vec2(16, 16), 1),
            new TileInfo(vec2(16, 16), vec2(16, 16), 1),
            new TileInfo(vec2(32, 16), vec2(16, 16), 1),
            new TileInfo(vec2(48, 16), vec2(16, 16), 1),
        ]
    },
    0.5,
    "front"
)