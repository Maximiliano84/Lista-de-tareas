const input = document.querySelector(`.input-btn input`);
const listTask = document.querySelector(`.list-tasks ul`);
const button = document.getElementById(`boton`);
const message = document.querySelector(`.list-tasks`)
const borrar = document.getElementById(`borrar`);
let tasks = [];


eventListeners();
function eventListeners(){
    document.addEventListener(`DOMContentLoaded`, () =>{
        tasks = JSON.parse( localStorage.getItem(`tasks`)) || [];
        createHTML();
    });

    listTask.addEventListener(`click`, deleteTask);
}

function deleteTask(e){
    if (e.target.tagName == `SPAN`){
        const deleteID = parseInt(e.target.getAttribute(`task-id`));
        tasks = tasks.filter(task => task.id !== deleteID);
        console.log(tasks);
        createHTML();
    };
}

borrar.addEventListener(`click`, function deleteAll(){
    tasks = [];
    createHTML();
})



button.addEventListener(`click`, function addTasks(){
    const task = input.value;
    if (task === ``){
        showError(`The field is empty...`);
        return;
    }

    const taskobj = {
        task,
        id: Date.now()
    }  
    tasks = [...tasks, taskobj];
    
    createHTML()
    input.value = ``;
});
       
function createHTML(){
     clearHTML();

    if(tasks.length > 0){
        tasks.forEach(task => {
        const li = document.createElement(`li`);
        li.innerHTML = `${task.task}<span task-id="${task.id}">X</span>`;
                   
        listTask.appendChild(li);
        });
    }
    sincronizationStorage ()
}
    function  sincronizationStorage (){
        localStorage.setItem(`tasks`, JSON.stringify(tasks));
}


function showError(error) {
    const messageError = document.createElement(`p`);
    messageError.textContent = error;
    messageError.classList.add(`error`);
    message.appendChild(messageError);
    setTimeout(() =>{
        messageError.remove();
    },2000);
}

function clearHTML(){
    listTask.innerHTML = ``;
}


