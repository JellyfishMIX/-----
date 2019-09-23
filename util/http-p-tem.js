import {
    config
} from '../config.js';

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效，请前往www.7yue.pro申请',
    3000: '期刊不存在'
}

class HTTP {
    request() {
        return new Promise((resolve, reject)=> {
            this._request(url, resolve, reject, data, method);
        });
    }

    _request(url, resolve, reject, data={}, method='GET') {
        //url,data,method 
        wx.request({
            url: config.api_base_url + url,
            data: data,
            method: method,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString();
                if (code.startsWith('2')) {
                    resolve(res.data);
                }
                else {
                    reject();
                    let error_code = res.data.error_code;
                    this._showError(error_code);
                }
            },
            fail: (err) => {
                reject();
                this._showError(1);
            }
        });
    }

    //request私有方法_showError
    _showError(error_code) {
        if (!error_code) {
            error_code = 1;
        }
        const tip = tips[error_code];
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export { HTTP };