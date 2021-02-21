import Link from "next/link";
import SalesItem from "./SalesItem";

export default function Scroller(props){

    let touchCaptured = false;
    const millisecondConstraint = 50;
    let lastMouseMoveUpdate;

    const scrollerHeight = parseInt(props.heightRemsInt) || 16;
    const scrollerItemWidth = scrollerHeight * 1.5;
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
            [ ...Array(10) ].fill(<SalesItem scrollerHeight={scrollerHeight} scrollerItemWidth={scrollerItemWidth} scrollerMargin={scrollerMargin} />)
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
                left: ${scrollerMargin + 0.5}rem;
                text-align: center;
            }
            .scroller-end-bumper {
                display: block;
                position: relative;
                width: ${scrollerMargin * 2}rem;
                opacity: 0;
            }
            @media only screen and (max-width: 900px) {

            }
        `}</style>
    </div>)
}