import React from 'react';

const CustomerSelector = ({selectedCustomerId, onChange, customers}) => {
    return <div className='form-group'>
        <label htmlFor='customer_id'>Customer</label>
        <select className='form-control' id='customer_id'
                value={selectedCustomerId}
                onChange={onChange}>

            <option hidden={selectedCustomerId !== undefined} value={''}>
                Select customer
            </option>

            {customers.map(customer =>
                <option key={customer.id} value={customer.id}>
                    {customer.name}
                </option>
            )})}
        </select>
    </div>;
};

export default CustomerSelector;
