// components/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: String,
        numIndex: Number
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
            this.triggerEvent('tapping', {
                text: this.properties.text,
                numIndex:  this.properties.numIndex
            });
        }
    },

    /**
     * 启用slot
     */
    options: {
        multipleSlots: true
    },

    /**
     * 接收外部样式
     */
    externalClasses: ['ext-container-class']
    
})
