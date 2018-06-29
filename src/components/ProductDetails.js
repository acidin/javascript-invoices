import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    updateProductDetails
} from '../actions';

class ProductDetails extends Component {
    handleNameChange(e) {
        const {productDetails, updateProductDetails} = this.props;

        updateProductDetails('name', e.target.value, productDetails);
    }

    handlePriceChange(e) {
        const {productDetails, updateProductDetails} = this.props;

        let value = e.target.value;

        if (value < 0) {
            value = 0;
        }

        updateProductDetails('price', value, productDetails);
    }

    render() {
        const {productDetails} = this.props;
        return <div>
            <label htmlFor='name'>Name of the product:</label>
            <input type='text'
                   className='form-control'
                   id='name'
                   min='0'
                   max='100'
                   value={productDetails.name}
                   onChange={::this.handleNameChange}/>
            <label htmlFor='price'>Price:</label>
            <input type='text'
                   className='form-control'
                   id='price'
                   value={productDetails.price}
                   onChange={::this.handlePriceChange}/>
        </div>
    }
}

const mapStateToProps = state => {
    const {productDetails} = state.ProductsList;

    return {
        productDetails
    };
};

export default connect(mapStateToProps, {
    updateProductDetails
})(ProductDetails);