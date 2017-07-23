import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import GoodsDeliveryStore from '../stores/GoodsDeliveryStore';
import GoodsDeliveryAction from '../actions/GoodsDeliveryAction';

class GoodsDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = GoodsDeliveryStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount() {
        GoodsDeliveryStore.listen(this.onChange);
        GoodsDeliveryAction.getCities();
        GoodsDeliveryAction.getDistricts();
        this.handleSupplyHover();
    }

    handleSupplyHover() {
        var supplyList = this.refs.supply_list.getDOMNode();
        supplyList.onmouseover = function(e){
            this.setState({"supIsHovered" : true});
        }.bind(this);
        supplyList.onmouseout = function(e){
            this.setState({"supIsHovered" : false});
        }.bind(this);
    }

    handleProvince(provinceName) {
        this.setState({"nowCity" : ""});
        this.setState({"nowCounty" : ""});
        this.setState({"nowProvince" : provinceName});
    }

    handleCity(cityName) {
        this.setState({"nowCounty" : ""});
        this.setState({"nowCity" : cityName});
    }

    handleCounty(countyName) {
        this.setState({"nowCounty" : countyName});
        this.setState({"addIsHovered" : false});
    }

    handleMouseOver() {
        this.setState({"addIsHovered" : true});
    }

    handleMouseOut() {
        this.setState({"addIsHovered" : false});
    }

    handleChoose() {
        this.setState({"bHideChoice" : !this.state.bHideChoice});
    }

    componentWillUnmount() {
        GoodsDeliveryStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        var goodmsg = this.props.goodmsg ? this.props.goodmsg : {};
        var listCla = classnames({"expand_list" : this.state.supIsHovered});
        var listClaParent = classnames({
            "clearfix" : true,
            "supply_list" : true,
            "sup_list_noexpand" : !this.state.supIsHovered,
            "supply_list_expand" : this.state.supIsHovered
        });
        var supplyIcon = classnames({
            "glyphicon" : true,
            "glyphicon-chevron-up" : !this.state.supIsHovered,
            "glyphicon-chevron-down" : this.state.supIsHovered
        });
        var cityCla = classnames({
            "hide" : this.state.nowProvince == "" ? true : false
        });
        var disCla = classnames({
            "hide" : this.state.nowCity == "" ? true : false
        });
        var addTextCla = classnames({
            "add_text" : true,
            "border_text" : this.state.addIsHovered
        });
        var chooseCla = classnames({
            "choose_choice" : true,
            "hide" : !this.state.addIsHovered
        });
        var listIconCla = classnames({
            "list_icon" : true,
            "glyphicon" : true,
            "glyphicon-chevron-up" : !this.state.addIsHovered,
            "glyphicon-chevron-down" : this.state.addIsHovered
        });
        var collapseListCla = classnames({
            "collapse_list" : true,
            "glyphicon" : true,
            "glyphicon-chevron-up" : this.state.bHideChoice,
            "glyphicon-chevron-down" : !this.state.bHideChoice
        });
        var hideTabCla = classnames({
            "hide" : this.state.bHideChoice
        });

        var pro_chioce = this.state.nowProvince ? this.state.nowProvince : "请选择";
        var city_chioce = this.state.nowCity ? this.state.nowCity : "请选择";
        var dis_chioce = this.state.nowCounty ? this.state.nowCounty : "请选择";

        var addText = this.state.nowProvince + this.state.nowCity + this.state.nowCounty;
        addText = addText == "" ? "请选择":addText;
        var proLists = this.state.provinces.map(function(value, index){
            return(
                    <li key={value} className="col-sm-4 col-xs-4"><a href="javascript:void(0)" onClick={this.handleProvince.bind(this, value)}>{value}</a></li>
                );
        }.bind(this));
        var cityLists = this.state.cities.map(function(value, index) {
            if(this.state.nowProvince == value.province_name){
                return(
                    <li key={value.city_name} className="col-sm-4 col-xs-4"><a href="javascript:void(0)" onClick={this.handleCity.bind(this, value.city_name)}>{value.city_name}</a></li>
                ); 
            }
        }.bind(this));
        var countyLists = this.state.counties.map(function(value, index) {
            if((this.state.nowProvince == value.province_name) && (this.state.nowCity == value.city_name)){
                return(
                    <li key={value.county_name} className="col-sm-4 col-xs-4"><a href="javascript:void(0)" onClick={this.handleCounty.bind(this, value.county_name)}>{value.county_name}</a></li>
                );
            }
        }.bind(this));

        return (
            <div className="goods_delivery">
                <div className="clearfix">
                    <div className="ht">配送至</div>
                    <div className="address bt">
                        <div className="address_msg" onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                            <div className={addTextCla}>{addText}<i className={listIconCla}></i>
                            </div>
                            <div className={chooseCla}>
                                <div className="choose_text">请选择地址<i className={collapseListCla} onClick={this.handleChoose.bind(this)}></i></div>
                                <div className={hideTabCla}>
                                    <ul id="myTab" className="nav nav-tabs">
                                        <li className="active" ref="tab_province"><a href="#province" data-toggle="tab">{pro_chioce}</a></li>
                                        <li className={cityCla} ref="tab_city"><a href="#city" data-toggle="tab">{city_chioce}</a></li>
                                        <li className={disCla} ref="tab_county"><a href="#district" data-toggle="tab">{dis_chioce}</a></li>
                                    </ul>
                                    <div id="myTabContent" className="tab-content">
                                        <div className="tab-pane fade in active" id="province">
                                            {proLists}
                                        </div>
                                        <div className="tab-pane fade" id="city">
                                            {cityLists}
                                        </div>
                                        <div className="tab-pane fade" id="district">
                                            {countyLists}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <strong className="goods_stock">有货</strong>
                        <div className="delivery_supply clearfix">
                            <div className={listClaParent}>
                                <i className="floatleft">支持</i>
                                <ul ref="supply_list" className={listCla}>
                                    <li>
                                        <a href="javascript:void(0)">99元免基础运费(20kg内)</a>
                                        <a href="javascript:void(0)">货到付款</a>
                                        <a href="javascript:void(0)">京准达</a>
                                        <a href="javascript:void(0)" className="noborder">211限时达</a>
                                        <i className={supplyIcon}></i>
                                    </li>
                                    <li><a href="javascript:void(0)" className="noborder nofloat">自提</a></li>
                                </ul>
                            </div>
                            <div className="delivery_msg">由<i className="emphasize">京东</i>发货，<i className="emphasize">{goodmsg.storeMsg}</i>提供售后服务。11:10前下单，预计今天(<span className="now_date">{this.state.nowDate}</span>)送达</div>
                        </div>
                    </div>
                </div>
                <div className="clearfix">
                    <div className="ht">重&nbsp;量</div>
                    <div className="bt">6.6kg</div>
                </div>
            </div>
        );
    }
}

export default GoodsDelivery;