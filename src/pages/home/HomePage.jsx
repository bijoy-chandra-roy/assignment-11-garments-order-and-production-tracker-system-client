import React from 'react';
import Banner from '../../components/home/Banner';
import Brands from '../../components/home/Brands';
import Reviews from '../../components/home/Reviews';
import FactoryMap from '../../components/home/FactoryMap';
import HowItWorks from '../../components/home/HowItWorks';
import OurProducts from '../../components/home/OurProducts';
import Faq from '../../components/home/Faq';
import Helmet from '../../components/common/Helmet';

const HomePage = () => {
    return (
        <div>
            <Helmet title="Home" />
            <Banner/>
            <OurProducts/>
            <HowItWorks/>
            <Brands/>
            <Reviews/>
            <FactoryMap/>
            <Faq/>
        </div>
    );
};

export default HomePage;