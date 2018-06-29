import React, {Component} from 'react';
import config from '../config.json';

class InvoiceItemsList extends Component {
    handleQuantityChange(e, invoiceItem) {
        const {pushNewQuantity, invoiceId} = this.props;
        let newQuantity = e.target.value;

        if (newQuantity < config.DEFAULT_PRODUCT_QUANTITY) {
            newQuantity = config.DEFAULT_PRODUCT_QUANTITY;
        }

        pushNewQuantity(invoiceId, invoiceItem.id, newQuantity);
    }

    render() {
        const {invoiceItems, products, onDelete, invoiceId} = this.props;

        return <div className='form-group'>
            {invoiceItems.length > 0 && products.length > 0 &&
            <table className='table items-table'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {invoiceItems.map(invoiceItem => {
                    const product = products.find(p => p.id === invoiceItem.product_id);

                    return <tr key={invoiceItem.id}>
                        <td className="product-name">{product.name}</td>
                        <td>${product.price}</td>
                        <td>
                            <input
                                type='number'
                                min={config.DEFAULT_PRODUCT_QUANTITY}
                                id={`quantity${invoiceItem.id}`}
                                value={invoiceItem.quantity}
                                onChange={(e) => this.handleQuantityChange(e,
                                    invoiceItem)
                                }
                                className='product-quantity'/>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(invoiceId, invoiceItem.id)}>
                                <span className='glyphicon glyphicon-remove'/> Delete
                            </button>
                        </td>
                    </tr>;
                })}
                </tbody>
            </table>
            }
        </div>;
    }
}

export default InvoiceItemsList;