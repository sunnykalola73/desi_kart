const STRIPE_SECRET_KEY ="sk_test_51MovUaFfBNsel5oDaKGA1Zl2RRltfYcz4RJCLEIN7UeDhio0oRc49L0Ibn91HJLE1N3ioV74IJaQBAgTp8XgOKKL0052GvYR7W";
const strip = require("stripe")(STRIPE_SECRET_KEY);

const stripHandler = async (req, res, next) => {
  try {
    const stripCustomer = await strip.customers.create({
      name: req.user.fname,
      email: req.user.email,
    });
    
    const {
        card_Number,
        card_ExpMonth,
        card_ExpYear,
        card_CVC,
        card_Name
    } = req.body;
    const card_Token = await strip.tokens.create({
        card:{
            name:card_Name,
            number:card_Number,
            exp_month:card_ExpMonth,
            exp_year:card_ExpYear,
            cvc:card_CVC
        },
    });
    const card = await strip.customers.createSource(stripCustomer.id,{
        source:`${card_Token.id}`
    })

    const createCharges = await strip.charges.create({
        receipt_email:req.user.email,
        amount:Math.round(req.body.totalamount*100),
        currency:"cad",
        card:`${card.id}`,
        customer:`${stripCustomer.id}`
    })
    req.createCharges = createCharges;
    next()
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = stripHandler;
