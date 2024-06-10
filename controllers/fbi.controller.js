import dotenv from "dotenv/config";
import { results } from "../data/agentes.js";
import { generarToken, verificarToken } from "../utils/jwt.until.js";

const secretKey = process.env.MY_SECRETKEY;

export const signIn = (req, res) => {
  try {
    const { email, password } = req.query;
    const user = results.find((u) => u.email && u.password === password);
    if (user) {
      const token = generarToken(user, secretKey, "2m");
      console.log("token generado:", token);
      res.send(/*html*/ `
        <a href="/dashboard?token=${token}"></a>
        <p> loanding Agente...</p>
        <h2> welcomen Agente:${email}.</h2>
        
        <script>localStorage.setItem('token', JSON.stringify('${token}')) </script>
    
        `);
    } else {
      res.send("Acceso Denegado");
    }
  } catch (error) {
    console.log(error);
  }
};

export const veryfyTokenUser = async () => {
  //obtener el token por medio del query
  const { token } = req.query;

  try {
    const data = await verificarToken(token, secretKey);
    res.send(data);
  } catch (error) {
    console.log(error);
    alert("error al ingresar");
  }
};
