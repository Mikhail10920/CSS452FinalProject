"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import MapGrid from "../engine/MapGrid.js";
import Tile from "../engine/renderables/Tile.js";

import Hero from "./hero.js";

// potential texture: https://www.pngall.com/spot-light-png/download/68214

class MyGame extends engine.Scene {
    constructor() {
        super();

        this.kMinionSprite = "assets/minion_sprite.png";
        this.kUp = "assets/up.png";
        this.kTest = "assets/pete.png";
        this.kBg = "assets/bg.png";

        this.mDefaultTilePic = "assets/tileDefPic.png";
        this.mTilePic = "assets/tilePic.png";
        this.mCharacterPic = "assets/character2.png";
        this.mBlockPic = "assets/character4.png";
        this.mBushPic = "assets/Bush.png";
        this.mDogPic = "assets/Dog.png";

        // The camera to view the scene
        this.mCamera = null;
        this.mBg = null;
        this.mHero = null;
        this.mTest = null;

        this.mMsg = null;

        this.mU = 0.5;
        this.mV = 0.5;
        this.mW = 0.3;
        this.mH = 0.3; 
        this.mTheta = 0;

        this.mGrid = null;
    }

    load() {
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kUp);
        engine.texture.load(this.kTest);
        engine.texture.load(this.kBg);

        engine.texture.load(this.mDefaultTilePic);
        engine.texture.load(this.mTilePic);
        engine.texture.load(this.mCharacterPic);
        engine.texture.load(this.mBlockPic);
        engine.texture.load(this.mBushPic);
        engine.texture.load(this.mDogPic);
    }

    unload() {
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kUp);
        engine.texture.unload(this.KTest);
        engine.texture.unload(this.kBg);

        engine.texture.unload(this.mDefaultTilePic);
        engine.texture.unload(this.mTilePic);
        engine.texture.unload(this.mCharacterPic);
        engine.texture.unload(this.mBlockPic);
        engine.texture.load(this.mBushPic);
        engine.texture.load(this.mDogPic);
    }

    init() {
        this.mGrid = new engine.MapGrid(8,8);
        this.mGrid.setGridPos(27,16);
        this.mGrid.setTile(this.mDefaultTilePic, 8, 8);
        this.mGrid.createTilePicturesForGrid();
        this.mGrid.createObject(this.mCharacterPic, 2,3);
        this.mGrid.createObject(this.mBushPic, 2,2);
        this.mGrid.setTileCollisionMode(true, 2,2);
        

        this.mGrid.createObject(this.mBushPic, 0,2);
        this.mGrid.createObject(this.mBushPic, 0,3);
        this.mGrid.createObject(this.mBushPic, 3,4);
        this.mGrid.createObject(this.mBushPic, 4,0);
        this.mGrid.createObject(this.mDogPic, 1,1);
        this.mGrid.addTile(4, 5, this.mDefaultTilePic);


        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                       // width of camera
            [0, 0, 1000, 800]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray

        this.mBg = new engine.TextureRenderable(this.kBg);
        this.mBg.getXform().setSize(150, 150);
        this.mBg.getXform().setPosition(50, 40);

        this.mTest = new engine.TextureRenderable(this.kTest, this.kUp);
        this.mTest.getXform().setSize(50, 30);
        this.mTest.getXform().setPosition(50, 40);
        this.mTest.setSecondTexture(this.mU, this.mV, this.mW, this.mH, this.mTheta);

        this.mHero = new Hero(this.kMinionSprite, 50, 40);
    
        this.mMsg = new engine.FontRenderable("Status Message:");
        this.mMsg.setColor([1, 1, 1, 1]);
        this.mMsg.getXform().setPosition(2, 3);
        this.mMsg.setTextHeight(3);
        this.mMsg.setText("At:(" 
                + this.mU.toPrecision(2).toString() + "," 
                + this.mV.toPrecision(2).toString() + ") Size:(" 
                + this.mW.toPrecision(2).toString() + "," 
                + this.mH.toPrecision(2).toString() + ")");
        //this.mGrid = new engine.MapGrid(5, 5);
        //this.mGrid.printGrid();
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();
        this.mBg.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);   // only draw status in the main camera

        this.mGrid.draw(this.mCamera);

    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        this.objectControler();
    }

    objectControler() {
        if (engine.input.isKeyPressed(engine.input.keys.X)) {
            this.mGrid.moveObjectToSpecTile(0, 1, 1);
        }
        //Controler
        if (engine.input.isKeyClicked(engine.input.keys.Up)) {
            this.mGrid.moveObjectInDerection(0, 0, 1);

        }
        if (engine.input.isKeyClicked(engine.input.keys.Down)) {
            this.mGrid.moveObjectInDerection(0, 0, -1);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Left)) {
            this.mGrid.moveObjectInDerection(0, -1, 0);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Right)) {
            this.mGrid.moveObjectInDerection(0, 1, 0);
        }

    }
    
    next() {
        super.next();

    }

}


window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}
