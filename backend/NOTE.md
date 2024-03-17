### References
- https://blog.logrocket.com/how-to-set-up-node-typescript-express/
- https://hardhat.org/hardhat-runner/docs/getting-started#overview
- https://stackoverflow.com/questions/38026117/how-to-use-package-json-scripts-to-copy-files-with-specific-file-extension
- https://blog.infura.io/post/introducing-ipfs-dedicated-gateways
- https://community.infura.io/t/infura-ipfs-does-not-work/5269/14
- https://community.infura.io/t/ipfs-dedicated-gateway-not-working/4994
- https://stackoverflow.com/a/25146688

"compile": "cp -R ./artifacts/contracts/Document.sol/Document.json ./src/abi/",
"kls-constants": "file:../kls-modules/kls-constants",
const {} = require('kls-constants')

router.get('/claim/:userId', user.getClaim);

export const getClaim = async (req: any, res: Response, next: NextFunction): Promise<object> => {
  try {
    // TODO: create a new user    
    const claims = await getAuth().getUser(req.params.userId);
    console.log('claims: ', claims.customClaims);

		return res.status(200).json('Success');
	} catch (error) {
		return res.status(500).json('Internal Server Error!');
	}
}


### Addresses:
- institution_id: 0xEccF51b31432493EDa960AcfEF4EB8c35399d257
- created_by: 0xdcD537d8A4769C0C4896AE28E9EDbBb17Ee9801f
- updated_by: 0x8B0DC8Dc28A447B3586fFb9FE6Bd1dc41A394d70
- institution_id: 0x2554f3201c5a8D49F194C7b98Ce18eBB79E5d2d2
- created_by: 0x847E93746A88b3869b3eBa2fB7A0E44ee7f2F22A
- updated_by: 0xBA7db7bc9C672605eeCbecC5B77fa93b79b98697

### Users:
- jones@verifycopy.com
- jeff@verifycopy.com
- joy@verifycopy.com
- jack@verifycopy.com
- john@verifycopy.com
- jane@verifycopy.com

### Google Cloud Platform
Set up project id
```
gcloud config set project verify-copy
```

To view your application in the web browser run:
```
gcloud app browse -s api --project=verify-copy
```

Deploy dispatch route
```
gcloud app deploy dispatch.yaml
```

Add credentials short cut
```
export GOOGLE_APPLICATION_CREDENTIALS="/home/callezenwaka/project/callezenwaka/backend/service-account.json" \
GOOGLE_CLOUD_PROJECT="callezenwaka" \
LOCATION_ID="us-central1"
```

Test production from develop
```
export NODE_ENV="production"
```

Prod credential for localhost
```
export GOOGLE_APPLICATION_CREDENTIALS=/home/callezenwaka/project/vc-backend/service-account.json \
VC_POSTGRES_HOST='127.0.0.1' \
VC_POSTGRES_PORT='5432' \
VC_POSTGRES_DATABASE='docudent' \
VC_POSTGRES_USER='docudent' \
VC_POSTGRES_PASSWORD='YL<h@^&)($p[hdb?'
```

Download the Cloud SQL Auth Proxy
```
curl -o cloud-sql-proxy \
https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.0.0/cloud-sql-proxy.linux.amd64
```

Make the Cloud SQL Auth Proxy executable
```
chmod +x cloud-sql-proxy
```

Run the Cloud SQL Auth Proxy as a background process
```
./cloud-sql-proxy \
--credentials-file $GOOGLE_APPLICATION_CREDENTIALS \
verify-copy:us-central1:docudent &
```

### Blockchain keys
Add blockchain keys
```
export SEPOLIA_PRIVATE_KEY="3e0ca6a3761fb60996e30f93253c9e1f8fd7ee394a2238ac448799acc838dcdd"
```

### Postgres Database
Dev credential
```
export VC_POSTGRES_HOST='127.0.0.1' \
VC_POSTGRES_PORT='5432' \
VC_POSTGRES_DATABASE='docudent' \
VC_POSTGRES_USER='docudent' \
VC_POSTGRES_PASSWORD='password'
```
postgres table schema
```
CREATE TABLE public.document (
  id VARCHAR(256) PRIMARY KEY UNIQUE NOT NULL,
  institution_id VARCHAR(256) NOT NULL,
  name VARCHAR(1000) NOT NULL,
  description VARCHAR(1000),
  status INTEGER NOT NULL DEFAULT 0,
  block_hash VARCHAR(256) NOT NULL DEFAULT '0x',
  hash VARCHAR(256) NOT NULL DEFAULT '0x',
  created_at BIGINT DEFAULT 0,
  updated_at BIGINT DEFAULT 0
);

CREATE INDEX document_id ON public.document USING BTREE (id);
CREATE INDEX document_name ON public.document USING BTREE (name);
```

clear postgres table
```
TRUNCATE document;
```

restart postgres
```
sudo service postgresql restart
```

check postgres status
```
sudo service postgresql status
```

grant access to user
```
GRANT ALL PRIVILEGES ON TABLE document TO docudent;
```

Run postgres on docker
```
docker run --name postgres -e POSTGRES_PASSWORD=postgres --detach --publish 127.0.0.1:5433:5432 postgres
```

### Knex 
https://stackoverflow.com/a/40868721
Run latest migration using Knex package
```
npx knex migrate:make create_document --knexfile src/database/knexfile.ts -x ts
```

Run latest migration using Knex package
```
npx knex migrate:latest --knexfile src/database/knexfile.ts
```

Run latest migration using Knex package
```
npx knex migrate:make create_document --knexfile src/database/knexfile.ts --env production -x ts
```

Run latest migration on prod using Knex package
```
npx knex migrate:latest --env production
```

knex query
```
knex('persons')
  .where('first_name', 'John')
  .andWhere((builder) => {
    builder.where('age', '>', 18).orWhere('gender', 'male')
  })
```

### Smart Contract
Compile contract
```
npx hardhat compile
```

Get nodes
```
npx hardhat node
```

Deploy on localhost
```
npx hardhat run scripts/deploy.ts --network localhost
```
### Contract notes
// https://docs.soliditylang.org/en/v0.8.21/introduction-to-smart-contracts.html#deactivate-and-self-destruct
/**
 * @title 
 * @author callezenwaka
 * @notice 
 * Declare a boolean for each function.
 * Define an utility function to toggle the boolean
 * Only owner can call the function
 * Use revert guard for each function call
 */

 const axios = require('axios');
const NODE_ENV = process.env.NODE_ENV || 'dev';
const config = require(`../../../../config-${NODE_ENV}`);
const chargebee = require("chargebee");
chargebee.configure({
  site: `${config.chargeBee.site}`,
  api_key: `${config.chargeBee.api_key}`,
});
const getCompanyData = require('./get-company')

// const env = process.env.NODE_ENV || "dev";
// const config = require(`../../../../config-${env}`);

// const { export: { mdExport: {
//   http: {
//     url: mdExportUrl,
//     key: mdExportKey,
//   }
// } } } = config;