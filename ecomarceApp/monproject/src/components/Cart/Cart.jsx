import React, { useState, useEffect } from 'react';
import Style from './Cart.module.css';


export default function Cart() {
    const [counter, setCounter] = React.useState(0);
    useEffect(() => {

    }, []);
  return (
    <>
      <h1 >Cart</h1>
      <p >Lorem ipsum dolor sit amet.</p>
    </>
  )
}
