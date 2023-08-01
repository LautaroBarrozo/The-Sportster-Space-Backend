funcionamiento de la api y rutas:

todas las rutas comienzan con /api por ejemplo para registrar un usuario la ruta será /api/register

-------------------------------------------RUTAS DE CREACIÓN/AUTENTICACIÓN DE USUARIO-----------------------------

post /register : recive userName, userEmail, userPassword y confirmPassword desde el body si todos los datos cumplen con los requizitos
realiza el hash de userPassword y guarda los datos y responde un json con los datos guardados.

post /login : recive el userEmail y userPassword desde el body, el email al ser unico para cada usuario busca en la base de datos
un usuario con el mismo email si el usuario es encontrado compara la contraseña ingresada con la que se encuentra en
la base de datos si coinciden todos los datos crea una cookie con un accesToken y responde con el usuario encontrado
si no encuentra el usuario o la contraseña no coincide responde con un status 400 y un mensaje de error

post /logout : devuelve un token vacio para borrar la cookie creada durande el login y responde con un status 200

get /verify : recive el token que se encuentra en la cookie creada durante el login y responde con true o false dependiendo
si la cookie aun es valida o no

-------------------------------------------------RUTAS DE CRUD DEL CARRITO-----------------------------------------------

post /addProduct : recive image, name, price, productId y userId desde el body si todos los datos cumplen con los requizitos
guarda los datos y responde un json con los datos guardados

post /getProducts : recive el userId desde el body luego busca en la base de datos todos los productos que coincidan con ese userId
y responde con un json con los productos encontrados

post /updateMinProduct : recive userId y productId luego busca el producto que coincida con los datos, una vez encontrado actualiza
el quantity del producto restandole uno, si el quantity ya era uno elimina ese producto del carrito
luego responde un json con el producto actualizado

post /updatePlusProduct : recive userId y productId luego busca el producto que coincida con los datos, una vez encontrado actualiza
el quantity del producto sumandole uno y responde un json con el producto actualizado

post /checkExistingProduct : recive userId y productId luego busca el producto que coincida con los datos y responde con true o false
dependiendo si el producto fue encontrado o no

post /deleteCart : recive el userId y elimina todos los productos que coincidan con el userId responde con la cantidad de elementos que
fueron eliminados

--------------------------------------RUTAS DE CREACIÓN/OBTENCIÓN DE COMENTARIOS--------------------------------

post /addComment : recive comment, userName y productId si todos los datos cumpllen los requizitos guarda los datos y responde un
json con los datos guardados

post /getComments : recive un productId y luego busca todos los comentarios que coincidan con ese productId y luego
responde un json con todos los comentarios encontrados

---
