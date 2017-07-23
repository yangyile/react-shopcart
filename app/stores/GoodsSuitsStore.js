import alt from '../alt';
import GoodsSuitsAction from '../actions/GoodsSuitsAction';

class GoodsSuitsStore {
    constructor() {
        this.bindActions(GoodsSuitsAction);
        this.isOpened = false;
        this.isHovered = false;
    }
}

export default alt.createStore(GoodsSuitsStore);