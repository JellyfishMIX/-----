import {
    BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
import {
    random
} from '../../util/random.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        searching: false,
        more: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        bookModel.getHotList().then(res=> {
            this.setData ({
                books: res
            });
            // console.log(this.data.books);
        });
    },

    // 点击搜索框
    onSearch() {
        this.setData({
            searching: true
        });
    },

    // 点击searching搜索框中的“取消”
    onCancel() {
        this.setData({
            searching: false
        });
    },

    /**
     * 页面上拉触底事件的处理函数，加载更多书目
     */
    onReachBottom: function () {
        this.setData({
            more: random(16)    // 生成一个指定位数n的随机字符串，以确保每次赋值给子组件more属性不同值。子组件more属性被改变，observer触发，调用私有函数，执行下滑触底加载功能
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})