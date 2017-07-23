import alt from '../alt';
import GoodsDetailAction from '../actions/GoodsDetailAction';

class GoodsDetailStore {
    constructor() {
        this.bindActions(GoodsDetailAction);
        this.goodmsg = {"price" : 0};
        this.goodcount = 1;
    }

    onGetGoodsDetailSuccess(data) {
        this.goodmsg = data[0];
    }

    onGetGoodsDetailFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(GoodsDetailStore);