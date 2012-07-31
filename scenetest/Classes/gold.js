var goldSprite = cc.Sprite.extend({
		//取值为 0,1,2,分别表示小中大
		_goldSize:null,
		value:null,
		ctor:function(goldSize){
			this._super();
			this.initWithFile("images/gold.png");
			if(goldSize == 0)
				this.setScale(0.1);
			else if(goldSize == 1)	
				this.setScale(0.15);
			else 
				this.setScale(0.25);
			this._goldSize = goldSize;	
			this.value = this.getValue(this._goldSize);
		},
		getValue:function(s){
			if(s == 0)
				return 50;
			if(s == 1)
				return 150;
			if(s == 2)
				return 500;
		},
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