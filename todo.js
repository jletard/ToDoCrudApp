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