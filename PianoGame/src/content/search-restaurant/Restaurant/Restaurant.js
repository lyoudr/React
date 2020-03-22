import React from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import restaurantIcon from '../../../assets/icon/restaurant.svg';
import './Restaurant.scss';

export class MapContainer extends React.Component{
    constructor(props){
        super(props)
        this.mapRef = React.createRef();
        this.state = {
            currentLocation:{
                lat : null,
                lng : null
            },
            storemarkers : [],
            selectedPlace : {},
            activeMarker : {},
            showingInfoWindow : false
        }
        this.centerMoved = this.centerMoved.bind(this);
        this.loadMapCenter = this.loadMapCenter.bind(this);
        this.nearbySearch = this.nearbySearch.bind(this);
        this.onSelectedRes = this.onSelectedRes.bind(this);
    }
    componentDidMount(){
        this.loadMapCenter();   
    }
    componentDidUpdate(prevProps){
        let selectedRes = this.props.selectedRes;
        if(selectedRes && (prevProps.selectedRes !== this.props.selectedRes)) {
            this.onSelectedRes(selectedRes.name, selectedRes.geometry.location.lat(), selectedRes.geometry.location.lng());
        }
    }
    // load map Center
    loadMapCenter(){
        if(navigator && navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                this.setState({
                    currentLocation : {
                        lat : coords.latitude,
                        lng : coords.longitude
                    }
                }, () => this.nearbySearch());
            });
        }
    }
    // Search surrounding restaurants
    nearbySearch(){
        let newResArr = [];
        const pyrmont = new this.props.google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng);
        const map = new this.props.google.maps.Map(this.mapRef.current, {
            center : pyrmont,
            zoom : 15
        });;
        const request = {
            location: pyrmont,
            radius: '500',
            type: ['restaurant']
        }
        const service = new this.props.google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if(status === this.props.google.maps.places.PlacesServiceStatus.OK){
                for(var i = 0; i < results.length; i++){
                    newResArr.push(results[i]);
                }
                this.setState({storemarkers: newResArr});
            }
            this.props.setCenter(this.state.currentLocation);
            this.props.setRestaurant(this.state.storemarkers);
        });
        
    }
    // Modify Center when dragging map
    centerMoved(mapProps, map){
        this.setState({
            currentLocation : {
                lat : map.center.lat(),
                lng : map.center.lng()
            }
        }, () => this.nearbySearch());
    }
    // On Marker Click to interact with restaurant list
    onSelectedRes(resName, latitude, longitude){
        // Set marker as center
        this.setState({
            currentLocation : {
                lat : latitude,
                lng : longitude
            }
        });
        // Mark restaurant as active
        const new_storemarkers = this.state.storemarkers.map((item) => {
            item.isChoosed = false;
            if(item.name === resName){
                item.isChoosed = true;
                return item;
            } else {
                return item;
            }
        });
        this.props.setRestaurant(new_storemarkers);
    }
    // Set InfoWindow when clicking marker
    onMarkerClick(props, marker){
        this.setState({
            selectedPlace : props,
            activeMarker : marker,
            showingInfoWindow : true
        })
    }
    render(){
        const style = {
            height : '100vh'
        }
        return(
            <Map
                ref = {this.mapRef}
                google = {this.props.google}
                center ={{
                    lat : this.state.currentLocation.lat,
                    lng : this.state.currentLocation.lng
                }}
                zoom = {15}
                style={style}
                onDragend = {(mapProps, map) => this.centerMoved(mapProps, map)}
            >
                <Marker
                    title={`Your location`}
                    position ={{ lat : this.state.currentLocation.lat, lng : this.state.currentLocation.lng}}
                />
                <InfoWindow
                    marker = {this.state.activeMarker}
                    visible = {this.state.showingInfoWindow}
                >
                    <div>
                        <p>{this.state.selectedPlace.title}</p>
                    </div>
                </InfoWindow>
                {this.state.storemarkers.map((marker, index) => 
                    <Marker
                        key = {index}
                        title = {marker.name}
                        position = {marker.geometry.location}
                        onClick = {(props, marker) => {
                            this.onSelectedRes(props.title, marker.position.lat(), marker.position.lng());
                            this.onMarkerClick(props, marker);
                        }}
                        icon={{
                            url: `${restaurantIcon}`,
                            anchor: new this.props.google.maps.Point(32, 32),
                            scaledSize : new this.props.google.maps.Size(12, 12)
                        }}
                    />
                )}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_APIKEY}`,
    libraries: ['places']
})(MapContainer)