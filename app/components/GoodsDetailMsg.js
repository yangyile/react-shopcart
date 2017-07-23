import React from 'react';
import {Link} from 'react-router';

class GoodsDetailMsg extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        var goodmsg = this.props.goodmsg ? this.props.goodmsg : {};
        return (
            <div className="goods_msg">
                <div className="goods_name">{goodmsg.goodMsg}</div>
                <div className="goods_promotion">{goodmsg.promotionMsg}</div>
                <div className="goods_price">
                    <div className="jd_price clearfix">
                        <div className="ht">京东价</div>
                        <div className="price"><i>￥</i>{goodmsg.price}</div>
                        <a href="javascript:void(0)" className="reduce_notice">降价通知</a>
                        <div className="good_evalute">
                            <div className="comment">累计评价</div>
                            <div className="count">{goodmsg.evaluteCount}+</div>
                        </div>
                    </div>
                    <div className="pro_price clearfix">
                        <div className="ht">促&nbsp;销</div>
                        <div className="pro_limit"><i>限制</i> 此价格不与套装优惠同时享受</div>
                    </div>
                </div>
            </div>
        );
    };
}

export default GoodsDetailMsg;