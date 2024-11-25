// Importación de express y cors para crear y configurar el servidor.
import express from 'express';
import cors from 'cors';

// Importación de async_wrapper que maneja las operaciones asincrónicas.
import async_wrapper from './js/async_wrapper.js';

// Importación de funciones que contienen la lógica para obtener la información específica de marcas, tallas, colores, categorias.
import get_marks from './js/marks.js';
import get_sizes from './js/sizes.js';
import get_colors from './js/colors.js';
import get_categories from './js/categories.js';
import { 
  get_products, 
  get_products_marks, 
  get_products_sizes, 
  get_products_colors, 
  get_products_categories, 
  get_products_minmax_prices, 
  get_products_range_prices, 
  get_products_search 
} from './js/products.js';
import get_users_login from './js/users_login.js';
import get_users_register from './js/users_register.js';
import { verifyToken } from './js/token_authentication.js';
import { add_favorite, remove_favorite, get_favorites_by_user } from './js/favorites.js';

// Crea una aplicación Express (app) y habilita CORS para permitir solicitudes desde diferentes orígenes. 
// Configura la aplicación para que acepte datos JSON.
const app = express();
app.use(cors());
app.use(express.json());

//ENDPOINT TO GET ALL MARKS
app.post('/marks', async_wrapper(get_marks));

//ENDPOINT TO GET ALL SIZES
app.post('/sizes', async_wrapper(get_sizes));

//ENDPOINT TO GET ALL COLORS
app.post('/colors', async_wrapper(get_colors));

//ENDPOINT TO GET ALL COLORS
app.post('/categories', async_wrapper(get_categories));

//ENDPOINT TO GET ALL PRODUCTS
app.post('/products', async_wrapper(get_products));

//ENDPOINT TO FILTER MARK PRODUCTS
app.post('/products/marks/:id', async_wrapper(get_products_marks));

//ENDPOINT TO FILTER SIZE PRODUCTS
app.post('/products/sizes/:id', async_wrapper(get_products_sizes));

//ENDPOINT TO FILTER SIZE PRODUCTS
app.post('/products/colors/:id', async_wrapper(get_products_colors));

//ENDPOINT TO FILTER CATEGORY OF PRODUCTS
app.post('/products/categories/:id', async_wrapper(get_products_categories));

//ENDPOINT TO FILTER MMPRICES OF PRODUCTS
app.post('/products/mmprices', async_wrapper(get_products_minmax_prices));

//ENDPOINT TO FILTER RANGEPRICES OF PRODUCTS
app.post('/products/rangeprices/:id', async_wrapper(get_products_range_prices));

//ENDPOINT TO SEARCH PRODUCTS
app.post('/products/search', async_wrapper(get_products_search));

// ENDPOINT TO LOGIN
app.post('/login', async_wrapper(get_users_login));

// ENDPOINT TO USERS REGISTER
app.post('/register', async_wrapper(get_users_register));

// ENDPOINT TO TOKEN AUTHEHTICATION
app.post('/authT',  async_wrapper(verifyToken));

//ENDPOINT TO ADD FAVORITE
app.post('/favoritos/add', async_wrapper(add_favorite));

//ENDPOINT TO REMOVE FAVORITE
app.delete('/favoritos/remove', async_wrapper(remove_favorite));

//ENDPOINT TO FAVORITES BY USER
app.get('/favoritos/:id_usuario', async_wrapper(get_favorites_by_user));

// Configuración del servidor para escuchar en el puerto especificado en process.env.PORT 
// o en el puerto 3000 por defecto, y muestra un mensaje en la consola al iniciar.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});