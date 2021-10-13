import './App.css';
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {createTheme, ThemeProvider} from '@mui/material/styles';


function App() {

    const [postsFromServer, setPostsFromServer] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    // const [Initialized, setInitialized] = useState(false)
    const [inputTextValue, setInputTextValue] = useState('')
    const [pageNumber, setPageNumber] = useState(0)

    const delayLoadingFetchToFalse = () => {
        setLoading(false)
    }

    // ================ button & input colors =============
    const theme = createTheme({
        palette: {
            primary: {
                light: '#6fbf73',
                main: '#4caf50',
                dark: '#357a38',
                contrastText: '#52b202',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    // =============== filtering  ==================
    const filter = useCallback(() => {

            const filtered =
                postsFromServer.filter((item) => {
                    return item.name.toLowerCase().includes(inputTextValue.toLowerCase())
                })

            setFilteredPosts(filtered)

        }, [inputTextValue, postsFromServer]
    )

    // ================ server request=================
    function FetchMessagesFromServer(URL) {

        setLoading(true);
        return axios
            .get(URL)
            .then(response => {
                let DataFromServer = response.data.items
                setTotalCount(response.data.totalCount)
                return setPostsFromServer(postsFromServer => postsFromServer.concat(DataFromServer))
            })
            .then(response => {
                setTimeout(delayLoadingFetchToFalse, 1000)
                filter()
            })
            .catch(error => console.log(error))
    }


    useEffect(() => filter(), [postsFromServer, inputTextValue, pageNumber, filter])


    // ================= buttons ========================
    const IncreasePageNumber = () => {
        let increasedPageNumber = pageNumber + 1
        FetchMessagesFromServer(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${increasedPageNumber}`)
            .catch(error => console.log(error))
        setPageNumber(increasedPageNumber);
    }
    //=========initialization, starting with first page:
    useEffect(() => {
        IncreasePageNumber()
    }, [])

    //===========button Get 100 posts consistently
    function Get100Slow() {

        let urls = []
        let i = pageNumber
        let b = pageNumber + 10
        while (i < b) {
            i++
            urls.push(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${i}`)
        }
        setPageNumber(prevState => prevState + 10)

        const getAllPagesSlow = async (urls) => {
            urls.map(FetchMessagesFromServer)
        }
        getAllPagesSlow(urls)
            .catch(error => console.log(error));

    }

//===========button Get 100 posts synchronously

    const Get100Fast = () => {
        let urlList = []
        let i = pageNumber
        let b = pageNumber + 10

        while (i < b) {
            i++
            urlList.push(`https://social-network.samuraijs.com/api/1.0/users?count=10&page=${i}`)
        }
        setPageNumber(prevState => prevState + 10)

        const getAllPagesFast = async (urlList) => {
            return Promise.all(urlList.map(FetchMessagesFromServer))
        }

        getAllPagesFast(urlList)
            .catch(error => console.log(error));
    }


    return (
        <div className="container">
            <ThemeProvider theme={theme}>
                <div className="loading">
                    {loading &&

                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>


                    }
                </div>


                <Stack spacing={2} direction="row">

                    <Button
                        sx={{color: 'black'}}
                        onClick={IncreasePageNumber} variant="contained">Следующая страница</Button>
                    <Button
                        sx={{color: 'black'}}
                        onClick={Get100Slow} variant="contained">Получить 100 постов последовательно</Button>
                    <Button
                        sx={{color: 'black'}}
                        onClick={Get100Fast} variant="contained">Получить 100 постов сразу</Button>


                </Stack>
                <div className="searchBlock">
               <span>

                   <Box
                       component="form"
                       sx={{

                           '& > :not(style)': {m: 1, width: '25ch'},
                       }}
                       noValidate
                       autoComplete="off"
                   >
      <TextField id="searchField" label="Search in table"
                 sx={{color: "darkolivegreen"}}
                 color="primary"
                 focused
                 variant="outlined"
                 value={inputTextValue}
                 key="searchField"
                 onChange={(event => {
                     setInputTextValue(event.target.value)
                     // filter(event.target.value)
                 })}
      />

    </Box>

            </span>


                </div>


                <div>Отображено записей {filteredPosts.length} из {totalCount} </div>
                <b> Страница № {pageNumber} </b>

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

                                {filteredPosts.map((post, index) =>

                                    <tr key={index}>
                                        <td> {index + 1}</td>
                                        <td> {post.id}</td>
                                        <td> {post.name}</td>
                                    </tr>)
                                }


                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
