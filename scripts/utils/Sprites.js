const sprites = [
    "sprites/Backgrounds/debug_title.png",
    "sprites/neko_cats.png"
]
const TitleBackground = new TileInfo(
    vec2(0, 0),
    vec2(2304, 1536),
    0
)

const TILE_SIZE = vec2(16, 16);

const PlayerAnims = new Animator(
    {
        "front" : [
            new TileInfo(vec2(48, 32), TILE_SIZE, 1),
            new TileInfo(vec2(64, 32), TILE_SIZE, 1),
            new TileInfo(vec2(80, 32), TILE_SIZE, 1),
            new TileInfo(vec2(96, 32), TILE_SIZE, 1),
        ],
        "back" : [
            new TileInfo(vec2(160, 32), TILE_SIZE, 1),
            new TileInfo(vec2(176, 32), TILE_SIZE, 1),
            new TileInfo(vec2(192, 32), TILE_SIZE, 1),
            new TileInfo(vec2(208, 32), TILE_SIZE, 1),
        ],
        "right" : [
            new TileInfo(vec2(224, 32), TILE_SIZE, 1),
            new TileInfo(vec2(240, 32), TILE_SIZE, 1),
            new TileInfo(vec2(256, 32), TILE_SIZE, 1),
            new TileInfo(vec2(272, 32), TILE_SIZE, 1),
            new TileInfo(vec2(288, 32), TILE_SIZE, 1),
            new TileInfo(vec2(304, 32), TILE_SIZE, 1),
            new TileInfo(vec2(320, 32), TILE_SIZE, 1),
        ],
        "left" : [
            new TileInfo(vec2(336, 32), TILE_SIZE, 1),
            new TileInfo(vec2(352, 32), TILE_SIZE, 1),
            new TileInfo(vec2(368, 32), TILE_SIZE, 1),
            new TileInfo(vec2(384, 32), TILE_SIZE, 1),
            new TileInfo(vec2(400, 32), TILE_SIZE, 1),
            new TileInfo(vec2(416, 32), TILE_SIZE, 1),
            new TileInfo(vec2(432, 32), TILE_SIZE, 1),
        ]
    },
    0.5,
    "front"
)
