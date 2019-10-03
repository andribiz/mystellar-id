// import { next as next } from "./app"
// import { federation } from "./backend/federation"
/*
Namespace application services with function groups.
Partially deploy namespaces for independent service updates.
*/

const federation = require('./backend/federation');

exports.federation = federation.federation;
exports.insertMystellarAddr = federation.insertMystellarAddr;

// SSR Next.js app Cloud Function used by Firebase Hosting
// yarn deploy-app
// const app = {
//   next,
//   // other Hosting dependencies
// }

// Mircoservices that make up the Greetings service
// yarn deploy-functions
// const backend = {
//   federation,
// }
//
// export { app, backend }
