import express from 'express';
import { readdirSync } from 'fs';
import path from 'path';

const app = express();
import { Request, Response } from 'express';
const port = 3000;

// Dynamically load each route in ./routes
const loadRoutes = (app: express.Application) => {
    const routesPath = path.join(__dirname, 'routes');
  
    // Read all files from the routes directory
    readdirSync(routesPath).forEach((file) => {
        const route = path.join(routesPath, file);
    
        // Dynamically import each route and use it
        const routeModule = require(route).default;
        const routeName = `/${file.split('.')[0]}`;
    
        // Each route is the name of the file (eg. health.ts -> '/health')
        app.use(routeName, routeModule);
    });
};

// Call the function to load routes
loadRoutes(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Evie\nConnecting EV drivers to thousands of chargers around the country.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
