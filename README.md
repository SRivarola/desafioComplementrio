# Desafio Complementrio

Para levantar el servidor ejecutar npm run dev o npm start.

El servidor se levanta en el puerto 8080.

Endpoints para las vistas y api:
Product Router
view de todos los productos -> localhost:8080/api/products

create product -> localhost:8080/api/products
leer 1 product -> localhost:8080/api/products/:pid
update product -> localhost:8080/api/products/:pid
delete product -> localhost:8080/api/products/:pid

Cart Router

create cart -> localhost:8080/api/carts
leer 1 cart -> localhost:8080/api/carts/:cid
update cart -> localhost:8080/api/carts/:cid/products/:pid
delete product -> localhost:8080/api/carts/:cid/products/:pid
delete cart -> localhost:8080/api/carts/:cid
