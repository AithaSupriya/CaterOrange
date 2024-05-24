import React from 'react'
import Card from "../components/Card";
import Carousel from "../components/Carousal";

const HomeContent = () => {
    return (
        <div>
            {/* <div > <Carousel /> </div> */}
            <div className='card-div'>
                <div className='m-3'><Card /></div>
            </div>
        </div>
    )
}

export default HomeContent
