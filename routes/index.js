const reqRoute = require('./requestRoute');
const resRoute = require('./responseRoute');
const revRoute = require('./revokeRoute');
const querAllRoute = require('./queryallRoute');
const queryProReq = require('./queryProReqRoute');
const queryPatReq = require('./queryPatReqRoute');
const queryDB = require('./querydb');
const uploadMedDB = require('./uploadMedDb');
const uploadHistDB = require('./uploadHistDb');
const uploadLifeDB = require('./uploadLifeDb');
const queryPatientDB = require('./queryPatientdb');
const proViewRoute = require('./proViewRoute');
const queryProView = require('./queryProView');
const chaindashboard = require('./chainDashboard');




module.exports = function (app){
    reqRoute(app);
    resRoute(app);
    revRoute(app);
    querAllRoute(app);
    queryProReq(app);
    queryPatReq(app);
    queryDB(app);
    uploadMedDB(app);
    uploadLifeDB(app);
    uploadHistDB(app);
    queryPatientDB(app);
    proViewRoute(app);
    queryProView(app);
    chaindashboard(app);

}