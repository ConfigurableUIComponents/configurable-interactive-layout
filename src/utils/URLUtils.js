class URLUtils {
  static template(url, params) {
    let temp = url;
    if (!params) {
      return url;
    }
    Object.keys(params).forEach((param) => {
      let toReplace = `\${${param}}`;
      toReplace = toReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      temp = temp.replace(new RegExp(toReplace, 'ig'), params[param]);
    });
    return temp;
  }
}
export default URLUtils;
