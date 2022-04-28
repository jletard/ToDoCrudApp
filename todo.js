/*setting super basic classes for User and Task to check API endpoints, 
When proper classes are written feel free to replace */
class User {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;//boolean variable
        this.tasks = [];
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

//Derin - For time of creation for tasks: 
// var dt = new Date();
// var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
// document.write(time);


class UserService {
    /*Crud Libraries are only good for 6 hours, update tempLib variable with your
    crud ID, can be copied off of dashboard screen at https://crudcrud.com */
    static urlBase = 'https://crudcrud.com/api/';
    static tempLib = '78e85992e0bf427784cf5781bb417ac6';
    static url = urlBase + this.tempLib;

    static getAllUsers() {
        return $.get(this.url);
    }

    static getUser(id) {
        return $.get(this.url + `/${id}`);
    }

    static createUser(user) {
        return $.post(this.url, user);
    }

    static updateUser(user) {
        return $.ajax({
            url: this.url + `/${user._id}`,
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
    static urlBase = 'https://crudcrud.com/api/';
    static tempLib = '78e85992e0bf427784cf5781bb417ac6';
    static url = urlBase + this.tempLib;

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
            url: this.url + `/${task._id}`,
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
$('#sign-in').click(function(){
    let user= $('#input-user-name').val();
    let masterTable = $('#master-table-body');
    masterTable.append(
        `<tr>
            <td>${user}</td>
            <td>Task</td>
            <td>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="">
                </div>
            </td>
        </tr> `);
});
// Aaron
