const https = require('https');

const options = {
    //url: 'https://arizona-sbx.kuali.co/res/award/api/v1/awards/',
    hostname: 'arizona-sbx.kuali.co',
    port: 443,
    path: '/res/award/api/v1/awards/',
    json: true,
    method: 'GET',

    headers: {
        'Content-Type': 'application/json',
        'Authorization': '<Insert your API Key here>',
        'Accept': 'application/json',
    }
}


exports.handler =  async(event) =>  {
    console.log(event);
    
    let dataString = '';
    const response = await new Promise((resolve, reject) => {
    
        const req = https.get(options, function(res){
            
        res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            console.log(dataString);
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Error at sending request!'
          });
        });
        
    });
    
  return response;
};
