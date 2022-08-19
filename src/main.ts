import * as PIXI from "pixi.js";
import { Loader } from "pixi.js";

var renderer = new PIXI.Application({
    width: 256,
    height: 256,
    backgroundColor: 0x000000,
})
document.body.appendChild(renderer.view)
var stage = renderer.stage

Loader.shared.add('pickaxe', 'images/pickaxe.png')
Loader.shared.load((info: any, resources: any) => {
    console.log(info, resources)

    var image = new PIXI.Sprite(Loader.shared.resources.pickaxe.texture)
    image.x = 100
    image.y = 100
    stage.addChild(image)

    setInterval(function () {
        image.rotation += 0.05
    }, 20)
})


console.log("Demo001 Started")
