define(
    [
        'cocos'
    ],
    function (cc) {

        return cc.Layer.extend({
            ctor:function () {
                this._super();
                this.titleImage = new cc.Sprite('res/title.png');
                this.titleImage.setPosition(cc.visibleRect.width / 2, cc.visibleRect.height * 0.75);
                this.addChild(this.titleImage);
            }
        });
    }
);
