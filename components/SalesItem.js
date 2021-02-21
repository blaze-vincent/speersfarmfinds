import { useState } from 'react';

export default function SalesItem(props){
    const [isSelected, setSelected] = useState(false);
    const toggleSelected = () => setSelected(!isSelected);

    return (<div className={`sales-item ${isSelected ? "selected" : ""}`} onMouseEnter={toggleSelected} onMouseLeave={toggleSelected}>
        <img src={"https://picsum.photos/2000/998/"}/>
        <div className={`sales-item-content ${isSelected ? "selected" : ""}`}>
            <h4>SALES ITEM</h4>
            <h5>$15.00</h5>
            <p>BRIEF DESCRIPTION ABOUT SALES ITEM</p>
        </div>

        <style jsx>{`
            .sales-item {
                transition: 0.25s;
                background-color: #ddd;
                display: block;
                margin-right: ${props.scrollerMargin}rem; margin-left: ${props.scrollerMargin}rem;
                height: ${props.scrollerHeight}rem;
                width: ${props.scrollerItemWidth}rem;
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
            .sales-item img.selected {
                transition: 0.25s;
                height: ${props.scrollerHeight+2}rem;
            }
            .sales-item.selected {
                transition: 0.25s;
                width: ${props.scrollerItemWidth + props.scrollerMargin}rem;
                margin-left: ${props.scrollerMargin / 2}rem; margin-right: ${props.scrollerMargin / 2}rem;
            }
            .sales-item-content.selected {
                transition: 0.25s;
                padding: 2.25rem;
                opacity: 0.6;
            }
        `}</style>
    </div>)
}