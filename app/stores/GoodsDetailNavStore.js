import alt from '../alt';
import GoodsDetailNavAction from '../actions/GoodsDetailNavAction';

class GoodsDetailNavStore {
    constructor() {
        this.bindActions(GoodsDetailNavAction);
        this.navname_cn = {};
    }

    onGetNavNameCNSuccess(data) {
        this.navname_cn = data;
    }

    onGetNavNameCNFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(GoodsDetailNavStore);