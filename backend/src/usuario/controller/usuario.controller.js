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

  pool.query("INSERT INTO usuarios set ?", frmData, (error, data) => {
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
    usuario: req.body.usuario,
    email: req.body.email,
    rol: req.body.rol,
  };
  pool.query(
    "UPDATE usuarios set ? WHERE id= ?",
    [frmData, id],
    (error, data) => {
      if (!error) {
        res.status(200).send({
          title: "Felicidades",
          message: `Editado ${frmData.usuario} Correctamente`,
        });
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
      if (data.length) {
        if (data[0].contraseña == contraseña) {
          if (data[0].identificacion == identificacion) {
            let btn = [];
            switch (data[0].rol) {
              case "Administrador":
                btn = [
                  { text: 'Dashboard', href: `/pages/access/dashboard/`, icon: 'bi-graph-up-arrow' },
                  { text: 'Usuarios', href: `/pages/access/usuarios/`, icon: 'bi-people' },
                  { text: 'Medicinas', href: `/pages/access/medicinas/`, icon: 'bi-prescription2' },
                  { text: 'Agenda Especialista', href: `/pages/access/agenda_especialista/`, icon: 'bi-calendar4-range' },
                  { text: 'Citas', href: `/pages/access/citas/`, icon: 'bi-calendar4-week' },
                  { text: 'Separar Cita', href: `/pages/access/separar_cita/`, icon: 'bi-calendar2-plus' },
                  { text: 'Historias Clínicas', href: `/pages/access/historias_clinicas/`, icon: 'bi-clipboard2-pulse' },
                  { text: 'Crear Campaña', href: `/pages/access/crear_campaña/`, icon: 'bi-envelope-plus' }
                ];
                break;
              case "Usuario":
                btn = [
                  { text: 'Separar Cita', href: `/pages/access/separar_cita/`, icon: 'bi-calendar2-plus' },
                ];
                break;

              case "Pacientes":
                btn = [
                  { text: 'Separar Cita', href: `/pages/access/separar_cita/`, icon: 'bi-calendar2-plus' },
                ];
                break;
              case "Secretaria":
                btn = [
                  { text: 'Agenda Especialista', href: `/pages/access/agenda_especialista/`, icon: 'bi-calendar4-range' },
                ];
                break;

              case "Dispensario":
                btn = [
                  { text: 'Medicinas', href: `/pages/access/medicinas/`, icon: 'bi-prescription2' },
                ];
                break;

              case "Medico":
                btn = [
                  { text: 'Citas', href: `/pages/access/citas/`, icon: 'bi-calendar4-week' },
                  { text: 'Separar Cita', href: `/pages/access/separar_cita/`, icon: 'bi-calendar2-plus' },
                  { text: 'Historias Clínicas', href: `/pages/access/historias_clinicas/`, icon: 'bi-clipboard2-pulse' },
                ];
                break;
            }
            res.status(200).send({
              access: true,
              userInfo: [data[0].id, data[0].usuario],
              asideBtn: btn,
              route: btn[0].href
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
          title: "email no exite"

        });
      }
    } else {
      res.status(500).send({
        title: "error del servidor",
        message: "ah ocurrido un error en el sistema",
      });
    }
  });
};


