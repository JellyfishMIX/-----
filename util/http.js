import {
    config
} from '../config.js';

const tips = {
    1:'抱歉，出现了一个错误',
    1005:'appkey无效，请前往www.7yue.pro申请',
    3000:'期刊不存在'
}

class HTTP {
    request(params) {
        //url,data,method 
        if(!params.method) {
            params.method = "GET";
        }   
        wx.request({
            url: config.api_base_url+params.url,
            data: params.data,
            method: params.method,
            header: {
                'content-type':'application/json',
                'appkey':config.appkey
            },
            success:(res)=> {
                let code = res.statusCode.toString();
                if(code.startsWith('2')) {
                    params.success && params.success(res.data);
                }
                else {
                    let error_code = res.data.error_code;
                    this._showError(error_code);
                }
            },
            fail: (err) => {
                this._showError(1);
            }
        });
    }

    //request私有方法_showError
    _showError(error_code) {
        if(!error_code) {
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

export {HTTP};