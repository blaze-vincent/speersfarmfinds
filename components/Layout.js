import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function Layout( props ) {

    const grabberMinWidth = 1200;

    return(<div id="layout">
        <style jsx>{`
            #layout {
                background-color: #222;
                color: #ddd;
                display: block;
                overflow-x: hidden;
                overflow-y: scroll;
                width: 100vw;
                height: 100vh;
            }

            #grab-mode-detector { background-color: white; display: none;}

            @media only screen and (max-width: ${grabberMinWidth}) {
                #grab-mode-detector { background-color: black; }
            }

            footer {
                display: block;
                position: relative;
                height: 1rem;
                width: 100vw;
                content: "";
            }
        `}</style>

        <Head>
            <title>Speer's Farm Finds</title>
            <meta name="keywords" content="boutique, flowers, bouquets, farmhouse primitive, gifts" />
            <meta name="description" content="Speer's Farm Finds & Gift Boutique. View all items available for purchase."/>
        </Head>
        <div id="grab-mode-detector" />

        <Navbar noContact={props.noContact ? props.noContact : ""} />

        {props.children}
        <footer />
    </div>);
}

