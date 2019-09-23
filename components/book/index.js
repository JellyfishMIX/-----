    // components/book/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: Object,
        isLikeShowed: { // 绑定wx:if，控制是否显示右下角“xx 喜欢”
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            const bookId = this.properties.book.id;
            wx.navigateTo({
                url: `../../pages/book-detail/book-detail?bookId=${bookId}` //跳转至book-detail页面，同时传入参数bookId
            });
        }
    }
})
