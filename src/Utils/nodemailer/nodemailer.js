import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (options, text) => {

    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    }

    const message = {
        from: process.env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        html: text,
        attachments: [
          {
            filename: 'facebook.png',
            path: 'src/public/img/facebook.png',
            cid: 'fb' //same cid value as in the html img src
        },
        {
            filename: 'instagram.png',
            path: 'src/public/img/instagram.png',
            cid: 'ig' //same cid value as in the html img src
        },
        {
            filename: 'icon-whatsapp.png',
            path: 'src/public/img/icon-whatsapp.png',
            cid: 'wapp' //same cid value as in the html img src
        },
        {
            filename: 'icon-telegram.png',
            path: 'src/public/img/icon-telegram.png',
            cid: 'te' //same cid value as in the html img src
        },
        {
            filename: 'logo.webp',
            path: 'src/public/img/logo.png',
            cid: 'logo' //same cid value as in the html img src
            }
        ]
    }

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
}




export const sendEmailAdmin = async (options, {sessionUser, product}) => {
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
            }
    
            h1 {
                font-size: 36px;
                margin: 20px 0;
            }
    
            h2 {
                font-size: 30px;
                margin: 10px 0;
            }
    
            p, a {
                font-size: 18px;
            }
    
            .claseBoton {
                display: inline-block;
                background-color: #fcae3b;
                border: 2px solid #fcae3b;
                color: #000;
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                font-size: 18px;
                margin: 10px 0;
                transition-duration: 0.4s;
                cursor: pointer;
            }
    
            .claseBoton:hover {
                background-color: #000000;
                color: #fff;
            }
    
            .imag {
                width: 35px;
                height: 35px;
                margin: 5px;
            }
    
            .afooter {
                color: #fff;
                text-decoration: none;
                font-size: 15px;
            }
    
            .content-container {
                width: 100%;
                background-color: #e3e3e3;
                padding: 20px 0;
                text-align: center;
            }
    
            .header {
                background-color: #000;
                padding: 20px 0;
            }
    
            .logo {
                width: 120px;
                height: 100px;
            }
    
            .main-content {
                background-color: #fff;
                padding: 20px;
                text-align: center;
            }
    
            .main-content ul {
                list-style-type: none;
                padding: 0;
                text-align: left;
                display: inline-block;
            }
    
            .main-content li {
                margin: 10px 0;
            }
    
            .main-content li p {
                font-size: 18px;
            }
    
            .footer {
                background-color: #282828;
                color: #fff;
                padding: 10px 0;
                text-align: center;
            }
    
            .footer h4 {
                font-size: 20px;
                margin: 10px 0;
            }
    
            .footer p {
                font-size: 15px;
                padding: 0 20px;
            }
    
            .copyright {
                background-color: #000;
                padding: 10px 0;
                font-size: 12px;
                color: white;
            }
        </style>
    </head>
    <body>
        <div class="content-container">
            <div class="header">
                <img src="cid:logo" alt="" class="logo">
            </div>
            <div class="main-content">
                <h2>¡Nueva compra!</h2>
                <p>Los detalles de lo comprado son los siguientes:</p>
                <ul>
                    <li>
                        <p><b>Nombre del producto: </b>${product.name}</p>
                    </li>
                    <li>
                        <p><b>Descripción: </b>${product.description}</p>
                    </li>
                    <li>
                        <p><b>Precio: </b>${product.price}</p>
                    </li>
                </ul>
                <p>Comprador:</p>
                <ul>
                    <li>
                        <p><b>Nombre: </b>${sessionUser.username}</p>
                    </li>
                    <li>
                        <p><b>Correo: </b>${sessionUser.email}</p>
                    </li>
                    <li>
                        <p><b>Saldo: </b>${sessionUser.balance}</p>
                    </li>
                </ul>
                <p>Gracias por tu tiempo.</p>
                <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>MultiServicios Leonel Y Asociados</p>
                <div>
                  <a href="https://api.whatsapp.com/send/?phone=573107422802&text&type=phone_number&app_absent=0" class="contA"><img src="cid:wapp" class="imag" /></a>
                  <a href="t.me/leperox" class="contA"><img src="cid:te" class="imag" /></a>
                  <a href="https://www.facebook.com/MultiserLeonel?mibextid=ZbWKwl" class="contA"><img src="cid:fb" class="imag" /></a>
                  <a href="https://www.instagram.com/leperoxonline?igsh=OXV0OG1xZXNodDM3" class="contA"><img src="cid:ig" class="imag" /></a>
                </div>
            </div>
            <div class="footer">
                <h4>Soporte</h4>
                <p>Comunícate con nosotros por los siguientes medios:<br>
                Whatsapp: <a class="afooter" href="https://api.whatsapp.com/send/?phone=573107422802&text&type=phone_number&app_absent=0">+57 310 742 2802</a><br>
                </p>
            </div>
            <div class="copyright">
                © 2024 MultiServicios Leonel Y Asociados, todos los derechos reservados.
            </div>
        </div>
    </body>
    </html><
    `;

    const message = {
        from: process.env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        html: html,
        attachments: [
          {
            filename: 'facebook.png',
            path: 'src/public/img/facebook.png',
            cid: 'fb' //same cid value as in the html img src
        },
        {
            filename: 'instagram.png',
            path: 'src/public/img/instagram.png',
            cid: 'ig' //same cid value as in the html img src
        },
        {
            filename: 'icon-whatsapp.png',
            path: 'src/public/img/icon-whatsapp.png',
            cid: 'wapp' //same cid value as in the html img src
        },
        {
            filename: 'icon-telegram.png',
            path: 'src/public/img/icon-telegram.png',
            cid: 'te' //same cid value as in the html img src
        },
        {
            filename: 'logo.webp',
            path: 'src/public/img/logo.png',
            cid: 'logo' //same cid value as in the html img src
            }
        ]
    }

    
    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
}
