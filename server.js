const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
    console.log("Server is listening on port ${PORT}");
    console.log("API available at: http://localhost:${PORT}/api");
    console.log("Health check: http://localhost:${PORT}/api/health");
});