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


class UserService {
    /*Crud Libraries are only good for 6 hours, update tempLib variable with your
    crud ID, can be copied off of dashboard screen at https://crudcrud.com */

    static checkURL(){
        console.log(url);
    }

    static getAllUsers() {
        return $.get(this.url);
    }

    static getUser(id) {
        return $.get(this.url + `/${id}`);
    }

    static createUser(user) {
        return $.post(url, user);
    }

    static updateUser(user) {
        return $.ajax({
            url: this.url + `/${user.id}`,
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteUser(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class TaskService {
    /*Crud Libraries are only good for 6 hours, update tempLib variable with your
    crud ID, can be copied off of dashboard screen at https://crudcrud.com */

    static getAllTasks() {
        return $.get(this.url);
    }

    static getTask(id) {
        return $.get(this.url + `/${id}`);
    }

    static createTask(task) {
        return $.post(this.url, task);
    }

    static updateTask(task) {
        return $.ajax({
            url: this.url + `/${task.id}`,
            dataType: 'json',
            data: JSON.stringify(task),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteTask(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }

}

// Aaron
class DOMManager{
    static users;
    static createUser(user){
        UserService.createUser(new User(name,parent))
            .then(() => {
                return UserService.getAllUsers();
            })
            .then((users) => this.render(users));
    }

    // Derin - added few more lines to aarons render code to add in all the new task columns
    static render(users){
        this.users = users;
        $('#master-table-body').empty();
        for (let user of users){
            $('#master-table-body').append(
                `<tr>
                    <td id="${user.id}">${user.name}</td>
                    <td>${user.task.description}</td>
                    <td>${user.task.timeAssigned}</td>  
                    <td>${user.task.dueTime}</td>
                    <td id="${user.id}-check">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="">
                        </div>
                    </td>
                </tr> `
            );
        }
    }
}
// This is temporary and was used for testing the add user to the table.
//Derin - added a few more rows to add in the Task description, Time assigned, time due, etc
$('#sign-in').click(function(){
    let user= $('#inlineFormCustomSelectPref').html();
    let task= $('#input-task-description').val();
    let timestart=$('#input-task-time').val();
    let timedue=$('#input-task-due-time').val();
    let masterTable = $('#master-table-body');
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
});
// Aaron



//Derin - Function to hide/show adult forms on radio click
$('#adult-form').hide()
$('input[type="radio"]').click(function(){
    //show parent div when user-parent selected
    console.log(this);
    if($(this).attr('id') == 'user-parent')
    {
        $('#adult-form').show()
    }
    else
    {
        $('#adult-form').hide()
    }
    //else hid
})

console.log('file is working')

