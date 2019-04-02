const fs = require('fs');
const yaml = require('js-yaml');
const{Client} = require('fabric-client');
const { FileSystemWallet, Gateway } = require('fabric-network');
const wallet = new FileSystemWallet(__dirname +'/config/identity/Admin/wallet');

async function main() {

    const gateway = new Gateway();
    // Main try/catch block
    try {
    const userName = 'Admin@a.example.com';
    let connectionProfile = yaml.safeLoad(fs.readFileSync(__dirname + '/config/networkConnection_multinode.yaml', 'utf8'));	
    let connectionOptions = {
        identity: userName,
        wallet: wallet,
        discovery: { enabled:false, asLocalhost: true }
      };
    await gateway.connect(connectionProfile, connectionOptions);

    const client = gateway.getClient(); 
    
    const certAuth = client.getCertificateAuthority('ca.a.example.com');    

    const registrar = certAuth.getRegistrar();
    const fabCAService = certAuth.getFabricCAServices();

    const crypto = client.getCryptoSuite();
    crypto.generateKey().then(function(key){
        console.log(key);
        
        return key
        }).then(function(key){
            const sk = key.getSKI();
            const pub = key.getPublicKey();
            console.log(sk+'_sk');
            console.log(pub);
            const keybytes = key.toBytes();
            console.log(keybytes);
            const cert = crypto.sign(key,sk);
            console.log(cert);
            
                        
        });
    
    
   


    
    } catch (error) {
        console.log(`Error  ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
