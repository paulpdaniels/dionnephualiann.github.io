'use strict';


export type Action =
  {type: 'SELECT_PROJECT', id: string}
    | {type: 'SELECT_IMAGE', id: number};

// Set selected gallery item
export const setSelected = (id) => ({id, type: 'SELECT_IMAGE'});
export const resetSelected = () => setSelected(0);


// Set the selected project
export const setProject = (id) => ({id, type: 'SELECT_PROJECT'});