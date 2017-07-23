import alt from '../alt';
import AddToCartAction from '../actions/AddToCartAction';

class AddToCartStore {
    constructor() {
        this.bindActions(AddToCartAction);
        this.count = 1;
    }
}

export default alt.createStore(AddToCartStore);