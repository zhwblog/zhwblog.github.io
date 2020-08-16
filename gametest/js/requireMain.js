require.config({
    baseUrl: 'js',
    paths: {
        cocos: '../lib/cocos2d-js-v3.13-custom',
        chipmunk: '../lib/chipmunk'
    },
    shim: {
        cocos: {
            exports: 'cc'
        },
        chipmunk: {
            exports: 'cp'
        }
    }
});

require(['cocos', 'chipmunk', 'cocosMain']);
