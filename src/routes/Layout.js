import { Outlet } from 'react-router-dom'
import React from 'react'
import { useEffect, useState } from 'react';
import Navigation from '../pages/Navigation';
import Footer from '../pages/Footer';

function Layout() {
    const [isLoggedIn, setIsLoggedIn] = useState();

    // useEffect(() => {
    //     if (loading) {
    //         setIsLoggedIn(localStorage.getItem("token"));
    //     } else {
    //         setIsLoggedIn(null)
    //     }
    // }, [isLoggedIn])

    return (
        <div>
            <div className="flex relative dark:bg-main-dark-bg" >
                <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full`} >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full" >
                        <Navigation />
                    </div>

                    <div>
                        <main className='App' >
                            <Outlet />
                        </main>
                    </div>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout