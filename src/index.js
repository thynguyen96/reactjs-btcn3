import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MyGallery from './Components/explore'

import './index.css';


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <header>
                        <MyHeader />
                    </header>
                    <SubMenu />
                    <hr />
                    <div className="container">
                        <Route exact path="/explore" component={MyGallery} />
                        <Route exact path="/tag" component={MyGallery} />
                    </div>
                </div>
            </Router>
        )
    }
}

class SubMenu extends React.Component {
    render() {
        return(
            <div className="sub-menu">
                <ul>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/tag">Tag</Link></li>
                </ul>
            </div>
        )
    }
}

class MyHeader extends React.Component {
    render() {
        return(
            <div className="header-menu">
                <div className="header-menu-left">
                    <div className="logo">My Flickr</div>
                </div>
                <div className="header-menu-right">
                    <div className="search-bar">
                        <i className="input-icon fa fa-search"></i>
                        <input className="search-box" placeholder="Ảnh, tag"></input>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App style={{margin:"30px 60px 30px 60px"}}/>
    ,
    document.getElementById('root')
  );