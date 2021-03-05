import {useState, useEffect } from 'react';

export default function LoginForm(){

    const [password, setPassword] = useState('');
    const [authorized, setAuthorized] = useState(false); //used to show user they are authorized to upload sales items

    useEffect(()=>{
        if(document.cookie[1]){
            setAuthorized(true);
        }
    }, [])

    return (<div id='login-form'>
        <form action='/api/login' method='POST' onSubmit={e=>{
                e.preventDefault();
                if(password){
                    fetch('/api/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify({password}) })
                    .then(response => {
                        if(response.ok){
                            return response.json()
                        }
                    })
                    .then(obj => {
                        document.cookie = `token=${obj.token}; samesite=strict;`;
                        setAuthorized(true);
                    }).catch(err => {
                        document.cookie = "token=; samesite=strict";
                    })
                }
            }}>
            {!authorized ? (
                <div className="horizontal">
                    <input type="password" name="password" onChange={e=>{setPassword(e.target.value)}}></input>
                    <input type='submit' value='login'></input>
                </div>  
            ) : ""}
            <p>you are {authorized ? "" : " not "} logged in</p>
            <p>submitted items will {authorized ? "" : " not "} be added to the database</p>
        </form>
        <style jsx>{`
            #login-form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 25rem;
                margin: auto; margin-top: 0.5rem; margin-bottom: 0.5rem;
            }
            input {
                border: 1px solid #aaa;
            }
            p {
                display: block;
                margin: auto;
                width: max-content;
                position: relative;
                top: 0;
                right: 0;
            }
            .horizontal {
                margin: auto;
                width: min-content;
                display: flex;
                flex-direction: row;
                align-content: center;
            }
        `}</style>
    </div>)
}