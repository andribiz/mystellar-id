import https from 'https';
import toml from 'toml';

const isVerifiedDomain = (domain, callbackRes) => {
  const FEDERATION_SERVER =
    'https://us-central1-mystellar-id.cloudfunctions.net/federation';
  const options = {
    hostname: domain,
    port: 443,
    path: '/.well-known/stellar.toml',
  };
  https
    .get(options, res => {
      console.log(`status code : ${res.statusCode}`);
      if (res.statusCode != '200')
        callbackRes({ errCode: 1, message: `Error Code: ${res.statusCode}` });
      res.on('data', data => {
        try {
          const serverConfig = toml.parse(data);
          if (serverConfig.FEDERATION_SERVER === FEDERATION_SERVER) {
            callbackRes({ errCode: 0, message: 'Domain verified' });
          } else {
            callbackRes({ errCode: 1, message: 'Config file is not valid' });
          }
        } catch (err) {
          callbackRes({
            errCode: 1,
            message: 'content of config file is not valid',
          });
        }
      });
    })
    .on('error', err => {
      callbackRes({ errCode: 1, message: `Error : ${err}` });
    });
};

export { isVerifiedDomain };
