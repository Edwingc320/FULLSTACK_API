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
      let updatedActivities: Activity[];
      if (existingActivity) {
        updatedActivities = state.activities.map(activity =>
          activity.id === existingActivity.id ? action.payload.newActivity : activity
        );
      } else {
        updatedActivities = [...state.activities, action.payload.newActivity];
      }
      localStorage.setItem("activities", JSON.stringify(updatedActivities)); // Guardar siempre
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
    case "delete-activity": {
      const { id } = action.payload;
      const filteredActivities = state.activities.filter(activity => activity.id !== id);
      localStorage.setItem("activities", JSON.stringify(filteredActivities));
      return {
        ...state,
        activities: filteredActivities,
      };
    }
    case "clear-activities":
      localStorage.removeItem("activities");
      return {
        ...state,
        activities: [],
      };
    default:
      return state;
  }
};
