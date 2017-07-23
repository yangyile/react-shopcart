import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import AddToCartStore from '../stores/AddToCartStore';
import AddToCartAction from '../actions/AddToCartAction';

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddToCartStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
    }
    
    componentDidMount() {
        AddToCartStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddToCartStore.unlisten(this.onChange);
    }

    handleCountAdd() {
        var count = this.state.count + 1;
        this.setState({"count" : count});
    }

    handleCountReduce() {
        var count = this.state.count - 1;
        if(count < 1) {
            count = 1;
        }
        this.setState({"count" : count});
    }

    componentDidUpdate() {
        this.props.handleGoodCount(this.state.count);
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        return (
            <div className="addtocart clearfix">
                <div className="good_count">
                    <input type="text" value={this.state.count} />
                    <a href="javascript:void(0)" className="count_add" onClick={this.handleCountAdd.bind(this)}>+</a>
                    <a href="javascript:void(0)" className="count_reduce" onClick={this.handleCountReduce.bind(this)}>-</a>
                </div>
                <a href="javascript:void(0)" className="cart_btn">加入购物车</a>
            </div>
        );
    }
}

export default AddToCart;