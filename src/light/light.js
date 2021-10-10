
export const Light = ({post, inputTextValue, index, filteredPosts}) => {

    const textHighlighter = () => {
        let searchKeywordIdx = post.name.indexOf(inputTextValue);
        let BeginningOfWord = post.name.substring(0, searchKeywordIdx)
        let LitedLetters = post.name.substring(searchKeywordIdx, searchKeywordIdx + inputTextValue.length)
        let LastLetters =   post.name.substring(searchKeywordIdx + inputTextValue.length)

        return (
            <>
                {BeginningOfWord},
            <mark key={index + 1}>
                {LitedLetters}
            </mark>,
                {LastLetters}
            </>
        )
    }


    return (
        <div>
            {filteredPosts.map((post, index) => {
                let searchKeywordIdx = post.name.indexOf(inputTextValue);
                <tr key={index}>
                    <td> {index + 1}</td>
                    <td> {post.id}</td>
                    inputTextValue.length >0 ?
                    if (searchKeywordIdx > -1) {
                    <textHighlighter/>
                    };
                    <td key={post.name}> {textHighlighter}</td>
                    :
                    <td> {post.name}</td>
                </tr>}
            )
            }

        </div>

    )

}
