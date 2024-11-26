const TILE_SIZE = vec2(16, 16);

const sprites = [
    "sprites/Backgrounds/debug_title.png",
    "sprites/neko_cats.png",
    "sprites/neko-cafe-furnitures.png",
    "sprites/UI/divider.png",
    "sprites/UI/input_square.png",
    "sprites/UI/book.png",
    "sprites/UI/recipe.png",
    "sprites/UI/order.png",
    "sprites/UI/bookmark.png",
    "sprites/UI/notebook.png",
    "sprites/UI/menu.png",
    "sprites/UI/icon_play_outline.png"
]
const TitleBackground = new TileInfo(
    vec2(0, 0),
    vec2(2304, 1536),
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
const RecipeIcon = new TileInfo(
    vec2(0, 0),
    vec2(100, 100),
    6
)
const OrderIcon = new TileInfo(
    vec2(0, 0),
    vec2(100, 100),
    7
)
const BookmarkIcon = new TileInfo(
    vec2(0, 0),
    vec2(100, 100),
    8
)
const NotebookFirstPage = new TileInfo(
    vec2(0, 0),
    vec2(100 , 100),
    9
)
const NotebookSecondPage = new TileInfo(
    vec2(100, 0),
    vec2(100, 100),
    9
)
const CafeMenu = new TileInfo(
    vec2(0, 0),
    vec2(100, 100),
    10
)
const RightArrow = new TileInfo(
    vec2(0, 0),
    vec2(34, 38),
    11
)
const LeftArrow = new TileInfo(
    vec2(34, 0),
    vec2(34, 38),
    11
)

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
