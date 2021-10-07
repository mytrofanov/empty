import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [q, setQ] = useState("")



    useEffect(() => {
            setLoading(true);

            axios.get("http://jsonplaceholder.typicode.com/posts")
                .then(response => {
                    setLoading(false);
                    setPostsFromServer(response.data)
                    setFilteredPosts(response.data)
                })
                .catch(error => console.log(error))

        }, []
    );
    const filtered = (e) => {
      const filtered =
          postsFromServer &&
          postsFromServer.filter((item) => {
              return item.title.toLowerCase().includes(e)
          })
          setFilteredPosts(filtered)

      }


    // const MessageFilter = (searchText) => {
    //      let searchWord = searchText.currentTarget.value
    //     resultPosts = posts.find(word => word.title.includes(searchWord))
    //        }

console.log (filteredPosts)

    return (
        <div className="messageTableBlock">

            {loading && "Loading"}
            <div className="searchBlock">
                Search:

                <input type="text" id="searchField"
                       placeholder="search"
                       value={q}
                       key="searchField"
                       onChange={(event => {
                           setQ(event.target.value)
                           filtered(event.target.value)
                       })}/>

            </div>

            <table>
                <tbody>
                <th>№ п/п</th>
                <th>user Id</th>
                <th>post Id</th>
                <th>message title</th>
                <th>message body</th>

                {filteredPosts && filteredPosts.length >0 ?
                    filteredPosts.map((post, index) =>


                    <tr key={index}>

                        <td> {index}</td>
                        <td> {post.userId}</td>
                        <td> {post.id}</td>
                        <td id="messageBody">{post.title}</td>
                        <td id="messageBody">{post.body}</td>
                    </tr>): null
                }

                </tbody>
            </table>
        </div>
    );
}

export default App;
