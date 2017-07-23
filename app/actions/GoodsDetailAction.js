import alt from '../alt';

class GoodsDetailAction {
    constructor() {
        this.generateActions(
            'getGoodsDetailSuccess',
            'getGoodsDetailFail'
            );
    }

    getGoodDetail() {
        $.ajax({ url: '/api/goodsdetail' }).done(data => {
            this.actions.getGoodsDetailSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getGoodsDetailFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(GoodsDetailAction);