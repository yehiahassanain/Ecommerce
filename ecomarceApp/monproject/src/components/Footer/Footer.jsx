import React, { useState, useEffect } from 'react';
import Style from './Footer.module.css';


export default function Footer() {
    const [counter, setCounter] = React.useState(0);
    useEffect(() => {

    }, []);
  return (
    <>
      <h1 >Footer</h1>
      <p >Lorem ipsum dolor sit amet.</p>
    </>
  )
}
