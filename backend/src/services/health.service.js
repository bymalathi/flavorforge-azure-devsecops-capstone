function getHealthStatus() {
    console.log("➡️ Service reached");

    //await new Promise((resolve) => setTimeout(resolve, 10000));

    return {
        status: "UP",
        application: "FlavorForge Backend",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    getHealthStatus
};