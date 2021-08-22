import {ETHEREUM, ETHTABLE, ETHTABLE_QUARTER, ETHSEMA, ALPHA, ALPHATABLE, ALPHATABLE_QUARTER, ALPHASEMA, BITCOIN, BITTABLE, BITTABLE_QUARTER, BITSEMA} from '../config';

const mapper = new Map<string, Array<string>>();
mapper.set('ethereum', [ETHEREUM, ETHTABLE, ETHTABLE_QUARTER, ETHSEMA]);
mapper.set('alpha', [ALPHA, ALPHATABLE, ALPHATABLE_QUARTER, ALPHASEMA]);
mapper.set('bitcoin', [BITCOIN, BITTABLE, BITTABLE_QUARTER, BITSEMA]);
mapper.set('', [ETHEREUM, ETHTABLE, ETHTABLE_QUARTER]);


const market = process.env.MARKET as string;
const constants = mapper.get(market);
const DYN_MARKET = constants ? constants[0]: ALPHA;
const DYN_TABLE = constants ? constants[1]: ALPHATABLE;
const DYN_TABLE_QUARTER = constants ? constants[2]: ALPHATABLE_QUARTER;
const DYN_SEMA = constants ? constants[3]: ALPHASEMA;

export {mapper, DYN_MARKET, DYN_TABLE, DYN_TABLE_QUARTER, DYN_SEMA};
