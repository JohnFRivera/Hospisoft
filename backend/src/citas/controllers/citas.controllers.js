import { pool } from "../../model/MySql.js";

export const getCita=(req,res)=>{
    let sql = "select * from citas"
    pool.query(sql,(error,data)=>{
        if (!error) {
            res.status(200).send(data)
        }else{
            res.status(500).send({
                title: error.code,
                message: error.message
            })
        }
    });
} 
