import Form from "./Componente/Form";   
import { useReducer } from "react";  
import { activityReducer, initialState } from "./reducers/activity-reducers";  
import ActivityList from "./Componente/ActivityList";   

function App() {  
  const [state, dispatch] = useReducer(activityReducer, initialState);   

  // Función para manejar la limpieza de actividades  
  const handleClearActivities = () => {  
    dispatch({ type: 'clear-activities' }); // Despachar acción para limpiar actividades  
  };  

  return (  
    <>  
      <header className="bg-gray-800 py-3 ">  
        <div className="max-w-5xl mx-auto flex justify-between items-center">  
          <h1 className="text-center text-lg font-bold text-white uppercase">  
            Estacionamiento y Auto Lavado  
          </h1>  
          <button   
            className={`px-4 py-2 rounded ${state.activities.length > 0 ? 'bg-red-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}   
            onClick={state.activities.length > 0 ? handleClearActivities : undefined} // Solo permitir el dispatch si hay actividades  
            disabled={state.activities.length === 0} // Desactivar si no hay actividades  
          >  
            Limpiar Registros  
          </button>  
        </div>  
      </header>  
      <section className="bg-gray-700 py-20 px-5 ">  
        <div className="max-w-4xl mx-auto">  
          <Form dispatch={dispatch} activeId={state.activeId} activities={state.activities} />  
        </div>  
      </section>  
      <section className="p-10 mx-auto max-w-4xl">  
        <ActivityList   
          activities={state.activities}   
          dispatch={dispatch}   
        />  
      </section>  
    </>  
  );  
}  

export default App;  