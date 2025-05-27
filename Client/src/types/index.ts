// src/types.ts  

export type Category = {  
  id: number;  
  name: string;  
};   

export type Activity = {   
  id: string; // ID único para cada actividad   
  category: number; // O puede ser string, según cómo manejes las categorías  
  name: string; // Nombre de cliente  
  placas: string; // Número de placas  
  modeloAño: string; // Modelo y año de carro  
  costo: number; // Costo  
};  