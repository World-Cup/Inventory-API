const models = require("./models")();
async function createOrder(req,res) {
    try {
        const order = await models.Order.create({
            recipient_id: req.body.recipient_id,
        });
    }
    catch(e){
        res.send("Error: " + e)
    }

    res.send({message:"Order created"});
}
module.exports = {
    createOrder: createOrder,
}
