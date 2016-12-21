import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import {Projects} from '../lib/collections/projects';

// para la seguridad
Router.onBeforeAction (function()
{
// si no esta logueado lo lleva a home
  if( ! Meteor.userId() )
  {
      Router.go('home');
      this.next();
  }
  else
  {
      // si esta logueado lo lleva a projects
      if(Router.current().route.getName() === 'home')
      {
          Router.go('projects');
      }

      this.next();
  }

})



Router.configure({
    layoutTemplate: 'baseLayout',
    // suscribirse a publicaciones que previamente se publicaron en server
    // tenemos disponibles los proyectos en el cliente
    waitOn: function()
    {
        return Meteor.subscribe('projects');
    }
})

Router.route('/',{
    name: 'home'
})

// necesitamos definir la ruta de los proyectos y pasarlos a la template 
// va a tener una variable data que va a contener todos los proyectos de un usuario
Router.route('/projects',{
    name: 'projects',
    data: {
        projects() {
            return Projects.find()
        }
    }
})