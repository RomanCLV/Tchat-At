function printHello(req, res, next) {
    console.log("hello middleware: ");
    next();
}

function isLogged(req, res, next) {
    console.log("isLogged: ");
    const { url, query, params, body, headers } = req;
    console.log({
        url,
        query,
        params,
        body,
        headers
    });
    next();
}

exports.printHello = printHello;
exports.isLogged = isLogged;
