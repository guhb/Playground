var pigSprite = cc.Sprite.extend({
		//boolean,表示这只猪是否含有钻石,0不含，1含
		//若不含价值为2，含有钻石价值为702
		hasDiamond:null,
		ctor:function(type){
			this._super();
			if(type == 0){
				this.initWithFile("images/pig0.gif");
				this.hasDiamond == 0;
			}
			else if(type == 1){	
				this.initWithFile("images/pig1.gif");
				this.hasDiamond == 1;
			}
		},
		//产生0到base之间的随机数
		createRandom:function(base){	
			return Math.floor(Math.random()*base);
		},
		//猪走向的地方的坐标,起点和终点
		//direction，0：从左向右，1：从右向左
		pigrun:function(startX,startY,desX,desY,direction){
			var size = cc.Director.sharedDirector().getWinSize();
			var desX =size.width - startX ;
			var desY =startY ;
			var pigrunTo =cc.MoveTo.create(4,cc.ccp(desX,desY));
			var pigrunBack =cc.MoveTo.create(4,cc.ccp(startX,startY));
			var delay =cc.DelayTime.create(1);
			var turnBack = cc.FlipX.create(true);
			var turnBackAgain = cc.FlipX.create(false);

			var seq = cc.RepeatForever.create(cc.Sequence.create(pigrunTo,delay,turnBack,pigrunBack,delay,turnBackAgain));

			this.runAction(seq);

		},
		update:function(){
		
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