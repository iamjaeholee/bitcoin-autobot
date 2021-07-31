import {ETHEREUM, ETHTABLE, ETHTABLE_QUARTER, ETHSEMA, ALPHA, ALPHATABLE, ALPHATABLE_QUARTER, ALPHASEMA} from '../config';

const mapper = new Map<string, Array<string>>();
mapper.set('ethereum', [ETHEREUM, ETHTABLE, ETHTABLE_QUARTER, ETHSEMA]);
mapper.set('alpha', [ALPHA, ALPHATABLE, ALPHATABLE_QUARTER, ALPHASEMA]);
mapper.set('', [ETHEREUM, ETHTABLE, ETHTABLE_QUARTER]);

export {mapper};