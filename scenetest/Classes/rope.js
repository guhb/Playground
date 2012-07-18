var ropeSprite = cc.Sprite.extend({
		argX:null,
		argY:null,
		ctor:function(){
			this._super();
			this.initWithFile("images/fire.png");
			this.setScale(1.4);
			var size = cc.Director.sharedDirector().getWinSize();
			//cc.drawingUtil.drawLine(new cc.Point(size.width/2,size.height-50),new cc.Point(0,0));
		},
		//产生0到base之间的随机数
		createRandom:function(base){	
			return Math.floor(Math.random()*base);
		},
		update:function(){
			var size = cc.Director.sharedDirector().getWinSize();
			console.log("ropeSprite->argX:" + this.argX);
			console.log("ropeSprite->argY:" + this.argY);
			//cc.drawingUtil.drawLine(new cc.Point(size.width/2,size.height-50),new cc.Point(0,0));
		},
		handleKey:function(e){

		},
		handleTouch:function(touchLocation)
		{
			
		},
		handleTouchMove:function(touchLocation)
		{	

		}
	}
);