import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import GoodsSuitsStore from '../stores/GoodsSuitsStore';
import GoodsSuitsAction from '../actions/GoodsSuitsAction';

class GoodsSuits extends React.Component {
    constructor(props) {
        super(props);
        this.state = GoodsSuitsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
    }
    
    componentDidMount() {
        GoodsSuitsStore.listen(this.onChange);
        var suitBtn = this.refs.suitbtn.getDOMNode();
        suitBtn.onclick = function(e) {
            this.handleSuitClick();
        }.bind(this);
        suitBtn.onmouseover = function(e){
            this.setState({"isHovered" : true});
        }.bind(this);
        suitBtn.onmouseout = function(e){
            this.setState({"isHovered" : false});
        }.bind(this);
    }

    componentWillUnmount() {
        GoodsSuitsStore.unlisten(this.onChange);
    }

    handleSuitClick() {
        this.setState({"isOpened" : !this.state.isOpened});
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        var suitPanel = classnames({
            "suit_panel" : true,
            "disnone" : !this.state.isOpened
        });
        var suitBtn = classnames({
            "open" : this.state.isOpened,
            "hover" : this.state.isHovered && !this.state.isOpened
        });
        return (
            <div className="goods_suit clearfix">
                <div className="ht">套&nbsp;装</div>
                <div className="suits">
                    <div className="suit_item">
                        <a href="javascript:void(0)" className={suitBtn} ref="suitbtn">优惠套装</a>
                        <div className={suitPanel}>
                            <div className="text">套装价：<span className="suit_price"><strong>￥ ###.##</strong></span></div>
                            <a href="javascript:void(0)" className="btns">购买套装</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GoodsSuits;