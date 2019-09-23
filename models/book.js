import {
    HTTP
} from '../util/http-p.js';

class BookModel extends HTTP {
    // 精选书目列表
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        });
    }

    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        });
    }

    // 书籍详情
    getBookDetail(bookId) {
        return this.request({
            url: `book/${bookId}/detail`
        });
    }

    getLikeStatus(bookId) {
        return this.request({
            url: `book/${bookId}/favor`
        });
    }

    // 短评相关
    getComments(bookId) {
        return this.request({
            url: `book/${bookId}/short_comment`
        });
    }

    postComment(bookId, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bookId,
                content: comment
            }
        });
    }

    // 搜索相关
    search(input, start) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                q: input,
                start: start
            }
        });
    }

    // 获取喜欢书籍的数量
    getFavoriteBookNum() {
        return this.request({
            url: '/book/favor/count',
            method: 'GET'
        });
    }
}

export {BookModel};