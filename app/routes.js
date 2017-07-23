import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import NavBar from './components/NavBar';
import GoodsList from './components/GoodsList';
import GoodsDetail from './components/GoodsDetail';
import GoodsDetailNav from './components/GoodsDetailNav';
import GoodsDetailMsg from './components/GoodsDetailMsg';

export default (
    <Route handler={App}>
        <Route path="/" handler={NavBar} />
        <Route path="/GoodsList/EleApp/Fan" handler={GoodsList} />
        <Route path="/GoodsList/EleApp/AirCon" handler={GoodsList} />
        <Route path="/GoodsList/EleApp/CoodFan" handler={GoodsList} />
        <Route path="/GoodsList/Computer/AllInOne" handler={GoodsList} />
        <Route path="/GoodsList/Computer/GameMachine" handler={GoodsList} />
        <Route path="/GoodsList/Computer/NoteBook" handler={GoodsList} />
        <Route path="/GoodsList/HomeFurnish/Blanket" handler={GoodsList} />
        <Route path="/GoodsList/HomeFurnish/Quilt" handler={GoodsList} />
        <Route path="/GoodsList/HomeFurnish/SleepMat" handler={GoodsList} />
        <Route path="/GoodsList/ManCloth/NowHot" handler={GoodsList} />
        <Route path="/GoodsList/ManCloth/ShopSame" handler={GoodsList} />
        <Route path="/GoodsList/ManCloth/TShirt" handler={GoodsList} />
        <Route path="/GoodsList/Phone/ChinaTele" handler={GoodsList} />
        <Route path="/GoodsList/Phone/ChinaUni" handler={GoodsList} />
        <Route path="/GoodsList/Phone/Phone" handler={GoodsList} />
        <Route path="/GoodsList/Sport/DumbBell" handler={GoodsList} />
        <Route path="/GoodsList/Sport/RunMachine" handler={GoodsList} />
        <Route path="/GoodsList/Sport/Treadmill" handler={GoodsList} />
        <Route path="/GoodsDetail" handler={GoodsDetail} />
    </Route>
    );