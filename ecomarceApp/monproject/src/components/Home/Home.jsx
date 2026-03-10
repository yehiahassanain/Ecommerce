import React, {useEffect } from 'react';
import Style from './Home.module.css';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../categoriesSlider/categoriesSlider';
import MainSlidere from '../MainSlidere/MainSlidere';



export default function Home() {
    // const [counter, setCounter] = React.useState(0);
    useEffect(() => {

    }, []);
  return (
    <>
    <MainSlidere/>
      <CategoriesSlider />
      <RecentProducts />
    </>
  )
}
