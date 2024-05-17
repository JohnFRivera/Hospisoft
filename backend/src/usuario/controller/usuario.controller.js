import { pool } from "../../model/MySql.js";

export const getUsuarios = (req, res) => {
  let sql = "SELECT * FROM usuarios ";

  pool.query(sql, (error, data) => {
    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(500).send({
        title: error.code,
        message: error.message,
      });
    }
  });
};

export const postUsuarios = (req, res) => {
  console.log(req.body);
  let frmData = {
    id: req.body.id,
    identificacion: req.body.identificacion,
    usuario: req.body.usuario,
    email: req.body.email,
    contraseña: req.body.contraseña,
    rol: req.body.rol,
  };

  pool.query("INSERT INTO usuarios set ?", frmData,(error, data) => {
    if (!error) {
      res.status(200).send({
        title: "Agregado exitosamente",
        message: `Usuario <b class="text-primary">${frmData.nombre} ${frmData.apellidos}</b> agregado correctamente.`,
      });
    } else {
      res.status(500).send({
        title: error.code,
        message: error.message,
      });
    }
  });
};

export const putUsuarios = (req, res) => {
  let id = req.params.id;
  let frmData = {
    identificacion: req.body.identificacion,
    usuario: req.body.usuario,
    email: req.body.email,
    contraseña: req.body.contraseña,
    rol: req.body.rol,
  };
  pool.query(
    "UPDATE usuarios set ? WHERE id= ?",
    [frmData, id],
    (error, data) => {
      if (!error) {
        res.status(200).send("editado");
      } else {
        res.status(500).send({
          title: error.code,
          message: error.message,
        });
      }
    }
  );
};

export const deleteUsuario = (req, res) => {
  let id = req.params.id;
  let sql = "DELETE from usuarios WHERE id =" + id;
  pool.query(sql, (error, data) => {
    if (!error) {
      res.status(200).send("usuario eliminado con exito");
    } else {
      res.status(500).send({
        title: error.code,
        message: error.message,
      });
    }
  });
};

export const loginUser = (req, res) => {
  let email = req.body.email;
  let contraseña = req.body.contraseña;
  let identificacion = req.body.identificacion;
  let sql =
    "SELECT id,usuario,email,contraseña,rol,identificacion FROM usuarios WHERE email = ?";
  pool.query(sql, email, (error, data) => {
    if (!error) {
      console.log(data);
      if (data[0].contraseña == contraseña) {
        if (data[0].identificacion == identificacion) {
          let btn = [];
          switch (data[0].rol) {
            case "Administrador":
              btn = [
                {
                  page: "dashboard",
                  icon: "bi-graph-up",
                  text: "Dashboard",
                },
                {
                  page: "usuarios",
                  icon: "bi-person",
                  text: "Usuarios",
                },
                {
                  page: "Usuario/separar_cita",
                  icon: "bi-calendar-plus",
                  text: "Separar Cita",
                },
                {
                  page: "Medico/citas",
                  icon: "bi-calendar2-minus",
                  text: "Citas",
                },
                {
                  page: "historias_clinicas",
                  icon: "bi-file-text",
                  text: "Historias Clínicas",
                },
                {
                  page: "Secretaria/generar_horario_especialista",
                  icon: "bi-calendar-week",
                  text: "Generar Horario",
                },
                {
                  page: "Dispensario/medicinas",
                  icon: "bi-prescription2",
                  text: "Medicinas",
                },
                {
                  page: "crear_campaña",
                  icon: "bi-chat-dots",
                  text: "Crear Campaña",
                },
              ];

              break;
            case "Usuario":
              btn = [
                {
                  page: "Usuario/separar_cita",
                  icon: "bi-calendar-plus",
                  text: "Separar Cita",
                },
              ];
              break;

            case "Pacientes":
              btn = [
                {
                  page: "Usuario/separar_cita",
                  icon: "bi-calendar-plus",
                  text: "Separar Cita",
                },
              ];
              break;
            case "Secretaria":
              btn = [
                {
                  page: "Secretaria/generar_horario_especialista",
                  icon: "bi-calendar-week",
                  text: "Generar Horario",
                },
              ];
              break;

            case "Dispensario":
              btn = [
                {
                  page: "Dispensario/medicinas",
                  icon: "bi-prescription2",
                  text: "Medicinas",
                },
              ];
              break;

            case "Medico":
              btn = [
                {
                  page: "Usuario/separar_cita",
                  icon: "bi-calendar-plus",
                  text: "Separar Cita",
                },
                {
                  page: "Medico/citas",
                  icon: "bi-calendar2-minus",
                  text: "Citas",
                },
                {
                  page: "Usuario/separar_cita",
                  icon: "bi-calendar-plus",
                  text: "Separar Cita",
                },
              ];
              break;
          }
          res.status(200).send({
            access: true,
            userInfo: [data[0].id,data[0].usuario],
            asideBtn: btn,
            btnNavbar: `<ul class="nav nav-pills w-100">
            <li class="nav-item">
                <a class="nav-link fw-semibold text-center fs-4" href="http://127.0.0.1:5500/pages/inicio/">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link fw-semibold text-center fs-4" href="http://127.0.0.1:5500/pages/access/">Dashboard</a>
            </li>
        </ul>`,
            route: "http://127.0.0.1:5500/pages/access/"
          });
        } else {
          res.status(500).send({
            title: "Error de identificacion",
            message: "no existe la identificaion del usuario",
          });
        }
      } else {
        res.status(500).send({
          title: "Error de contraseña",
          message: "no existe la contraseña",
        });
      }
    } else {
      res.status(500).send({
        title: "error de correo",
        message: "no se encuentra el correo",
      });
    }
  });
};


