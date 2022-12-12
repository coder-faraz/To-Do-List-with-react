
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';



const TodosList = (props) => {


const deleteIcon = (id) => {

  let deletedTodo = props.todoslist.filter(elem => elem.id !== id);
  props.settingTodosList(deletedTodo);
}


const taskDone = (id) => {

  let parentElementTag = document.getElementById(`listItems${id}`).parentElement;
  parentElementTag.style.textDecoration="line-through";
}


    return (

        <List sx={{width: "35em"}}>
        { props.todoslist.map((elem) => {
          return (
            <ListItem key={elem.id}  sx={{ display: "block", margin: "10px 10px 10px 380px", backgroundColor: "aliceblue", borderRadius: "8px" }}>
                <ListItemText primary={elem.text} id={`listItems${elem.id}`} />
                <DeleteIcon className='delete' titleAccess="Delete" onClick={ () => { deleteIcon(elem.id) } } sx={{float: "right", clear: "right", margin: "-30px -10px"}}/>
                <TaskAltIcon className='delete' titleAccess='Mark As Finished' onClick={ () => { taskDone(elem.id) } } sx={{ float: "right", margin: "-30px 20px 0 0" }} />
                <Divider />
            </ListItem>
          )
        })}
        </List>

    )
}


export default TodosList;
