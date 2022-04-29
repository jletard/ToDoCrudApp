/*setting super basic classes for User and Task to check API endpoints, 
When proper classes are written feel free to replace */
class User {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;//boolean variable
        this.tasks = [];
    }

    assignTask(task) {
        this.tasks.push(task);
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

let users =[];

function createUser(user) {
    fetch(url, {
        method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
    },
    body: JSON.stringify(user)
    });
}

function getAllUsers() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('success', data);
        users = data;
        return users;
    })
}

// function deleteUser(id) {
//     fetch(url+`/${id}`, {
//         method: 'DELETE'
//     })
// }

function updateUser(user) {
    return $.ajax({
        url: url + `/${user._id}`,
        dataType: 'json',
        data: JSON.stringify(user),
        contentType: 'application/json',
        type: 'PUT'
    });
}


// Aaron
class DOMManager {
    static users;
    static createUser(user) {
        UserService.createUser(new User(name, parent))
            .then(() => {
                return UserService.getAllUsers();
            })
            .then((users) => this.render(users));
    }

    // static addTask(id) {
    //     for (let user of this.users) {
    //         if (user._id == id) {
    //             user.tasks.push(new Task)
    //         }
    //     }
    // }

    // Derin - added few more lines to aarons render code to add in all the new task columns
    static render(users) {
        this.users = users;
        $('#master-table-body').empty();
        //if (users.parent = true) Want to do this for parent users to render delete button ${user.parent == true}
        for (let user of users) {
            $('#master-table-body').append(
                `<tr>
                    <td id="${user._id}">${user.name}</td>
                    <td>${user.task.description}</td>
                    <td>${user.task.timeAssigned}</td>  
                    <td>${user.task.dueTime}</td>
                    <td id="${user._id}-check">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="">
                        </div>
                    </td>
                </tr> `
            );
        }
    }
}

// DOMManager.getAllUsers();

// $('add-task').on('click', () => {
//     let newTask = 
// })








// This is temporary and was used for testing the add user to the table.
//Derin - added a few more rows to add in the Task description, Time assigned, time due, etc
let masterTable = $('#master-table-body');
let taskArray = [];

$('#add-task').on('click',function(){
    let user= $('#inlineFormCustomSelectPref').html();
    let task= $('#input-task-description').val();
    let timestart=$('#input-task-time').val();
    let timedue=$('#input-task-due-time').val();
    let newTask = new Task(task, timestart, timedue);
    taskArray.push(newTask);
    masterTable.append(
        `<tr>
            <td>${user}</td>
            <td>${task}</td>
            <td>${timestart}</td>
            <td>${timedue}</td>
            <td>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="">
                </div>
            </td>
        </tr> `);
        console.log(taskArray);
        console.log(taskArray[0].description);
});


$('th').on('click',function(){
    var column = $(this).data('column');
    var order = $(this).data('order');
    var text = $(this).html();
    text = text.substring(0, text.length -1)

    console.log('Column was clicked', column, order);
    
    if(order == 'desc'){
        $(this).data('order', "asc");
        // sort method
        taskArray = taskArray.sort((a,b) => a[column] > b[column] ? 1:-1);
        text += '&#9660';
    }
    else{
        $(this).data('order', "desc");
        taskArray = taskArray.sort((a,b) => a[column] < b[column] ? 1:-1);
        text += '&#9650';
    }
    $(this).html(text);
    buildTable(taskArray);
});

function buildTable(data){
    masterTable.empty();
    for (let i = 0; i < data.length; i++) {
        // the User name rebuilds as i, since we don't have that working yet.
        masterTable.append(`<tr>
                        <td>${i}</td>
                        <td>${data[i].description}</td>
                        <td>${data[i].timeAssigned}</td>
                        <td>${data[i].dueTime}</td>
                        <td>
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="">
                            </div>
                        </td>
                    </tr> `
        )
        
    } 
}
// Aaron



//Derin - Function to hide/show adult forms on radio click
$('#adult-form').hide()
$('input[type="radio"]').on('click', function(){
    //show parent div when user-parent selected
    console.log(this);
    if ($(this).attr('id') == 'user-parent') {
        $('#adult-form').show()
    }
    else {
        $('#adult-form').hide()
    }
    //else hid
})

console.log('file is working')

