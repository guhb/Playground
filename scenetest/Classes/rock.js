var rockSprite = cc.Sprite.extend({
		//ʯͷ��Сȡֵ��ΧΪ0,1,�ֱ����С��
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
		//����ʯͷ��С�õ�ʯͷ�ļ�ֵ�����վ�����Ϸ�ƶ���
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