import s from './user.css'

export const Item = ({userId, id, body, title}) => {
    return (
        <div className={s.user}>
            <b>ID пользователя: {userId}</b>
              ID идетификатор: {id}
             Заголовок: {body}
             Текст: {title}






        </div>
    )

}