function getHealthStatus() {
    console.log("➡️ Service reached");

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