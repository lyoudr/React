import React from 'react';
// Http Service
import { HttpRequest } from '../../../../../services/http-service/httpService';
import { List, catsGrowthData, FoodList, DishesList } from '../../Subjectlist';
import CanvasJSReact from '../../../../../assets/canvas/canvasjs.react';
import { IconContext } from 'react-icons';
import { FaAngleUp, FaAngleDown, FaSpinner } from 'react-icons/fa';
import '../../../../../assets/sass/courses/subject/subject.scss';
import jQuery from 'jquery';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { lists: List }
    this.jumpTo = this.jumpTo.bind(this)
  }
  jumpTo(location) {
    switch (location) {
      case 'species':
        window.scrollTo(0, 0)
        break;
      case 'growth':
        window.scrollTo(0, 1000)
        break;
      case 'food':
        window.scrollTo(0, 2000)
        break;
    }
  }
  render() {
    const lists = this.state.lists
    return (
      <div className="col-3">
        <div className="navbar">
          <ul className="list-group">
            {lists.map((eachitem) =>
              <li key={eachitem.key} onClick={this.jumpTo.bind(this, `${eachitem.key}`)} className="list-group-item list">
                {eachitem.title}
              </li>
            )}

          </ul>
        </div>
      </div>
    )
  }
}

class GrowthCurve extends React.Component {
  constructor(props) {
    super(props)
  }
  render() { 
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h5>Growth of Cats</h5>
            <div>
              {this.props.render(this.props.options)}
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Age(years old)</th>
                  <th scope="col">Weight(kg)</th>
                  <th scope="col">Character</th>
                </tr>
              </thead>
              <tbody>
                {this.props.growthlists.map((eachitem, index) => (
                  <tr key={`age${index}`}>
                    <th scope="row">{index + 1}</th>
                    <td>{eachitem.age}</td>
                    <td>{eachitem.weight}</td>
                    <td>{eachitem.character}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class Food extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foodlists: FoodList,
      currentIndex: 0,
      dishes: [],
      disheslists: DishesList
    }
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.onDishes = this.onDishes.bind(this);
    this.drag = this.drag.bind(this);
  }
  goToPrevSlide = () => {
    if (this.state.currentIndex === 0) {
      return this.setState({
        currentIndex: this.state.foodlists.length - 1,
      })
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
    }));
  }
  goToNextSlide = () => {
    if (this.state.currentIndex === this.state.foodlists.length - 1) {
      return this.setState({
        currentIndex: 0,
      })
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
    }));
  }
  drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  onDishes(dishes) {
    this.setState({
      dishes: dishes
    });
  }
  render() {
    const disheslists = this.state.disheslists;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h5>Cats Food</h5>
            <div className="d-flex flex-row">
              <div className="selectfood">
                <LeftArrow goToPrevSlide={this.goToPrevSlide} />
                {this.state.foodlists.map((image, index) => {
                  if (this.state.currentIndex == index) {
                    return (
                      <div className={(this.state.currentIndex == index ? 'foodactive' : 'foodinactive')} key={index}>
                        <img id={image.type} src={image.src}
                          draggable="true"
                          onDragStart={this.drag.bind(this)}
                        />
                      </div>
                    )
                  } else {
                    return (null)
                  }
                })}
                <RightArrow goToNextSlide={this.goToNextSlide} />
              </div>
              <DropArea onDishes={this.onDishes} />
            </div>
            <div className="catsdishes">
              <h5>Dishes</h5>
              {this.state.dishes ?
                <React.Fragment>
                  {this.state.dishes.map((eachitem, index) => {
                    return (
                      <div data-index={index} key={index}>
                        <h5>{disheslists[`${eachitem.match(/\d+/)[0]}`].name}</h5>
                        <div className="text-center">
                          <img src={disheslists[`${eachitem.match(/\d+/)[0]}`].src} />
                        </div>
                        <h5>vitamin C </h5>
                        <div className="progress mt-3">
                          <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${disheslists[`${eachitem.match(/\d+/)[0]}`].vitaminC}%` }} aria-valuenow={disheslists[`${eachitem.match(/\d+/)[0]}`].vitaminC} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h5>Protein </h5>
                        <div className="progress mt-3">
                          <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${disheslists[`${eachitem.match(/\d+/)[0]}`].protein}%` }} aria-valuenow={disheslists[`${eachitem.match(/\d+/)[0]}`].protein} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h5>Mineral </h5>
                        <div className="progress mt-3">
                          <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${disheslists[`${eachitem.match(/\d+/)[0]}`].mineral}%` }} aria-valuenow={disheslists[`${eachitem.match(/\d+/)[0]}`].mineral} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h5>Cellulose </h5>
                        <div className="progress mt-3">
                          <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${disheslists[`${eachitem.match(/\d+/)[0]}`].cellulose}%` }} aria-valuenow={disheslists[`${eachitem.match(/\d+/)[0]}`].cellulose} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    )
                  }
                  )}
                </React.Fragment>
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class DropArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foodspecies: [],
      loading: false,
    }
    this.drop = this.drop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.submit = this.submit.bind(this);
  }
  drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const chooseitem = document.getElementById(data).cloneNode(true);
    chooseitem.setAttribute('style', "height: 50px; width : 50px");
    event.target.appendChild(chooseitem);
    this.setState({
      foodspecies: [...this.state.foodspecies, data]
    });
  }
  allowDrop(event) {
    event.preventDefault();
  }
  submit() {
    let droparea = document.getElementById('droparea');
    while (droparea.hasChildNodes()) {
      droparea.removeChild(droparea.firstChild);
    }
    this.setState({ loading: true });
    console.log('this.state.foodspecies is =>', this.state.foodspecies);
    HttpRequest.requesDishes(`${process.env.REACT_APP_HOSTURL}/food`, this.state.foodspecies)
      .then(data => {
        console.log('returned data is =>', data);
        if (data) {
          this.props.onDishes(data.dishes);
        }
      });
    this.setState({ loading: false });
  }
  render() {
    console.log("re-rendered");
    const loading = this.state.loading;
    //const returneddishes = this.state.dishes;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="dropdown" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}>
        <div className="droparea" id="droparea">
          {loading ? (
            <div className="fa-3x align-middle">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
          ) : (
              null
            )}
        </div>
        <button type="button" class="btn btn-secondary" onClick={this.submit}>Submit</button>
      </div>
    )
  }
}

const RightArrow = (props) => {
  return (
    <div onClick={props.goToNextSlide}>
      <IconContext.Provider value={{ size: "3em", style: { cursor: "pointer" } }}>
        <FaAngleDown />
      </IconContext.Provider>
    </div>
  );
}

const LeftArrow = (props) => {
  return (
    <div onClick={props.goToPrevSlide}>
      <IconContext.Provider value={{ size: "3em", style: { cursor: "pointer" } }}>
        <FaAngleUp />
      </IconContext.Provider>
    </div>
  );
}

export default class Animal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cats: props.cats,
      selected_cat : "Kitty",
    }
    this.handleShow = this.handleShow.bind(this);
    this.selectCat = this.selectCat.bind(this);
  }
  componentDidMount() {
    console.log('this.props is =>', this.props);
    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
      // IE Fallback
      function (callback) { window.setTimeout(callback, 1000 / 60) };

    var elementsToShow = document.querySelectorAll('.show-on-scroll');

    function loop() {
      Array.prototype.forEach.call(elementsToShow, function (element) {
        if (isElementInViewport(element)) {
          element.classList.add('is-visible');
        } else {
          element.classList.remove('is-visible');
        }
      });
      scroll(loop);
    }
    // Call the loop for the first time
    loop();

    // Helper function from: http://stackoverflow.com/a/7557433/274826
    function isElementInViewport(el) {
      // special bonus for those using jQuery
      if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
      }
      var rect = el.getBoundingClientRect();
      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      );
    }
  }
  handleShow(index, show) {
    this.props.switchCatDetail(index, show)
  }
  selectCat(name){
    this.setState({selected_cat: name});
  }
  render() {
    const cats = this.state.cats;
    console.log('cats is =>', cats);
    return (
      <React.Fragment>
        <section className="pats">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="d-flex flex-wrap">
                  {cats.map((eachitem, index) => {
                    return (
                      <div onClick={this.selectCat.bind(this, eachitem.name)} key={eachitem.name + eachitem.index} className="patscard show-on-scroll">
                        <img className="card-img-top" src={eachitem.imgsrc} alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title">{eachitem.name}</h5>
                          <p className="card-text">{eachitem.describe}</p>
                          <button onClick={() => this.handleShow(index, true)} className="btn btn-primary">Guide</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div id="modal-root">
                  {cats.map((cat, index) => {
                    console.log('cat.show is =>', cat.show);
                    return(cat.show === true 
                      ? <div className="modal">
                          <div className="row align-items-end">
                            <div className="col">
                              <p onClick={this.handleShow.bind(this, index, false)}>X</p>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-12 col-md-8 text-center">
                              <h1 className="display-4">{cat.title}</h1>
                              <blockquote className="blockquote text-center">
                                <p className="mb-0">{cat.guide}</p>
                                <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                              </blockquote>
                            </div>
                          </div>
                        </div>
                      : <div></div>)}
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="growth">
          {this.state.cats.map((cat, index) => 
            this.state.selected_cat === cat.name && cats_components[cat.name]
          )}
        </section>
        <section className="food">
          <Food />
        </section>
      </React.Fragment>
    )
  }
}
/* Cat Higher Order Component */
const withDifferentCat  =  (WrappedComponent, data) => {
  class WithDifferentCat extends React.Component {
    render(){
      return(
        <WrappedComponent 
          options={data.options} growthlists={data.growthlists}
          render={growth_data =>(
            <CanvasJSChart options={growth_data}
              onRef={ref => this.chart = ref}/>
        )}/>
      )
    }
  }
  return WithDifferentCat;
}
const Kitty = withDifferentCat(GrowthCurve, catsGrowthData.Kitty);
const Cathy = withDifferentCat(GrowthCurve, catsGrowthData.Cathy);
const KiKi = withDifferentCat(GrowthCurve, catsGrowthData.KiKi);
const WiWi = withDifferentCat(GrowthCurve, catsGrowthData.WiWi);
const cats_components = {
  "Kitty" : <Kitty/>,
  "Cathy" : <Cathy/>,
  "KiKi" : <KiKi/>,
  "WiWi" : <WiWi/>
}

