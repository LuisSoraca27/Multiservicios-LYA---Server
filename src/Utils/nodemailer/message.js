import moment from "moment-timezone"


export const messageGift = (data) => {
    return `
    <h1>Datos del obsequio</h1>
    <br>
    <h3> ${data.name}</h3>
    <p>${data.description}</p>
    `;
}

export const messageProfile = (data) => {

    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      
      // Configura la zona horaria para Colombia (America/Bogota)
      moment.tz.setDefault('America/Bogota');
      
      // Obtén la fecha actual en Colombia
      const fechaDeCreacion = moment();
      
      // Número de días a sumar
      const numeroDiasASumar = data.durationOfService;
      
      // Clona la fecha original para no modificarla directamente
      const nuevaFecha = fechaDeCreacion.clone();
      
      // Suma el número de días a la fecha
      nuevaFecha.add(numeroDiasASumar, 'days');
      
      // Formatea la nueva fecha en el formato deseado (por ejemplo, "YYYY-MM-DDTHH:MM:SS.sssZ")
      const nuevaFechaFormateada = nuevaFecha.format();
      
      // Obtén el día, mes y año en formato de cadena fecha de creación
      const dia = fechaDeCreacion.format('D');
      const mesNumero = fechaDeCreacion.month();
      const mes = meses[mesNumero];
      const anio = fechaDeCreacion.format('YYYY');
      
      // Obtén el día, mes y año en formato de cadena fecha de corte
      const diaV = nuevaFecha.format('D');
      const mesNumeroV = nuevaFecha.month();
      const mesV = meses[mesNumeroV];
      const anioV = nuevaFecha.format('YYYY');
      
      // Imprime los resultados
      console.log(`Fecha de inicio: ${dia} ${mes} ${anio}`);
      console.log(`Fecha de corte: ${diaV} ${mesV} ${anioV}`);

    return `
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
            <h2>¡Gracias por su compra!</h2>
            <p>Los detalles de lo comprado son los siguientes:</p>
            <ul>
                <li>
                    <p><b>Nombre del producto: </b>${data.name}</p>
                </li>
                <li>
                    <p><b>Descripción: </b>${data.description}</p>
                </li>
                <li>
                    <p><b>Correo: </b>${data.emailAccount}</p>
                </li>
                <li>
                    <p><b>Contraseña: </b>${data.passwordAccount}</p>
                </li>
                <li>
                    <p><b>Perfil: </b>${data.profileAccount}</p>
                </li>
                <li>
                    <p><b>Pin: </b>${data.pincodeAccount}</p>
                </li>
                <li>
                  <p><b>Tiempo de servicio: </b>${data.durationOfService} dias. Inicia ${dia} de ${mes} ${anio} y finaliza ${diaV} de ${mesV} ${anioV}. Servicio 100% garantizado</p>
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
</html>
    `
}

export const messageIptv = (data) => {
    // return `  
    // <h1>Datos del pedido</h1>
    // <br>
    // <h3> ${data.name}</h3>
    // <p>${data.description}</p>
    // <ul>
    // <li>Nombre IPTV: ${data.emailAccount}</li>
    // <li>Usuario: ${data.passwordAccount}</li>
    // <li>Contraseña: ${data.profileAccount}</li>
    // <li>URL: ${data.pincodeAccount}</li>
    // </ul>
    // `;

    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      
      // Configura la zona horaria para Colombia (America/Bogota)
      moment.tz.setDefault('America/Bogota');
      
      // Obtén la fecha actual en Colombia
      const fechaDeCreacion = moment();
      
      // Número de días a sumar
      const numeroDiasASumar = data.durationOfService;
      
      // Clona la fecha original para no modificarla directamente
      const nuevaFecha = fechaDeCreacion.clone();
      
      // Suma el número de días a la fecha
      nuevaFecha.add(numeroDiasASumar, 'days');
      
      // Formatea la nueva fecha en el formato deseado (por ejemplo, "YYYY-MM-DDTHH:MM:SS.sssZ")
      const nuevaFechaFormateada = nuevaFecha.format();
      
      // Obtén el día, mes y año en formato de cadena fecha de creación
      const dia = fechaDeCreacion.format('D');
      const mesNumero = fechaDeCreacion.month();
      const mes = meses[mesNumero];
      const anio = fechaDeCreacion.format('YYYY');
      
      // Obtén el día, mes y año en formato de cadena fecha de corte
      const diaV = nuevaFecha.format('D');
      const mesNumeroV = nuevaFecha.month();
      const mesV = meses[mesNumeroV];
      const anioV = nuevaFecha.format('YYYY');
      
      // Imprime los resultados
      console.log(`Fecha de inicio: ${dia} ${mes} ${anio}`);
      console.log(`Fecha de corte: ${diaV} ${mesV} ${anioV}`);

    return `
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
            <h2>¡Gracias por su compra!</h2>
            <p>Los detalles de lo comprado son los siguientes:</p>
            <ul>
                <li>
                    <p><b>Nombre del producto: </b>${data.name}</p>
                </li>
                <li>
                    <p><b>Descripción: </b>${data.description}</p>
                </li>
                <li>
                    <p><b>Nombre IPTV: </b>${data.emailAccount}</p>
                </li>
                <li>
                    <p><b>Usuario: </b>${data.passwordAccount}</p>
                </li>
                <li>
                    <p><b>Contraseña: </b>${data.profileAccount}</p>
                </li>
                <li>
                    <p><b>URL: </b>${data.pincodeAccount}</p>
                </li>
                <li>
                  <p><b>Tiempo de servicio: </b>${data.durationOfService} dias. Inicia ${dia} de ${mes} ${anio} y finaliza ${diaV} de ${mesV} ${anioV}. Servicio 100% garantizado</p>
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
</html>
    `
}

export const messageAccount = (data) => {
  
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      
      // Configura la zona horaria para Colombia (America/Bogota)
      moment.tz.setDefault('America/Bogota');
      
      // Obtén la fecha actual en Colombia
      const fechaDeCreacion = moment();
      
      // Número de días a sumar
      const numeroDiasASumar = data.durationOfService;
      
      // Clona la fecha original para no modificarla directamente
      const nuevaFecha = fechaDeCreacion.clone();
      
      // Suma el número de días a la fecha
      nuevaFecha.add(numeroDiasASumar, 'days');
      
      // Formatea la nueva fecha en el formato deseado (por ejemplo, "YYYY-MM-DDTHH:MM:SS.sssZ")
      const nuevaFechaFormateada = nuevaFecha.format();
      
      // Obtén el día, mes y año en formato de cadena fecha de creación
      const dia = fechaDeCreacion.format('D');
      const mesNumero = fechaDeCreacion.month();
      const mes = meses[mesNumero];
      const anio = fechaDeCreacion.format('YYYY');
      
      // Obtén el día, mes y año en formato de cadena fecha de corte
      const diaV = nuevaFecha.format('D');
      const mesNumeroV = nuevaFecha.month();
      const mesV = meses[mesNumeroV];
      const anioV = nuevaFecha.format('YYYY');
      
      // Imprime los resultados
      console.log(`Fecha de inicio: ${dia} ${mes} ${anio}`);
      console.log(`Fecha de corte: ${diaV} ${mesV} ${anioV}`);

    return `
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
            <h2>¡Gracias por su compra!</h2>
            <p>Los detalles de lo comprado son los siguientes:</p>
            <ul>
                <li>
                    <p><b>Nombre del producto: </b>${data.name}</p>
                </li>
                <li>
                    <p><b>Descripción: </b>${data.description}</p>
                </li>
                <li>
                    <p><b>Correo: </b>${data.emailAccount}</p>
                </li>
                <li>
                    <p><b>Contraseña: </b>${data.passwordAccount}</p>
                </li>
                  <p><b>Tiempo de servicio: </b>${data.durationOfService} dias. Inicia ${dia} de ${mes} ${anio} y finaliza ${diaV} de ${mesV} ${anioV}. Servicio 100% garantizado</p>
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
</html>
    `
}

export const messageCombo = (combo) => {

    let message = `
    <h1>Datos del pedido</h1>
    <br>
    <h3>${combo.name}</h3>
    <h4>${combo.description}</h4>
    <br>
    <h3>Contenido del combo</h3>
    <br>
    `;

    const profilesInCombo = combo.profileInCombos

    profilesInCombo.forEach((profile) => {
        const profileData = profile.profile; // Acceder a la propiedad 'profile' del elemento
        message += `
          <h3>${profileData.name}</h3>
          <ul>
            <li>CORREO: ${profileData.emailAccount}</li>
            <li>CONTRASEÑA: ${profileData.passwordAccount}</li>
            <li>PERFIL: ${profileData.profileAccount ? profileData.profileAccount : 'Sin perfil'}</li>
            <li>PIN: ${profileData.pincodeAccount ? profileData.pincodeAccount : 'Sin pin'}</li>
          </ul>
          <br>
        `;
    });


    return message;
}


export const messageComboAdmin = (user, combo) => {
    let message = `
    <h1>Datos del pedido</h1>
    <h2>Datos del comprador</h2>
    <h4>Nombre: ${user.username}</h4>
    <h4>Correo: ${user.email}</h4>
    <h4>Saldo: ${user.balance}</h4>
    <br>
    <h2>contenido del combo</h2>
    <h3>${combo.name}</h3>
    <h4>${combo.description}</h4>
    <br>
    `;

    combo.profileInCombos.map(profileInCombo => {
        const profileData = profileInCombo.profile; // Acceder a la propiedad 'profile' del elemento
        message += `
         <h3>${profileData.name}</h3>
         <ul>
           <li>CORREO: ${profileData.emailAccount}</li>
           <li>PERFIL: ${profileData.profileAccount ? profileData.profileAccount : 'Sin perfil'}</li>
           <li>PIN: ${profileData.pincodeAccount ? profileData.pincodeAccount : 'Sin pin'}</li>
         </ul>
         <br>
       `
    })

    return message;
}

export const messageLicense = (data) => {
    // return `  
    // <h1>Datos del pedido</h1>
    // <br>
    // <h3> ${data.name}</h3>
    // <p>${data.description}</p>
    // <p>Por favor contactese con la administración para obtener más datos de su compra.</p>
    // `;

    return `
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
            <h2>¡Gracias por su compra!</h2>
            <p>Los detalles de lo comprado son los siguientes:</p>
            <ul>
                <li>
                    <p><b>Nombre del producto: </b>${data.name}</p>
                </li>
                <li>
                    <p><b>Descripción: </b>${data.description}</p>
                </li>
                <li>
                <p>Por favor contactese con la administración para obtener más datos de su compra.</p>
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
</html>
    `
}

export const messageCourse = (data) => {

    // return `  
    // <h1>Datos del pedido</h1>
    // <br>
    // <h3> ${data.name}</h3>
    // <p>${data.description}</p>
    // <p>${data.linkCourse}</p>
    // `;

    return `
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
            <h2>¡Gracias por su compra!</h2>
            <p>Los detalles de lo comprado son los siguientes:</p>
            <ul>
                <li>
                    <p><b>Nombre del producto: </b>${data.name}</p>
                </li>
                <li>
                    <p><b>Descripción: </b>${data.description}</p>
                </li>
                </li>
                <li>
                    <p><b>Link del curso: </b>${data.linkCourse}</p>
                </li>
                <p>Por favor contactese con la administración para obtener más datos de su compra.</p>
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
</html>
    `
}