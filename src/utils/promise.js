import { defaults } from "autoprefixer";

const handlePromise = function (promise) {
  return promise.then(data => {
    return [data, null];
 })
 .catch(err => [null, err]);
}

export default handlePromise