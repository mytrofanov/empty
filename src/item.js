import './user.css'

export const Item = ({userId, id, body, title}) => {
    return (
        <div className="userTable">
            <b>ID пользователя:</b> {userId}
            <div className="identy">
                <b>ID идетификатор:</b> <span>{id}</span>
            </div>
            <b>Заголовок:</b>
            <span>{title}</span>
            <div>
                <b>Текст:</b>
                <span>{body}</span>
            </div>


        </div>
)

}