
// src/store.ts  
import { createStore, combineReducers } from 'redux';  
import { activityReducer } from './reducers/activity-reducers'; // Ajusta la ruta si es necesario  

// Combina tus reducers aquí  
const rootReducer = combineReducers({  
  activities: activityReducer,  
  // Otras reducers se pueden agregar aquí  
});  

// Crea el store  
export const store = createStore(rootReducer);  

// Tipo para el estado global  
export type RootState = ReturnType<typeof rootReducer>;  
export type AppDispatch = typeof store.dispatch;  