import alt from '../alt';

class GoodsDeliveryAction {
    constructor() {
        this.generateActions(
            'getCitiesSuccess',
            'getCitiesFail',
            'getDistrictsSuccess',
            'getDistrictsFail'
            );
    }

    getCities() {
        $.ajax({ url: '/api/cities' }).done(data => {
            this.actions.getCitiesSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getCitiesFail(jqXhr.responseJSON.message);
        });
    }

    getDistricts() {
        $.ajax({ url: '/api/districts' }).done(data => {
            this.actions.getDistrictsSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getDistrictsFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(GoodsDeliveryAction);