import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function Layout( props ) {

    // const [grabberMode, setGrabberMode] = useState(false);
    const grabberMinWidth = 1200;

    // const scrollerListen = () => {
    //     setGrabberMode(window.innerWidth > grabberMinWidth);
    // }
    // useEffect(()=> {
    //     scrollerListen();
    // }, []);
    // useEffect(()=> {
    //     window.addEventListener('resize', scrollerListen);
    // }, []);

    return(<div id="layout">
        <style jsx>{`   
            #layout {
                background-color: #222;
                color: white;
                display: block;
                overflow-x: hidden;
                overflow-y: scroll;
                width: 100vw;
                height: 100vh;
            }
            footer {
                display: block;
                position: relative;
                width: 100%;
                height: 2rem;
            }

            #grab-mode-detector { background-color: white; display: none;}

            @media only screen and (max-width: ${grabberMinWidth}) {
                #grab-mode-detector { background-color: black; }
            }
        `}</style>
        <div id="grab-mode-detector" />

        <Navbar />
        {props.children}
        <footer>

        </footer>
    </div>);
}

