import React from 'react';
import '../../assets/sass/shared/components/shownav.scss';

class ShowNav extends React.Component{
    constructor(props){
        super(props)
        this.navbtnRef = React.createRef();
        this.openSidebar = this.openSidebar.bind(this);
    }
    openSidebar(){
        this.props.openSidebar();
    }
    render(){
        return(
            <div onClick={this.openSidebar} ref={this.navbtnRef} className="shownavbtn">
                <i className="fa fa-bars"></i>
            </div>
        )
    }
    
};

export default ShowNav;