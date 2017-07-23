import React from 'react';
import {Link} from 'react-router';
import GoodItemStore from '../stores/GoodItemStore';
import GoodItemAction from '../actions/GoodItemAction';

class GoodItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = GoodItemStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        GoodItemStore.listen(this.onChange);
    }

    componentWillUnmount() {
        GoodItemStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    showTips() {
        this.setState({"tipcla":"tip-show"});
    }

    hideTips() {
        this.setState({"tipcla":"tip-hide"});
    }

    render() {
        const gooditem = this.props.gooditem;
        return (
            <li className="col-xs-6 col-sm-3">
                <Link to="/GoodsDetail" query={{goodsId:gooditem.goodsId}}>
                    <img src={gooditem.imgUrl} ref={gooditem.goodsId} />
                    <div className="goodprice">
                        <strong>
                            <em>￥</em>
                            <i>{gooditem.price}</i>
                        </strong>
                    </div>
                    <div className="goodmsg" title={gooditem.goodMsg}>
                        {gooditem.goodMsg}
                    </div>
                    <div className="goodpromotion" title={gooditem.promotionMsg}>
                        {gooditem.promotionMsg}
                    </div>
                    <div className="evalutecount">
                        <strong>已有<i>{gooditem.evaluteCount}+</i>人评价</strong>
                    </div>
                    <div className="storemsg" title={gooditem.storeMsg}>
                        {gooditem.storeMsg}
                        <em></em>
                    </div>
                    <div className="goodproperty" onMouseEnter={this.showTips.bind(this)} onMouseLeave={this.hideTips.bind(this)}>
                        {gooditem.goodProperty}
                    </div>
                    <div className={"goodtip " + this.state.tipcla}><i>自营</i><span>&nbsp;&nbsp;&nbsp;京东自营，品质保障</span></div>
                </Link>
            </li>
        );
    };
}

export default GoodItem;