export default function SalesItemUploadForm(){
    let typeChosen = false;
    let nameChosen = false;
    return (
    <div id="sales-item-submission-container">
        <form action="/api/upload" id="sales-item-submission" method="POST" encType="multipart/form-data" onSubmit={
            e => {
                if(!document.cookie.split('=')[1]){
                    e.preventDefault(); 
                    alert("You must be signed in to submit a sales item.")
                    return;
                }
                if(!typeChosen || !nameChosen){
                    e.preventDefault(); 
                    alert("Item name, type, and image file are required.")
                } 
            }}>

            <div className="horizontal">
                <div>
                    <input type="radio" name="type" value="flower" id="flower" onChange={()=>{typeChosen = true}}/><label htmlFor="flower">Flower</label>
                </div>
                <div>
                    <input type="radio" name="type" value="farmhouse primitive" id="farmhouse-primitive" onChange={()=>{typeChosen = true}}/><label htmlFor="farmhouse-primitive">Farmhouse Primitive</label>
                </div>
                <div>
                    <input type="radio" name="type" value="gift miscellanea" id="gift-miscellanea" onChange={()=>{typeChosen = true}}/><label htmlFor="gift-miscellanea">Gift Miscellanea</label>
                </div>
            </div>
            <div className="horizontal">
                <label htmlFor="name">Enter product name:</label><input type="text" name="name" id="name" onChange={()=>{nameChosen = true}}></input>
            </div>
            <div className="horizontal">
                <label htmlFor="description">Enter brief item description:</label><input type="text" name="description" id="description"></input>
            </div>
            <div className="horizontal">
                <label htmlFor="price">Enter price:</label><input type="text" id="price" name="price"></input>
            </div>
                <label htmlFor="img">Select image:</label> <input type="file" id="img" name="productImage" accept="image/*"/>
            <input type="submit" value="Submit" onClick={e=>{
                let cookieInput = document.querySelector('.cookieInput') || document.createElement('input');
                cookieInput.setAttribute('class', 'cookieInput');
                cookieInput.setAttribute('name', 'cookie');
                cookieInput.setAttribute('value', document.cookie);
                cookieInput.setAttribute('type', 'hidden');
                if(cookieInput.parentElement !== e.target.parentNode){
                    e.target.parentNode.appendChild(cookieInput);
                }
            }}/>
        </form>

        <style jsx>{`
            #sales-item-submission-container{
                background-color: #333;
                padding: 0.5rem;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: column;
                width: 25rem;
                height: 11.5rem;
                margin: auto; margin-top: 0.5rem;
            }
            #sales-item-submission{
                display: flex;
                flex-direction: column;
            }
            .horizontal {
                margin-top: 0.125rem; margin-bottom: 0.125rem;
                display: flex;
                direction: row;
                justify-content: space-between;
            }
        `}</style>
    </div>)
}