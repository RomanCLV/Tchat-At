function printHello(req, res, next) {
    const { url, query, params, body, headers } = req;
    /*console.log({
        url,
        query,
        params,
        body
    });*/
    console.log("hello middleware");
    next();
}

exports.printHello = printHello;
