import React from 'react';
import QueueAnim from '../../../node_modules/rc-queue-anim';
import { Link } from 'react-router-dom';
import { emit_color, ThemeChoice } from '../../shared/hooks/ThemeChoice';
import { Subject } from 'rxjs';
import '../../assets/sass/nav/nav.scss';

export const isNavOpen = new Subject();

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selecteditem: null,
      routeChange: false,
      theme : "darkoff"
    }
    this.choosenav = this.choosenav.bind(this);
    this.closeSide = this.closeSide.bind(this);
    this.openSideBar = this.openSideBar.bind(this);
    this.navref = React.createRef();
    this.dimscreenRef = React.createRef();
  }
  componentDidMount(){
    emit_color.subscribe(isdarkOn => this.setState({theme: isdarkOn}));
  }
  componentWillUnmount(){
    emit_color.unsubscribe();
  }
  choosenav(id) {
    if (this.state.selecteditem) {
      this.state.selecteditem.classList.remove('active');
    }
    let item = document.getElementById(id);
    this.setState({ selecteditem: item });
    document.getElementById(id).classList.add('active');
  }
  closeSide() {
    if (document.body.clientWidth < 600) {
      this.navref.current.classList.add('hide');
      this.navref.current.classList.remove('show');
      this.dimscreenRef.current.classList.remove('active');
      isNavOpen.next('hide');
    }
  }
  openSideBar() {
    if (document.body.clientWidth < 600) {
      this.navref.current.classList.remove('hide');
      this.navref.current.classList.add('show');
      this.dimscreenRef.current.classList.add('active');
      isNavOpen.next('show');
    }
  }
  render() {
    const navlists = [
      { link: '/pianogame', name: 'PianoGame' },
      { link: '/printout', name: 'PrintOut' },
      { link: '/chat', name: 'Chat' },
      { link: '/courses', name: 'Courses' },
      { link: '/shoplist', name: 'ShopList' },
      { link: '/search-restaurant', name: 'Restaurant' },
    ]
    return (
      <React.Fragment>
        <aside ref={this.navref} className={this.state.theme}>
          <div onClick={this.closeSide} className="closeSide">X</div>
          <div className="nav flex-column nav-pills mt-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <QueueAnim>
              {navlists.map((nav, index) =>
                <li onClick={() => { this.choosenav(`navitem${index}`); this.closeSide() }} key={`nav${index}`} className='nav-link'>
                  <Link to={nav.link} className={this.state.theme}>
                    <span id={`navitem${index}`} className="un">{nav.name}</span>
                  </Link>
                </li>
              )}
            </QueueAnim>
            <ThemeChoice />
          </div>
        </aside>
        <div ref={this.dimscreenRef} className="dimScreen"></div>
      </React.Fragment>
    )
  }
}

export default Nav;