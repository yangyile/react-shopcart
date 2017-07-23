import React from 'react';
import {Link} from 'react-router';
import NavBarStore from '../stores/NavBarStore';
import NavBarAction from '../actions/NavBarAction';
import GoodsListAction from '../actions/GoodsListAction';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = NavBarStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        NavBarStore.listen(this.onChange);
        NavBarAction.getNavBars();
    }

    componentWillUnmount() {
        NavBarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleBarClick(item, index) {
        var navParent = $(React.findDOMNode(this.refs["first-level"]));
        var nowNavId = "second-level-" + index;

        navParent.children("li").each(function(liIndex, liItem){
            var secondLevelItem = $(liItem).find("ul")[0];
            var aItem = $(liItem).find("a")[0];
            var iItem = $(aItem).find("i")[1];
            if((secondLevelItem.id != nowNavId) || $(aItem).hasClass("collapsed")){
                $(secondLevelItem).removeClass("in");
                $(iItem).removeClass("glyphicon-menu-down").addClass("glyphicon-menu-right");
            }else{
                $(iItem).removeClass("glyphicon-menu-right").addClass("glyphicon-menu-down");
            }
        });
    }
    
    render() {
        var listItems = this.state.navbars.map((item, index) => {
            var secondLevelItem = item.items.map((oItem, index) => {
                return (
                    <li key={oItem.url}><Link to={oItem.url} query={{ goodsStyle: oItem.goodsStyle }}>{oItem.itemName}</Link></li>
                );
            });
            return (
                <li onClick={this.handleBarClick.bind(this, item, index)} key={item.itemName}>
                    <a href={"#second-level-" + index} className="second-level accordion-toggle" data-toggle="collapse" data-parent="#mycollapse">
                        <i className="glyphicon glyphicon-list"></i> {item.navName}
                        <i className="glyphicon glyphicon-menu-right pull-right"></i>
                    </a>
                    <ul className="nav collapse" id={"second-level-" + index}>
                        {secondLevelItem}
                    </ul>
                </li>
            );
        });

        return (
            <div className="sidebar col-sm-5">
                <div className="navbar navbar-default" id="mycollapse">
                    <ul className="nav nav-pills nav-stacked" ref="first-level">
                        {listItems}
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;