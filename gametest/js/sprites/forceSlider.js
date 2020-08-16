define(['cocos'], function (cc) {
    return cc.ControlSlider.extend({
        ctor: function () {
            this._super('res/slider-background.png', 'res/slider-progress.png', 'res/slider-thumb.png');
            this.setMinimumValue(10);
            this.setMaximumValue(100);
            this.setValue(100);
            this.isAllowTouch = true;
        },

        setAllowTouch: function (a) {
            this.isAllowTouch = a;
        },

        isTouchInside: function (touch) {
            if (this.isAllowTouch) {
                return this._super(touch);
            } else {
                return false;
            }
        }
    });
});
