import compiler from '../compiler';

function router(server){
    /**
     * Handle the simple get request to check if the server is running or not
     */
    server.get('/', (req,res,next) => {
        res.send('Hello World\n');
        return next();
    });

    /**
     * The route to handle the given code and do all the magic
     */
    server.post('/compile', compiler);
}


export default router;
