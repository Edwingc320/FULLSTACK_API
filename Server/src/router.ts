import { Router } from 'express';
import { createProduct, getProductById, updateProduct, deleteProduct, getProducts } from './handlers/Product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', getProducts);

router.get(
    '/:id',
    param('id').isInt().withMessage("El id debe ser un numero entero"),
    handleInputErrors,
    getProductById
  );

router.post(
  '/',
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacío'),
  handleInputErrors,
  createProduct
);


router.put('/:id',
    body('name')
      .notEmpty()
      .withMessage('El nombre no puede ir vacío'),
    body('price')
      .isNumeric()
      .withMessage('Valor no válido')
      .notEmpty()
      .withMessage('El precio del producto no puede ir vacío'),
    body('disponibility')
      .isBoolean()
      .withMessage('El valor de disponibilidad no es válido'),
    handleInputErrors,
    updateProduct
  );


  router.delete(
    '/:id',
    param('id').isInt().withMessage("El id debe ser un numero entero"),
    handleInputErrors,
    deleteProduct
  );
export default router;