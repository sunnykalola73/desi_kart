const strip = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripHandler = async (req, res, next) => {
   try {
    
    const stripCustomer = await strip.customers.create({
      name: req.user.fname,
      email: req.user.email,
    });
      
    const card = await strip.customers.createSource(stripCustomer.id,{
        source:`${req.body.card_tok_id}`
    })

    const createCharges = await strip.charges.create({
      receipt_email: req.user.email,
      amount: Math.round(req.body.totalamount * 100),
      currency: "cad",
      card: `${card.id}`,
      customer: `${stripCustomer.id}`,
    });
    req.createCharges = createCharges;
    next()
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = stripHandler;
