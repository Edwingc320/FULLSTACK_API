import { useState, ChangeEvent, FormEvent, useEffect } from "react";  
import { v4 as uuidv4 } from "uuid";  
import { Activity } from "../types";  
import { categories } from "../data/categories";  
import { ActivityActions } from "../reducers/activity-reducers";  

type FormProps = {  
  dispatch: (action: ActivityActions) => void;  
  activeId: string; // Añadir activeId  
  activities: Activity[]; // Recibir actividades  
};  

const initialState: Activity = {  
  id: '', // Cambie a vacío inicialmente  
  category: 1,  
  name: '',  
  placas: '',  
  modeloAño: '',  
  costo: 0,  
};  

export default function Form({ dispatch, activeId, activities }: FormProps) {  
  const [activity, setActivity] = useState<Activity>(initialState);  

  useEffect(() => {  
    if (activeId) { // Al cambiar activeId  
      const activityToEdit = activities.find(activity => activity.id === activeId);  
      if (activityToEdit) {  
        setActivity(activityToEdit); // Rellenar el formulario con los datos de la actividad  
      }  
    } else {  
      setActivity(initialState); // Reiniciar si no hay activeId  
    }  
  }, [activeId, activities]); // Dependencias  

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {  
    const { name, value } = e.target;  
    if (name === "costo") {  
      setActivity(prevState => ({  
        ...prevState,  
        [name]: Number(value),  
      }));  
    } else {  
      setActivity(prevState => ({  
        ...prevState,  
        [name]: value,  
      }));  
    }  
  };  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
    
    const newActivityWithId = {  
      ...activity,  
      id: activity.id || uuidv4(), // Usa el ID existente o genera uno nuevo si está vacío  
    };  
  
    // Aquí llamamos a save-activity, que ahora maneja actualizaciones  
    dispatch({ type: 'save-activity', payload: { newActivity: newActivityWithId } });  
    console.log('Submit...', newActivityWithId);  
    setActivity(initialState); // Reiniciar el formulario  
  };  

  const isValidActivity = () => {  
    const { name, costo } = activity;  
    return name.trim() !== "" && costo >= 0;  
  };  

  const buttonLabel = activity.category === 1 ? "Guardar Estacionamiento" : "Guardar Autolavado";  

  return (  
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>  
      <div className="grid grid-cols-1 gap-3">  
        <label htmlFor="category">Tipo de servicio:</label>  
        <select  
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"  
          id="category"  
          name="category"  
          value={activity.category}  
          onChange={handleChange}  
        >  
          {categories.map(category => (  
            <option key={category.id} value={category.id}>  
              {category.name}  
            </option>  
          ))}  
        </select>  
      </div>  

      <div className="grid grid-cols-1 gap-3">  
        <label htmlFor="name" className="font-bold">Nombre de cliente:</label>  
        <input  
          id="name"  
          name="name"  
          type="text"  
          className="border border-slate-300 p-2 rounded-lg"  
          placeholder="Ej. Juan Pérez"  
          value={activity.name}  
          onChange={handleChange}  
        />  
      </div>  

      <div className="grid grid-cols-1 gap-3">  
        <label htmlFor="placas" className="font-bold">Num. Placas:</label>  
        <input  
          id="placas"  
          name="placas"  
          type="text"  
          className="border border-slate-300 p-2 rounded-lg"  
          placeholder="Ej. ABC123"  
          value={activity.placas}  
          onChange={handleChange}  
        />  
      </div>  

      <div className="grid grid-cols-1 gap-3">  
        <label htmlFor="modeloAño" className="font-bold">Modelo y año de carro:</label>  
        <input  
          id="modeloAño"  
          name="modeloAño"  
          type="text"  
          className="border border-slate-300 p-2 rounded-lg"  
          placeholder="Ej. Toyota Camry 2015"  
          value={activity.modeloAño}  
          onChange={handleChange}  
        />  
      </div>  

      <div className="grid grid-cols-1 gap-3">  
        <label htmlFor="costo" className="font-bold">Costo:</label>  
        <input  
          id="costo"  
          name="costo"  
          type="number"  
          className="border border-slate-300 p-2 rounded-lg"  
          placeholder="Ej. 300 o 500"  
          value={activity.costo}  
          onChange={handleChange}  
        />  
      </div>  

      <input  
        type="submit"  
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-50"  
        value={buttonLabel}  
        disabled={!isValidActivity()}  
      />  
    </form>  
  );  
}  
