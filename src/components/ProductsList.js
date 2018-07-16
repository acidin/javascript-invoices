import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    setProductActive,
    fetchProductDetails
} from '../actions';
import ProductDetails from './ProductDetails';
import query from '../queries/products';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';

const DeleteProduct = gql`
mutation DeleteProduct($id: ID) {
    deleteProduct(id: $id) {
        name
        price
    }
}
`;

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            newItem: false,
            activeProductId: null
        }
    }

    deleteProductItem(id) {
        const {activeProductId} = this.state,
            isCurrentActive = id === activeProductId;

        return (
            <Mutation
                mutation={DeleteProduct}
                update={(cache, {data: {deleteProduct}}) => {
                    const {products} = cache.readQuery({query});
                    cache.writeQuery({
                        query,
                        data: {products: products.filter(product => product.id !== id)}
                    });
                }}
            >
                {(deleteProduct, {data}) => (
                    <button className="btn btn-danger"
                            onClick={() => {
                                if (isCurrentActive) {
                                    this.setState({
                                        showDetails: false
                                    });
                                }
                                deleteProduct({variables: {id: id}})
                            }}>
                        <span className='glyphicon glyphicon-remove'/>
                        Delete
                    </button>
                )}
            </Mutation>
        );
    }

    showDetailsProductItem(id) {
        const {
            setProductActive,
            fetchProductDetails
        } = this.props;

        return <button className="btn btn-info"
                       onClick={() => {
                           this.setState({
                               showDetails: true
                           });
                           fetchProductDetails(id);
                           setProductActive(id);
                       }}>
            <span className='glyphicon glyphicon-pencil'/>
            Edit
        </button>;
    }

    renderRow(product) {
        const {activeProductId} = this.state,
            {id} = product,
            isCurrentActive = id === activeProductId;

        return <tr key={id} className={isCurrentActive ? 'active' : ''}>
            <td>{id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className='invoice-actions'>
                {this.showDetailsProductItem(id)}
                {this.deleteProductItem(id)}
            </td>
        </tr>;
    }

    renderProductsList(products) {
        if (!products) return null;

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
                        showDetails: true,
                        newItem: true
                    });
                }}>
                New product
            </button>
        </div>;
    }

    setActiveId = id => {
        this.setState({
            activeProductId: id,
            newItem: false
        });
    };

    render() {
        const {showDetails, newItem} = this.state;

        return <Query query={query}>
            {({loading, error, data}) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;

                return <div>
                    {this.renderProductsList(data.products)}
                    <div className='invoice-edit'>
                        {showDetails &&
                        <ProductDetails
                            newItem={newItem}
                            setActiveId={this.setActiveId}
                        />}
                    </div>
                </div>;
            }}
        </Query>
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
    setProductActive,
    fetchProductDetails
})(ProductsList);