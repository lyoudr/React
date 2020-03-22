import React from 'react';
import "../../../assets/sass/shoplist/shoplist.scss";


class CartCollections extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            totalcount: 0
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount(){
        var total = 0;
        this.props.cartcollection.forEach((item) => {
            total = total + Number(item.detail.price.split('$')[0]);
        });
        this.setState({totalcount: total});
        if(this.props.location.pathname == '/shoplist/cart'){
            document.getElementsByClassName('shopdetails')[0].style.display = 'none';
        }
    }
    componentWillUnmount(){
        document.getElementsByClassName('shopdetails')[0].style.display = 'block';
    }
    deleteItem(itemId){
        this.props.deleteItem(itemId);
    }
    goBack(id){
        this.props.showSopDetailaction(id);
        this.props.history.goBack();
    }
    render(){
        return(
            <section className="shop_cart">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            {this.props.cartcollection &&
                                this.props.cartcollection.map((cart , index)=> {
                                    let upperitemname = cart.itemname.charAt(0).toUpperCase() + cart.itemname.slice(1);
                                    return(
                                        <div key={cart.id}>
                                            <div onClick={this.goBack.bind(this, cart.id)}>
                                                <img src={cart.detail.img}/>
                                            </div>
                                            <div>
                                                <p>{upperitemname}</p>
                                                <p>{cart.color}</p>
                                                <p>{cart.size}</p>
                                            </div>
                                            <div>
                                                <p>{cart.detail.price}</p>
                                                <p onClick={this.deleteItem.bind(this, cart.id)}> X </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div>
                                <div>
                                    <p>Total: {this.state.totalcount}</p>
                                    <button>CheckOut</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default CartCollections;