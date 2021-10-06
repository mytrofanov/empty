import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [posts, setPosts] = useState([
    ])
    const [loading,setLoading] =useState(false)

    useEffect(() => {
        setLoading(true)
        console.log("Начало загрузки"+loading)
            axios.get("http://jsonplaceholder.typicode.com/posts")
                .then(response => {
                    setLoading(false)
                    console.log("Конец загрузки" + loading)
                    setPosts(response.data)})
                .catch(error => console.log(error))

        }, []
    );


    return (
        <div>
            {loading && "Loading"}

            <table>
                <tbody>
                {posts.map((post,index) =>

                    <tr key={index}>
                        <td> {index}</td>
                        <td> {post.id}</td>
                        <td>{post.title}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
