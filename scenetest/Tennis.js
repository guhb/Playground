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


var TAG_MENU = 77771;
var TAG_MENU0 = 77770;
var TAG_MENU1 = 77771;
//当前是第几关
var	roundNum = 1;

function getScoreNeeded(_roundNum){
		if(_roundNum <= 1)
		{
			this.scoreNeeded = 600;
			return this.scoreNeeded;
		}
		else if(_roundNum <= 5 && _roundNum>1)
		{
			this.scoreNeeded +=500;
			return this.scoreNeeded;
		}
		else if(_roundNum >5 && _roundNum<=10)
		{
			this.addQ += 300;
			this.scoreNeeded += addQ;
			return this.scoreNeeded;
		}
		else if(_roundNum >10)
		{
			//this.addQ = 2700;
			this.scoreNeeded += 2700;
			return this.scoreNeeded;
		}
		
}
//------------------------------------------------------------------
//
// MenuLayer1
//
//------------------------------------------------------------------
var MenuLayer1 = cc.Layer.extend({
    ctor:function () {
        cc.MenuItemFont.setFontSize(30);
        cc.MenuItemFont.setFontName("Courier New");
        this.setIsTouchEnabled(true);
        // Font Item

        var spriteNormal = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_menuItem, cc.RectMake(0, 0, 115, 23));
		
		var size = cc.Director.sharedDirector().getWinSize();
		var bgForLayout1 = cc.Sprite.create("images/start.jpg");
		bgForLayout1.setPosition(new cc.Point(size.width / 2 , size.height / 2));
		bgForLayout1.setScale(0.7);
		this.addChild(bgForLayout1);
		
        var item1 = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this, this.menuCallback);

        // Image Item
        //var item2 = cc.MenuItemImage.create(s_sendScore, s_pressSendScore, this, this.menuCallback2);

        // Label Item (LabelAtlas)
        var labelAtlas = cc.LabelAtlas.create("0123456789", "Resources/fonts/fps_images.png", 16, 24, '.');
		/*
        var item3 = cc.MenuItemLabel.create(labelAtlas, this, this.menuCallbackDisabled);
        item3.setDisabledColor(cc.ccc3(32, 32, 64));
        item3.setColor(cc.ccc3(200, 200, 255));
		*/
        // Font Item
        //var item4 = cc.MenuItemFont.create("I toggle enable items", this, this.menuCallbackEnabled);

        //item4.setFontSizeObj(20);
        cc.MenuItemFont.setFontName("Marker Felt");

        // Label Item (CCLabelBMFont)
        var label = cc.LabelBMFont.create("configuration", "Resources/fonts/bitmapFontTest3.fnt");
        var item5 = cc.MenuItemLabel.create(label, this, this.menuCallbackConfig);

        // Testing issue #500
        item5.setScale(2);

        // Font Item
        var item6 = cc.MenuItemFont.create("Quit", this, this.onQuit);

        var color_action = cc.TintBy.create(0.5, 0, -255, -255);
        var color_back = color_action.reverse();
        var seq = cc.Sequence.create(color_action, color_back, null);
        item6.runAction(cc.RepeatForever.create(seq));

        var menu = cc.Menu.create(item1/*, item2, item3, item4*/, item5, item6, null);
        menu.alignItemsVertically();
		
		

        // elastic effect
        var s = cc.Director.sharedDirector().getWinSize();

        var child;
        var array = menu.getChildren();
        for (var i = 0; i < array.length; i++) {
            if (array[i] == null)
                break;

            child = array[i];

            var dstPoint = child.getPosition();
            var offset = (s.width / 2 + 50);
            if (i % 2 == 0)
                offset = -offset;

            child.setPosition(cc.PointMake(dstPoint.x + offset, dstPoint.y));
			child.runAction(cc.EaseElasticOut.create(cc.MoveBy.create(2, cc.PointMake(dstPoint.x - offset, 0)),0.35));
            /*child.runAction(
                cc.EaseElasticOut.create(cc.MoveBy.create(2, cc.PointMake(dstPoint.x - offset, 0)), 0.35)
            );*/
        }
        //this._disabledItem = item3;
        //this._disabledItem.setIsEnabled(false);
		
		//粒子系统测试
		var sun = cc.ParticleSun.create();
		sun.setTexture(cc.TextureCache.sharedTextureCache().addImage("images/fire.png"));
		sun.setPosition(cc.PointMake(s.width-32,s.height-32));
		sun.setTotalParticles(100);
		sun.setLife(1.5);
		//this.addChild(sun);

        this.addChild(menu);
    },
    registerWithTouchDispatcher:function () {
        cc.TouchDispatcher.sharedDispatcher().addTargetedDelegate(this, cc.CCMENU_TOUCH_PRIORITY + 1, true);
    },
    ccTouchBegan:function () {
        return true;
    },
    menuCallback:function (sender) {
		//alert("okokok");
		var scene = new MenuLayer2();
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
     //   this._parent.switchTo(1);
    },
    menuCallbackConfig:function (sender) {
        var scene = new MenuLayer4();
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
    },
    allowTouches:function (dt) {
        cc.TouchDispatcher.sharedDispatcher().setPriority(cc.CCMENU_TOUCH_PRIORITY + 1, this);
        this.unscheduleAllSelectors();
        cc.Log("Touches allowed again!");
    },
    menuCallbackDisabled:function (sender) {
        // hijack all touch events for 5 seconds
        cc.TouchDispatcher.sharedDispatcher().setPriority(cc.CCMENU_TOUCH_PRIORITY - 1, this);
        this.schedule(this.allowTouches, 5.0);
        cc.Log("TOUCHES DISABLED FOR 5 SECONDS");
    },
    menuCallbackEnabled:function (sender) {
        this._disabledItem.setIsEnabled(!this._disabledItem.getIsEnabled());
    },
    menuCallback2:function (sender) {
        this._parent.switchTo(2);
    },
    onQuit:function (sender) {
		history.go(-1);
        //cc.Assert(0, "Quit!");
    }
});

//------------------------------------------------------------------
//
// MenuLayer2
//
//------------------------------------------------------------------
var MenuLayer2 = cc.Layer.extend({
	//每关的时间
	times:90,
	direction:1,
	//倒计时label
	timeLabel:null,
	//显示结果的label
	resultLabel:null,
	//当前过关所需分数
	scoreNeeded:650,
	//计算scoreNeeded用到的增量
	addQ:null,
	//显示所需分数的label
	scoreNeededLabel:null,
	//时间显示计时器
	roundInterval:null,
	//产生rock的数量
	rockNum:5,	
	//rock的数组
	rockArray:[],
	//钩子到屏幕下方边界点的角度
	criticalAngle:null,
	//绳子
	rope:null,
	//挖金人的动画
	sprite:null,
	animation:null,
	animate:null,
	rocks: [],
	golds: null,
	
    ctor:function (roundNumPresent) {
		if(typeof(roundNumPresent)=="undefined")
			roundNumPresent = 1;
		this._jetSprite = new jetSprite();
		//告诉cocos2d我们的应用要处理触摸和按键事件
		this.setIsTouchEnabled(true);
		this.setIsKeypadEnabled(true);
		this.addChild(this._jetSprite,10);
		var size = cc.Director.sharedDirector().getWinSize();
		
		this._jetSprite.scheduleUpdate();
		
		this.scoreNeeded = getScoreNeeded(roundNumPresent); 
		addQ = 1000;
		this.scoreNeededLabel = this.initLabel("所需分数："+this.scoreNeeded,120,size.height/2+200,true,30,10);
		this.scoreNeededLabel.setColor(new cc.Color3B(0,0,0));
		
		this.rope = new ropeSprite();
		this.rope.setPosition(new cc.Point(size.width/2,size.height/2));
		this.rope.setPosition(new cc.Point(size.width/2,size.height-50));
		this.addChild(this.rope,10000, 1233);
		

		
		//来回摆动的钩子
		this._handerSprite = new handerSprite();
		this.addChild(this._handerSprite,10);
		this._handerSprite.setAnchorPoint(cc.PointMake(0.5,1));
		this._handerSprite.setPosition(new cc.Point(size.width/2,size.height-50));
		this._handerSprite.originPosition = new cc.Point(size.width/2,size.height-50);
		
		this.criticalAngle = Math.atan((size.width/2)/(size.height-50))/Math.PI*180

		this._handerSprite.scheduleUpdate();
		this.schedule(this.update);
		var bg = cc.Sprite.create("images/bg.jpg");
		bg.setPosition(new cc.Point(size.width / 2 , size.height / 2));
		bg.setScale(0.7);
		this.addChild(bg,-10);
        //for (var i = 0; i < 2; i++) {
            var item1 = cc.MenuItemImage.create(s_playNormal, s_playSelect, this, this.menuCallback);
			item1.setPosition(new cc.Point(size.width/2-30,size.height/2-30));
			var menu = cc.Menu.create(item1);
            menu.setTag(TAG_MENU);
			this.addChild(menu, 10, 100);
            //this.addChild(menu, 0, 100 + i);
            //this._centeredMenu = menu.getPosition();
        //}
		this.createMap(roundNum);
		var that = this;
		this.timeLabel = this.initLabel("00:"+this.times,size.width-100,size.height-50,true,30,10);
		if(this.times>=0)
		{
			this.roundInterval = setInterval(
				function(){
					that.times--;
					that.timeLabel.setString("00:"+that.times);
				},
				1000
			);
		}
		this.resultLabel = this.initLabel("Times Up!",size.width/2,size.height/2,false,40,10);
		
		var texture = cc.TextureCache.sharedTextureCache().addImage("images/grossini.png");
		var frame0 = cc.SpriteFrame.create(texture, cc.RectMake(0, 0, 47, 108));
        var frame1 = cc.SpriteFrame.create(texture, cc.RectMake(282, 110, 47, 108));
        var frame2 = cc.SpriteFrame.create(texture, cc.RectMake( 52, 0, 50, 109));
        var frame3 = cc.SpriteFrame.create(texture, cc.RectMake(334 , 110, 47, 108));

		this.sprite = cc.Sprite.createWithSpriteFrame(frame0);
        this.sprite.setPosition(cc.ccp(size.width / 2 , size.height -50));
        this.addChild(this.sprite);
		
		var animFrames = [];
		animFrames.push(frame0);
		animFrames.push(frame1);
		animFrames.push(frame2);
		animFrames.push(frame3);
		this.animation = cc.Animation.create(animFrames,0.5);
		this.animate = cc.Animate.create(this.animation,false);
		this.sprite.runAction(cc.RepeatForever.create(this.animate));
		//return true;
    },
	createMap:function(roundN){	
		/*生成地图：
				一共有六种布局格式
				用当前关数roundN进行模6操作得到使用第几个布局
		*/
		var size = cc.Director.sharedDirector().getWinSize();
		var n = roundN % 6;
		console.log(n);
		n=1;
		switch(n){
				case 1:
					//var rocks = [];
					var i;
					//第一种情况有4块石头
					for(i = 0;i<4;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*2);
						this.rocks[i] = new rockSprite(sizeRandom);	
						
						//this.rocks[i]._rockSize = sizeRandom;
						this.addChild(this.rocks[i],30);
						//this.objs.push(rocks[i]);
					}
					this.rocks[0].setPosition(new cc.Point(100,290));
					this.rocks[1].setPosition(new cc.Point(260,90));
					this.rocks[2].setPosition(new cc.Point(470,250));
					this.rocks[3].setPosition(new cc.Point(610,370));
					
					//第一种情况有10块金子
					var golds = [];
					for(i = 0;i<10;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*3);
						golds[i] = new goldSprite(sizeRandom);	
						golds[i]._goldSize = sizeRandom;
						this.addChild(golds[i],30);
						//this.objs.push(golds[i]);
					}
					golds[0].setPosition(new cc.Point(100,210));
					golds[1].setPosition(new cc.Point(140,340));
					golds[2].setPosition(new cc.Point(170,140));
					golds[3].setPosition(new cc.Point(200,300));
					golds[4].setPosition(new cc.Point(300,180));
					golds[5].setPosition(new cc.Point(410,170));
					golds[6].setPosition(new cc.Point(530,100));
					golds[7].setPosition(new cc.Point(530,230));
					golds[8].setPosition(new cc.Point(590,310));
					golds[9].setPosition(new cc.Point(660,250));
					break;
				case 2:	
					var rocks = [];
					var i;
					//第二种情况有4块石头
					for(i = 0;i<4;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*2);
						rocks[i] = new rockSprite(sizeRandom);	
						rocks[i]._rockSize = sizeRandom;
						this.addChild(rocks[i],30);
					}
					rocks[0].setPosition(new cc.Point(90,240));
					rocks[1].setPosition(new cc.Point(280,210));
					rocks[2].setPosition(new cc.Point(440,240));
					rocks[3].setPosition(new cc.Point(520,340));
					//第二种情况有10块金子
					var golds = [];
					for(i = 0;i<10;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*3);
						golds[i] = new goldSprite(sizeRandom);	
						golds[i]._goldSize = sizeRandom;
						this.addChild(golds[i],30);
					}
					golds[0].setPosition(new cc.Point(30,110));
					golds[1].setPosition(new cc.Point(110,170));
					golds[2].setPosition(new cc.Point(170,240));
					golds[3].setPosition(new cc.Point(230,380));
					golds[4].setPosition(new cc.Point(290,80));
					golds[5].setPosition(new cc.Point(380,110));
					golds[6].setPosition(new cc.Point(490,300));
					golds[7].setPosition(new cc.Point(540,240));
					golds[8].setPosition(new cc.Point(630,110));
					golds[9].setPosition(new cc.Point(690,250));
					//钻石
					var diamond = new diamondSprite();
					diamond.setPosition(new cc.ccp(470,90));
					this.addChild(diamond,30);
					console.log(diamond.value);
					break;
				case 3:
					var rocks = [];
					var i;
					//第三种情况有7块石头
					for(i = 0;i<7;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*2);
						rocks[i] = new rockSprite(sizeRandom);	
						rocks[i]._rockSize = sizeRandom;
						this.addChild(rocks[i],30);
					}
					rocks[0].setPosition(new cc.Point(90,250));
					rocks[1].setPosition(new cc.Point(280,260));
					rocks[2].setPosition(new cc.Point(440,240));
					rocks[3].setPosition(new cc.Point(620,280));
					rocks[4].setPosition(new cc.Point(180,140));
					rocks[5].setPosition(new cc.Point(390,120));
					rocks[6].setPosition(new cc.Point(540,140));
					//6块金子
					var golds = [];
					for(i = 0;i<6;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*3);
						golds[i] = new goldSprite(sizeRandom);	
						golds[i]._goldSize = sizeRandom;
						this.addChild(golds[i],30);
					}
					golds[0].setPosition(new cc.Point(130,30));
					golds[1].setPosition(new cc.Point(210,70));
					golds[2].setPosition(new cc.Point(370,40));
					golds[3].setPosition(new cc.Point(430,80));
					golds[4].setPosition(new cc.Point(590,80));
					golds[5].setPosition(new cc.Point(630,110));
					//钻石
					var diamond = new diamondSprite();
					diamond.setPosition(new cc.ccp(170,90));
					this.addChild(diamond,30);
					console.log(diamond.value);
					//猪4只
					var pig = [];
					for(i = 0;i<4;i++)
					{		
						var type = Math.floor(Math.random()*2);
						pig[i] = new pigSprite(type);	
							this.addChild(pig[i],20);
					}
					pig[0].setPosition(new cc.Point(50,280));
					pig[0].pigrun(50,300);
					pig[1].setPosition(new cc.Point(90,320));
					pig[1].pigrun(90,350);
					pig[2].setPosition(new cc.Point(550,200));
					pig[2].pigrun(550,200);
					pig[3].setPosition(new cc.Point(550,310));
					pig[3].pigrun(550,310);
					break;
				case 4:	
					var rocks = [];
					var i;
					for(i = 0;i<5;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*2);
						rocks[i] = new rockSprite(sizeRandom);	
						rocks[i]._rockSize = sizeRandom;
						this.addChild(rocks[i],30);
					}
					rocks[0].setPosition(new cc.Point(90,150));
					rocks[1].setPosition(new cc.Point(180,210));
					rocks[2].setPosition(new cc.Point(340,240));
					rocks[3].setPosition(new cc.Point(520,230));
					rocks[4].setPosition(new cc.Point(600,100));
					var golds = [];
					for(i = 0;i<5;i++)
					{		
						var sizeRandom = Math.floor(Math.random()*3);
						golds[i] = new goldSprite(sizeRandom);	
						golds[i]._goldSize = sizeRandom;
						this.addChild(golds[i],30);
					}
					golds[0].setPosition(new cc.Point(110,20));
					golds[1].setPosition(new cc.Point(200,110));
					golds[2].setPosition(new cc.Point(320,120));
					golds[3].setPosition(new cc.Point(410,150));
					golds[4].setPosition(new cc.Point(630,90));
					//3个钻石
					var diamonds = [];
					for(i = 0;i<3;i++)
					{		
						diamonds[i] = new diamondSprite();	
						this.addChild(diamonds[i],30);
					}
					diamonds[0].setPosition(new cc.Point(210,20));
					diamonds[1].setPosition(new cc.Point(400,70));
					diamonds[2].setPosition(new cc.Point(580,20));
					//猪4只
					var pig = [];
					for(i = 0;i<4;i++)
					{		
						pig[i] = new pigSprite(0);	
						this.addChild(pig[i],40);
					}
					pig[0].setPosition(new cc.Point(50,300));
					pig[0].pigrun(50,300);
					pig[1].setPosition(new cc.Point(90,340));
					pig[1].pigrun(90,350);
					pig[2].setPosition(new cc.Point(550,240));
					pig[2].pigrun(550,200);
					pig[3].setPosition(new cc.Point(550,310));
					pig[3].pigrun(550,310);
					break;
				case 5:
					var i;
					var golds = [];
					for(i = 0;i<5;i++)
					{		
						golds[i] = new goldSprite(2);	
						this.addChild(golds[i],30);
					}
					golds[0].setPosition(new cc.Point(70,50));
					golds[1].setPosition(new cc.Point(150,170));
					golds[2].setPosition(new cc.Point(300,30));
					golds[3].setPosition(new cc.Point(450,150));
					golds[4].setPosition(new cc.Point(650,200));
					
					//没有钻石
					//猪5只
					var pig = [];
					for(i = 0;i<5;i++)
					{		
						pig[i] = new pigSprite(0);
						this.addChild(pig[i],40);
					}
					pig[0].setPosition(new cc.Point(500,280));
					pig[0].pigrun(500,280);
					pig[1].setPosition(new cc.Point(450,350));
					pig[1].pigrun(450,350);
					pig[2].setPosition(new cc.Point(550,210));
					pig[2].pigrun(550,210);
					pig[3].setPosition(new cc.Point(100,240));
					pig[3].pigrun(100,240);
					pig[4].setPosition(new cc.Point(80,310));
					pig[4].pigrun(80,310);
					//两个炸弹
					var bombs = [];
					for(i = 0;i<2;i++)
					{
						bombs[i] = new bombSprite();
						this.addChild(bombs[i],20);
					}
					bombs[0].setPosition(new cc.Point(240,210));
					bombs[1].setPosition(new cc.Point(500,260));
					//3个bone
					var bones = [];
					for(i = 0;i<3;i++)
					{
						bones[i] = new boneSprite(Math.floor(Math.random()*2));
						this.addChild(bones[i],20);
					}
					bones[0].setPosition(new cc.Point(150,300));
					bones[1].setPosition(new cc.Point(370,260));
					bones[2].setPosition(new cc.Point(540,300));
					break;
					
				case 6:	
					this.times = 1000;
					var i;
					//第二种情况有4块金子
					var golds = [];
					for(i = 0;i<4;i++)
					{		
						golds[i] = new goldSprite(2);	
						this.addChild(golds[i],30);
					}
					golds[0].setPosition(new cc.Point(60,50));
					golds[1].setPosition(new cc.Point(490,130));
					golds[2].setPosition(new cc.Point(550,80));
					golds[3].setPosition(new cc.Point(650,320));
					//4个钻石
					var diamonds = [];
					for(i = 0;i<4;i++)
					{		
						diamonds[i] = new diamondSprite();	
						this.addChild(diamonds[i],30);
					}
					diamonds[0].setPosition(new cc.Point(30,330));
					diamonds[1].setPosition(new cc.Point(150,240));
					diamonds[2].setPosition(new cc.Point(280,100));diamonds[3].setPosition(new cc.Point(380,150));
					//4个炸弹
					var bombs = [];
					for(i = 0;i<4;i++)
					{
						bombs[i] = new bombSprite();
						this.addChild(bombs[i],20);
					}
					bombs[0].setPosition(new cc.Point(100,290));
					bombs[1].setPosition(new cc.Point(230,160));
					bombs[2].setPosition(new cc.Point(440,210));
					bombs[3].setPosition(new cc.Point(590,260));
					//3个bone
					var bones = [];
					for(i = 0;i<3;i++)
					{
						bones[i] = new boneSprite(Math.floor(Math.random()*2));
						this.addChild(bones[i],20);
					}
					bones[0].setPosition(new cc.Point(150,300));
					bones[1].setPosition(new cc.Point(370,260));
					bones[2].setPosition(new cc.Point(540,300));
					break;	
		}
		/*
		var i = null;
		for(i=0;i<this.rockNum;i++)
		{
			this.rockArray[i] = new rockSprite();
			var size = cc.Director.sharedDirector().getWinSize();
			var xx = Math.floor(Math.random()*size.width);
			var yy = Math.floor(Math.random()*size.height);
			//让物品产生在合适的位置
			//加入AI时改写此部分
			if(yy>400)
				yy -= 200;
			if(yy<20)
				yy = 20;
			this.rockArray[i].setPosition(new cc.Point(xx,yy));
			this.addChild(this.rockArray[i],30);
		}*/
	},
	initLabel:function(argString,argX,argY,isVisible,size,zindex){
		var _label = null;
		_label = cc.LabelTTF.create(argString,"Arial",size);
		_label.setPosition(new cc.Point(argX,argY));
		_label.setIsVisible(isVisible);
		this.addChild(_label,zindex);
		return _label;
	},
	ccTouchesBegan:function(touch , event){
		var touchX = touch[0].locationInView().x;
		var touchY = touch[0].locationInView().y;
		
		var size = cc.Director.sharedDirector().getWinSize();
        var mx = size.width / 2;
        var my = size.height - 50;
		var desX = null;
		var desY = null;
		//确定drawLine的终点
		//终点在左边界上
		this._handerSprite.state;
		if (this._handerSprite.state == "swing") {
		    this._handerSprite.state = "throw";
            this._handerSprite.isRotate = false;
            this._handerSprite.stopSwing();
		
			var border = 10;
            var angle = this._handerSprite.getRotation();
            if(angle > this.criticalAngle)
			{
				desX = 0 + border;
				//desY = size.height-(size.width/2)/(Math.tan(angle));
                desY = my - Math.tan(((90-angle)*Math.PI)/180) * mx;
				
			}
			//终点在左下边界上
			else if(angle < this.criticalAngle && angle >0)
			{
				//desX = size.width/2-size.height*Math.tan(angle);
                desX = mx - Math.tan((angle*Math.PI)/180) * my;
				desY = 0 + border;

			}
			//终点在右下边界上
			else if(angle > (-this.criticalAngle) && angle < 0)
			{
				//desX = size.width/2+size.height*Math.tan(angle);
                desX = mx + Math.tan((-angle*Math.PI)/180) * my
				desY = 0 + border;	
			}
			else if(angle < -this.criticalAngle)
			{
				desX = size.width - border;
				//desY = size.height-(size.width/2)/Math.tan(-angle);
                desY = my - Math.tan(((90+angle)*Math.PI)/180) * mx;
			}

			this.rope.argX = desX;
			this.rope.argY = desY;
			this.rope.setAnchorPoint(cc.PointMake(0.5,1));
			this.rope.setRotation(this._handerSprite.getRotation());
			//this.rope.scheduleUpdate();
			
			// Maybe the rope will be deprecated for hander
			this._handerSprite.argX = desX;
			this._handerSprite.argY = desY;
            
            //this._handerSprite.dstPosition = this.getDstPoint();
            this._handerSprite.throwHander();
		}
	},
	onEnter:function(){	
		this._super();
	},
	draw: function () {
        this._super();
        var size = cc.Director.sharedDirector().getWinSize();
        var lineWidth = cc.renderContext.lineWidth;
        cc.renderContext.lineWidth = 2;
        //cc.drawingUtil.drawLine(new cc.ccp(size.width/2,size.height-50),this.getDstPoint());
        cc.drawingUtil.drawLine(new cc.ccp(size.width/2,size.height-50), this._handerSprite.getPosition());
        //cc.renderContext.lineWidth = lineWidth;
    },
	update:function(dt){
		if(this.times <= 0)
		{
			//this.resultLabel.setTring("times up!");
			this.resultLabel.setIsVisible(true);
			this.endRound();
		}
		this.checkCollide();
    },
	checkCollide: function () {
	    var distance = null;
		for(var i=0; i<this.rocks.length; i++)
		{
			var xlen = (this._handerSprite.getPosition().x -this.rocks[i].getPosition().x) * (this._handerSprite.getPosition().x - this.rocks[i].getPosition().x);
			var ylen = (this._handerSprite.getPosition().y - this.rocks[i].getPosition().y) * (this._handerSprite.getPosition().y - this.rocks[i].getPosition().y);
			distance = Math.sqrt(xlen + ylen);
			if(distance < 30)			
			{	
			    //this._handerSprite.stopThrow();
				
				//this.objs[i].setIsVisible(false);
				this.removeChild(this.rocks[i]);
				this._handerSprite.addChild(this.rocks[i],10);
				//this._handerSprite.addChild(this.objs[i]);
				this._handerSprite.retrieveHander();
				
			}
		}
	},
	endRound:function(){
		this._handerSprite.stopAllActions();
		this._handerSprite.unscheduleUpdate();
		clearInterval(this.roundInterval);
		this.setIsTouchEnabled(false);
		setTimeout(
			function(){
				var scene = new MenuLayer5();
				var layer = new Tennis();
				scene.addChild(layer,0);
				cc.Director.sharedDirector().pushScene(scene);
			},
			1000
		)
	},
	ccTouchesEnded:function (pTouch,pEvent){
        this._jetSprite.handleTouch(pTouch[0].locationInView());
    },
	ccTouchesMoved:function(pTouch,pEvent){
		//alert("OK");
        this._jetSprite.handleTouchMove(pTouch[0].locationInView());
    },
	//只触发一次
    keyUp:function(e){
		
    },
	//keydown是不断触发
    keyDown:function(e){
        this._jetSprite.handleKey(e);
    },
    alignMenusV:function () {
        for (var i = 0; i < 2; i++) {
            var menu = this.getChildByTag(100 + i);
            menu.setPosition(this._centeredMenu);
            if (i == 0) {
                menu.alignItemsVertically();
                var p = menu.getPosition();
                menu.setPosition(cc.ccpAdd(p, cc.PointMake(100, 0)));
            }
            else {
                menu.alignItemsVerticallyWithPadding(40);
                var p = menu.getPosition();
                menu.setPosition(cc.ccpSub(p, cc.PointMake(100, 0)));
            }
        }
    },
    menuCallback:function (sender) {
        var scene = new MenuLayer1();
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
    },
    menuCallbackOpacity:function (sender) {
        var menu = sender.getParent();
        var opacity = menu.getOpacity();
        if (opacity == 128)
            menu.setOpacity(255);
        else
            menu.setOpacity(128);
    },
    menuCallbackAlign:function (sender) {
        var scene = new MenuLayer4();
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
    }
});

//------------------------------------------------------------------
//
// MenuLayer3
//
//------------------------------------------------------------------
var MenuLayer3 = cc.Layer.extend({
    ctor:function () {
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(28);

        var label = cc.LabelBMFont.create("Enable AtlasItem", "Resources/fonts/bitmapFontTest3.fnt");
        var item1 = cc.MenuItemLabel.create(label, this, this.menuCallback2);
        var item2 = cc.MenuItemFont.create("--- Go Back ---", this, this.menuCallback);

        var spriteNormal = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_menuItem, cc.RectMake(0, 0, 115, 23));


        var item3 = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this, this.menuCallback3);
        this._disabledItem = item3;
        this._disabledItem.setIsEnabled(false);

        var menu = cc.Menu.create(item1, item2, item3);
        menu.setPosition(cc.PointMake(0, 0));

        var s = cc.Director.sharedDirector().getWinSize();

        item1.setPosition(cc.PointMake(s.width / 2 - 150, s.height / 2));
        item2.setPosition(cc.PointMake(s.width / 2 - 200, s.height / 2));
        item3.setPosition(cc.PointMake(s.width / 2, s.height / 2 - 100));

        var jump = cc.JumpBy.create(3, cc.PointMake(400, 0), 50, 4);
        item2.runAction(cc.RepeatForever.create(
            (cc.Sequence.create(jump, jump.reverse()))
        )
        );
		
        var spin1 = cc.RotateBy.create(3, 360);
        var spin2 = spin1.copy();
        var spin3 = spin1.copy();

        item1.runAction(cc.RepeatForever.create(spin1));
        item2.runAction(cc.RepeatForever.create(spin2));
        item3.runAction(cc.RepeatForever.create(spin3));

        this.addChild(menu);
		
		
			
    },
    menuCallback:function (sender) {
        this._parent.switchTo(0);
    },
    menuCallback2:function (sender) {
        this._disabledItem.setIsEnabled(!this._disabledItem.getIsEnabled());
        this._disabledItem.stopAllActions();
    },
    menuCallback3:function () {
        cc.Log("do something")
    }
});

var MenuLayer4 = cc.Layer.extend({
    ctor:function () {
        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);

        var title1 = cc.MenuItemFont.create("Sound");
        title1.setIsEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item1 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("On"),
            cc.MenuItemFont.create("Off"));

        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);
        var title2 = cc.MenuItemFont.create("Music");
        title2.setIsEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item2 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("On"),
            cc.MenuItemFont.create("Off"));

        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);
        var title3 = cc.MenuItemFont.create("Quality");
        title3.setIsEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item3 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("High"),
            cc.MenuItemFont.create("Low"));

        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);
        var title4 = cc.MenuItemFont.create("Orientation");
        title4.setIsEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item4 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("Off"));

        item4.getSubItems().push(cc.MenuItemFont.create("33%"));
        item4.getSubItems().push(cc.MenuItemFont.create("66%"));
        item4.getSubItems().push(cc.MenuItemFont.create("100%"));

        // you can change the one of the items by doing this
        item4.setSelectedIndex(2);
		var spriteNormal = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_menuItem, cc.RectMake(0, 0, 115, 23));
		var item5 = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this, this.menuCallback);
		
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);

        var label = cc.LabelBMFont.create("go back", "Resources/fonts/bitmapFontTest3.fnt");
        var back = cc.MenuItemLabel.create(label, this, this.backCallback);

        var menu = cc.Menu.create(
            title1, title2,
            item1, item2,
            title3, title4,
            item3, item4,
            back,item5); // 9 items.

        menu.alignItemsInColumns(2, 2, 2, 2, 2, null);

        this.addChild(menu);
    },
    menuCallback:function () {
		var s = cc.Director.sharedDirector().getWinSize();
		var texture = cc.TextureCache.sharedTextureCache().addImage("images/dragon_animation.png");
		var frame0 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 0, 132 * 0, 132, 132));
		var frame1 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 1, 132 * 0, 132, 132));
        var frame2 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 2, 132 * 0, 132, 132));
        var frame3 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 3, 132 * 0, 132, 132));
        var frame4 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 0, 132 * 1, 132, 132));
        var frame5 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 1, 132 * 1, 132, 132));
		//先用第0帧初始化
		var sprite = cc.Sprite.createWithSpriteFrame(frame0);
		sprite.setPosition(cc.ccp(s.width-80,s.height-80));
		this.addChild(sprite,10);
		
		var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        animFrames.push(frame2);
        animFrames.push(frame3);
        animFrames.push(frame4);
        animFrames.push(frame5);
		var animation = cc.Animation.create(animFrames, 0.2);
        var animate = cc.Animate.create(animation, false);
        var seq = cc.Sequence.create(animate,
            cc.FlipX.create(true),
            animate.copy(),
            cc.FlipX.create(false));

        sprite.runAction(cc.RepeatForever.create(seq));
		
		var pigrunTo =cc.MoveTo.create(2,cc.ccp(100,100));
			var pigrunBack =cc.MoveTo.create(2,cc.ccp(300,300));
			var delay =cc.DelayTime.create(1000);
			var turnBack = cc.FlipX.create(true);

			var seq = cc.RepeatForever.create(cc.Sequence.create(pigrunTo,pigrunBack));

			
		
    },
    backCallback:function (sender) {
        var scene = new MenuLayer1();
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
    },
	ccTouchBegan:function(touch , event){
		var touchX = touch[0].locationInView().x;
		var touchY = touch[0].locationInView().y;
		console.log("touches begin");
	}	
});

var MenuLayer5 = cc.Layer.extend({
	bg:null,
	//下一关按钮
	nextLevel:null,
	ctor:function(){
		
		var size = cc.Director.sharedDirector().getWinSize();
		var bg = cc.Sprite.create("images/shop.jpg");
		bg.setPosition(new cc.Point(size.width / 2 , size.height / 2));
		bg.setScale(1.1);
		this.addChild(bg,0);
		
		var spriteNormal = cc.Sprite.create("images/btnormal.jpg", cc.RectMake(0, 0, 109, 36));
        var spriteSelected = cc.Sprite.create("images/btpressed.jpg", cc.RectMake(0, 0, 97, 29));
        var spriteDisabled = cc.Sprite.create("images/btpressed.jpg", cc.RectMake(0, 0, 97, 29));
		
        var item1 = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this, this.nextBtCallback);
		var menu = cc.Menu.create(item1);
		this.addChild(menu, 10, 100);
		
		
	},
	initLabel:function(argString,argX,argY,isVisible,size,zindex){
		var _label = null;
		_label = cc.LabelTTF.create(argString,"Arial",size);
		_label.setPosition(new cc.Point(argX,argY));
		_label.setIsVisible(isVisible);
		this.addChild(_label,zindex);
		return _label;
	},
	nextBtCallback:function(){
		roundNum++;
		var scene = new MenuLayer2(roundNum);
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
	}
	
});


var LayerFirst = cc.Layer.extend({
    ctor:function () {
		//var item1 = cc.Sprite.create("images/tuichu.jpg","images/tuichu.jpg",this,this.menuCallback);
		//var menu = cc.Menu.create(item1,null);
		//menu.alignItemsVertically();
		//this.addChild(menu);
		var lazyLayer = new cc.LazyLayer();
		this.addChild(lazyLayer);
		
        var size = cc.Director.sharedDirector().getWinSize();
        var mysprite = cc.Sprite.create("images/HelloWorld.png");
        mysprite.setPosition(cc.ccp(size.width / 2, size.height / 2));
        mysprite.setIsVisible(true);
        mysprite.setAnchorPoint(cc.ccp(0.5, 0.5));
        mysprite.setScale(0.3);
        mysprite.setRotation(180);
        this.addChild(mysprite, 0);


        var actionTo = cc.SkewTo.create(2, 0., 45);
        var actionToBack = cc.SkewTo.create(2, 0, 0);
        var rotateTo = cc.RotateTo.create(0.3, 300.0);
        var rotateToBack = cc.RotateTo.create(0.3, 0);
        var actionScaleTo = cc.ScaleTo.create(2, -0.44, 0.47);
        var actionScaleToBack = cc.ScaleTo.create(2, 1.0, 1.0);
        var actionBy = cc.MoveBy.create(2, cc.PointMake(80, 80));
        var actionByBack = actionBy.reverse();
		
		var scaleTo = cc.ScaleTo.create(2, 0.8, 0.8);
		var EaseScaleTo = cc.EaseElasticOut.create(scaleTo, 0.4);
		var rotateBy = cc.RotateBy.create(2, 180);	
		var EaseRotateBy = cc.EaseElasticOut.create(rotateBy, 0.4);
		var seq = cc.Sequence.create(EaseRotateBy,EaseScaleTo);
		var repeat = cc.RepeatForever.create(seq);
		mysprite.runAction(seq);

        //mysprite.runAction(cc.Sequence.create(actionTo, actionToBack, null));
        //mysprite.runAction(cc.Sequence.create(rotateTo, rotateToBack, null));
        //mysprite.runAction(cc.Sequence.create(actionScaleTo, actionScaleToBack));
        //mysprite.runAction(cc.Sequence.create(actionBy, actionByBack
			//,cc.callFunc.runWithTarget()
		//));

        this.setIsTouchEnabled(true);
		
		var scene = new MenuLayer1();
		var layer = new Tennis();
		scene.addChild(layer,0);
		//cc.Director.sharedDirector().replaceScene(scene);
		//cc.Director.sharedDirector().runWithScene();
		
		//cc.TransitionCrossFade.create(1,scene);
		
        return true;
    },
    onEnter:function()
	{	
		this._super();
	},
	update:function(dt){

    },
	ccTouchesEnded:function (pTouch,pEvent){
       
    },
	ccTouchesMoved:function(pTouch,pEvent){
	
    },
	//只触发一次
    keyUp:function(e){
		
    },
	//keydown是不断触发
    keyDown:function(e){
       
    }
	,
    menuCallback:function (sender) {
		var scene = new MenuLayer1();
		var layer = new Tennis();
		scene.addChild(layer,0);
		cc.Director.sharedDirector().pushScene(scene);
    },
});

Tennis = cc.Layer.extend({
	ctor:function(){
		
	}
});

Tennis.node = function () {
    var ret = new Tennis();
	
	// Init the Drop displayer layer.
	if (ret /*&& ret.init()*/) {
	    console.log(ret);
	    return ret;
	}
	
	return null;
}

Tennis.scene = function () {
    // 'scene' is an autorelease object
	var scene = cc.Scene.create();
	
	// 'layer' is an autorelease object
	var layerfirst = new LayerFirst();
	
	scene.addChild(layerfirst,-1);
	cc.Director.sharedDirector().runWithScene(layerfirst);
	
	
	var Layer1 = new MenuLayer1();
	var Layer2 = new MenuLayer2();
	var Layer3 = new MenuLayer3();
	var Layer4 = new MenuLayer4();

	var layer = cc.LayerMultiplex.create( Layer1, Layer2 ,Layer3, Layer4 , null);
	
	
	setTimeout(
		function(){scene.addChild(layer,1);},
		0
	);
	
	//cc.Director.sharedDirector().replaceScene(this);
	return scene;
}

//implement the "static node()" method manually
MenuLayer1.node = function () {
    var ret = new MenuLayer1();
	
	// Init the Drop displayer layer.
	if (ret /*&& ret.init()*/) {
	    console.log(ret);
	    return ret;
	}
	
	return null;
}

MenuLayer2.node = function () {
    var ret = new MenuLayer2();
	
	// Init the Drop displayer layer.
	if (ret /*&& ret.init()*/) {
	    console.log(ret);
	    return ret;
	}
	
	return null;
}

MenuLayer3.node = function () {
    var ret = new MenuLayer3();
	
	// Init the Drop displayer layer.
	if (ret /*&& ret.init()*/) {
	    console.log(ret);
	    return ret;
	}
	
	return null;
}

MenuLayer4.node = function () {
    var ret = new MenuLayer4();
	
	// Init the Drop displayer layer.
	if (ret /*&& ret.init()*/) {
	    console.log(ret);
	    return ret;
	}
	
	return null;
}
