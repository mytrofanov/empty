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
    const [FreshPortionOfPost, setFreshPortionOfPost] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [inputTextValue, setInputTextValue] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const delayLoadingFetchToFalse = () => {
        setLoading(false)
    }


    // ==================== server request=================
    useEffect(() => {
            setLoading(true);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${pageNumber}`)
                .then(response => {
                    let DataFromServer= response.data.items
                    setPostsFromServer(postsFromServer=>postsFromServer.concat(DataFromServer))
                    setFreshPortionOfPost(DataFromServer)
                    setTotalCount(response.data.totalCount)
                    setTimeout(delayLoadingFetchToFalse,1000)

                })
                .catch(error => console.log(error))

        }, [pageNumber]
    );



    // =============== filtering  ==================


        const filter = (WordFromSearchBar) => {

        console.log(inputTextValue)
        console.log("postsFromServer " + postsFromServer.length)
        const filtered =
             postsFromServer.filter((item) => {
                return item.name.toLowerCase().includes(WordFromSearchBar.toLowerCase())
            })
        setFilteredPosts(filtered)
    }
// inputTextValue is delayed in one render, have to use WordFromSearchBar
    useEffect(()=>filter(inputTextValue),[postsFromServer, inputTextValue])

    // ================= buttons ========================
// on each increasing page we increase filteredPosts
    const IncreasePageNumber = () => {
        console.log(inputTextValue)
        console.log("pageNumber #" + pageNumber)
        setPageNumber(pageNumber + 1)
            const FreshFilteredMessages =
                FreshPortionOfPost.filter((item) => {
                    return item.name.toLowerCase().includes(inputTextValue.toLowerCase())
                })
        pageNumber >=2 &&
            setFilteredPosts(filteredPosts => filteredPosts.concat(FreshFilteredMessages))
    }





    let i = pageNumber
    let b = pageNumber + 11
    const Get100post = () => {
        setPageNumber(i)
        i=i+1
        if (i<b) setTimeout(Get100post,10)
    }
    const Get1000 = () => {
        Get100post()

    }
const PostsToShow = !inputTextValue || inputTextValue.length === 0 ? postsFromServer : filteredPosts

    return (
        <div className="container">
            <div className="loading">
                {loading &&                 <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>}



            </div>


            <Stack spacing={2} direction="row">
            <Button onClick={IncreasePageNumber} variant="contained">Следующая страница</Button>
            <Button onClick={Get1000} variant="contained">Получить 100 постов</Button>


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
                           filter(event.target.value)
                       })}/>

            </span>


            </div>


            <div>Отображено записей {PostsToShow.length} из {totalCount} </div>
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

                {PostsToShow.map((post, index) =>

                        <tr key={index}>
                            <td> {index}</td>
                            <td> {post.id}</td>
                            <td> {post.name}</td>
                        </tr>)
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
