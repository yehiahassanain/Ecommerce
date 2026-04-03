import React, { useState, useEffect } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {ClimbingBoxLoader} from 'react-spinners';
import useProducts from '../../Hooks/useProducts';


export default function Categories() {
   let {data, isError, error, isLoading, isFetching } = useProducts();
   
   
   
   
   console.log(data);
   
   if (isError)
   {
     return <div className='flex justify-center items-center h-screen'>
       <h3>{error.message}</h3>
     </div>
   } 
   if (isLoading)
   {
     return <div className='flex justify-center items-center h-screen'>
       <ClimbingBoxLoader color="#36d7b7" />
     </div>
   } 
      // const [recentProducts, setRecentProducts] = React.useState([]);
   
       // function getProducts() {
       //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
       //   .then(({data}) => {
       //     // console.log("Response : ", data.data);
       //     setRecentProducts(data.data);
       //   })
       //   .catch((error) => {
       //     console.log("Error : ", error);
       //   });
       // }
   
   
       // useEffect(() => {
       //   getProducts();
       // }, []);
     return (
       <>
         <div className='row my-5'>
         {data.map((product) => (
           <div className='product w-1/6 px-4' key={product.id}>
           <Link to={`/productdetails/${product.id}/${product.category.name}`}>
           <img src={product.imageCover} alt={product.title} />
             <h3 className='font-light text-green-600'>{product.category.name}</h3>
             <p className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</p>
             <div className='mb-4'>
               <span className='text-lg font-bold text-gray-900 mr-4'>{product.price} EGP</span>
               <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
             </div>
             <button className='btn px-4 py-2 w-full rounded-lg text-white bg-green-600'>Add to Cart</button>
          </Link>
              </div>
         ))}
         </div>
       </>
     )
}
