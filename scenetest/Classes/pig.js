var pigSprite = cc.Sprite.extend({
		//boolean,��ʾ��ֻ���Ƿ�����ʯ,0������1��
		//��������ֵΪ2��������ʯ��ֵΪ702
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
		//����0��base֮��������
		createRandom:function(base){	
			return Math.floor(Math.random()*base);
		},
		//������ĵط�������,�����յ�
		//direction��0���������ң�1����������
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