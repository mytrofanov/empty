import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
            setLoading(true);

            axios.get("http://jsonplaceholder.typicode.com/posts")
                .then(response => {
                    setLoading(false);
                    setPosts(response.data)
                })
                .catch(error => console.log(error))

        }, []
    );


    const MessageFilter = (searchText) => {
        console.log (searchText.currentTarget.value)
    }



    return (
        <div className="messageTableBlock">

            {loading && "Loading"}
<div className="searchBlock">
    Search:

    <input type="text"  id="searchField" key="searchField" onChange={MessageFilter} />

</div>

            <table>
                <tbody>
                <th>№ п/п</th>
                <th>user Id</th>
                <th>post Id</th>
                <th>message body</th>
                {posts.map((post, index) =>

                    <tr key={index}>

                        <td> {index}</td>
                        <td> {post.userId}</td>
                        <td> {post.id}</td>
                        <td id="messageBody">{post.title}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
