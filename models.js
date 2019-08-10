module.exports = () => {
    const Sequelize = require("sequelize");

    const db = new Sequelize ("auth", "annaaombe","",{ 
        host: "127.0.0.1", dialect: "postgres", logging: false
    }); 

    const Product = db.define("product", {
        id:{
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        productname: Sequelize.STRING,
        productcondition: Sequelize.STRING,
        productcondition: Sequelize.STRING,
        productimage: Sequelize.STRING
    });

    const Donor = db.define("donors", {
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
    });

    const Recipient = db.define("recipients", {
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
    });

    const Order = db.define("order", {
        id:{
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        //fk 
        recipient_id:{
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
            references:{
                model: Recipient,
                key: 'id'
            }
        }
    });

    const User = db.define("user", {
        id:{
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true, //database increase/change user id on it's own
            primaryKey: true
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        salt: Sequelize.STRING(3)
    });

    const Inventory = db.define("inventory", {
        id:{
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: Sequelize.INTEGER.UNSIGNED,

        product_id: {
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
            references: {
                model: Product,
                key: 'id', 
            }
        },
     });

    const Supply = db.define("supply", {
        id:{
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        product_id: {
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
            references: {
                model: Product,
                key: 'id', 
            }
        },
        donor_id:{
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
            references: {
                model: Donor,
                key: 'id', 
            }
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });
    const ProductOrder = db.define("productOrder", {
        id:{
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: Sequelize.INTEGER.UNSIGNED,
        //fk in product table
        product_id: {
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            }
        },
        //fk in order table
        order_id: {
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
            references: {
                model: Order,
                key: 'id', 
            }
        }
    });

    return{
        db: db,
        User: User,
        Inventory: Inventory,
        Product: Product,
        Supply: Supply,
        Donor: Donor,
        ProductOrder: ProductOrder,
        Order: Order,
        Recipient: Recipient,

        init: function(){
            db.sync({force: true});
        }
    }
}
