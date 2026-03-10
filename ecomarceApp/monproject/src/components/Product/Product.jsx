import React, { useState, useEffect } from 'react';
import Style from './Product.module.css';


export default function Product() {
    const [counter, setCounter] = React.useState(0);
    useEffect(() => {

    }, []);
  return (
    <>
      <h1 >Product</h1>
      <p >Lorem ipsum dolor sit amet.</p>
    </>
  )
}
