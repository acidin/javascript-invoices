import React, {Component} from 'react';
import {connect} from 'react-redux';
import InvoiceItemsList from './InvoiceItemsList';
import CustomerSelector from './CustomerSelector';
import AddProductToInvoice from './AddProductToInvoice';
import {
    fetchInvoicesList,
    fetchProductsList,
    updateInvoiceDetails,
    clearInvoiceDetails,
    updateInvoiceItem,
    recalculateTotal,
    fetchInvoiceDetails,
    deleteInvoiceItem,
    addInvoiceItem,
    fetchInvoiceItems,
    pushInvoice
} from '../actions';
import {Query} from 'react-apollo';
import query from '../queries/customers';

class InvoiceDetails extends Component {
    componentWillMount() {
        this.props.fetchInvoicesList();
    }

    componentDidMount() {
        this.props.fetchProductsList();
    }

    handleCustomerChange(e) {
        const {invoice, updateInvoiceDetails} = this.props;

        updateInvoiceDetails('customer_id', e.target.value, invoice);
    }

    handleDiscountChange(e) {
        const {invoice, updateInvoiceDetails} = this.props;
        let value = e.target.value;

        if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }
        updateInvoiceDetails('discount', value, invoice);
    }

    componentWillUnmount() {
        this.props.clearInvoiceDetails();
    }

    render() {
        const {
            invoice, products, invoiceItems,
            updateInvoiceItem, deleteInvoiceItem, addInvoiceItem
        } = this.props;

        console.log('test for update');

        return <div>
            <Query query={query}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error}</p>;
                    return <CustomerSelector selectedCustomerId={invoice.customer_id}
                                             onChange={::this.handleCustomerChange}
                                             customers={data.customers}/>
                }}
            </Query>
            {invoice.id !== undefined &&
            <div>
                <InvoiceItemsList invoiceItems={invoiceItems}
                                  invoiceId={invoice.id}
                                  products={products}
                                  pushNewQuantity={updateInvoiceItem}
                                  onDelete={deleteInvoiceItem}/>
                <AddProductToInvoice pushNewItemToInvoice={addInvoiceItem}
                                     invoiceId={invoice.id}
                                     products={Object.values(products)}/>
                {invoiceItems.length > 0 &&
                <div className='form-group discount-container'>
                    <div>
                        <label htmlFor='discount'>Discount:</label>
                        <input type='number'
                               className='form-control'
                               id='discount'
                               min='0'
                               max='100'
                               value={invoice.discount}
                               onChange={::this.handleDiscountChange}/>
                    </div>
                    <div>
                        <label>Total:</label>
                        <span className='total'>${invoice.total}</span>
                    </div>
                </div>
                }
            </div>
            }
        </div>;
    }
}

const mapStateToProps = state => {
    const {invoice, products, invoiceItems} = state.InvoiceDetails;

    return {
        invoice,
        products,
        invoiceItems,
    };
};

export default connect(mapStateToProps, {
    fetchInvoicesList,
    fetchProductsList,
    pushInvoice,
    fetchInvoiceDetails,
    updateInvoiceItem,
    recalculateTotal,
    updateInvoiceDetails,
    addInvoiceItem,
    deleteInvoiceItem,
    clearInvoiceDetails,
    fetchInvoiceItems
})(InvoiceDetails);