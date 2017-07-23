import alt from '../alt';
import GoodsDeliveryAction from '../actions/GoodsDeliveryAction';

class GoodsDeliveryStore {
    constructor() {
        this.bindActions(GoodsDeliveryAction);
        this.provinces = [];
        this.cities = [];
        this.counties = [];
        this.nowProvince = "";
        this.nowCity = "";
        this.nowCounty = "";
        this.addIsHovered = false;
        this.bHideChoice = false;
        this.nowDate = this.getNowDate();
        this.supIsHovered = false;
    }

    getNowDate() {
        var nowDate = new Date();
        var dateStr = (nowDate.getMonth() + 1) + "月" + nowDate.getDate() + "日";
        return dateStr;
    }

    onGetCitiesSuccess(data) {
        var provinceName = "";
        var arrProvince = [];

        var provinces = data.map(function(value, index){
            provinceName = value.province_name;
            this.cities.push(value);
            if($.inArray(provinceName, arrProvince) < 0) {
                arrProvince.push(provinceName);
            }
        }.bind(this));
        this.provinces = arrProvince;
    }

    onGetCitiesFail(errorMessage) {
        toastr.error(errorMessage);
    }

    onGetDistrictsSuccess(data) {
        data.map(function(value, index){
            this.counties.push(value);
        }.bind(this));
        console.log("success");
    }

    onGetDistrictsFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(GoodsDeliveryStore);