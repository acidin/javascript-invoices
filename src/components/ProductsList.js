import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchProductsList,
    deleteProduct,
    setProductActive,
    fetchProductDetails
} from '../actions';
import ProductDetails from './ProductDetails';
import query from '../queries/products';
import {client} from '../index';

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }

    componentDidMount() {
        this.props.fetchProductsList();

        client.query({query})
            .then(({loading, error, data}) => {
                if (!loading && !error) {
                    this.setState({
                        products: data.products
                    })
                }
            });
    }

    renderRow(product) {
        const {
                activeProductId,
                deleteProduct, setProductActive,
                fetchProductDetails
            } = this.props,
            {products} = this.state,
            {id} = product,
            isCurrentActive = id === activeProductId;

        if (!products) return null;

        return <tr key={id} className={isCurrentActive ? 'active' : ''}>
            <td>{id}</td>
            <td>{products.find(prod => prod.id === product.id).name}</td>
            <td>{product.price}</td>
            <td className="invoice-actions">
                <button className="btn btn-info"
                        onClick={() => {
                            this.setState({
                                showDetails: true
                            });
                            fetchProductDetails(id);
                            setProductActive(id);
                        }}>
                    <span className='glyphicon glyphicon-pencil'/> Edit
                </button>
                <button className="btn btn-danger"
                        onClick={() => {
                            if (isCurrentActive) {
                                this.setState({
                                    showDetails: false
                                });
                            }
                            deleteProduct(id);
                        }}>
                    <span className='glyphicon glyphicon-remove'/> Delete
                </button>
            </td>
        </tr>;
    }

    renderProductsList(products) {
        return <div className='invoices-list'>
            <table className='table invoices-table'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {products.map(product =>
                    this.renderRow(product)
                )}
                </tbody>
            </table>
            {products.length === 0 &&
            <span>There are no products.</span>
            }
            <button
                type='button'
                className='btn btn-primary btn-lg'
                onClick={() => {
                    this.setState({
                        showDetails: true
                    });
                }}>
                New product
            </button>
        </div>;
    }

    render() {
        const {products} = this.state,
            {showDetails} = this.state;

        if (!products) return null;

        return <div>
            {this.renderProductsList(products)}
            <div className='invoice-edit'>
                {showDetails && <ProductDetails />}
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    const {products, activeProductId} = state.ProductsList;

    return {
        products,
        activeProductId
    };
};

export default connect(mapStateToProps, {
    fetchProductsList,
    deleteProduct,
    setProductActive,
    fetchProductDetails
})(ProductsList);