import './App.css';
import axios from "axios";
import spinner from './img/Spin-1s-200px.svg'

function App() {

    let load = true;
    console.log(load)
    axios.get("http://jsonplaceholder.typicode.com/posts")
        .then(res => {
            console.log(res.data);
            load = false;
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
