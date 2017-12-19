 import { observable, action, computed } from 'mobx';


class Project {

    @observable projectStatus = "in hold";


    get status() {
        return this.projectStatus;
    }

    setProjectStatus(value) {
        this.projectStatus = value;
    }

}

export default Project;