async function NonQuery(endpoint, method) {
    let result = {
        ok: null,
        data: null
    }
    let response = await fetch(endpoint, {
        method: method
    });
    var res = response.json();
    res.then(data => {
        if (response.ok) {
            result.ok = true;
            result.data = data;
        } else {
            result.ok = false;
            result.data = data;
        };
    });
};
async function Query(endpoint, method, formData) {
    let result = {
        ok: null,
        data: null
    }
    let response = await fetch(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });
    var res = response.json();
    res.then(data => {
        if (response.ok) {
            result.ok = true;
            result.data = data;
        } else {
            result.ok = false;
            result.data = data;
        };
    });
};
export { NonQuery, Query };