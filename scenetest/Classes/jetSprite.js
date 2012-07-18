var jetSprite = cc.Sprite.extend(
	{
		_currentRotation:0,
		_myPoint:{
			xx:null,
			yy:null
		},
		_sprite:null
		,
		ctor:function(){
			this._super();
			this.initWithFile("images/jet.png");
			////////////////////////////////////////////
			////////////////////////////////////////////
			/*
			var s = cc.Director.sharedDirector().getWinSize();
			var texture = cc.TextureCache.sharedTextureCache().addImage("images/dragon_animation.png");

			
			var frame0 = cc.SpriteFrame.frameWithTexture(texture, cc.RectMake(132 * 0, 132 * 0, 132, 132));
			var frame1 = cc.SpriteFrame.frameWithTexture(texture, cc.RectMake(132 * 1, 132 * 0, 132, 132));
			var frame2 = cc.SpriteFrame.frameWithTexture(texture, cc.RectMake(132 * 2, 132 * 0, 132, 132));
			var frame3 = cc.SpriteFrame.frameWithTexture(texture, cc.RectMake(132 * 3, 132 * 0, 132, 132));
			var frame4 = cc.SpriteFrame.frameWithTexture(texture, cc.RectMake(132 * 0, 132 * 1, 132, 132));
			var frame5 = cc.SpriteFrame.frameWithTexture(texture, cc.RectMake(132 * 1, 132 * 1, 132, 132));
			this._sprite = cc.Sprite.spriteWithSpriteFrame(frame0);
			sprite.setPosition(cc.ccp(s.width / 2 - 80, s.height / 2));
			this.addChild(sprite);

			var animFrames = [];
			animFrames.push(frame0);
			animFrames.push(frame1);
			animFrames.push(frame2);
			animFrames.push(frame3);
			animFrames.push(frame4);
			animFrames.push(frame5);

			var animation = cc.Animation.animationWithFrames(animFrames, 0.2);
			var animate = cc.Animate.actionWithAnimation(	animation, false);
			var seq = cc.Sequence.actions(animate,
            cc.FlipX.actionWithFlipX(true),
            animate.copy(),
            cc.FlipX.actionWithFlipX(false));*/
			/////////////////////////////////////////////
			
		},
		update:function(dt){
			this.setRotation(this._currentRotation);
		
		//this.setPosition(100,100);
		},
		handleKey:function(e){
		/*
			if(e === cc.key.left)
            this._currentRotation--;
        else if(e === cc.key.right)
            this._currentRotation++;

        if(this._currentRotation < 0) this._currentRotation = 360;
        if(this._currentRotation > 360) this._currentRotation = 0;
		*/
		},
		handleTouch:function(touchLocation)
		{

		},
		handleTouchMove:function(touchLocation)
		{	
			
			var xxx = touchLocation.x;
			var yyy = touchLocation.y;
			this._myPoint.xx=xxx;
			this._myPoint.yy=yyy;
			
			var angle = Math.atan2(touchLocation.x-300,touchLocation.y-300);

			angle = angle * (180/Math.PI);
			this._currentRotation = angle;
		}
	}
);