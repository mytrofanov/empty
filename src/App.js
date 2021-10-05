import './App.css';
import axios from "axios";
import spinner from './img/Spin-1s-200px.svg'
import {useState} from "react";

function App() {
    let [load, setLoad] =  useState(true)

    console.log(load)
    axios.get("http://jsonplaceholder.typicode.com/posts")
        .then(res => {
            console.log(res.data);
            setLoad(false);
        }, reason => {
            console.log(reason)
        })
    console.log(load)

    return (
        <div>
            {load && <img src={spinner} alt="Спинер"/>}


        </div>
    );
}

export default App;
