import React from 'react';
import {Link} from 'react-router';
import GoodsDetailNavStore from '../stores/GoodsDetailNavStore';
import GoodsDetailNavAction from '../actions/GoodsDetailNavAction';

class GoodsDetailNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = GoodsDetailNavStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.state.navname_cn = {};
    }

    componentDidMount() {
        GoodsDetailNavStore.listen(this.onChange);
        GoodsDetailNavAction.getNavNameCN();
    }

    componentWillUnmount() {
        GoodsDetailNavStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        var navName_CN = "";
        var navBarArr = [];
        var navBar = "";
        if(this.props.navname) {
            navName_CN = this.state.navname_cn[this.props.navname];
            navBarArr = navName_CN.split("#");
            navBar = navBarArr.map(function(value, index){
                if(navBarArr.length - 1 == index) {
                    return value;
                }else{
                    return value + " > ";
                }
            });
        }
        return (
            <header>
                <div className="detail_header">
                    <div className="detail_navs col-xs-6 col-sm-6">
                        <span>{navBar}</span>
                    </div>
                    <div className="detail_msg col-xs-6 col-sm-6">
                        <span className="detail_storemsg" title={this.props.storemsg}>
                            {this.props.storemsg}
                            <span className="detail_jd"><i>JD</i> 自营 </span>
                        </span>
                        <span className="detail_contact" title="联系供应商">联系供应商</span>
                        <span className="detail_jimi"><i></i>JIMI</span>
                        <span className="detail_attention"><i></i>关注店铺</span>
                    </div>
                </div>
            </header>
        );
    }
}

export default GoodsDetailNav;