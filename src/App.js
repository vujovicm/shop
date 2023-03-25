import productsJson from './products.json';
import Dropdown from './Dropdown';
import './App.css';
import { useState } from 'react';

function App() {
  const [products, setProducts]= useState(productsJson);
  const [availableProductsOnly, setAvailableProductsOnly] = useState(false);

  // State from Dropdown that we need here
  const[selectedSortOption, setSelectedSortOption]= useState(null);

  const dropdownOptions = [
    {id: 1, label: "Sort by name asc", sortMethod : (a, b) => (a.title > b.title ? 1 : -1)},
    {id: 2, label: "Sort by name desc", sortMethod : (a, b) => (a.title > b.title ? -1 : 1)},
    {id: 3, label: "Sort by price asc", sortMethod : (a, b) => (calculatePrice(a) - calculatePrice(b) )},
    {id: 4, label: "Sort by price desc", sortMethod : (a, b) => (calculatePrice(b) - calculatePrice(a) )}
  ]

  // Default sort is biggest sale first
  const defaultSort = (a, b) => {
    if (a.sale && b.sale) {
      return b.sale - a.sale;
    }
    else if (a.sale) {
      return -1;      
    }
    else if (b.sale) {
      return 1;
    }
    return 0;
  }
  const sortMethod = selectedSortOption ? selectedSortOption.sortMethod : defaultSort;

  const updateSortOption = (option) => {
    setSelectedSortOption(option);
  }

  const checkboxClicked = () => {
    const checkValue = !availableProductsOnly;
    setAvailableProductsOnly(checkValue);
    if (checkValue) {
      const filteredProducts = productsJson.filter(p => p.available === checkValue);
      console.log(filteredProducts);
      setProducts(filteredProducts);
    }
    else {
      setProducts(productsJson);
    }
  }

  const calculatePrice = (product) => {
    const {price, sale} = product;
    if (!sale){
      return price;
    }
    return price- sale/100*price;
  }

  return (
    <div className='homeContainer'>

      <div className='App-header'> 
          <div className= 'headerText'> Maja's Shop </div> 
            <img src={"/logoImg.png"} alt='' />
          </div>
      

      <div className='h2'> <Dropdown placeHolder={" Sort by " } options={dropdownOptions} updateSortOption={updateSortOption}> </Dropdown> </div>
      
      <label className='h2'> Show only available 
      <input type={"checkbox"} value={availableProductsOnly} onClick={checkboxClicked} />
      </label>
    
        
      <div className='grid'>
        {products.sort(sortMethod).map(product => {
        return (
          <div key={product.id} className='card'>
            <img src={product.image} alt={`Preview of ${product.title}` } />
            <h3> { product.title } </h3>
            <div>{ product.description } </div>
            {product.sale ? <div className='priceDiv'><p className='striked'> { product.price } rsd </p> <p> { calculatePrice(product) } rsd </p></div> : <div> { product.price } rsd </div>}
            {product.sale && <div className='onSale'> { product.sale }% OFF </div>}
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;