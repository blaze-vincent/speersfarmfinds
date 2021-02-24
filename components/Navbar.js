import Link from 'next/link'

export default function Navbar(){

    return (<div id="navbar-contact-shared-container">
        <style jsx>{`
                #title {
                    cursor: pointer;
                }
                #navbar-contact-shared-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    width: 100vw;
                    justify-content: center;
                }
                #navbar {
                    grid-column-start: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: none;
                }
                #title {
                    display: block;
                    width: auto;
                    height: auto;
                    margin: auto;
                }
                #links-container {
                    position: sticky;
                    top: 0;
                    left: 0;    
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: inherit;
                    max-width: 25rem;
                }
                a {
                    text-align: center;
                    cursor: pointer;
                    font-weight: 400;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                }
                h1, h2 {
                    text-align: center;
                }
                #contact-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                @media (pointer: coarse), (pointer: fine) {
                    a:hover, #title:hover {
                        color: #fff;
                    }
                }
                @media only screen and (max-width: 900px) {
                    #navbar-contact-shared-container {
                        grid-template-columns: 4fr 1fr;
                    }
                    #navbar {
                        grid-column-start: 1;
                    }
                }
                @media only screen and (max-width: 550px) {
                    #navbar-contact-shared-container {
                        display: flex;
                        flex-direction: column;
                        width: 100vw;
                        justify-content: center;
                    }
                }
            `}</style>
            <div id="navbar">
            <div id="title">
                <Link href="/">
                    <div id="title">
                        <h1>Speer's Farm Finds</h1>
                        <h1>& Gift Boutique</h1>
                    </div>
                </Link>
            </div>

            <div id="links-container">
                <Link href="/flowers">
                    <a>fresh flowers</a>
                </Link>
                <Link href="/decor">
                    <a>farmhouse primitive</a>
                </Link>
                <Link href="/gifts">
                    <a>gift misc.</a>
                </Link>
            </div>
        </div>
        <div id="contact-container">
            <h2>Contact</h2>
            <Link href="tel:319-837-8107">
                <a>(319) 837-8107</a>
            </Link>
            <Link href="mailto:ktzspeer@hotmail.com">
                <a>ktzspeer@hotmail.com</a>
            </Link>
            <Link href="https://www.facebook.com/Speers-Farm-Finds-Gift-Boutique-100174395369762/">
                <a>Facebook</a>
            </Link>
        </div>
    </div>)
}