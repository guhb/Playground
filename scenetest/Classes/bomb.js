var bombSprite = cc.Sprite.extend({
		ctor:function(goldSize){
			this._super();
			this.initWithFile("images/tnt.gif");
		},
		explode:function(){
			
		}
});