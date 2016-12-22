import { Projects } from '../../../lib/collections/projects';
import { Router } from 'meteor/iron:router';
import { Autoform } from 'meteor/aldeed:autoform';

Template.projectForm.helpers({
    formCollection(){
        return Projects;
    }
})
// para devolvernos a la lista de proyectos luego de llenar el formulario
Template.projectForm.onCreated(function()
{
    // addHooks permite pasar varios  hooks en un array
    // le pasamos el id del formulario, traido de project_form.html y un objeto
    AutoForm.addHooks(['projectForm'],{
          onSuccess: function(operation, result, template)
          {
              // si paso bien redirigimos
              Router.go('/projects');
          }
    });
})