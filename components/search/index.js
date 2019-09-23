import {
    KeywordModel
} from '../../models/keyword.js';
const keywordModel = new KeywordModel();
import {
    BookModel
} from '../../models/book.js';
const bookModel = new BookModel();
// 导入Behavior，功能：加载更多数据，加锁/解锁
import {
    paginationBev
} from '../behaviors/bev-pagination.js';

Component({
    // 导入Behavior，功能：加载更多数据，加锁/解锁
    behaviors: [paginationBev],
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,   // wx:if，控制search组件渲染/销毁
        inputValue: '', // input输入的内容，或者在“历史搜索/热门搜索”中点击的标签的内容
        loading: false, // 控制下滑加载更多时request锁
        loaderCenter: false,   // 控制开关，css加载特效cmp-loader（页面居中）
        loaderBottom: false // 控制开关，打开/关闭css加载特效cmp-loader（下滑加载）
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 搜索框敲击回车后/点击“历史搜索/热门搜索”标签后，触发搜索界面
        onConfirm(event) {
            this._showLoaderCenter(); // 打开css加载特效cmp-loader（页面居中）
            const input = event.detail.value || event.detail.text;
            this._showSearched(input);  // 打开搜索界面
            keywordModel.addToHistory(input);
            bookModel.search(input, 0).then(res => {
                this.setTotal(res.total);   // 获取服务器可加载数据的总数
                this._hideLoaderCenter();    // 关闭css加载特效cmp-loader（页面居中）
                this.setData({
                    searchedArray: res.books,
                });
            });
        },
        // 点击x后返回历史搜索/热门搜索界面
        onClear(event) {
            this._getHistory(); // 获取搜索历史
            this._initialize(); // 初始化this.data中与搜索有关的部分数据
            this._hideSearched();   // 关闭搜索界面
            wx.hideToast();   // 若点击x时，正好提示“没有更多书目了”，则关闭“没有更多书目了”Toast
        },
        // 点击取消后触发，回到图书精选界面
        onCancel(event) {
            this.triggerEvent('cancel', {}, {});    // 触发自定事件，销毁cmp-search，渲染book中的图书列表界面
            wx.hideToast();   // // 若点击取消时，正好提示“没有更多书目了”，则关闭“没有更多书目了”Toast
            // search组件存在于book页面中，与“精选”共用一个Pages滚动条。点击取消时，确保回到精选界面的开头
            wx.pageScrollTo({
                scrollTop: 0,
            });
        },
        // 下滑到底端时加载更多书目
        loadMore() {
            // 判断是否已经加锁，防止服务器返回数据前反复被触发
            if (this.isLocked()) {
                return;
            }
            // 如果inputValue为null，那么跳出_loadMore()，避免bookModel.search()出现request传入参数错误。避免没有input，无法发送request，加锁后无法解锁
            if(this._isNull()) {
                return;
            }
            // 判断服务器是否还有更多数据未加载，如果已全部加载，则提醒用户
            if (!this.hasMore()) {
                wx.showToast({
                    title: '没有更多书目了',
                    icon: 'none'
                });
                return;
            }
            // console.log("loadmore()，该位置便于测试上面if语句，请勿删除");
            this._showLoaderBottom();
            this.lock();    // 开始加载，加锁
            bookModel.search(this.data.inputValue, this.getCurrentStart())
            .then(res=> {
                this.setMoreData(res.books);
                this.unlock();  // 服务器返回数据，加载完毕，解锁
                this._hideLoaderBottom();
            },()=> {
                this.unlock(); // 偶然断网情况下，request失败，此时也要解锁。防止死锁（重新来网时，再次loadmore本来应该request，但锁是锁住的）
            });
        },

        //私有方法
        // 控制开关，打开/关闭搜索界面
        _showSearched(input) {
            this.setData({
                searching: true,
                inputValue: input
            });
        },
        _hideSearched() {
            this.setData({
                searching: false,
            });
        },
        // 初始化this.data中与搜索有关的部分数据
        _initialize() {
            this.setData({
                inputValue: '',
                searchedArray: [],
                noResult: false
            });
        },
        // 判断inputValue为null
        _isNull() {
            return !(this.data.inputValue ? true : false);
        },
        // 控制开关，打开/关闭css加载特效cmp-loader（页面居中）
        _showLoaderCenter() {
            this.setData({
                loaderCenter: true
            });
        },
        _hideLoaderCenter() {
            this.setData({
                loaderCenter: false
            });
        },
        // 控制开关，打开/关闭css加载特效cmp-loader（下滑加载）
        _showLoaderBottom() {
            this.setData({
                loaderBottom: true
            });
        },
        _hideLoaderBottom() {
            this.setData({
                loaderBottom: false
            });
        },
        // 加载历史搜索
        _getHistory() {
            this.setData({
                historyWords: keywordModel.getHistory()
            });
        }
    },

    attached() {
        // 加载历史搜索与热门搜索tag
        this._getHistory(); // 获取搜索历史
        keywordModel.getHot().then(res=> {
            this.setData({
                hotWords: res.hot
            });
        });
    }
})
