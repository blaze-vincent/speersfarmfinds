import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function Layout( props ) {

    const [grabberMode, setGrabberMode] = useState(false);

    const scrollerListen = () => {
        console.log(getComputedStyle(document.querySelector('#grab-mode-detector')).backgroundColor  === "rgb(0, 0, 0)");
    }
    useEffect(()=> {
        scrollerListen();
    }, []);
    useEffect(()=> {
        window.addEventListener('resize', scrollerListen);
    }, []);

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

            @media only screen and (max-width: 900px) {
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

