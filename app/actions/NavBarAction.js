import alt from '../alt';

class NavBarAction {
    constructor() {
        this.generateActions(
            'getNavBarsSuccess',
            'getNavBarsFail'
            );
    }

    getNavBars() {
        $.ajax({ url: '/api/navbars' }).done(data => {
            this.actions.getNavBarsSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getNavBarsFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(NavBarAction);