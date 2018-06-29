import React, {Component} from 'react';
import config from '../config.json';

class AddProductToInvoice extends Component {
    handleNewInvoiceProduct(e) {
        const productId = parseInt(e.target.value),
            {invoiceId, pushNewItemToInvoice} = this.props,
            productQuantity = config.DEFAULT_PRODUCT_QUANTITY;

        pushNewItemToInvoice(invoiceId, productId, productQuantity);
    }

    render() {
        const {products} = this.props;

        return <div>
            <span>
                <div className='form-group'>
                    <select className='form-control' id='products' value=''
                            onChange={::this.handleNewInvoiceProduct}>
                    <option value='' disabled>Product to add</option>
                        {products.map(product =>
                            <option key={product.id} value={product.id}>{product.name}</option>
                        )}
                    </select>
                </div>
            </span>
        </div>;
    }
}

export default AddProductToInvoice;