import './App.css';
import spinner from './img/Spin-1s-200px.svg'
import {useState} from "react";

import axios from "axios";

function App() {
    let users = {
        userId:null,
        id: null,
        title:null,
        body:null
    }
    let [load, setLoad] = useState(true)


    const getFunction = () => {
        axios.get("http://jsonplaceholder.typicode.com/posts")
            .then(res => {
                console.log(res.data);
                setLoad(false);
            }, reason => {
                console.log(reason)
            })
    }

    console.log('Статус загрузки:' + load)
    getFunction()
    console.log('Статус загрузки:' + load)


    return (
        <div>
            {load && <img src={spinner} alt="Спинер"/>}


        </div>
    );
}

export default App;
