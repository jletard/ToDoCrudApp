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
    static render(users){
        this.users = users;
        $('#master-table-body').empty();
        for (let user of users){
            $('#master-table-body').append(
                `<tr>
                    <td id="${user._id}">${user.name}</td>
                    <td>Task</td>
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