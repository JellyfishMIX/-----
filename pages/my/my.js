import {
    BookModel
} from '../../models/book.js'
import {
    ClassicModel
} from '../../models/classic.js'

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAuthorized: false,    // 状态指示灯，显示用户是否已授权
        headUrl: '',
        favoriteBookNum: 0,
        favoriteClassic: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户信息，用来显示头像，昵称
        this._getUserInfo();
        // console.log(this.data.isAuthorized + "  onLoad()");
    },

    // 获取用户”初次授权“
    getAuthorization(event) {
        // 判断用户是否授权，若已经授权，则无需再获取”初次授权“
        if (this.data.isAuthorized) {
            return;
        }
        // 判断用户是否点击授权。若未授权则返回，若点击授权则读取“初次授权”信息
        if (event.detail.errMsg == 'getUserInfo:fail auth deny') {
            return;
        }
        this.setData({
            isAuthorized: true,
            headUrl: event.detail.userInfo.avatarUrl,
            nickName: event.detail.userInfo.nickName
        });
        // console.log(this.data.isAuthorized + "  getAuthorization()");
    },

    // 跳转到“关于我们”
    onJumpToAbout() {
        wx.navigateTo({
            url: '../about/about'
        })
    },

    // 跳转到“点击学习”
    onSeeMore() {
        wx.navigateTo({
            url: '../course/course'
        });
    },

    // 私有方法
    // 获取用户author信息
    _getUserInfo() {
        wx.getUserInfo({
            success: data => {
                // console.log(data);
                this.setData({
                    isAuthorized: true,
                    headUrl: data.userInfo.avatarUrl,
                    nickName: data.userInfo.nickName
                });
                // console.log(this.data.isAuthorized + "  _getUserInfo()");
            }
        });
    },
    // 获取喜欢书籍的数量
    _getFavoriteBookNum() {
        bookModel.getFavoriteBookNum().then(res => {
            this.setData({
                favoriteBookNum: res.count
            });
        });
    },

    // _getUserInfo() {
    //     wx.getSetting({
    //         success: data=> {
    //             if (data.authSetting['scope.userInfo']) {
    //                 wx.getUserInfo({
    //                     success: data=> {
    //                         // console.log(data);
    //                         this.setData({
    //                             isAuthorized: true,
    //                             headUrl: data.userInfo.avatarUrl
    //                         });
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this._getFavoriteBookNum(); // 获取喜欢书籍的数量
        // 获取我喜欢的期刊
        classicModel.getFavoriteClassic(res => {
            // console.log(res);
            this.setData({
                favoriteClassic: res
            });
        });
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})