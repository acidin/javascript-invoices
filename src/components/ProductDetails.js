import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import query from '../queries/products';

const AddProduct = gql`
mutation AddProduct($name: String, $price: Float) {
    addProduct(name: $name, price: $price) {
        id
        name
        price
    }
}
`;

const UpdateProduct = gql`
mutation UpdateProduct($id: ID, $name: String, $price: Float) {
    updateProduct(id: $id, name: $name, price: $price) {
        name
        price
    }
}
`;

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: 0,
            newItem: props.newItem,
            activeProductId: props.activeProductId
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newItem !== this.state.newItem) {
            this.setState({newItem: nextProps.newItem})
        }
        if (nextProps.activeProductId !== this.state.activeProductId) {
            this.setState({activeProductId: nextProps.activeProductId})
        }
    }

    handleNameChange = func => e => {
        const {price, newItem, activeProductId} = this.state,
            name = e.target.value;

        if (newItem) {
            func({variables: {name, price}})
                .then(({data: addProduct}) => {
                    this.setState({
                        name,
                        newItem: false,
                        activeProductId: addProduct.addProduct.id
                    });

                    this.props.setActiveId(addProduct.addProduct.id);
                });
        } else {
            func({variables: {id: activeProductId, name, price}})
                .then(({data: updateProduct}) => {
                    this.setState({
                        name,
                        newItem: false
                    });
                });
        }
    };

    handlePriceChange = func => e => {
        const {name, price} = this.state;
        let value = e.target.value;

        if (value < 0) {
            value = 0;
        }

        this.setState({
                price: value,
                newItem: false
            },
            () => func({variables: {name, price}})
        );
    };

    productItemDetails = func => {
        const {name, price} = this.state;

        return <div>
            <label htmlFor='name'>Name of the product:</label>
            <input type='text'
                   className='form-control'
                   id='name'
                   min='0'
                   max='100'
                   value={name}
                   onChange={::this.handleNameChange(func)}/>
            <label htmlFor='price'>Price:</label>
            <input type='text'
                   className='form-control'
                   id='price'
                   value={price}
                   onChange={::this.handlePriceChange(func)}/>
        </div>
    }

    addProductMutation() {
        return <Mutation
            mutation={AddProduct}
            update={(cache, {data: {addProduct}}) => {
                const {products} = cache.readQuery({query});
                cache.writeQuery({
                    query,
                    data: {products: products.concat([addProduct])}
                });
            }}
        >
            {addProduct => (this.productItemDetails(addProduct)
            )}
        </Mutation>;
    }

    updateProductMutation() {
        return <Mutation
            mutation={UpdateProduct}
            update={(cache, {data: {updateProduct}}) => {
                const {products} = cache.readQuery({query});
                const index = products.findIndex(product => product.id === this.state.activeProductId);

                console.log(this.state.name); // TODO outdated state

                products[index].name = this.state.name;
                products[index].price = this.state.price;

                cache.writeQuery({
                    query,
                    data: {products}
                });
            }}
        >
            {updateProduct => (this.productItemDetails(updateProduct)
            )}
        </Mutation>;
    }

    render() {
        const {newItem} = this.state;

        return (
            newItem ? this.addProductMutation()
                : this.updateProductMutation()
        );
    }
}

export default ProductDetails;