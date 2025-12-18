import React from 'react';
import Banner from '../../components/home/Banner';
import Brands from '../../components/home/Brands';
import Reviews from '../../components/home/Reviews';
import FactoryMap from '../../components/home/FactoryMap';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <Brands/>
            <Reviews/>
            <FactoryMap/>
        </div>
    );
};

export default HomePage;