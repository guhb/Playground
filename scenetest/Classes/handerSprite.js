var handerSprite = cc.Sprite.extend({
    _currentRotation:0,
    isRotate: true,
    state: "swing",
    speed: 5,
    rotateSpeed: 1,
    throwSpeed: 2,
    retrieveSpeed: 1,
    argX: 0,
    argY: 0,
    swingAction: null,
    throwAction: null,
    retrieveAction: null,
    originPosition: null,
    dstPosition: null,
    ctor:function(){
        this._super();
        this.initWithFile("images/gouzi.png");
        this.setScale(0.3);
        this.setScaleX(0.1);
        
        // Swing Action
        var rotation1 = cc.RotateTo.create(1, 80);
        var rotation2 = cc.RotateTo.create(1, -80);
        var seq = cc.Sequence.create(rotation1, cc.DelayTime.create(0.1), rotation2, cc.DelayTime.create(0.1));
        this.swingAction = cc.RepeatForever.create(seq, null);
        
        //
            this.originPosition = this.getPosition();
        
        this.swing();
    },
    swing: function () {
        this.state = "swing";
        this.setRotation(0);
        this.runAction(this.swingAction);
            //this.setAnchorPoint(cc.ccp(0.5, 2));
    },
    stopSwing: function () {
        this.stopAction(this.swingAction);
    },
    throwHander: function () {
        this.state = "throw";
        //this.setAnchorPoint(cc.ccp(0.5, 1));
        this.throwAction = cc.MoveTo.create(this.throwSpeed,new cc.ccp(this.argX, this.argY));
        //this.throwAction = cc.MoveTo.create(this.speed, this.dstPosition);
        this.runAction(this.throwAction);
    },
    stopThrow: function () {
        console.log(this.throwAction);
        this.stopAction(this.throwAction);
    },
    retrieveHander: function () {
        if (this.state == "throw") {
        this.state = "retrieve";
        this.stopAction(this.throwAction);
        console.log("retrieve");
        this.retrieveAction = cc.MoveTo.create(this.retrieveSpeed, this.originPosition);
        this.runAction(this.retrieveAction);
        }
    },
    update:function(){
        if (this.throwAction && this.throwAction.isDone()
            && this.state == "throw") {
            //console.log(this.throwAction);
             this.retrieveHander();
        } else if (this.retrieveAction && this.retrieveAction.isDone()
                   && this.state == "retrieve") {
            this.state = "swing";
            this.swing();
        }
    }

});
