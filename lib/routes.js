import { Router } from 'meteor/iron:router';

Router.configure({
    layoutTemplate: 'baseLayout'
})

Router.route('/',{
    name: 'home'
})