let sceneManager;
let cafe;
let tutorialCafe;
let gameover;
let currentTrack;
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    setCanvasFixedSize(vec2(width, height));
    registerPostStartupSprites();
    const startingIndex = 0;
    sceneManager = new SceneManager(
        startingIndex,
        [],
    )
    cafe = new Cafe(sceneManager);
    tutorialCafe = new TutorialCafe();
    gameover = new GameOver(sceneManager);
    const buildScenes = [
        new TitleScreen(sceneManager),
        cafe,
        new CoffeeScene(),
        new Credits(),
        gameover,
        tutorialCafe,
        new CoffeeScene(true),
    ]
    sceneManager.scenes = buildScenes;
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