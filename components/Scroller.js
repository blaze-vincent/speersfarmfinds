import Link from "next/link";
import SalesItem from "./SalesItem";
import { useRef } from 'react';

export default function Scroller(props){

    let touchCaptured = false;
    let grabCaptured = false;
    let grabClientXIn = 0;
    let grabClientScrollPos = 0;

    let thisRef = useRef(null);

    const millisecondConstraint = 50;
    let lastMouseMoveUpdate;

    let scrollerHeight;
    let scrollerItemWidth;
    let scrollerMargin;
    const scrollerWidth = "100vw";

    const setVariableDimensions = (scrollerItemHeight) => {
        scrollerHeight = scrollerItemHeight;
        scrollerItemWidth = scrollerHeight * 1.5;
        scrollerMargin = scrollerHeight / 10;
    }
    setVariableDimensions(props.heightRemsInt || 16);

    const grabberMinWidth = 1200;

    const onMouseMove = (e) => {

        if(window.innerWidth >= grabberMinWidth){
            lastMouseMoveUpdate = lastMouseMoveUpdate || e.timeStamp;
            if( e.timeStamp - lastMouseMoveUpdate < millisecondConstraint ){ return } //delay prevents funky smooth scroll behavior and saves some cpu
            if(!touchCaptured){
                //ensure following action is taken only on scroller element, not pictures within
                while(!e.target.className.includes("scroller")){
                    e.target = e.target.parentNode;
                }
                const maxScroll = thisRef.current.scrollWidth - thisRef.current.clientWidth;
                //correlate scrollbar position with cursor position in div
                const scrollInBounds = ((e.clientX - .1*maxScroll)/(thisRef.current.clientWidth - (.2*maxScroll)))*maxScroll    
    
                thisRef.current.scroll({
                    left: scrollInBounds,
                    behavior: 'smooth'
                });
                lastMouseMoveUpdate = e.timeStamp;
            }
        } else
        if (grabCaptured) { 
            
            const dx = grabClientXIn - e.clientX;

            thisRef.current.scrollLeft = grabClientScrollPos + dx*3;
            
        }
    }

    const touchToggle = (e) => {
        e.preventDefault();
        touchCaptured = !touchCaptured;
    }

    const grabStart = e => {
        e.preventDefault();
        grabCaptured = true;
        setCursor();
        grabClientXIn = e.clientX;
        grabClientScrollPos = thisRef.current.scrollLeft;
    }
    const grabEnd = e => {
        e.preventDefault();
        grabCaptured = false;
        setCursor();
    }
    const setCursor = () => {
        if(parseInt(getComputedStyle(thisRef.current).width, 10) < grabberMinWidth && grabCaptured){
            thisRef.current.style.cursor = "grabbing";
        } else if(parseInt(getComputedStyle(thisRef.current).width, 10) < grabberMinWidth){
            thisRef.current.style.cursor = "grab";
        }else {
            thisRef.current.style.cursor = "default";
        }
    }

    return (<div className="scroller" onMouseMove={onMouseMove} onTouchStart={touchToggle} onTouchEnd={touchToggle} onMouseDownCapture={grabStart} onMouseUpCapture={grabEnd} onMouseLeave={grabEnd} onMouseEnter={setCursor} ref={thisRef}>

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
                cursor: "default";
                position: relative;
                display: flex;
                overflow-x: scroll;
                overflow-y: hidden;
                ${scrollerWidth};
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
        `}</style>
    </div>)
}