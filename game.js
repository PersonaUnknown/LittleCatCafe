let sceneManager;
let image;
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    setCanvasFixedSize(vec2(width, height));
    const startingIndex = 0;
    sceneManager = new SceneManager(
        startingIndex,
        [],
    )
    const buildScenes = [
        new TitleScreen(sceneManager),
        new Cafe(sceneManager)
    ]
    sceneManager.scenes = buildScenes;
    loadLevel();
}

function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    sceneManager.update();
}

function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
    sceneManager.render();
}

function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    sceneManager.renderPost();
}

// Startup LittleJS Engine
engineInit(
    gameInit, 
    gameUpdate, 
    gameUpdatePost, 
    gameRender, 
    gameRenderPost,
    sprites
);