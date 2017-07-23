import alt from '../alt';
import WhiteBarAction from '../actions/WhiteBarAction';

class WhiteBarStore {
    constructor() {
        this.bindActions(WhiteBarAction);
        this.bIOU = false;
    }
}

export default alt.createStore(WhiteBarStore);