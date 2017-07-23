import alt from '../alt';
import GoodsListAction from '../actions/GoodsListAction';

class GoodsListStore {
    constructor() {
        this.bindActions(GoodsListAction);
        this.goodslist = [];
    }

    onGetGoodsListSuccess(data) {
        this.goodslist = data;
    }

    onGetGoodsListFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(GoodsListStore);