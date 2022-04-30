//John's API Populator

currentTime = new Date().toLocaleString();
dueDate = '06/01/2022, 12:00:00 PM';

user1 = new User('Bob', true);
user2 = new User('Cathy', true);
user3 = new User('Jimmy', false);
user4 = new User('Lucy', false);
user5 = new User('Susie', false);

task1 = new Task('Walk the Dog', currentTime, dueDate);
task2 = new Task('Feed the Dog', currentTime, dueDate);
task3 = new Task('Wash the Dishes', currentTime, dueDate);
task4 = new Task('Empty Trash', currentTime, dueDate);
task5 = new Task('Take Out Recycling', currentTime, dueDate);
task6 = new Task('Wash Car', currentTime, dueDate);
task7 = new Task('Fold Laundy', currentTime, dueDate);
task8 = new Task('Build Deck', currentTime, dueDate);
task9 = new Task('Cook Dinner', currentTime, dueDate);
task10 = new Task('Prep Lunchs', currentTime, dueDate);

user1.assignTask(task9);
user1.assignTask(task10);
user2.assignTask(task8);
user2.assignTask(task1);
user3.assignTask(task2);
user3.assignTask(task3);
user4.assignTask(task4);
user4.assignTask(task5);
user5.assignTask(task6);
user5.assignTask(task7);


var url
$('#api-submit').click(function () {
    endpoint = $('#api-endpoint').val();
    url = `https://crudcrud.com/api/${endpoint}/user1`;
    $('#api-endpoint').val('');

    getAllUsers();
});

$('#fill-api').click(function () {
    console.log('Filling');
    createUser(user1);
    createUser(user2);
    createUser(user3);
    createUser(user4);
    createUser(user5);
    getAllUsers();
});

$('#clear-api').click(function () {
    console.log('Clearing');
    for (let i = 0; i < users.length; i++) {
        deleteUser(users[i]._id);
    }
    
    users = [];
    getAllUsers();
});