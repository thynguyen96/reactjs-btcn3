import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gallery from 'react-grid-gallery'
import InfiniteScroll from 'react-infinite-scroller';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//import './index.css';

var flickr = {
    api_key: "0e7ed22067a7a4464503bb479d830527",
    user_id: "c97f1605d22916fc",
};

export default class MyGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            photo:[],
            hasMoreItems: true,
        }
    }

    loadData = (page) => {
        var _this = this;
        const getPhoto = (item) => {
            return axios({
                method:'get',
                url:'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key='+flickr.api_key+'&photo_id=' + item.id + '&format=json&nojsoncallback=1',
                //responseType:'json'
            }).then((result) => {
                return Promise.resolve(result.data.photo)
            }).catch((_) => {
                return Promise.resolve({})
            })
        }
        axios({
            method:'get',
            url:`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=`
            +flickr.api_key+'&format=json&nojsoncallback=1&per_page=20&page=0',
            params: {
                page: page
            },
            responseType:'json'
        }).then((result) => {
            console.log(result);
            _this.setState({
                items: [..._this.state.items,...result.data.photos.photo],
            })
            var photoInfo = result.data.photos.photo;
            return Promise.all(photoInfo.map((item) => getPhoto(item)))
                .then((photoDetail) => {
                console.log(photoDetail);
                _this.setState({
                    photo: [..._this.state.photo,...photoDetail],
            })
            })
            
            
        })
    };



    createImgURL(item) {
        return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'
    }

    manageMyGallery(items) {
        var Images= [];

        for (var i in items) {

            var item = items[i];

            Images.push({
                "src": this.createImgURL(item),
                "thumbnail": this.createImgURL(item),
                thumbnailWidth: 800,
                thumbnailHeight: 450,
                caption: item.title,
                /*src: this.createImgURL(item),
                thumbnail: this.createImgURL(item),
                thumbnailWidth: 400,
                thumbnailHeight: 260,
                title: item.title._content,
                author: item.owner.realname,
                views: item.views,*/
            });
        }
        //console.log(Images);
        return Images;
    }

    render() {

        const loader = <div className="loader">Loading ...</div>;

        const images =
            this.manageMyGallery(this.state.items).map((i) => {
                i.customOverlay = (
                    <div style={captionStyle}>
                        <div>{i.caption}</div>
                    </div>);
                return i;
            });

        return (
            <div className="wraper">
                <div style={{fontSize:"30px",margin:"0px 0px 5px 0px"}}>
                    Explore
                </div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadData}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}
                >
                    <div style={{
                        display: "block",
                        minHeight: "1px",
                        width: "100%",
                        border: "1px solid #ddd",
                        overflow: "auto"
                    }}>
                        <Gallery
                            images={images}
                            enableImageSelection={false}/>
                    </div>
                </InfiniteScroll>
            </div>
            
        )
    }
}

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};