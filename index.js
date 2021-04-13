//Importing dependencies
const express=require('express');
const bodyParser=require('body-parser');
const routes=require('./src/routes/routes');
const {PORT}=require('./env');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./src/db/sql');

//Creating instance of express
const app=express();

//Middleware
app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Swagger initialization
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Checkout',
            description: 'Checkout Documentation',
            contact: {
                name: "Priyanka Asrani",
            },
            servers: ["http://localhost:6060"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Swagger definition
/**
 * @swagger
 * /checkout/{code}:
 *  get:
 *      description: List cart and wishlist items
 *      tags:
 *      - checkout
 *      parameters:
 *      - name: code
 *        in: path
 *        description: JWT code
 *        required: true
 *        type: string
 *      responses:
 *         '200':
 *              description: List of cart and wishlist items
 */

/**
 * @swagger
 * /cart/add:
 *  post:
 *    tags:
 *      - cart
 *    summary: Adding items in cart
 *    parameters:
 *      - in: body
 *        name: body
 *        description: adding items in cart
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /cart/delete:
 *  post:
 *    tags:
 *      - cart
 *    summary: Deleting items from cart
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Deleting items from cart
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /cart/move:
 *  post:
 *    tags:
 *      - cart
 *    summary: Moving items from cart to wishlist
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Moving items from cart to wishlist
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /wishlist/add:
 *  post:
 *    tags:
 *      - wishlist
 *    summary: Adding items in wishlist
 *    parameters:
 *      - in: body
 *        name: body
 *        description: adding items in wishlist
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /wishlist/delete:
 *  post:
 *    tags:
 *      - wishlist
 *    summary: Deleting items from wishlist
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Deleting items from wishlist
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /wishlist/move:
 *  post:
 *    tags:
 *      - wishlist
 *    summary: Moving items from wishlist to cart
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Moving items from wishlist to cart
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /buy:
 *  post:
 *    tags:
 *      - buy
 *    summary: Buying courses
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Buying courses
 *        required: true
 *    responses:
 *      '200':
 *        description: successful operation
 */
//Using routes
app.use('/', routes)

//Server started
app.listen(6060,()=>{
    console.log('Server Started');
});