export default async function request(path, options = {}) {
    const headers = new Headers({'Accept': 'application/json'});
    if (options.headers)
        for (const x in options.headers) {
            headers.append(x, options.headers[x])
        }
    let opts = {
        ...options,
        headers,
        credentials: 'include'
    }
    const res = await fetch(path, opts);
    if (res.ok)
        return await res.json();
    else {
        const error = new Error(res.statusText)
        error.data = await res.json();
        error.status = res.status
        error.statusText = res.statusText
        throw error;
    }
}


export async function get(path, params = {}, options = {}) {
    const url = new URL(path, location.origin)
    for (const x in params) {
        url.searchParams.append(x, params[x])
    }
    return request(url.toString(), options)
}

export async function post(path, data, options = {}) {

    return request(path, {...options, body: data})
}
