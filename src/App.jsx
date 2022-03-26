import { hot } from "react-hot-loader";
import React, { useState } from 'react';

const ProductCategoryRow = (props) => {
    const category = props.category;

    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}

const ProductRow = (props) => {
    const product = props.product;
    const name = product.stocked ?
        product.name :
        <span style={{color: 'red'}}>
            {product.name}
        </span>;
    
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
} 

const ProductTable = (props) => {
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const rows = [];
    let lastCategory = null;

    props.products.forEach((product) => {
        if (product.name.indexOf(filterText) === -1) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            )
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name} />
        );
        lastCategory = product.category
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

const SearchBar = (props) => {
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const setFilterText = props.setFilterText;
    const setInStockOnly = props.setInStockOnly;

    const handleFilterTextChange = (e) => {
        setFilterText(e.target.value);
    }

    const handleInStockOnlyChange = () => {
        setInStockOnly(!inStockOnly);
    }

    return (
        <form>
            <input 
                type='text' 
                placeholder='Search...' 
                onChange={handleFilterTextChange}
                value={filterText} />
            <p>
                <input 
                    type='checkbox'
                    onChange={handleInStockOnlyChange}
                    value={inStockOnly} />
                {' '}
                Only show products in stock
            </p>
        </form>
    );
}

const FilterableProductTable = (props) => {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar 
                filterText={filterText}
                inStockOnly={inStockOnly}
                setFilterText={setFilterText}
                setInStockOnly={setInStockOnly}
            />
            <ProductTable 
                products={props.products} 
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    );
}

export default hot(module)(FilterableProductTable);