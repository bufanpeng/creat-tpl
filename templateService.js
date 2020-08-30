function templateService() {
  return `import { POSTFORM, POST, GET } from "@/utils/request"
import { getExamList } from "./url"
export const getExamList = (params: object) => {
  return GET({ url: getExamList, params, showError: false  })
}`;
}
module.exports = templateService;
