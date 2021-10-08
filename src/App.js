import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [bigPortionOfPosts, setBigPortionOfPosts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [inputTextValue, setInputTextValue] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
    const [pageNumberForBigPortion, setPageNumberForBigPortion] = useState(1)


    // ==================== запрос на сервер =================
    useEffect(() => {
            setLoading(true);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumber}`)
                .then(response => {
                    setLoading(false);
                    setPostsFromServer(response.data.items)
                    setFilteredPosts(response.data.items)
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

    }
    const reducePageNumber = () => {
        pageNumber > 1 && setPageNumber(pageNumber - 1)
    }

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumberForBigPortion}`)
            .then(response => {
                setBigPortionOfPosts(bigPortionOfPosts => bigPortionOfPosts.concat(response.data.items))
            })
    }, [pageNumberForBigPortion])

    let i =1

    const getBigPortion = () => {
        if (bigPortionOfPosts.length <= totalCount) {
            setPageNumberForBigPortion(i)
            i = i + 1
            if (i < 4) setTimeout(getBigPortion, 2000)
        }

    }
    const showBigPortion = () => {
      console.log(bigPortionOfPosts)
    }


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
            <div>Отображено записей {filteredPosts.length} из {totalCount} </div>

            <button onClick={reducePageNumber}>Предыдущая страница</button>
            <button onClick={IncreasePageNumber}>Следующая страница</button>
            <button onClick={getBigPortion}>Выдать порцию из 30 записей</button>
            <button onClick={showBigPortion}>Показать сколько записей в большой порции</button>

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
    );
}

export default App;
