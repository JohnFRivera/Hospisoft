async function NonQuery(endpoint, method) {
    let result = {
        ok: null,
        data: null
    }
    let response = await fetch(endpoint, {
        method: method
    });
    if (response.ok) {
        var res = response.json();
        res.then(data => {
            result.ok = true;
            result.data = data;
        });
    } else {
        result.ok = false;
        result.data = data;
    };
    return result;
};
async function Query(endpoint, method, json) {
    try {
        let result = {
            ok: null,
            data: null
        }
        let response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        if (response.ok) {
            var res = response.json();
            res.then(data => {
                result.ok = true;
                result.data = data;
            });
        } else {
            result.ok = false;
            result.data = [];
        };
        return result;
    } catch(err) {
        console.log(err);
        return err;
    };
};
export { NonQuery, Query };