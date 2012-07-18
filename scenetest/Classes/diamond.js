var diamondSprite = cc.Sprite.extend({
		value:diamondValue,
		ctor:function(){
			this._super();
			this.initWithFile("images/diamond.png");
			this.setScale(0.1);

			
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