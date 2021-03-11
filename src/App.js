import logo from './logo.svg';
import './App.css';

const initialTodos = [
    {
        id: 'a',
        task: 'Do dishes',
        complete: false
    },
    {
        id: 'b',
        task: 'Paint walls',
        complete: false
    },
    {
        id: 'c',
        task: 'Fix car',
        complete: false
    },
]


const App = () => {
    return (
        <div className="App">
            <ul>
                {initialTodos.map(todo =>
                    <li key={todo.id}>
                        <label>{todo.task}</label>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App;
