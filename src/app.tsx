'use strict';

import {createStore, combineReducers} from 'redux';
import {find, propEq, merge} from 'ramda';
import {Action} from "./actions";
import {from as _from} from 'rxjs/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishBehavior';
import {appConfig} from "./projects";


function gallery(state = {}, action: Action) {
  switch (action.type) {
    case "SELECT_IMAGE":
      return merge(state, {selected: action.id});
    default:
      return state;
  }
}



function projects(state = {projects: [], selected: null}, action: Action) {
  switch (action.type) {
    case 'SELECT_PROJECT':
      const project = find(propEq('id', action.id))(state.projects);
      return merge(state, {selected: project});
    default:
      return state;
  }
}

const reducer = combineReducers({
  gallery,
  projects
});

export const app = createStore(reducer, {
  gallery: {selected: 0},
  projects: {projects: appConfig.projects}
});

export const app$ = _from(app)
  .map(() => app.getState())
  .publishBehavior(app.getState())
  .refCount();
