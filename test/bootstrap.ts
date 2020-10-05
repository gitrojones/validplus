import 'module-alias'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiLike from 'chai-like'
import chaiArrays from 'chai-arrays'
import chaiString from 'chai-string'
import sinonChai from 'sinon-chai'

chai.use(chaiAsPromised);
chai.use(chaiArrays);
chai.use(chaiLike);
chai.use(chaiString);
chai.use(sinonChai);
export default chai;
