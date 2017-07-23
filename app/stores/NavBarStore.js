import alt from '../alt';
import NavBarAction from '../actions/NavBarAction';

class NavBarStore {
    constructor() {
        this.bindActions(NavBarAction);
        this.navbars = [];
    }

    onGetNavBarsSuccess(data) {
        this.navbars = data;
    }

    onGetNavBarsFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(NavBarStore);