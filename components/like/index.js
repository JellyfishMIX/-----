Component({
    /**
     * 组件的属性列表
     */
    properties: {
        likeStatus: {
            type: Boolean
        },
        count: {
            type: Number
        },
        readOnly: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike:function(event) {
            if(this.properties.readOnly) {
                return;
            }
            let like = this.properties.likeStatus;
            let count = this.properties.count;

            count = like?count-1:count+1;
            this.setData({
                count: count,
                likeStatus: !like
            });
            //自定义事件，激活
            let behavior = this.properties.likeStatus?'like':'cancel';
            this.triggerEvent('like',{
                behavior: behavior
            },{});
        }
    }
})
