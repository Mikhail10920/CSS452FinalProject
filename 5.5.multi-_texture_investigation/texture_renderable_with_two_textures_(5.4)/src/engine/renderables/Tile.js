/*
 * File: Tile.js
 *
 * Supports the drawing an entire file texture mapped onto an entire Renderable
 * 
 */
"use strict";

import * as glSys from "../core/gl.js";
import TextureRenderable from "./renderable.js";
import * as texture from "../resources/texture.js";
import * as shaderResources from "../core/shader_resources.js";

class Tile extends TextureRenderable{
    constructor(tex){
        super();
        this.texture = tex;
        this.isForeground = false;
        this.isCollisions = false;
        this.hasEvent = false;
    }

    update(){

    }

    draw(camera){

    }
}

export default Tile;