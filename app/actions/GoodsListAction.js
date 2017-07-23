import alt from '../alt';

class GoodsListAction {
    constructor() {
        this.generateActions(
            'getGoodsListSuccess',
            'getGoodsListFail',
            );
    }
    
    getGoodsList(goodsStyle) {
        $.ajax({ url: '/api/goodslist', data:'test' }).done(data => {
            this.actions.getGoodsListSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getGoodsListFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(GoodsListAction);