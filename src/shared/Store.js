import { makeObservable, observable, action } from 'mobx';

class Store {
    user = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            updateUser: action
        });
    }

    updateUser(user) {
        this.user = user;
    }
}

export default new Store();
