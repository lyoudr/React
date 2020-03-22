import React from 'react';
import QueueAnim from '../../../node_modules/rc-queue-anim';
import {Link} from 'react-router-dom';
import '../../assets/sass/nav/nav.scss';

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selecteditem : null,
            routeChange : false
        }
        this.choosenav = this.choosenav.bind(this);
        this.closeSide = this.closeSide.bind(this);
        this.openSideBar = this.openSideBar.bind(this);
        this.navref = React.createRef();
        this.dimscreenRef = React.createRef();
    }
    choosenav(id){
        if(this.state.selecteditem){
            this.state.selecteditem.classList.remove('active');
        }
        let item = document.getElementById(id);
        this.setState({selecteditem: item});
        document.getElementById(id).classList.add('active');
    }
    closeSide(){
        if(document.body.clientWidth < 600){
            this.navref.current.classList.add('hide');
            this.navref.current.classList.remove('show');
            this.dimscreenRef.current.classList.remove('active');
        }
    }
    openSideBar(){
        if(document.body.clientWidth < 600){
            this.navref.current.classList.remove('hide');
            this.navref.current.classList.add('show');
            this.dimscreenRef.current.classList.add('active');
        }
    }
    render(){
        const navlists = [
            {link : '/', name: 'Home'},
            {link : '/pianogame', name: 'PianoGame'},
            {link : '/printout', name: 'PrintOut'},
            {link : '/chat', name: 'Chat'},
            {link : '/courses', name: 'Courses'},
            {link : '/shoplist', name: 'ShopList'},
            {link : '/search-restaurant', name: 'SearchRestaurant'},
        ]
        return(
            <React.Fragment>
            <aside ref={this.navref} className="">
                <div onClick={this.closeSide} className="closeSide">X</div>
                <div className="nav flex-column nav-pills mt-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <QueueAnim>
                        {navlists.map((nav, index) => 
                            <li onClick={() => {this.choosenav(`navitem${index}`); this.closeSide()}} key={`nav${index}`} className='nav-link'>
                                <Link to={nav.link}>
                                    <span id={`navitem${index}`} className="un">{nav.name}</span>
                                </Link>
                            </li>
                        )}
                    </QueueAnim>
                </div>
            </aside>
            <div ref={this.dimscreenRef} className="dimScreen"></div>
            </React.Fragment>
        )
    }
}

export default Nav;