import { Dispatch } from "react";  
import { Activity } from "../types";  
import categories from "../data/categories";  
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';  
import { ActivityActions } from "../reducers/activity-reducers";  

type ActivityListProps = {  
  activities: Activity[];  
  dispatch: Dispatch<ActivityActions>;  
};  

export default function ActivityList({ activities, dispatch }: ActivityListProps) {  
  // Función para obtener el nombre de la categoría  
  const categoryName = (category: number) =>   
    categories.find((cat) => cat.id === category)?.name || '';  

  // Función para editar una actividad  
  const handleEdit = (id: string) => {  
    dispatch({ type: 'edit-activity', payload: { id } }); // Despachar acción de editar  
  };   

  // Función para eliminar una actividad  
  const handleDelete = (id: string) => {  
    dispatch({ type: 'delete-activity', payload: { id } }); // Despachar acción de eliminar  
  };  

  return (  
    <section className="p-10 mx-auto max-w-4xl">  
      <h2 className="text-4xl font-bold text-slate-600 text-center">Servicios de Estacionamiento y Autolavado</h2>  
      <div className="flex flex-col space-y-5">  
        {activities.map((activity) => (  
          <div   
            key={activity.id}   
            className={`px-5 py-3 flex justify-between ${activity.category === 1 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}   
          >  
            <div>  
              <p className="font-bold text-lg">Nombre de Cliente: {activity.name}</p>  
              <p className="text-sm">{`Tipo de Servicio: ${categoryName(activity.category)}`}</p>  
              <p className="text-sm">{`Num. Placas: ${activity.placas}`}</p>  
              <p className="text-sm">{`Modelo y Año: ${activity.modeloAño}`}</p>  
              <p className="text-sm">{`Costo: $${activity.costo}`}</p>  
            </div>  
            <span className="text-lg flex items-center">  
              <button   
                className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"   
                onClick={() => handleEdit(activity.id)}  
              >  
                <PencilSquareIcon className="h-5 w-5 inline" /> Editar  
              </button>  
              <button   
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"  
                onClick={() => handleDelete(activity.id)}  
              >  
                <TrashIcon className="h-5 w-5 inline" /> Eliminar  
              </button>  
            </span>  
          </div>  
        ))}  
      </div>  
    </section>  
  );  
}  