const http = require('http');

const requestHandler = (req, res) => {
    const url = req.url;

    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html lang="en">');
        res.write('<head><title></title></head>');
        res.write(
            '<body>' +
            '<div>Some greeting message. I\'m here. And i started nodejs</div>' +
            '<form action="/create-user" method="post">' +
            '<input type="text" name="username">' +
            '<button type="submit">Save</button>' +
            '</form>' +
            '</body>'
        )
        res.write('</html>');
        res.end();
    }

    if (url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html lang="en">');
        res.write('<head><title></title></head>');
        res.write(
            '<body>' +
            '<ul>' +
                '<li>Buse</li>' +
                '<li>Oguzhan</li>' +
                '<li>Sinem</li>' +
                '<li>Fatih</li>' +
            '</ul>' +
            '</body>'
        )
        res.write('</html>');
        res.end();
    }

    if (url === '/create-user'){
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        })

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];

            console.log('user', message);
        })

        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

const server = http.createServer(requestHandler);
server.listen(3000);
