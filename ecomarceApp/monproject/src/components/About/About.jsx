import React, { useState, useEffect } from 'react';
import Style from './About.module.css';


export default function About() {
    const [counter, setCounter] = React.useState(0);
    useEffect(() => {

    }, []);
  return (
    <>
      <h1 >About</h1>
      <p >Lorem ipsum dolor sit amet.</p>
    </>
  )
}
