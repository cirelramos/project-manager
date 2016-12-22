import { Meteor } from 'meteor/meteor';

// la template de proyectos utilizaremos event para manejar los eventos de esta template
// cuando el usuario pulse un elemento con la clase remove ejecutemos la funcion
// donde tendremos el evento y la template.
Template.projects.events({

    'click .remove': function(event, template)
    {
        // llamada al metodo que se encuentra en collections/projects.js
        Meteor.call('projects.remove', this._id);
    }
})