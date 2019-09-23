import {
    BookModel
} from '../../models/book.js'
const bookModel = new BookModel();
import {
    LikeModel
} from '../../models/like.js'
const likeModel = new LikeModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: null,
        comments: [],
        likeStatus: false,
        likeCount: 0,
        posting: false,
        inputValue: '',  // 绑定posting-container__input的value，评论框中输入的内容
        isCommentFilter: false     // 评论过滤器控制开关
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading();
        const bookId = options.bookId;
        const detail = bookModel.getBookDetail(bookId);
        const comments = bookModel.getComments(bookId);
        const likeStatus = bookModel.getLikeStatus(bookId);

        Promise.all([detail, comments, likeStatus]).then(res=> {
            this.setData({
                detail: res[0],
                comments: res[1],
                likeStatus: res[2].like_status,
                likeCount: res[2].fav_nums
            });
            wx.hideLoading();
        });
        
        // detail.then(res=> {
        //     this.setData({
        //         detail: res,
        //     });
        //     // console.log(res);
        // });
        // // console.log(this.data.detail);
        // comments.then(res=> {
        //     this.setData({
        //         comments: res
        //     });
        //     // console.log(this.data.comments);
        // });
        // // console.log(this.data.comments);
        // likeStatus.then(res=> {
        //     this.setData({
        //         likeStatus: res.like_status,
        //         likeCount: res.fav_nums
        //     });
        //     // console.log(res);
        // });
        // // console.log(this.data.likeStatus);
        // // console.log(this.data.likeCount);
    },

    /**
     * 自定义事件,点击“喜欢”触发
     */
    onLike: function (event) {
        let behavior = event.detail.behavior;
        likeModel.like(behavior, this.data.detail.id, 400); //POST like数据
    },

    onFakePost: function (event) {
        this.setData({
            posting: true
        });
    },

    onCancel: function (event) {
        this.setData({
            posting: false
        });
    },

    onPost(event) {
        const comment = event.detail.text || event.detail.value;
        let numIndex = event.detail.numIndex;

        this._commentFilter(comment);   // 评论过滤器,过滤posting-container__input中的非法输入（空，含有空格，字数过长）
        if (this.data.isCommentFilter) {
            this._closeCommentFilter();  // 关闭评论过滤器，等待下次判定

            return;
        }

        bookModel.postComment(this.data.detail.id, comment).then(res => {
            wx.showToast({
                title: '+1',
                icon: 'none'
            });
            
            // 更新点赞统计
            let flag = 0; //if结构else中记录输入评论与已有评论一致时，改变flag
            if (numIndex != undefined) {
                this.data.comments.comments[numIndex].nums += 1;
            }
            else if (numIndex == undefined){
                // 当输入评论与已有评论一致时，在本地更新tag点赞统计
                for(let i = 0; i < this.data.comments.comments.length; i++) {
                    if (comment == this.data.comments.comments[i].content) {
                        numIndex = i;
                        flag = 1;
                        break;
                    }
                }
                if(flag == 1) {
                    this.data.comments.comments[numIndex].nums += 1;
                }
                else {
                    this.data.comments.comments.push({
                        content: comment,
                        nums: 1
                    });
                }
            }
            
            this.setData({
                comments: this.data.comments,
                posting: false
            });
        });
    },

    // 私有方法
    // 评论过滤器
    _commentFilter(comment) {
        let isFullSpaceRegExp = new RegExp(/\s+/, 'g');  // 正则表达式，阻止用户输入一串空格
        let isFullSpace = isFullSpaceRegExp.exec(comment);
        if (!comment) {
            wx.showToast({
                title: '请不要输入非空评论',
                icon: 'none'
            })
            this._openCommentFilter();  // 打开评论过滤器

            return;
        }
        else if (isFullSpace) {
            this.setData({
                inputValue: '',
            });
            wx.showToast({
                title: '请勿输入空格',
                icon: 'none'
            })
            this._openCommentFilter();  // 打开评论过滤器

            return;
        }
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            });
            this._openCommentFilter();  // 打开评论过滤器

            return;
        }
    },
    // 打开/关闭评论过滤器
    _openCommentFilter() {
        this.setData({
            isCommentFilter: true
        });
    },
    _closeCommentFilter() {
        this.setData({
            isCommentFilter: false
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