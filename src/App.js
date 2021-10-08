import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputTextValue, setInputTextValue] = useState("")
    const [pageNumber, setPageNumber] = useState(1)



    useEffect(() => {
            setLoading(true);

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumber}`)
                .then(response => {
                    setLoading(false);
                    setPostsFromServer(response.data.items)
                    setFilteredPosts(response.data.items)
                })
                .catch(error => console.log(error))

        }, [pageNumber]
    );
    const filtered = (e) => {
      const filtered =
          postsFromServer &&
          postsFromServer.filter((item) => {
              return item.title.toLowerCase().includes(e.toLowerCase())
          })
          setFilteredPosts(filtered)

      }


    // const MessageFilter = (searchText) => {
    //      let searchWord = searchText.currentTarget.value
    //     resultPosts = posts.find(word => word.title.includes(searchWord))
    //        }


    return (
        <div className="messageTableBlock">

            {loading && "Loading"}
            <div className="searchBlock">
                Search:

                <input type="text" id="searchField"
                       placeholder="search"
                       value={inputTextValue}
                       key="searchField"
                       onChange={(event => {
                           setInputTextValue(event.target.value)
                           filtered(event.target.value)
                       })}/>

            </div>

            <div>Выбрано {filteredPosts.length} записей из {postsFromServer.length}   </div>

            <table>

                <tbody>
                <tr>
                    <th>№ п/п</th>
                    <th>user Id</th>
                    <th>Name</th>

                </tr>

                {filteredPosts && filteredPosts.length >0 ?
                    filteredPosts.map((post, index) =>


                    <tr key={index}>

                        <td> {index}</td>
                        <td> {post.id}</td>
                        <td> {post.name}</td>

                    </tr>): null
                }

                </tbody>
            </table>
        </div>
    );
}

export default App;
