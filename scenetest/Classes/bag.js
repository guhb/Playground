var goldSprite = cc.Sprite.extend({
		//boolean,��ʾ��ֻ���Ƿ�����ʯ
		//��������ֵΪ2��������ʯ��ֵΪ702
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
		//����0��base֮��������
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