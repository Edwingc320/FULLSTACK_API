import { Activity } from "../types"; // Asegúrate de que la ruta sea correcta  

// Define el tipo de acciones de la actividad  
export type ActivityActions =   
  | { type: "save-activity"; payload: { newActivity: Activity } }  
  | { type: "set-activeId"; payload: { id: string } }  
  | { type: "edit-activity"; payload: { id: string } }  
  | { type: "delete-activity"; payload: { id: string } }  
  | { type: "clear-activities" }; // Nueva acción para eliminar  

// Define el estado de la actividad  
export type ActivityState = {  
  activities: Activity[]; // Arreglo de actividades  
  activeId: string; // ID de la actividad activa  
};  

// Estado inicial  
const loadActivitiesFromLocalStorage = () => {  
  const savedActivities = localStorage.getItem("activities");  
  return savedActivities ? JSON.parse(savedActivities) : [];  
};  

export const initialState: ActivityState = {  
  activities: loadActivitiesFromLocalStorage() as Activity[],  
  activeId: '',  
};  

// Reducer de actividades  
export const activityReducer = (  
  state: ActivityState = initialState,  
  action: ActivityActions  
): ActivityState => {  
  switch (action.type) {  
    case "save-activity": {  
      const existingActivity = state.activities.find(activity => activity.id === action.payload.newActivity.id);  
      if (existingActivity) {  
        return {  
          ...state,  
          activities: state.activities.map(activity =>  
            activity.id === existingActivity.id ? action.payload.newActivity : activity  
          ),  
        };  
      }  
      const updatedActivities = [...state.activities, action.payload.newActivity];  
      localStorage.setItem("activities", JSON.stringify(updatedActivities)); // Guardar en localStorage  
      return {  
        ...state,  
        activities: updatedActivities,  
      };  
    }  
    case "set-activeId":  
      return {  
        ...state,  
        activeId: action.payload.id,  
      };  
    case "edit-activity":  
      return {  
        ...state,  
        activeId: action.payload.id,  
      };  
    case "delete-activity": // Manejar la eliminación  
      const filteredActivities = state.activities.filter(activity => activity.id !== action.payload.id);  
      localStorage.setItem("activities", JSON.stringify(filteredActivities)); // Guardar en localStorage  
      return {  
        ...state,  
        activities: filteredActivities,  
      };  
    case "clear-activities": // Manejar la limpieza de la lista  
      localStorage.removeItem("activities"); // Eliminar de localStorage  
      return {  
        ...state,  
        activities: [],  
      };  
    default:  
      return state;  
  }  
};  