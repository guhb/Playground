var rockSprite = cc.Sprite.extend({
		//石头大小取值范围为0,1,分别代表小大
		_rockSize:null,
		value:null,
		ctor:function(rockSize){
			this._super();
			if(rockSize == 1)
			{
				this.initWithFile("images/rock.png");
				this.setScale(0.5);
			}
			else
			{					
				this.initWithFile("images/stone.gif");
				this.setScale(1.1);
			}	
			this.value = this.getValue(this._rockSize);
			this._rockSize =rockSize;
		},
		//根据石头大小得到石头的价值（按照经典游戏制定）
		getValue:function(s){
			if(s == 0)
				return 11;
			if(s == 1)
				return 20;
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