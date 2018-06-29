import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchProductsList,
    deleteProduct,
    setProductActive,
    fetchProductDetails
} from '../actions';
import ProductDetails from './ProductDetails';

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }

    componentDidMount() {
        this.props.fetchProductsList();
    }

    renderRow(product) {
        const {
                products, activeProductId,
                deleteProduct, setProductActive,
                fetchProductDetails
            } = this.props,
            {id} = product,
            isCurrentActive = id === activeProductId;

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
        const {products} = this.props,
            {showDetails} = this.state;

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
})(
    ProductsList
);