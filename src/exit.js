import { GLOBAL_NAME } from "./variables/aboutConsts.js";

const exitBubble = (code = 0) => {
  console.log(`Exiting the ${GLOBAL_NAME} shell...\n`);
  process.exit(code);
};

export default exitBubble;
