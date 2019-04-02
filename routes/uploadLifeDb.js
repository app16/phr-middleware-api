'use strict';

module.exports = function(app) {    
    app.post("/uploadLife", (req, res) => {
        console.log('dbconnect');
        const mysql = require('mysql');
        const LifeID = '';
        const connection = mysql.createConnection({
            host     : '130.147.175.222',
            user     : 'root',
            password : '#welcome123',
            database : 'phrdemo'
        });
        connection.connect();
        console.log(req.body)
        connection.query("INSERT INTO Lifestyle (PatientID, Steps, Sleep, Calories) VALUES ('"+ req.body.patID +"','"+ req.body.steps +"','"+  req.body.sleep +"','"+ req.body.cals+"');", function(err, rows) {
        if (!err) {
          console.log("Successful Upload");
        } else {
            console.log(err);
        }        
        });
   
        connection.end(); 

            const fs = require('fs');
            const yaml = require('js-yaml');
            const { FileSystemWallet, Gateway } = require('fabric-network');

            const wallet = new FileSystemWallet(__dirname +'/../config/identity/User1/wallet');

            async function main() {
            // A gateway defines the peers used to access Fabric networks
            const gateway = new Gateway();
            // Main try/catch block
            try {
                // Specify userName for network access
                // const userName = 'isabella.issuer@magnetocorp.com';
                const userName = 'User1@a.example.com';
                // Load connection profile; will be used to locate a gateway
                //let connectionProfile = yaml.safeLoad(fs.readFileSync('./networkConnection_multinode.yaml', 'utf8'));
                let connectionProfile = yaml.safeLoad(fs.readFileSync(__dirname + '/../config/networkConnection_multinode.yaml', 'utf8'));

                // Set connection options; identity and wallet
                let connectionOptions = {
                identity: userName,
                wallet: wallet,
                discovery: { enabled:false, asLocalhost: true }
                };

                // Connect to gateway using application specified parameters
                console.log('Connect to Fabric gateway.');

                await gateway.connect(connectionProfile, connectionOptions);

                // Access PaperNet network
                console.log('Use network channel: mychannel.');

                const network = await gateway.getNetwork('common');

                // Get addressability to commercial paper contract
                console.log('Use org.papernet.commercialpaper smart contract.');

                const contract = await network.getContract('reference');

                // issue commercial paper
                console.log('Submit commercial paper issue transaction.');

                const issueResponse = await contract.submitTransaction('upload', req.body.patID,'Lifestyle', LifeID);

                // process response
                console.log('Process issue transaction response.');

                console.log('Transaction complete.');

            } catch (error) {

                console.log(`Error processing transaction. ${error}`);
                console.log(error.stack);

            } finally {

                // Disconnect from the gateway
                console.log('Disconnect from Fabric gateway.')
                gateway.disconnect();

            }
            }
            main().then(() => {

            console.log('Issue program complete.');
            res.send("Issue program complete.");

            }).catch((e) => {
            res.send("Issue program exception.");
            console.log('Issue program exception.');
            console.log(e);
            console.log(e.stack);
            process.exit(-1);

                }); 
    });
}