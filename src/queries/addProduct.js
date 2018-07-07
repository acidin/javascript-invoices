`
mutation DeleteProduct($id: ID) {
    deleteProduct(id: $id) {
        name
        price
    }
}
`;

`
mutation CreateProduct($name: String, $price: Float) {
    addProduct(name: $name, price: $price) {
        id
        name
        price
    }
}
`;

`
mutation UpdateProduct($id: ID, $name: String, $price: Float) {
    updateProduct(id: $id, name: $name, price: $price) {
        name
        price
    }
}
`;