import './App.css';
import spinner from './img/Spin-1s-200px.svg'
import {useState} from "react";

import axios from "axios";
import {Item} from "./item";

function App() {
    // let users = []
    // let user = {
    //     userId: null,
    //     id: null,
    //     title: null,
    //     body: null
    // }
    let [arr, setArray] = useState([{
        userId: null,
        id: null,
        title: null,
        body: null
    }])

    const setUsers = (response)=> {
        setArray(response)
    }

    let [load, setLoad] = useState(true)

    const getFunction = () => {
        axios.get("http://jsonplaceholder.typicode.com/posts")
            .then(res => {
                setUsers (res.data);
                console.log('статус загрузки:' + res.statusText)
                setLoad(false);
            })
            .catch(error => {
                console.log("error message:", error);
            });
    }

    console.log('Статус загрузки:' + load)
     getFunction()
    console.log('Статус загрузки:' + load)


    return (
        <div>
            {load && <img src={spinner} alt="Спинер"/>}
            Данные пользователей:
            {arr.map(u =>
            <Item userId={u.id} id={u.id} title={u.title} body={u.body} />

            )}

        </div>
    );
}

export default App;