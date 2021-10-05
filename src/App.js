import './App.css';
import spinner from './img/Spin-1s-200px.svg'
import {useState} from "react";

import axios from "axios";

function App() {
    let users = []
    // let user = {
    //     userId: null,
    //     id: null,
    //     title: null,
    //     body: null
    // }
    const setUsers = (response)=> {
        users.push(response)
    }

    let [load, setLoad] = useState(true)

    const getFunction = () => {
        axios.get("http://jsonplaceholder.typicode.com/posts")
            .then(res => {
                setUsers (res.data);
                setLoad(false);
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    console.log('Статус загрузки:' + load)
     getFunction()
    console.log('Статус загрузки:' + load)
    console.log(users)

    return (
        <div>
            {load && <img src={spinner} alt="Спинер"/>}
            {users.map(u =>
            <div>u.userId</div>

            )}

        </div>
    );
}

export default App;
