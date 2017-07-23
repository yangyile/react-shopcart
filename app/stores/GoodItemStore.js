import alt from '../alt';
import GoodItemAction from '../actions/GoodItemAction';

class GoodItemStore {
    constructor() {
        this.bindActions(GoodItemAction);
        this.tipcla = "tip-hide";
    }
}

export default alt.createStore(GoodItemStore);