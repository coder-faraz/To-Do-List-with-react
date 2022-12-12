
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TodosList from './TodosList';



    //get data from local Storage if it is present, everytime the page reloads
const getDataFromStorage = () => {
    let data = JSON.parse(localStorage.getItem("value"));
   
    if(data){
        return JSON.parse(localStorage.getItem("value"));
    } else {
        return [];
    }
}


const TodosComponent = () => {

    const [text, setText] = React.useState([]);
    const [todoList, setTodoList] = React.useState(getDataFromStorage());
    const [open, setOpen] = React.useState(false);


    const changeHandler = (e) => {
        setText([e.target.value]);
    }


    let id = 0;

    if(todoList.length===0) id = 0
    else id = todoList[todoList.length - 1].id + 1;

    const newTodo = (inp) => {
        const myTodo = {
        id: id,
        text: inp
        }
        setTodoList([...todoList, myTodo])
    }

    const clickHandler = () => {

        if(text.length===0) setOpen(true);
        else {
            newTodo(text);
            setText([]);
        }
    }


    //everytime the todolist state is updated, also update the local storage with the value
    React.useEffect(() => {
        localStorage.setItem("value", JSON.stringify(todoList));
    }, [todoList]);


    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
                setOpen(false);
            }} >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


    return (

        <>
            <h1 className='heading'> To-Do List </h1>
            <Box component="form" sx={{
                '& > :not(style)': { width: '44ch' },
                backgroundColor: "#FFFDD0",
                margin: "32px 620px 22px 322px"
            }} noValidate autoComplete="off" style={{width: "44ch"}} >
            <TextField id="input" InputLabelProps={{ style: {fontWeight: "700"}}} label="Add A To-Do Item" variant="filled" value={ text } onChange={ changeHandler } />
            </Box>
            <AddCircleOutlineIcon className='add-icon' titleAccess='Add-Todo' onClick={ clickHandler } sx={{position: "relative", left: "668px", top: "-72px", fontSize: "42px", color: "#2a52be"}} />
            <Snackbar open={open} autoHideDuration={3000} onClose={ (reason) => {
                if(reason==='clickaway')  return;
                setOpen(false);
            } } message="Add Some Text!" action={action} />
            <TodosList todoslist={todoList} settingTodosList={setTodoList} />
        </>

    );
}


export default TodosComponent;
