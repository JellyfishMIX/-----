import {
    HTTP
} from '../util/http.js';

class ClassicModel extends HTTP {
    // 获取最新一期
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res)=> {
                //console.log(res);
                sCallback(res);
                this._setLatestIndex(res.index);    //保存最后一期期刊index进缓存
                let key = this._getKey(res.index);
                wx.setStorageSync(key, res);
            }
        });
    }
    // 获取上一期/下一期详细信息
    getClassic(index, nextOrPrevious, sCallback) {
        // 缓存中寻找 or 调用API从服务器中加载，并写入到缓存中
        // key 确定key
        let key = nextOrPrevious=='next'?this._getKey(index+1):this._getKey(index-1);
        let classic = wx.getStorageSync(key);
        if(!classic) {
            this.request({
                //url: 'classic/' + index + '/' + nextOrPrevious,
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallback(res);
                }
            });
        }
        else {
            sCallback(classic);
        }
    }
    // 获取某一期详细信息
    getMyClassic(type, index, sCallback) {
        let key = this._getKey(index);
        let classic = wx.getStorageSync(key);
        if(!classic) {
            console.log('classic is null');
            this.request({
                url: `classic/${type}/${index}`,
                method: 'GET',
                success: res=> {
                    sCallback(res);
                }
            });
        }
        else {
            sCallback(classic);
        }
    }
    // 判断是否是第一期
    isFirst(index) {
        return index==1?true:false;
    }
    // 判断是否是最后一期
    isLatest(index) {
        let latestIndex = this._getLatestIndex();
        return latestIndex==index?true:false;
    }
    // 获取我喜欢的期刊
    getFavoriteClassic(sCallback) {
        this.request({
            url: '/classic/favor',
            method: 'GET',
            success: res=> {
                sCallback(res);
            }
        });
    }

    // 私有方法
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }

    _getLatestIndex() {
        let index = wx.getStorageSync('latest');
        return index;
    }

    _getKey(index) {
        //let key = 'classic-' + index;
        let key = `classic-${index}`;
        return key;
    }
}

export {ClassicModel};