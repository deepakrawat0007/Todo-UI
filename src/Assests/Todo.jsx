import "./Todo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaWindowClose} from "react-icons/fa";
const API = "https://todo-backapi.onrender.com"

const Todo = () => {
    const [TodoList, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState('')
    const [edit , setEdit] = useState(false)
    const [id , setId] = useState(null)
    useEffect(() => {

        axios.get(API + "/list")
            .then((res) => {
                // console.log(res.data.list)
                setList(res.data.list)
                setLoading(false)
            })
            .catch((e) => {
                // console.log(e.message)
                alert(e.message)
            })
    }, [])

    const handleChange = (e) => {
        setItem(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(API + "/add", {
            item: item
        })
            .then((res) => {
                setItem('')
                // console.log(res.data)
                setList(res.data.list)
            })
            .catch((e) => {
                alert(e.response.data)
                // console.log(e.message)
            })
    }
    const handleRemove =(idx)=>{
        
        // console.log(idx)

        axios.delete(`${API}/delete/${idx}`)
        .then((res)=>{
            console.log(res.data.list)
            setList(res.data.list)
        })
        .catch((e)=>{
            alert(e.message)
        })
    }
    const handleEditList = (idx , listItem)=>{
        console.log(listItem)
        setId(idx)
        setEdit(true)
        setItem(listItem)
    }
    const handleSubmitEdit = (e)=>{
e.preventDefault()
        axios.put(`${API}/update/${id}`,{
            item:item
        })
        .then((res)=>{
            setList(res.data.list)
            setId(null)
            setEdit(false)
            setItem('')
        })
        .catch((e)=>{
            alert(e.message)
        })

    }

    return (
        <>
        <div className="Wrapper">
          <div>
            <h1>To-do List</h1>
            <form>
                <input type={"text"} value={item} onChange={(e) => { handleChange(e) }} placeholder="Enter Todo" />
                {!edit?(<button className="add" onClick={(e) => { handleSubmit(e) }}>+</button>):(<button className="edit" onClick={(e) => { handleSubmitEdit(e) }}><FaEdit/></button>)}
            </form>
            
            <div className="list-wrapper">
                {!loading && TodoList.map((items, idx) => (
                    <div key={idx} className="list-card">
                        <div className="item">{items.item}</div>
                        <div>
                        <button className="ed" onClick={()=>{handleEditList(items._id  , items.item)}}><FaEdit/></button>
                        <button className="rem" onClick={()=>{handleRemove(items._id)}}><FaWindowClose/></button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            </div>
        </>
    )
}

export default Todo