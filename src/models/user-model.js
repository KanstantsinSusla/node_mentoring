import {v4 as uuidv4} from 'uuid';

const users = [];

module.exports = class User {
    constructor(login, password, age) {
        this.id = uuidv4();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }

    save() {
        users.push(this);
    }

    static getById(id) {
        return users.find(user => user.id === id);
    }

    static getAutoSuggestUsers(loginSubstring, limit) {
        let result = users.filter(user => user.login.includes(loginSubstring));
        result.sort();
        result.slice(0, limit - 1);

        return result;
    }

    static update(id, data) {
        let user = this.getById(id);

        user.login = data.login;
        user.password = data.password;
        user.age = data.age;

        return user;
    }

    static delete(id) {
        let user = this.getById(id);
        user.isDeleted = true;
    }

    static getAll() {
        return users;
    }
}