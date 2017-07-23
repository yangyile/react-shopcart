import React from 'react';
import {Link} from 'react-router';
import GoodsDetailStore from '../stores/GoodsDetailStore';
import GoodsDetailAction from '../actions/GoodsDetailAction';
import GoodsDetailNav from '../components/GoodsDetailNav';
import GoodsDetailThumb from '../components/GoodsDetailThumb';
import GoodsDetailMsg from '../components/GoodsDetailMsg';
import GoodsDelivery from '../components/GoodsDelivery';
import GoodsSuits from '../components/GoodsSuits';
import WhiteBar from '../components/WhiteBar';
import AddToCart from '../components/AddToCart';

class GoodsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = GoodsDetailStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.state.goodmsg = {"price" : 0};
    }
    
    componentDidMount() {
        GoodsDetailStore.listen(this.onChange);
        GoodsDetailAction.getGoodDetail();
    }

    componentWillUnmount() {
        GoodsDetailStore.unlisten(this.onChange);
    }

    handleGoodCount(count) {
        if(count != this.state.goodcount) {
            this.setState({"goodcount" : count});
        }
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        return (
            <div className="gooddetail">
                <GoodsDetailNav navname={this.state.goodmsg.goodsStyle} storemsg={this.state.goodmsg.storeMsg} />
                <div className="detail_body">
                    <div className="col-sm-5 col-xs-5">
                        <GoodsDetailThumb goodmsg={this.state.goodmsg} />
                    </div>
                    <div className="col-sm-7 col-xs-7">
                        <GoodsDetailMsg goodmsg={this.state.goodmsg} />
                        <GoodsDelivery goodmsg={this.state.goodmsg} />
                        <hr />
                        <GoodsSuits goodmsg={this.state.goodmsg} />
                        <WhiteBar goodmsg={this.state.goodmsg} goodcount={this.state.goodcount} />
                        <AddToCart goodmsg={this.state.goodmsg} handleGoodCount={this.handleGoodCount.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default GoodsDetail;