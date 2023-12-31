const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,


        //background: cc.Node,
        _speed: 80,
        isMoving: true
    },

    onLoad() {

    },

    start(){
        this.attackSound = this.node.getComponent(cc.AudioSource);
        Emitter.instance.registerEvent('CORRECT', this.onShoot.bind(this));
        Emitter.instance.registerEvent('Login', this.portal.bind(this));
        //Emitter.instance.registerEvent("INCORRECT", this.hurt.bind(this));
    },

    // moveBackground() {
    //     this.background.width = 100000;
    //     const moveDuration = this.background.width / this._speed;

    //     cc.tween(this.background)
    //         .to(moveDuration, { x: -this.background.width })
    //         // .to(moveDuration, { x: -40000 })
    //         .call(() => {
    //             if (this.isMoving == true) this.moveBackground();
    //         })
    //         .start();
    // },

    onShoot() {
        this.spineBoy.setAnimation(2, 'shoot', false);
        this.attackSound.play();
    },

    hurt(){
        this.spineBoy.setAnimation(0, 'idle', false);
    },

    portal(){
        this.spineBoy.setAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(() => {
            this.spineBoy.addAnimation(1, 'hoverboard', true);
            Emitter.instance.emit('prepare');
        });
    }
});
