//* CONSULTA GET
async function QueryGet(URL) {
    await fetch(URL)
    .then((Response) => Response.json())
    .then((Data) => {
        console.log(Data);
        return Data;
    });
};

export { QueryGet };