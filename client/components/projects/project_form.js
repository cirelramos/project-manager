import { Projects } from '../../../lib/collections/projects';

Template.projectForm.helpers({
    formCollection(){
        return Projects;
    }
})