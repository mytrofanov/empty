export const Highlight = ({name, searchText}) => {

    const parts = name.split(new RegExp(`(${searchText})`, 'gi'));

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === searchText.toLowerCase() ?
                    <b key={index} className="Highlight">{part}</b> : part)}


        </>
    )
}