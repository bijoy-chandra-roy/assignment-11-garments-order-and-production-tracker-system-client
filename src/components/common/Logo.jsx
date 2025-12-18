import React from 'react';

const Logo = () => {
    return (
        <div className='logo flex items-end h-12'>
            <img src="/haystack-logo.svg" alt="" className='h-full pb-2'/>
            <h1 className='text-3xl pl-1'>haystack</h1>
        </div>
    );
};

export default Logo;