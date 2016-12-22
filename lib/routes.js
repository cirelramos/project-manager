import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import {Projects, ProjectsIndex} from '../lib/collections/projects'; // agregamos a la importacion ProjectsIndex

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
            return ProjectsIndex;  // en vez de retornar Projects.find() los proyectos retornamos ProjectsIndex
                                   // con eso ya esta disponible easy-search
        }
    }
})

// aqui se define la ruta del formulario de proyectos.
Router.route('/project_form',{
    name: 'project_form'
})

// aqui se define la ruta para el detalle de cada proyecto
// se va a ir a project pasando un id y una funcion
Router.route('/project/:_id', function()
{
    //creamos una variable y le pasamos el id definido en la declaracion de la ruta
    // es una consulta a la db para que traiga el id a pasar luego
    let project = Projects.findOne({_id: this.params._id});

    // vamos a comprobar si no existe el proyecto
     if( ! project )
     {
       Router.go('projects'); // lo deja al usuario en proyectos

     }
     else
     {
        this.render('project_detail', {
            data: {
                project: project // en la llamada colocamos en data el proyecto que acabamos de definir
            }
        })

     }

},
{
   //el ultimo parametro de la llamada es un objeto opcional donde colocaremos 
   // el nombre de la ruta
   name:'project_detail'

})

// ruta del profile

Router.route('/profile', {
// recibe un objeto 
    name: 'profile',
    // ademas la ruta contiene un usuario
    data: {

        // le vamos a decir a la template que vamos a tener el usuario disponible con estos datos
        user() {
                   //si el usuario esta logueado hacemos el return con sus datos
                if(Meteor.user())
                {
                   return {
                        id: Meteor.user()._id,
                        email: Meteor.user().emails[0].address
                   }


                }
    

            
        }
    }
})