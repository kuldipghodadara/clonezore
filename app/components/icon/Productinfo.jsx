import React from 'react';

const ProductInfo = ({title, price}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{price}</p>
    </div>
  );
};

export default ProductInfo;
