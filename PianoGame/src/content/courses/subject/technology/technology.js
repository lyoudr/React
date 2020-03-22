import React from 'react';
import { HttpRequest } from '../../../../services/http-service/httpService';


class Map extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            selectedpoint : [], 
            count: 0,
            locationlists : ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            edgecolor: ['red','yellow','blue','grey','purple', 'green','pink']
        }
        this.countpath = this.countpath.bind(this);
        this.analyzeRoute = this.analyzeRoute.bind(this);
        this.resetRoute = this.resetRoute.bind(this);
        this.showshortestPath = this.showshortestPath.bind(this);
        this.showroute = React.createRef();
    }
    countpath(event){
        if(this.state.count > 1){
            return;
        }
        this.setState({count : this.state.count + 1});
        event.target.style.strokeWidth = "8";
        event.target.style.stroke = "red";
        let newarray = this.state.selectedpoint.slice();
        newarray.push(event.target.id);
        this.setState({selectedpoint: newarray});
    }
    analyzeRoute(){
        let data = JSON.stringify(this.state.selectedpoint);
        HttpRequest.shortestPath(`${process.env.REACT_APP_HOSTURL}:8085/api/shortestpath`, data)
            .then(res => {
                this.showshortestPath(res.path);
            })
    }
    resetRoute(){
        this.setState({count : 0});
        // return the color of vertex
        this.state.selectedpoint.forEach((eachid) => {
            document.getElementById(eachid).style.strokeWidth = "4";
            document.getElementById(eachid).style.stroke = "black";
        });
        // return the color of all edges
        for(var i = 0; i < document.getElementsByTagName('path').length; i++){
            document.getElementsByTagName('path')[i].style.stroke = this.state.edgecolor[i];
        };
        // clear text area 
        this.showroute.current.innerHTML = '';
        let newarray = [];
        this.setState({selectedpoint: newarray});
    }
    showshortestPath(path){
        for(var i = 0; i < document.getElementsByTagName('path').length; i++){
            document.getElementsByTagName('path')[i].style.stroke = 'grey';
        };
        for(var i = 0; i < path.length; i++){
            if(document.getElementById(`line${path[i]}${path[i+1]}`)){
                setTimeout(
                    setRoute(path, 1, this.showroute),
                    1000
                );
            } else if(document.getElementById(`line${path[i]}${path[i + 1]}`) == null){
                setTimeout(
                    setRoute(path, 2, this.showroute), 
                    1000
                );
            }
            function setRoute(path, order, showroute){
                if(order == 1) {
                    document.getElementById(`line${path[i]}${path[i+1]}`).style.stroke = 'red';
                } else if (order == 2){
                    if(document.getElementById(`line${path[i+1]}${path[i]}`) == null){
                        var text = document.createElement('div');
                        text.className = 'p-2 bd-highlight';
                        text.innerHTML = `${path[i]}`;
                        showroute.current.appendChild(text);
                        return;
                    }
                    document.getElementById(`line${path[i+1]}${path[i]}`).style.stroke = 'red';
                }
                var text = document.createElement('div');
                text.className = 'p-2 bd-highlight';
                text.innerHTML = `${path[i]} =>`;
                showroute.current.appendChild(text);
            }
        }
    }
    render(){
        return(
            <React.Fragment>
                <div className="col-3 text-center">
                    <div className="list-group">
                        {this.state.locationlists.map((eachitem) => (
                                <button key={eachitem} type="button" 
                                    className={this.state.selectedpoint.includes(`point${eachitem}`) ? 
                                    'list-group-item list-group-item-action active' : 
                                    'list-group-item list-group-item-action'}
                                >
                                {eachitem}
                                </button>
                            )
                        )}
                    </div>
                    <div className="btn_group">
                        <button onClick={this.analyzeRoute} type="button" className="btn btn-secondary">Analyze</button>
                        <button onClick={this.resetRoute} type="button" className="btn btn-secondary">Reset</button>
                    </div>
                </div>
                <div className="col-9 text-center">
                    <svg height="300" width="600">
                        <path id="lineAB" d="M 100 120 l 100 -100" stroke="red" strokeWidth="3" fill="none" />
                        <path id="lineAC" d="M 200 20 l 100 100" stroke="yellow" strokeWidth="3" fill="none" />
                        <path id="lineBD" d="M 100 120 l -80 80" stroke="blue" strokeWidth="3" fill="none" />
                        <path id="lineBC" d="M 100 120 l 200 0" stroke="grey" strokeWidth="3" fill="none" />
                        <path id="lineBE" d="M 100 120 l 50 50" stroke="purple" strokeWidth="3" fill="none" />
                        <path id="lineCG" d="M 300 120 l 80 50" stroke="green" strokeWidth="3" fill="none" />
                        <path id="lineCF" d="M 300 120 l -70 110" stroke="pink" strokeWidth="3" fill="none" />
                        <g fill="black">
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointA" cx="200" cy="20" r="4" />
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointB" cx="100" cy="120" r="4" />
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointC" cx="300" cy="120" r="4" />
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointD" cx="20" cy="200" r="4" />
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointE" cx="150" cy="170" r="4" />
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointF" cx="230" cy="230" r="4" />
                            <circle stroke="black" strokeWidth="4" onClick={this.countpath} style={{cursor: 'pointer'}} id="pointG" cx="380" cy="170" r="4" />
                        </g>
                        
                        <g fontSize="18" fontFamily="sans-serif" fill="black" stroke="none" textAnchor="middle">
                            <text x="200" y="20" dy="-10">A</text>
                            <text x="100" y="120" dx="-30">B</text>
                            <text x="300" y="120" dx="30">C</text>
                            <text x="20" y="200" dx="-30">D</text>
                            <text x="150" y="170" dx="30">E</text>
                            <text x="230" y="230" dx="-30">F</text>
                            <text x="380" y="170" dx="30">G</text>

                            <text x="150" y="65" dx="-10">2</text>
                            <text x="250" y="65" dx="10">2</text>
                            <text x="200" y="120" dy="-10">3</text>
                            <text x="60" y="160" dx="-15">3</text>
                            <text x="125" y="145" dx="10">1</text>
                            <text x="265" y="175" dx="-15">4</text>
                            <text x="340" y="145" dx="20">1.5</text>
                        </g>
                    </svg>
                    <div ref={this.showroute} className="d-flex flex-row bd-highlight mb-3 justify-content-center"> 
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


class Technology extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section className="technology">
                <div className="container">
                    <div className="row justify-content-center">
                        <Map/>
                    </div>
                </div>
            </section>
        )
    }
}

export default Technology;