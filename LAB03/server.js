const connect = require('connect');
const url = require('url');

function numCalculator(req, res, next) {
    const queryObject = url.parse(req.url, true).query;
    const method = queryObject.method;
    const x = parseFloat(queryObject.x);
    const y = parseFloat(queryObject.y);

    let result;

    switch (method) {
        case 'add':
            result = `${x} + ${y} = ${x + y}`;
            break;
        case 'subtract':
            result = `${x} - ${y} = ${x - y}`;
            break;
        case 'multiply':
            result = `${x} * ${y} = ${x * y}`;
            break;
        case 'divide':
            if (y === 0) {
                result = "Error: Division by zero is not allowed!";
            } else {
                result = `${x} / ${y} = ${x / y}`;
            }
            break;
        default:
            result = 'Error: Invalid method! Please use "add", "subtract", "multiply", or "divide".';
    }

    res.end(result);
}

const app = connect();
app.use('/lab2', numCalculator);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
