import swig  from 'swig';
import React from 'react';
import Router from 'react-router';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import url from 'url';
import util from 'util';
import {MongoClient} from 'mongodb';
import fs from 'fs';
import routes from './app/routes';
import config from './config';

var app = express();

app.set('port', process.env.PORT || 8888);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.disable("etag");

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

/*根据产品样式获取某个导航下的产品列表*/
var selectData = function(db, collName, goodsStyle, callback){
    var collection = db.collection(collName);
    collection.find({goodsStyle: goodsStyle}).toArray(function(err, result){
        if(err){
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}

/*根据Id查询数据库，获取产品的详细信息*/
var selectGood = function(db, collName, goodsId, callback){
    var collection = db.collection(collName);
    var result = collection.find({goodsId: goodsId}).toArray(function(err, result){
        if(err){
            console.log("Error: " + err);
            return;
        }
        callback(result);
    });
}

//获取中国城市列表
var selectCities = function(db, collName, callback){
    var collection = db.collection(collName);
    var result = collection.find().toArray(function(err, result){
        if(err){
            console.log("Error: " + err);
            return;
        }
        callback(result);
    });
}

/*获取导航列表*/
app.get('/api/navbars', function(req, res, next){
    MongoClient.connect(config.navbar, function(err, db){
        selectData(db, "navbars", null, function(result){
            res.send(result);
            db.close();
        });
    });
});

/*获取产品列表*/
app.get('/api/goodslist', function(req, res, next){
    MongoClient.connect(config.goodmsg, function(err, db){
        var goodsStyle = url.parse(req.headers.referer, true).query.goodsStyle;
        selectData(db, "goodmsgs", goodsStyle, function(result){
            res.send(result);
            db.close();
        });
    });
});

/*获取产品的详细信息*/
app.get('/api/goodsdetail', function(req, res, next){
    MongoClient.connect(config.goodmsg, function(err, db){
        var goodsId = url.parse(req.headers.referer, true).query.goodsId;
        selectGood(db, "goodmsgs", goodsId, function(result){
            res.send(result);
            db.close();
        });
    });
});

/*详情页获取关于产品的导航信息*/
app.get('/api/goodsdetailnav', function(req, res, next){
    var readerStream = fs.createReadStream("./models/nav_cn.json");
    var data = "";

    readerStream.setEncoding("UTF8");
    readerStream.on("data", function(chunk) {
        data += chunk;
    });
    readerStream.on("end", function() {
        res.send(data);
    });
    readerStream.on("error", function(err) {
        console.log(err.stack);
    });
});

//获取中国城市信息
app.get('/api/cities', function(req, res, next){
    MongoClient.connect(config.city, function(err, db){
        selectCities(db, "cities", function(result){
            res.send(result);
            db.close();
        });
    });
});

//获取中国城市的区信息
app.get('/api/districts', function(req, res, next){
    MongoClient.connect(config.district, function(err, db){
        selectCities(db, "districts", function(result){
            res.send(result);
            db.close();
        });
    });
});

app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});