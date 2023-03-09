const sgMail = require('@sendgrid/mail')

//sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setApiKey("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")

const sendWelcomeEmail = (email,fname,lname) =>{
    sgMail.send({
        to: email,
        from:'naitik.uwaterloo@gmail.com',
        subject:'Thanks for join in !',
        text:`Welcome to the app, ${fname} ${lname}. How do you feel with the app`
    }).then(()=>{
        // console.log("Send done!")
    }).catch((error) => {
        // console.error(error.message)
    })
}

module.exports = {
    sendWelcomeEmail
}