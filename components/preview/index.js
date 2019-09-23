// components/preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classicData: {
            type: Object,
            value: null
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
        // 跳转到对应喜欢的期刊界面
        onPreview() {
            wx.navigateTo({
                url: `../classic-my/classic?type=${this.properties.classicData.type}&index=${this.properties.classicData.id}`,
            });
        },
    },
})
