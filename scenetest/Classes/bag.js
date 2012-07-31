var goldSprite = cc.Sprite.extend({
		//boolean,表示这只猪是否含有钻石
		//若不含价值为2，含有钻石价值为702
		hasDiamond:null,
		ctor:function(goldSize){
			this._super();
			this.initWithFile("images/gold.png");
			if(goldSize == 0)
				this.setScale(0.1);
			else if(goldSize == 1)	
				this.setScale(0.15);
			else 
				this.setScale(0.25);
			
		},
		//产生0到base之间的随机数
		createRandom:function(base){	
			return Math.floor(Math.random()*base);
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