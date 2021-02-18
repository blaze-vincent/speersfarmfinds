import Link from 'next/link'

export default function Navbar(){

    return (<div id="navbar">
        <style jsx>{`
            #navbar {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100vw;
                margin: auto;
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
            h1 {
                text-align: center;
            }
        `}</style>

        <div id="title">
            <h1>Speer's Farm Finds</h1>
            <h1>& Gift Boutique</h1>
        </div>

        <div id="links-container">
            <Link href="/">
                <a>home</a>
            </Link>
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
    </div>)
}