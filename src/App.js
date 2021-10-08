import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [bigPortionOfPosts, setBigPortionOfPosts] = useState([])
    const [FilteredBigPortionOfPosts, setFilterBigPortionOfPosts] = useState([])
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

    const BigFiltered = (e) => {
        const filtered =
            bigPortionOfPosts &&
            bigPortionOfPosts.filter((item) => {
                return item.name.toLowerCase().includes(e.toLowerCase())
            })
        setFilterBigPortionOfPosts(filtered)
    }

    // ================= управление кнопками ========================

    const IncreasePageNumber = () => {
        setPageNumber(pageNumber + 1)

    }
    const reducePageNumber = () => {
        pageNumber > 1 && setPageNumber(pageNumber - 1)
    }

    //===================Работа с большими массивами =======================
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumberForBigPortion}`)
            .then(response => {
                setBigPortionOfPosts(bigPortionOfPosts => bigPortionOfPosts.concat(response.data.items))
                setFilterBigPortionOfPosts(FilteredBigPortionOfPosts=>FilteredBigPortionOfPosts.concat(response.data.items))
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



    return (
        <div>
            <button onClick={reducePageNumber}>Предыдущая страница</button>
            <button onClick={IncreasePageNumber}>Следующая страница</button>
            <button onClick={getBigPortion}>Выдать порцию из 30 записей</button>

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
               <div>
                    Искать в большой таблице:

                <input type="text" id="BigSearchField"
                       placeholder="search"
                       value={inputTextValue}
                       key="BigSearchField"
                       onChange={(event => {
                           setInputTextValue(event.target.value)
                           BigFiltered(event.target.value)
                       })}/>

            </div>

            </div>


            <div>Отображено записей {filteredPosts.length} из {totalCount} </div>

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
             <b>   Страница № {pageNumber} </b>
            </div>
            <div className="Big Table">
                <table>

                    <tbody>
                    <tr>
                        <th>№ п/п</th>
                        <th>user Id</th>
                        <th>Name</th>

                    </tr>

                    {FilteredBigPortionOfPosts && FilteredBigPortionOfPosts.length > 0 ?
                        FilteredBigPortionOfPosts.map((post, index) =>

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
    );
}

export default App;
