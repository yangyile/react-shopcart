import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import GoodsListStore from '../stores/GoodsListStore';
import GoodsListAction from '../actions/GoodsListAction';
import GoodItem from '../components/GoodItem';

class GoodsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = GoodsListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.state.goodslist = [];
    }

    componentDidMount() {
        GoodsListStore.listen(this.onChange);
        GoodsListAction.getGoodsList();
    }

    componentWillUnmount() {
        GoodsListStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        return (
            <ul className="container" ref="goodsCon">
                {this.state.goodslist.map((gooditem, index) => {
                    return <GoodItem gooditem={gooditem} key={gooditem._id} />;
                })}
            </ul>
        );
    }
}

export default GoodsList;