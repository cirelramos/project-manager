import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Notes } from './notes';
// importo estos dos para el método eliminar
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Projects = new Mongo.Collection('projects');

// Define el esquema del formulario para llamarlo en una linea utilizando el paquete
// autoform previamente importado.

Projects.attachSchema(new SimpleSchema({

  name:{
      type:String,
      label: 'Nombre del proyecto',
      max: 200
  },
  owner: {
      type: String,
      label: "Propietario",
      // autovalue permite que el campo se inserte de forma automática
      autoValue(){
            return this.userId
      },
      // si se inserta automaticamente no tiene sentido mostrarse, por
      // ello se oculta con hidden.
      autoform: {
          type: "hidden"
      }      
  },

  created: {
      type: Date,
      autoValue() {
          return new Date()
      },
        autoform: {
            type: "hidden"
    }
  },

    summary: {
       type: String,
       label: "Detalle del proyecto",
       optional: true,
       max: 2000,
       //autoform: {
        //   atFieldInput: {
          //    type: "textarea",
           //   rows: 10,
            //  class: "materialize-textarea"
              // }
        //}
    },

notes:{
        optional: true,
        type: [Notes]
  }

}));

Projects.allow({
  insert: function(userId, doc)
  {
    return doc.owner === userId;
  }
})

// este método recibe un objeto
Meteor.methods({
    // aqui cuando se quiera eliminar un prouyecto
    // relaiza un check y se comprueba que el id de proyecto sea String
    'projects.remove'(projectId){
       
        check(projectId, String);
        Projects.remove(projectId); // linea que remueve el proyecto
    }
})