import {
  ETHEREUM,
  ETHTABLE,
  ETHTABLE_QUARTER,
  ETHSEMA,
  ALPHA,
  ALPHATABLE,
  ALPHATABLE_QUARTER,
  ALPHASEMA,
  BITCOIN,
  BITTABLE,
  BITTABLE_QUARTER,
  BITSEMA,
  BITCHANNEL,
  ALPHACHANNEL,
  ETHCHANNEL,
  ALPHA_SLACK_INCOMING_WEBHOOK,
  ETH_SLACK_INCOMING_WEBHOOK,
  BIT_SLACK_INCOMING_WEBHOOK,
} from "../config";

const mapper = new Map<string, Array<string>>();
mapper.set("ethereum", [
  ETHEREUM,
  ETHTABLE,
  ETHTABLE_QUARTER,
  ETHSEMA,
  ETHCHANNEL,
  ETH_SLACK_INCOMING_WEBHOOK,
]);
mapper.set("alpha", [
  ALPHA,
  ALPHATABLE,
  ALPHATABLE_QUARTER,
  ALPHASEMA,
  ALPHACHANNEL,
  ALPHA_SLACK_INCOMING_WEBHOOK,
]);
mapper.set("bitcoin", [
  BITCOIN,
  BITTABLE,
  BITTABLE_QUARTER,
  BITSEMA,
  BITCHANNEL,
  BIT_SLACK_INCOMING_WEBHOOK,
]);
mapper.set("", [ETHEREUM, ETHTABLE, ETHTABLE_QUARTER]);

const market = process.env.MARKET as string;
const constants = mapper.get(market);
const DYN_MARKET = constants ? constants[0] : ALPHA;
const DYN_TABLE = constants ? constants[1] : ALPHATABLE;
const DYN_TABLE_QUARTER = constants ? constants[2] : ALPHATABLE_QUARTER;
const DYN_SEMA = constants ? constants[3] : ALPHASEMA;
const DYN_CHANNEL = constants ? constants[4] : ALPHACHANNEL;
const DYN_SLACK_URL = constants ? constants[5] : ALPHA_SLACK_INCOMING_WEBHOOK;

export {
  mapper,
  DYN_MARKET,
  DYN_TABLE,
  DYN_TABLE_QUARTER,
  DYN_SEMA,
  DYN_CHANNEL,
  DYN_SLACK_URL,
};
