import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [inputTextValue, setInputTextValue] = useState("")
    const [pageNumber, setPageNumber] = useState(1)

    const delayLoadingFetchToFalse = () => {
        setLoading(false)
    }


    // ==================== запрос на сервер =================
    useEffect(() => {
            setLoading(true);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumber}`)
                .then(response => {
                    setPostsFromServer(postsFromServer=>postsFromServer.concat(response.data.items))
                    setFilteredPosts(filteredPosts=>filteredPosts.concat(response.data.items))
                    setTotalCount(response.data.totalCount)
                    setTimeout(delayLoadingFetchToFalse,1000)

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
    let i = pageNumber
    let b = pageNumber + 11
    const Get100post = () => {
        setPageNumber(i)
        i=i+1
        if (i<b) setTimeout(Get100post,10)
    }



    return (
        <div className="container">
            <div className="loading">
                {loading &&                 <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>}



            </div>


            <Stack spacing={2} direction="row">
            <Button onClick={IncreasePageNumber} variant="contained">Следующая страница</Button>
            <Button onClick={Get100post} variant="contained">Получить 100 постов</Button>


            </Stack>
            <div className="searchBlock">
               <span >
                Искать в  таблице:

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
