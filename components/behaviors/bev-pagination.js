// 提供给 '/components/search/index.js' 使用，加载更多数据，上锁解锁
const paginationBev = Behavior({
    data: {
        searchedArray: [],
        total: 0,  // 预置一个比每次从服务器加载上限大的total，防止第一次检验hasMore时，total为0导致BUG
        noResult: false
    },

    methods: {
        // 拼接，把已有搜索内容与新加载搜素内容拼接在一起
        setMoreData(searchedArray) {
            const tem = this.data.searchedArray.concat(searchedArray); // 拼接，把已有搜索内容与新加载搜素内容拼接在一起
            this.setData({
                searchedArray: tem
            });
        },

        // 获取当前要从服务器加载的数组起点
        getCurrentStart() {
            return this.data.searchedArray.length;
        },

        // 获取服务器可加载数据的总数
        setTotal(total) {
            this.data.total = total;
            if(total == 0) {
                this.setData({
                    noResult: true
                });
            }
        },

        // 检查服务器是否有更多数据还可以加载
        hasMore() {
            if (this.data.searchedArray.length < this.data.total) {
                return true;
            }
            else {
                return false;
            }
        },

        //判断是否已加锁
        isLocked() {
            return this.data.loading ? true : false;
        },
        // 控制开关，加锁/解锁
        lock() {
            this.data.loading = true;
        },
        unlock() {
            this.data.loading = false;
        }
    }
});

export {paginationBev};