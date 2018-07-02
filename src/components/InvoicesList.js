import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchInvoicesList,
    deleteInvoice,
    fetchInvoiceDetails,
    fetchInvoiceItems,
    setInvoiceActive,
    clearInvoiceDetails,
    clearInvoiceDetailsFetchData
} from '../actions';
import InvoiceDetails from './InvoiceDetails';
import { ApolloProvider, Query } from 'react-apollo';
import query from '../queries/customers';
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

class InvoicesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }

    componentDidMount() {
        this.props.fetchInvoicesList();
    }

    renderRow(invoice) {
        const {
                activeInvoiceId,
                setInvoiceActive, fetchInvoiceItems, fetchInvoiceDetails,
                clearInvoiceDetailsFetchData, deleteInvoice
            } = this.props,
            {id} = invoice,
            isCurrentActive = id === activeInvoiceId;

        return <tr key={id} className={isCurrentActive ? 'active' : ''}>
            <td>{id}</td>
            <td>{this.props.data.customers.find(customer => customer.id === invoice.customer_id).name}</td>
            <td>{invoice.discount}</td>
            <td>{invoice.total}</td>
            <td className="invoice-actions">
                <button className="btn btn-info"
                        onClick={() => {
                            this.setState({
                                showDetails: true
                            });
                            setInvoiceActive(id);
                            fetchInvoiceItems(id);
                            fetchInvoiceDetails(id);
                        }}>
                    <span className='glyphicon glyphicon-pencil'/> Edit
                </button>
                <button className="btn btn-danger"
                        onClick={() => {
                            if (isCurrentActive) {
                                clearInvoiceDetailsFetchData();

                                this.setState({
                                    showDetails: false
                                });
                            }
                            deleteInvoice(id);
                        }}>
                    <span className='glyphicon glyphicon-remove'/> Delete
                </button>
            </td>
        </tr>;
    }

    renderInvoiceList(invoices) {
        const {clearInvoiceDetailsFetchData} = this.props;

        return <div className='invoices-list'>
            <table className='table invoices-table'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Customer</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice =>
                    this.renderRow(invoice)
                )}
                </tbody>
            </table>
            {invoices.length === 0 &&
            <span>There are no invoices.</span>
            }
            <button
                type='button'
                className='btn btn-primary btn-lg'
                onClick={() => {
                    this.setState({
                        showDetails: true
                    });
                    clearInvoiceDetailsFetchData();
                }}>
                New invoice
            </button>
        </div>;
    }

    render() {
        const {invoices} = this.props,
              {customers} = this.props.data,
            {showDetails} = this.state;

        <ApolloProvider client={client}>
          <Query query=query>
                if (!customers) {
                    return <div>Loading</div>;
                }

                return <div>
                    {this.renderInvoiceList(invoices, customers)}
                     <div className='invoice-edit'>
                         {showDetails && <InvoiceDetails />}
                     </div>
                </div>
          </Query>
        </ApolloProvider>
    }
}

const mapStateToProps = state => {
    const {invoices} = state.InvoicesList,
        {products, invoiceItems, activeInvoiceId} = state.InvoiceDetails;

    return {
        invoices,
        products,
        invoiceItems,
        activeInvoiceId
    };
};

export default connect(mapStateToProps, {
    fetchInvoicesList,
    deleteInvoice,
    fetchInvoiceDetails,
    fetchInvoiceItems,
    setInvoiceActive,
    clearInvoiceDetails,
    clearInvoiceDetailsFetchData
})(
    InvoicesList
);