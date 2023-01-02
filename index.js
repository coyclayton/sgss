const express = require('express');
const exp_bodyParser = require('body-parser');
const exp_compression = require('express-compression');
const exp_session = require('express-session');
const exp_san = require('express-sanitizer');
const exp_cors = require('cors');
const genuuid = require('uuid');

// load and prep sub-routers:

const configGlobal = require('./config.json');

var submods = {};
submods.jrftw = require('./games/jrftw.js');
// submods.nexus = require('./routes/nexus.js');
// submods.upm = require('./routes/upm.js');

    runService();    
    //======== Nexus Data Config Injection.
    function injectNexus(req, res, next) {
        req.nexusConfig = configGlobal.nexus;
        next();
    }

    // this is the primary execution loop of our service.
    function runService() {
        console.log("=============== Starting up Simple Game Server instance!");	
        const app = express();
        app.set('trust proxy', configGlobal["trust_proxy"]); 
        app.use(exp_bodyParser.urlencoded({ extended: false }));
        app.use(exp_bodyParser.json()); // for parsing application/json
        app.use(exp_compression());
        app.use(exp_san());
        app.use(exp_cors());
        app.use(exp_session({
            cookie: {
                httpOnly: configGlobal["httponly"],
                secure: configGlobal["secure_cookie"],
                maxAge: configGlobal['default_session_age'] * 1000,
            },
            secret: configGlobal['cookie_secret'],
            saveUninitialized: true,
            resave: false,
            genid: function(req) {
                return genuuid.v4(); // use uuid4s for session ids.
            },
            name: configGlobal["cookie_name"],
        }));

        // legacy routes

        app.use('/jrftw', submods.jrftw);

        // startup stuff goes here
        var svrConfig = {};
        if (process.env.HTTP_PORT == undefined) {
            console.log("HTTP PORT not defined");
            process.exit(3);
        }
        svrConfig.port = process.env.HTTP_PORT;

        if (configGlobal.ip_address != false) {
            svrConfig.host = configGlobal.ip_address;
        }
    
        if (configGlobal.ssl == true) {
            var https = require('https');
            var read = require('fs').readFileSync;
            var sslOptions = {
                key: read(config.sslFiles.key, 'utf8'),
                cert: read(config.sslFiles.cert, 'utf8'),
                ca: read(config.sslFiles.chain, 'utf8')
            }
            var server = https.createServer(sslOptions, app);
            server.listen(svrConfig, (data)=>{
               console.log("HTTPS server started");
            });
        } else {
            var http = require('http');
            var server = http.createServer(app);
            server.listen(svrConfig, (data)=>{

                console.log("HTTP server started");
            });
        }
        if (configGlobal.ip_address == false) {
            console.log( "SGSS service is ready on all ips @ " + svrConfig.port.toString());
        } else {
            console.log( "SGSS services is READY at " + svrConfig.host + ":" + svrConfig.toString());
        }         
    }// end of runService