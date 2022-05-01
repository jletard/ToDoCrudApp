class User {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;//boolean variable
        this.tasks = [];
    }

    assignTask(task) {
        this.tasks.push(task);
    }

    deleteTask(description) {
        this.tasks.find(t => {
            return t.description === description
        })
    }

}

class Task {
    constructor(description, timeAssigned, dueTime) {
        this.description = description;
        this.timeAssigned = timeAssigned;  
        this.dueTime = dueTime;
        this.complete = false;
    }
}

let users = [];


async function createUser(user) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('SUCCESS', data);
    })
    .catch((error) => {
        console.error('ERROR', error);
    });
}

async function getAllUsers() {
    users = [];
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('success', data);
            users = data;
            drawDropDown();
            buildTable();            
        });
}


async function deleteTask(userid, taskIndex) {
    const user = users.find(u => {
        return u._id === userid;
    });
    user.tasks.splice(taskIndex,1);
    buildTable();
    console.log(JSON.stringify(users, null, 2));
    updateUser(user);
}

async function updateCheck(userid, taskIndex) {
    const user = users.find(u => {
        return u._id === userid;
    });
    user.tasks[taskIndex].completed = true;
    buildTable();
    console.log(JSON.stringify(users, null, 2));
    updateUser(user);
}

async function deleteUser(id) {
    
    await fetch(url + `/${id}`, {
        method: 'DELETE'
    });

}


function updateUser(user) {
    deleteUser(user._id);
    newUser=new User(user.name, user.parent);
    for (let i=0; i<user.tasks.length; i++) {
        newUser.assignTask(user.tasks[i]);
    }
    createUser(newUser);
}


// Aaron
function drawDropDown() {
    users.sort((a, b) => a.name.localeCompare(b.name));
    $("#user-dropdown").empty();
    let htmlCode = `<select class="custom-select my-1 mr-sm-2" id="userDropDown">
            `
    for (let i = 0; i < users.length; i++) {
        htmlCode += `<option value="${i}" id="user${i}">${users[i].name}</option>
                `;
    }
    htmlCode += `</select>`;
    $("#user-dropdown").append(htmlCode);
    
}

$('#create-user').on('click', function () {
    console.log('creating user')
    let userName = $('#new-user-name').val();
    let isParent = false;
    if ($('#user-parent').prop('checked')) {
        isParent = true;
    }
    let newUser = new User(userName, isParent);
    createUser(newUser);
    getAllUsers();
    drawDropDown();
    buildTable();
});

//Derin - added a few more rows to add in the Task description, Time assigned, time due, etc
let masterTable = $('#master-table-body');
let taskArray = [];

$('#add-task').on('click', function () {
    let userIndex = $('#userDropDown').find(":selected").val();
    let task = $('#input-task-description').val();
    let timestart = new Date().toLocaleString();
    let timedue = $('#input-task-due-time').val();
    timedue = timedue.toLocaleString('en-US', {hour12: true});
    let newTask = new Task(task, timestart, timedue);
    users[userIndex].tasks.push(newTask);
    taskArray.push(newTask);
    updateUser(users[userIndex]);    
    buildTable();
});


$('#sort').on('click', function () {
    var column = $(this).data('column');
    var order = $(this).data('order');
    var text = $(this).html();
    text = text.substring(0, text.length - 1)

    console.log('Column was clicked', column, order);

    if (order == 'desc') {
        $(this).data('order', "asc");
        // sort method
        users = users.sort((a, b) => a[column] > b[column] ? 1 : -1);
        text += '&#9660';
    }
    else {
        $(this).data('order', "desc");
        users = users.sort((a, b) => a[column] < b[column] ? 1 : -1);
        text += '&#9650';
    }
    $(this).html(text);
    buildTable();
    console.log(users[0].tasks[0].complete);
});



function buildTable() {
    masterTable.empty();
    let complete ='';
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].tasks.length; j++) {
            // the User name rebuilds as i, since we don't have that working yet.
            if (users[i].tasks[j]) {
                if (users[i].tasks[j].completed) {
                    complete='yes'
                } else {
                    complete=''
                }
                masterTable.append(`<tr id="${i}-row">
                        <td>${users[i].name}</td>
                        <td>${users[i].tasks[j].description}</td>
                        <td>${users[i].tasks[j].timeAssigned}</td>
                        <td>${users[i].tasks[j].dueTime}</td>
                        <td>${complete}</td>
                        <td>
                            <div>
                                <!--<button class="btn btn-success" onclick="updateCheck('${users[i]._id}', '${users[i].tasks[j].complete}')">Complete Task</button>-->
                                <button class="btn btn-success" onclick="updateCheck('${users[i]._id}', '${j}')">Complete Task</button>
                                <!--<button class="btn btn-danger" onclick="deleteTask('${users[i]._id}', '${users[i].tasks[j].description}')">Delete Task</button>-->
                                <button class="btn btn-danger" onclick="deleteTask('${users[i]._id}', '${j}')">Delete Task</button>
                            </div>
                        </td>
                    </tr> `
                );
            }
        }
    }

}

console.log('file is working');