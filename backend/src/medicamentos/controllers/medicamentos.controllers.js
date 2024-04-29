import {pool} from '../../model/MySql.js'

export const getMedicamentos=(req,res)=>{
    let sql = "SELECT * FROM medicinas"
pool.query(sql,(error,data)=>{
    if(!error){
        res.status(200).send(data)
    }else{
        res.status(404).send({
            title:error.code,
            message:error.message
        })

    }
})
}

export const postMedicamentos=(req,res)=>{
    let frmData={
        nombre:req.body.nombre,
        existencia:req.body.existencia,
        valor:req.body.valor

    }

pool.query("INSERT INTO medicinas set ?",frmData,(error,data)=>{
    if(!error){
        res.status(200).send({
            title:"medico Agregado Exitosamente"
        })
    }else{
        res.status(404).send({
            title:error.code,
            message:error.message
        })

    }
})
}

export const putMedicamentos =  (req, res) => {
    let id = req.params.id;
    let frmData ={       
        nombre:req.body.nombre,
        existencia: req.body.existencia,
        valor: req.body.valor,
    }
    pool.query("UPDATE medicinas set ? WHERE id= ?",[frmData,id],(error,data)=>{
        if(!error)
        {
            res.status(200).send("usuario editado exitosamente")
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
            })
        }
    })
  }

  export const deleteMedicamento =(req,res)=>{
        let id = req.params.id
        let sql = "DELETE from medicinas WHERE id ="+id;
        pool.query(sql,(error,data)=>{
            if (!error) {
                res.status(200).send("medicina eliminada")
            }else{
                res.status(500).send({
                    title: error.code,
                    message: error.message
                })}
        } )
  }