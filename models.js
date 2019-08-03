module.exports = () => {
     const Sequelize = require("sequelize");
     const db = new Sequelize ("auth", "annaaombe","",{
         host: "127.0.0.1",
         dialect: "postgres",
         logging: false
     });
     return{
         db,
         User: db.define("user", {
             id:{
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
             },
             username: Sequelize.STRING,
             password: Sequelize.STRING,
             salt: Sequelize.STRING(3)
         }),
         Donor: db.define("donors",{
            id:{
               type: Sequelize.INTEGER.UNSIGNED,
               autoIncrement: true,
               primaryKey: true
            },
            name: Sequelize.STRING,
            contact: Sequelize.STRING,
            city: Sequelize.STRING,
            state: Sequelize.STRING,
            zipcode: Sequelize.STRING
        }),
        Recipient: db.define("recipients",{
            id:{
               type: Sequelize.INTEGER.UNSIGNED,
               autoIncrement: true,
               primaryKey: true
            },
            name: Sequelize.STRING,
            contact: Sequelize.STRING,
            city: Sequelize.STRING,
            state:Sequelize.STRING,
            zipcode: Sequelize.STRING
        }),
        Category: db.define("category",{
            id:{
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: Sequelize.STRING,

        }),
        Product: db.define("product",{
            id:{
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Category',
                    key: 'id'
                }
            },
            productname: Sequelize.STRING,
            productcondition: Sequelize.STRING,
            productcondition: Sequelize.STRING,
            productimage: Sequelize.STRING
        }),
        Quantity: db.define("quantity",{
            id:{
               type: Sequelize.INTEGER.UNSIGNED,
               autoIncrement: true,
               primaryKey: true
            }
        }),
        Order: db.define("order",{
            id:{
               type: Sequelize.INTEGER.UNSIGNED,
               autoIncrement: true,
               primaryKey: true
            }
        }),
        init: function(){
            db.sync({force: true});
        }
     }
 }