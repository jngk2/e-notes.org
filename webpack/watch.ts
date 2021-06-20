import {WebpackPluginServe as Serve} from "webpack-plugin-serve";
import path from "path";

const config = {
    entry: [
        'webpack-plugin-serve/client',
    ],
    // This is not strictly necessary, as the application can be served by nginx, however it is needed if for developing
    // with live reloads.
    plugins: [
        new Serve({
            static: path.resolve(__dirname, '..', 'build'),
            port: 8085,
            liveReload: true
        })
    ],
    watch: true
}

export {config}
