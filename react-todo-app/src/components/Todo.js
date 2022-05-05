import React,{useState,useEffect} from "react";
import { List } from "./List";

export const Todo = () => {
    // Statement ifadeleri ile state değişkenleri oluşturulur.
    const defaultInput = { todoInput: "", isDone: false, id: 1 };

    const [category,setCategory] = useState("All")

    const [form, setForm] = useState(defaultInput);

    const [todoItem, setTodoItem] = useState([
        {
            todoInput: "Dişleri temizle",
            isDone: false,
            id: 1,
        },
        {
            todoInput: "React ile çalış",
            isDone: false,
            id: 2,
        },
    ]);

    // Formdan gelen değerleri todoItem state'e ekler ve formu temizler.
    const formOnSubmit = (e) => {
        e.preventDefault(); // Formun default olarak submit edilmesini engeller.

        if (form.todoInput === "") {
            return false;
        }
        setTodoItem([...todoItem, form]);
        setForm(defaultInput);
    };
    const [currentList,setCurrentList] = useState(todoItem)
    const onChangeToDo = (e) => {
        setForm({
            todoInput: e.target.value,
            isDone: false,
            id: Math.floor(Math.random() * 1000),
        });
    };

    useEffect(()=>{

        setCurrentList(todoItem)

    },[todoItem])



    // TodoItem state'de bulunan active değerleri listelemek için kullanılan fonksiyon.
    const getActiveItems = ()=>{
        let newActive = todoItem.filter(activeItem =>{
            return activeItem.isDone === false
        })
        setCurrentList(newActive)
        setCategory("Active")
    }
    // TodoItem state'de bulunan completed değerleri listelemek için kullanılan fonksiyon.
    const getCompletedItems = () =>{

        let newCompleted = todoItem.filter(completedItem =>{
            return completedItem.isDone === true
        })

        setCurrentList(newCompleted)
        setCategory("Completed")
    }
    // TodoItem state'de bulunan  değerlerin hepsini uçurmak(silmek)  için kullanılan fonksiyon.
    const clearCompleted = () =>{

        let clearAllCompleted = todoItem.filter(clearAll =>{
            return clearAll.isDone === false
        })

        setTodoItem(clearAllCompleted)
        setCategory("All")
    }


    return (
        <>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <form onSubmit={formOnSubmit}>
                        <input
                            value={form.todoInput}
                            onChange={onChangeToDo}
                            className="new-todo"
                            placeholder="What needs to be done?"
                        />
                    </form>
                </header>
                <section className="main">
                    <input className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>


                    <ul className="todo-list">
                        <List

                            todoItem={currentList}
                            todo={form}
                            todoUpdate={setTodoItem}

                        />
                    </ul>

                </section>

                <footer className="footer">
          <span className="todo-count">
            <strong>{currentList.length} </strong>
            items left
          </span>

                    <ul className="filters">
                        <li>
                            <a
                                onClick={() => setCurrentList(todoItem) & setCategory("All")}
                                className={category === "All" ? "selected" : ""}
                            >
                                All
                            </a>
                        </li>
                        <li>
                            <a onClick={()=>getActiveItems()} className={category === "Active" ? "selected" : ""} >Active</a>
                        </li>
                        <li>
                            <a onClick={()=> getCompletedItems()} className={category === "Completed" ? "selected" : ""} >Completed</a>
                        </li>
                    </ul>
                    <button onClick={()=> clearCompleted()} className="clear-completed">Clear completed</button>
                </footer>
            </section>

            <footer className="info">
                <p>Click to edit a todo</p>
                <p>
                    Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
                </p>
                <p>
                    Part of <a href="http://todomvc.com">TodoMVC</a>
                </p>
            </footer>
        </>
    );
};