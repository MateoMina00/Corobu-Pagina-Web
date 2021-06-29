var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto',{
    isContacto: true
  });
});

router.post('/', async(req, res, next) => {
  console.log(req.body);
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var consulta = req.body.consulta;

  var obj = {
    to: 'mateomina00@gmail.com',
    subject: 'Contacto desde Corobu',
    html: nombre + ' Se ha contactado desde la web de Corobu con la siguiente consulta: ' + consulta +'<br/> Mail: '+email+' Tel: '+tel+'.'
     
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });
  var info = await transport.sendMail(obj);
  res.render('contacto',{
    message: 'Consulta enviado correctamente'
  });
})
module.exports = router;
