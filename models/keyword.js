import {
    HTTP
} from '../util/http-p.js';

class KeywordModel extends HTTP{
    key = 'q';
    maxLength = 10;
    getHistory() {
        const words = wx.getStorageSync(this.key);
        if(!words) {
            return [];
        }
        return words;
    }

    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        });
    }

    addToHistory(keyword) {
        let words = this.getHistory();
        const has = words.includes(keyword);
        if(!has) {
            // 满10个，删除数组末尾，keyword放入数组首位
            if(words.length >= this.maxLength) {
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words);
        }
    }
}

export {KeywordModel};