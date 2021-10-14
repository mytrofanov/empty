export const LightLetters = ({name, inputTextValue}) => {

    const parts = name.split(new RegExp(`(${inputTextValue})`, 'gi'));

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === inputTextValue.toLowerCase() ?
                    <b key={index}>{part}</b> : part)}
        </>
    )
}
