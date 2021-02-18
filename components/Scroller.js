import Link from "next/link";

export default function Scroller(props){

    let touchCaptured = false;
    const millisecondConstraint = 50;
    let lastMouseMoveUpdate;

    const scrollerHeight = parseInt(props.heightRemsInt) || 16;
    const scrollerWidth = scrollerHeight * 1.5;
    const scrollerMargin = scrollerHeight / 10;

    const onMouseMove = (e) => {
        if(window.innerWidth > 900){
            lastMouseMoveUpdate = lastMouseMoveUpdate || e.timeStamp;
            if( e.timeStamp - lastMouseMoveUpdate < millisecondConstraint ){ return } //delay prevents funky smooth scroll behavior and saves some cpu
            if(!touchCaptured){
                //ensure following action is taken only on scroller element, not pictures within
                while(!e.target.className.includes("scroller")){
                    e.target = e.target.parentNode;
                }
    
                const scrollerDiv = e.target;
                const maxScroll = scrollerDiv.scrollWidth - scrollerDiv.clientWidth;
                //correlate scrollbar position with cursor position in div
                const scrollInBounds = ((e.clientX - .1*maxScroll)/(scrollerDiv.clientWidth - (.2*maxScroll)))*maxScroll    
    
                scrollerDiv.scroll({
                    left: scrollInBounds,
                    behavior: 'smooth'
                });
                lastMouseMoveUpdate = e.timeStamp;
            }
        }
    }

    const onTouchStart = (e) => {
        e.preventDefault();
        touchCaptured = true;
    }
    const onTouchEnd = (e) => {
        e.preventDefault();
        touchCaptured = false;
    }

    return (<div className="scroller" onMouseMove={onMouseMove} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {props.titleLink
         ? <Link href={props.titleLink}><h3 className="link">{props.title}</h3></Link>
         : <h3>{props.title}</h3>
        }

        {
            [ ...Array(10) ].fill(<div className="sales-item">
                <img src={"https://picsum.photos/2000/998/"}/>
                <div className="sales-item-content">
                    <h4>SALES ITEM</h4>
                    <h5>$15.00</h5>
                    <p>BRIEF DESCRIPTION ABOUT SALES ITEM</p>
                </div>
            </div>)
        } 

        <div className="scroller-end-bumper">|</div>

        <style jsx>{`
            .scroller {
                position: relative;
                display: flex;
                overflow-x: scroll;
                overflow-y: hidden;
                width: 100vw;
                height: ${scrollerHeight}rem;
                margin-top: 1rem;
            }
            .link {
                text-decoration: underline;
                cursor: pointer;
            }
            h3 {
                z-index: 10;
                transition: 0.25s;
                color: white;
                font-size: 1.25rem;
                mix-blend-mode: luminosity;
                display: block;
                position: sticky;
                height: 2rem;
                white-space: nowrap;
                top: 0;
                width: 0;
                left: ${scrollerMargin}rem;
                text-align: center;
            }
            .sales-item {
                transition: 0.25s;
                background-color: #ddd;
                display: block;
                margin-right: ${scrollerMargin}rem; margin-left: ${scrollerMargin}rem;
                height: ${scrollerHeight}rem;
                width: ${scrollerWidth}rem;
            }
            .sales-item img {
                transition: 0.25s;
                width: inherit;
                height: inherit;
                object-fit: cover;
            }
            .sales-item-content {
                background-color: black;
                mix-blend-mode: luminosity;
                color: #fff;
                transition: 0.25s;
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: absolute;
                width: inherit;
                height: inherit;
                padding: 1rem;
                bottom: 0;
                opacity: 0;
            }
            .scroller-end-bumper {
                display: block;
                position: relative;
                width: ${scrollerMargin * 2}rem;
                opacity: 0;
            }
            @media only screen and (min-width: 1601px) {
                @media (hover: hover) and (pointer: fine) {
                    .sales-item img:hover {
                        transition: 0.25s;
                        height: ${scrollerHeight+2}rem;
                    }
                    .sales-item:hover {
                        transition: 0.25s;
                        width: ${scrollerWidth + scrollerMargin}rem;
                        margin-left: ${scrollerMargin / 2}rem; margin-right: ${scrollerMargin / 2}rem;
                    }
                    .sales-item-content:hover {
                        transition: 0.25s;
                        padding: 2.25rem;
                        opacity: 0.6;
                    }
                }
            }
            @media only screen and (max-width: 1600px) {
                .sales-item {
                    width: 21rem;
                    margin-left: 1rem;
                    margin-right: 1rem;
                }
                @media (hover: hover) and (pointer: fine) {
                    .sales-item img:hover {
                        transition: 0.25s;
                        height: ${scrollerHeight+2}rem;
                    }
                    .sales-item:hover {
                        transition: 0.25s;
                        width: 22rem;
                        margin-left: 0.5rem; margin-right: 0.5rem;
                    }
                    .sales-item-content:hover {
                        transition: 0.25s;
                        padding: 1.5rem;
                        opacity: 0.6;
                    }
                }
            }
            @media only screen and (max-width: 1200px) {
                .sales-item {
                    width: 20rem;
                }
            }
            @media only screen and (max-width: 600px) {
                .sales-item {
                    width: 19rem;
                }
            }
            @media only screen and (min-width: 1000px) {
                h3 {
                    transition: 0.25s;
                    left: 5rem;
                }
            }
        `}</style>
    </div>)
}