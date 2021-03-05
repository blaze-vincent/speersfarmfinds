import { useState, useEffect } from 'react';

export default function SalesItem(props){

    const [authorized, setAuthorized] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(false);

    const [isSelected, setSelected] = useState(false);
    const toggleSelected = () => setSelected(!isSelected);

    let swiping = false;

    useEffect(() => {
        if(document.cookie[1]){
            setAuthorized(true);
        }
    }, [])

    const deleteItem = async (itemImgUrl) => {
        await fetch('/api/upload', {
            method: 'DELETE', 
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify({
                itemImgUrl,
                token: document.cookie
            })
        }).then(response => {
            console.log(response);
        })
    }

    return (<div 
        className={`sales-item ${isSelected ? "selected" : ""}`} 
        onMouseEnter={toggleSelected} 
        onMouseLeave={toggleSelected} 
        onTouchMove={()=>{swiping = true}}
        onTouchEnd={()=>{ if(!swiping){toggleSelected()} else {swiping = false}}}
    >
        <img src={props.data ? props.data.imgUrl : "https://picsum.photos/2000/998/"}/>
        <div className={`sales-item-content ${isSelected ? "selected" : ""}`}>
            {itemDeleted ? (
                <p>(item deleted, will disappear upon reload)</p>
            ) : ""}
            <h4>{props.data? props.data.name : "SALES ITEM"}</h4>
            <h5>{props.data? props.data.price : "$15.00"}</h5>
            <p>{props.data? props.data.description : "BRIEF DESCRIPTION OF PRODUCT"}</p>
            {authorized ? !itemDeleted ? (
                <button onClick={e => {
                    if(itemDeleted){return}
                    deleteItem(e.target.parentNode.previousSibling.src)
                    setItemDeleted(true);
                }}
                onTouchEnd={e => {
                    if(!swiping){
                        if(itemDeleted){return}
                        deleteItem(e.target.parentNode.previousSibling.src)
                        setItemDeleted(true);
                    }
                }}>delete item</button>
            ) : "" : ""}
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
            @media only screen and (max-width: 500px){
                .sales-item {
                    margin-right: 5vw; margin-left: 5vw;
                    width: 90vw;
                }
                .sales-item.selected {
                    width: 95vw;
                    margin-left: 2.5vw; margin-right: 2.5vw;
                }
                .sales-item-content.selected {
                    padding: 1.5rem;
                }
            }
            button {
                z-index: 1000;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 5rem;
                margin: 1rem;
            }
        `}</style>
    </div>)
}