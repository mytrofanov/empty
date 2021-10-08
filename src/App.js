import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";



function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [inputTextValue, setInputTextValue] = useState("")
    const [pageNumber, setPageNumber] = useState(1)



    // ==================== запрос на сервер =================
    useEffect(() => {
            setLoading(true);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumber}`)
                .then(response => {
                    setLoading(false);
                    setPostsFromServer(postsFromServer=>postsFromServer.concat(response.data.items))
                    setFilteredPosts(filteredPosts=>filteredPosts.concat(response.data.items))
                    setTotalCount(response.data.totalCount)

                })
                .catch(error => console.log(error))

        }, [pageNumber]
    );

    // =============== фильтрация входящих массивов ==================
    const filtered = (e) => {
        const filtered =
            postsFromServer &&
            postsFromServer.filter((item) => {
                return item.name.toLowerCase().includes(e.toLowerCase())
            })
        setFilteredPosts(filtered)
    }



    // ================= управление кнопками ========================

    const IncreasePageNumber = () => {
        setPageNumber(pageNumber + 1)
        console.log('Кнопка нажата')
    }




    return (
        <div>

            <button onClick={IncreasePageNumber}>Следующая страница</button>


            <div className="searchBlock">
               <span >
                Искать в маленькой таблице:

                <input type="text" id="searchField"
                       placeholder="search"
                       value={inputTextValue}
                       key="searchField"
                       onChange={(event => {
                           setInputTextValue(event.target.value)
                           filtered(event.target.value)
                       })}/>

            </span>


            </div>


            <div>Отображено записей {filteredPosts.length} из {totalCount} </div>
            <b>   Страница № {pageNumber} </b>

        <div className="AllTables">
            <div className="SmallTable">

        <div className="messageTableBlock">

            {loading && "Loading"}




            <table>

                <tbody>
                <tr>
                    <th>№ п/п</th>
                    <th>user Id</th>
                    <th>Name</th>

                </tr>

                {filteredPosts && filteredPosts.length > 0 ?
                    filteredPosts.map((post, index) =>


                        <tr key={index}>

                            <td> {index}</td>
                            <td> {post.id}</td>
                            <td> {post.name}</td>

                        </tr>) : null
                }

                </tbody>
            </table>
        </div>

            </div>

        </div>
        </div>
    );
}

export default App;
