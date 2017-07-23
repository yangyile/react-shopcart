import alt from '../alt';

class GoodsDetailNavAction {
    constructor() {
        this.generateActions(
            'getNavNameCNSuccess',
            'getNavNameCNFail'
            );
    }

    getNavNameCN() {
        $.ajax({ url: '/api/goodsdetailnav', dataType: 'json' }).done(data => {
            this.actions.getNavNameCNSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getNavNameCNFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(GoodsDetailNavAction);