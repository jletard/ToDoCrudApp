class User {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;//boolean variable
        this.tasks = [];
    }

    assignTask(task) {
        this.tasks.push(task);
    }

    deleteTask(task) {
        this.tasks.splice(this.tasks.indexof(task), 1);
    }

}

class Task {
    constructor(description, timeAssigned, dueTime) {
        this.description = description;
        this.timeAssigned = timeAssigned; //TODO: grab system time at creation  
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
            return users;
        })
}

async function deleteUser(id) {
    await fetch(url + `/${id}`, {
        method: 'DELETE'
    })
}

async function updateUser(user) {
    await fetch((`${url}/${user._id}`), {
        method: 'PUT',
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


// Aaron
function drawDropDown() {
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
    
    //The below code is handwaving, should be replaced with the user update and just drawing the table again.
    // 
    // masterTable.append(
    //     `<tr>
    //         <td>${user}</td>
    //         <td>${task}</td>
    //         <td>${timestart}</td>
    //         <td>${timedue}</td>
    //         <td>
    //             <div class="form-check">
    //             <input class="form-check-input" type="checkbox" value="">
    //             <input class="form-check-input" type="checkbox" value=""><button class="btn btn-danger" onclick="${user}.deleteTask(${newTask})">Delete Task</button>
    //             </div>
    //         </td>
    //     </tr> `);
    // console.log(taskArray);
    // console.log(taskArray[0].description);
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
});


//I think the delete button should go away, instead when the completed box is checked, the user should update.
function buildTable() {
    masterTable.empty();
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].tasks.length; j++)
            
            masterTable.append(`<tr>
                        <td>${users[i].name}</td>
                        <td>${users[i].tasks[j].description}</td>
                        <td>${users[i].tasks[j].timeAssigned}</td>
                        <td>${users[i].tasks[j].dueTime}</td>
                        <td>
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="">
                            <input class="form-check-input" type="checkbox" value=""><button class="btn btn-danger" onclick="${users[i]}.deleteTask(${users[i].tasks[j]})">Delete Task</button>
                            </div>
                        </td>
                    </tr> `
            )

    }
}
// Aaron



// //Derin - Function to hide/show adult forms on radio click
// $('#adult-form').hide()
// $('input[type="radio"]').on('click', function () {
//     //show parent div when user-parent selected
//     console.log(this);
//     if ($(this).attr('id') == 'user-parent') {
//         $('#adult-form').show()
//     }
//     else {
//         $('#adult-form').hide()
//     }
//     //else hid
// })

console.log('file is working');