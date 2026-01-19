import React from 'react';
import Banner from '../../components/home/Banner';
import Brands from '../../components/home/Brands';
import Reviews from '../../components/home/Reviews';
import FactoryMap from '../../components/home/FactoryMap';
import HowItWorks from '../../components/home/HowItWorks';
import OurProducts from '../../components/home/OurProducts';
import Faq from '../../components/home/Faq';
import Helmet from '../../components/common/Helmet';
import CallToAction from '../../components/home/CallToAction';
import Stats from '../../components/home/Stats';
import Newsletter from '../../components/home/Newsletter';

const HomePage = () => {
    return (
        <div>
            <Helmet title="Home" />
            <Banner/>
            <Stats/>
            <OurProducts/>
            <HowItWorks/>
            <CallToAction/>
            <Brands/>
            <Reviews/>
            <FactoryMap/>
            <Faq/>
            <Newsletter/>
        </div>
    );
};

export default HomePage;