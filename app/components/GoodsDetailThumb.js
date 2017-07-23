import React from 'react';
import {Link} from 'react-router';

class GoodsDetailThumb extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.thumbGT = null;
        this.magCanvas = null;
    }

    componentDidMount() {
        this.thumbGT = this.refs.thumb_gt.getDOMNode();
        this.magCanvas = this.refs.mag_canvas.getDOMNode();
    }

    handleImage(goodmsg) {
        var thumbGT = this.thumbGT;
        var magCanvas = this.magCanvas;
        var originCtx = thumbGT.getContext("2d");
        var destCtx = magCanvas.getContext("2d");
        var squareX = 0;
        var squareY = 0;

        //draw original image
        var img = new Image();
        img.src = goodmsg.bigUrl;
        img.onload = function(){
            //鼠标移动到图像上时，绘制矩形，并将矩形内的图像放大后放在目标区域
            originCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, thumbGT.width, thumbGT.height);
            thumbGT.onmousemove = function(e){
                //显示放大区
                magCanvas.style.display = "block";
                squareX = e.offsetX * 2 - thumbGT.width/4;
                squareY = e.offsetY * 2 - thumbGT.height/4;

                //擦除画布
                originCtx.clearRect(0, 0, thumbGT.width, thumbGT.height);

                //绘制背景
                originCtx.globalAlpha = "1.0";
                originCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, thumbGT.width, thumbGT.height);

                //绘制矩形选择框
                originCtx.fillStyle = "#bb2";
                originCtx.strokeStyle = "#ccc";
                originCtx.globalAlpha = "0.5";
                if(squareX < 0) {
                    squareX = 0;
                }
                if(squareX > 400) {
                    squareX = 400;
                }
                if(squareY < 0) {
                    squareY = 0;
                }
                if(squareY > 400) {
                    squareY = 400;
                }
                originCtx.fillRect(squareX, squareY, 400, 400);
                originCtx.stroke();

                //绘制放大的图片
                destCtx.drawImage(img, squareX, squareY, 400, 400, 0, 0, magCanvas.width, magCanvas.height);
            };
            thumbGT.onmouseout = function(e) {
                originCtx.clearRect(0, 0, thumbGT.width, thumbGT.height);
                originCtx.globalAlpha = "1.0";
                originCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, thumbGT.width, thumbGT.height);
                magCanvas.style.display = "none";
            };
        };
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        var goodmsg = this.props.goodmsg ? this.props.goodmsg : {};
        if(goodmsg.goodsId) {
            this.handleImage(goodmsg);
        }
        return (
            <div className="goodthumb">
                <canvas width="800" height="800" className="thumb_gt" ref="thumb_gt"></canvas>
                <div className="thumbnav">
                    <a href="javascript:void(0)" className="nav_prev"></a>
                    <img src={goodmsg.thumbUrl} className="thumb_lt" />
                    <a href="javascript:void(0)" className="nav_next"></a>
                </div>
                <div className="thumb_bottom">
                    <a href="javascript:void(0)" className="good_attention"><i></i> 关注 </a>
                    <a href="javascript:void(0)" className="good_share"><i></i> 分享 </a>
                    <a href="javascript:void(0)" className="good_comp"><i></i> 对比 </a>
                    <a href="javascript:void(0)" className="good_report">举报</a>
                </div>
                <canvas className="mag_canvas" width="400" height="400" ref="mag_canvas"></canvas>
            </div>
        );
    }
}

export default GoodsDetailThumb;