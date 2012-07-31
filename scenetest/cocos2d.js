/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var cc = cc = cc || {};
//Cocos2d directory
cc.Dir = '../';//in relate to the html file or use absolute
cc.loadQue = [];//the load que which js files are loaded
cc.COCOS2D_DEBUG = 2;
cc._DEBUG = 1;
cc._IS_RETINA_DISPLAY_SUPPORTED = 0;
//html5 selector method
cc.$ = function (x) {
    return document.querySelector(x);
};
cc.$new = function (x) {
    return document.createElement(x);
};


cc.loadjs = function (filename) {
    //add the file to the que
    var script = cc.$new('script');
    script.src = cc.Dir + filename;
    script.order = cc.loadQue.length;
    cc.loadQue.push(script);

    script.onload = function () {
        //file have finished loading,
        //if there is more file to load, we should put the next file on the head
        if (this.order + 1 < cc.loadQue.length) {
            cc.$('head').appendChild(cc.loadQue[this.order + 1]);
            //console.log(this.order);
        } else {
            cc.setup("gameCanvas");

            //init audio
            cc.AudioManager.sharedEngine().init("mp3,ogg");

            //we are ready to run the game
            cc.Loader.shareLoader().onloading = function () {
                cc.LoaderScene.shareLoaderScene().draw();
            };
            cc.Loader.shareLoader().onload = function () {
                cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            };
            //preload ressources
            cc.Loader.shareLoader().preload(g_ressources);
        }
    };
    if (script.order === 0) {        //if the first file to load, then we put it on the head
        cc.$('head').appendChild(script);
    }
};

//Canvas or DOM
menuType = "Canvas";
var menuType = menuType || "DOM";
var isDebugMode = false;

if (menuType == "DOM") {
	cc.loadjs('lib/Cocos2d-html5-dommenu-min.js');
} else {
	cc.loadjs('lib/Cocos2d-html5-canvasmenu-min.js');
}
cc.loadjs('box2d/box2d.js');
cc.loadjs('scenetest/Resources.js');
cc.loadjs('scenetest/Classes/AppDelegate.js');
cc.loadjs('scenetest/Tennis.js');
cc.loadjs('scenetest/Classes/jetSprite.js');
cc.loadjs('scenetest/Classes/handerSprite.js');
cc.loadjs('scenetest/Classes/Ball.js');
cc.loadjs('scenetest/Classes/setting.js');
cc.loadjs('scenetest/Classes/rock.js');
cc.loadjs('scenetest/Classes/gold.js');
cc.loadjs('scenetest/Classes/diamond.js');
cc.loadjs('scenetest/Classes/rope.js');
