import Navbar from '../components/Navbar';

export default function Layout( props ) {


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
        `}</style>

        <Navbar />
        {props.children}
        <footer>

        </footer>
    </div>);
}

