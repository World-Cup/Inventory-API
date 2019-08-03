module.exports = () => {
    const Sequelize = require("sequelize");
    const db = new Sequelize ("auth", "annaaombe","",{
        host: "127.0.0.1",
        dialect: "postgres",
        logging: false
    });
     
    const User = db.define("user", {
      id:{
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      salt: Sequelize.STRING(3)
    });

    const Donor = db.define("donors",{
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

    const Recipient = db.define("recipients",{
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

    const Category = db.define("category",{
      id:{
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
      },
      name: Sequelize.STRING,

    });

    const Product = db.define("product",{
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
    });

    const Quantity = db.define("quantity",{
      id:{
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
      }
    });

    const Order = db.define("order",{
      id:{
         type: Sequelize.INTEGER.UNSIGNED,
         autoIncrement: true,
         primaryKey: true
      }
    });
     
    return {
        db,
        User,
        Donor,
        Recipient,
        Category,
        Product,
        Quantity,
        Order,
        init: function(){
            db.sync({force: true});
        }
    }
}
