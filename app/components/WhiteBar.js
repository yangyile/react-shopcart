import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import WhiteBarStore from '../stores/WhiteBarStore';
import WhiteBarAction from '../actions/WhiteBarAction';

class WhiteBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = WhiteBarStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
    }
    
    componentDidMount() {
        WhiteBarStore.listen(this.onChange);
        var itemLists = this.refs.itemlists.getDOMNode();
        var bIOU = false;

        $(itemLists).find(".item").hover(function(e) {
            $(this).find("a").toggleClass("hover");
            $(this).find("div").toggleClass("hide");
        });
        $(itemLists).find("a").click(function(e) {
            $(itemLists).find("a").removeClass("clicked");
            $(e.currentTarget).toggleClass("clicked");
            if((e.currentTarget.id != 0) && $(e.currentTarget).hasClass("clicked")) {
                this.setState({"bIOU" : true});
            }else{
                this.setState({"bIOU" : false});
            }
        }.bind(this));
    }

    componentWillUnmount() {
        WhiteBarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        var goodMsg = this.props.goodmsg;
        var goodCount = this.props.goodcount;
        return (
            <div className="whitebar_list clearfix">
                <div className="ht">白条分期</div>
                <div className="item_lists" ref="itemlists">
                    <div className="item">
                        <a href="javascript:void(0)" id="0">不分期</a>
                        <div className="whitebar_tip hide">无手续费</div>
                    </div>
                    <div className="item">
                        <a href="javascript:void(0)" id="3">￥<span className="price">{((parseFloat(goodMsg.price/3) + 1.2)*goodCount).toFixed(2)}</span>x3期</a>
                        <div className="whitebar_tip hide">含手续费：费率0.5%，￥1.2x3期</div>
                    </div>
                    <div className="item">
                        <a href="javascript:void(0)" id="6">￥<span className="price">{((parseFloat(goodMsg.price/6) + 1.2)*goodCount).toFixed(2)}</span>x6期</a>
                        <div className="whitebar_tip hide">含手续费：费率0.5%，￥1.2x6期</div>
                    </div>
                    <div className="item">
                        <a href="javascript:void(0)" id="12">￥<span className="price">{((parseFloat(goodMsg.price/12) + 1.2)*goodCount).toFixed(2)}</span>x12期</a>
                        <div className="whitebar_tip hide">含手续费：费率0.5%，￥1.2x12期</div>
                    </div>
                    <div className="item">
                        <a href="javascript:void(0)" id="24">￥<span className="price">{((parseFloat(goodMsg.price/24) + 1.2)*goodCount).toFixed(2)}</span>x24期</a>
                        <div className="whitebar_tip hide">含手续费：费率0.5%，￥1.2x24期</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhiteBar;