const TILE_SIZE = vec2(16, 16);

const sprites = [
    "sprites/Backgrounds/title.png",
    "sprites/neko_cats.png",
    "sprites/neko-cafe-furnitures.png",
    "sprites/UI/divider.png",
    "sprites/UI/input_square.png",
    "sprites/UI/book.png",
    "sprites/UI/notebook.png",
    "sprites/UI/menu.png",
    "sprites/UI/icon_play_outline.png",
    "sprites/food.png",
    "sprites/UI/emoticons.png",
    "sprites/UI/input_outline_rectangle.png",
    "sprites/UI/heart.png",
    "sprites/UI/pc_controls.png"
]
const TitleBackground = new TileInfo(
    vec2(0, 0),
    vec2(256, 144),
    0
)
const Divider = new TileInfo(
    vec2(0, 0),
    vec2(16, 4),
    3
)
const InputSquareSprite = new TileInfo(
    vec2(0, 0),
    vec2(64, 64),
    4
)
const BookSprite = new TileInfo(
    vec2(0, 0),
    vec2(892, 1039),
    5
)
const NotebookFirstPage = new TileInfo(
    vec2(0, 0),
    vec2(100 , 100),
    6
)
const NotebookSecondPage = new TileInfo(
    vec2(100, 0),
    vec2(100, 100),
    6
)
const CafeMenu = new TileInfo(
    vec2(0, 0),
    vec2(125, 110),
    7
)
const RightArrow = new TileInfo(
    vec2(0, 0),
    vec2(34, 38),
    8
)
const LeftArrow = new TileInfo(
    vec2(34, 0),
    vec2(34, 38),
    8
)
const Emoticons = [
    new TileInfo(
        vec2(48, 16),
        vec2(16, 16),
        10
    ),
    new TileInfo(
        vec2(64, 16),
        vec2(16, 16),
        10
    ),
    new TileInfo(
        vec2(80, 16),
        vec2(16, 16),
        10
    ),
    new TileInfo(
        vec2(48, 0),
        vec2(16, 16),
        10
    ),
    new TileInfo(
        vec2(32, 32),
        vec2(16, 16),
        10
    ),
    new TileInfo(
        vec2(80, 0),
        vec2(16, 16),
        10
    )
]
const OutlineRectangle = new TileInfo(
    vec2(0, 0),
    vec2(192, 64),
    11
)
const HeartIcon = new TileInfo(
    vec2(0, 0),
    vec2(8, 7),
    12
)
const Controls = {
    w: new TileInfo(
        vec2(17, 33),
        vec2(13, 14),
        13
    ),
    a: new TileInfo(
        vec2(17, 49),
        vec2(13, 14),
        13
    ),
    s: new TileInfo(
        vec2(33, 49),
        vec2(13, 14),
        13
    ),
    d: new TileInfo(
        vec2(49, 49),
        vec2(13, 14),
        13
    ),
    e: new TileInfo(
        vec2(33, 33),
        vec2(13, 14),
        13
    )
}
const CafeTileMap = new TileInfo(vec2(), TILE_SIZE, 2);

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

const FoodSprites = {};

function registerPostStartupSprites() {
    for (const i of Object.values(ITEMS)) {
        FoodSprites[i] = tile(i, 32, 9);
    }
}
