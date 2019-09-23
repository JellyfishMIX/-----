import {
    classicBev
} from '../bev-classic.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [classicBev],
    properties: {
        src: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        pauseSrc: 'images/player@pause.png',
        playSrc: 'images/player@play.png'
    },

    attached: function() {
        this._recoverStatus();
        this._monitorSwitch();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPlay: function (event) {
            //播放控制按钮图片切换
            if (!this.data.playing) {
                this.setData({
                    playing: true
                });
                mMgr.src = this.properties.src;
                mMgr.title = 'WeChat Music';
            }
            else {
                this.setData({
                    playing: false
                });
                mMgr.pause();
            }
        },

        _recoverStatus: function() {
            if(mMgr.paused) {
                this.setData({
                    playing: false
                })
                return;
            }
            if(mMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },

        _monitorSwitch: function() {
            mMgr.onPlay(()=> {
                this._recoverStatus();
            });
            mMgr.onPause(() => {
                this._recoverStatus();
            });
            mMgr.onStop(() => {
                this._recoverStatus();
            });
            mMgr.onEnded(() => {
                this._recoverStatus();
            });
        }
    }
})
