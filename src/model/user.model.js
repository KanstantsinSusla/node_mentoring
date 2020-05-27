import {v4 as uuidv4} from 'uuid'

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
        for (let user of users) {
            if (user.id === id) {
                return user;
            }
        }
    }

    static getAutoSuggestUsers(loginSubstring, limit) {
        let count = 0;
        let result = [];

        for (let user of users) {
            if (count < limit) {
                if (user.login.includes(loginSubstring)) {
                    result.push(user);
                    count++;
                }
            } else {
                break;
            }
        }

        result.sort((a, b) => a.login > b.login ? 1 : -1);
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
        user.isDelete = true;
    }

    static getAll() {
        return users;
    }
}