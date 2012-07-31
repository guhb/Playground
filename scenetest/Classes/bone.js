var boneSprite= cc.Sprite.extend({
	//type=0:skull(value:10),type=1:bone(value:2)
	type:null,
	ctor:function(type){
		this._super();
		if(type == 0)
			this.initWithFile("images/bone.gif");
		else
			this.initWithFile("images/skull.gif");
		this.type = type;
		}
});