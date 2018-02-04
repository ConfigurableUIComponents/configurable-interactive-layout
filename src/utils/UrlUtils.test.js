import UrlUTils from './UrlUtils';

const params = {
  amdocsServer: 'http://eaasrt:40100',
  reportServer: 'http://ilmtx241.eaas.amdocs.com:34600',
  userId: 'AFFSuper',
};

/* eslint-disable */
const url = '${reportServer}/AmdocsOSS/NetworkNavigator/Report/index.html?userID=${userID}&nosubheader=1';
const urlAfterTemplating = `${params.reportServer}/AmdocsOSS/NetworkNavigator/Report/index.html?userID=${params.userId}&nosubheader=1`
/* eslint-enable */
describe('examines the output of UrlUTils.template(url, params) when...', () => {
  it('passing params that exists in the given URL', () => {
    expect(UrlUTils.template(url, params)).toEqual(urlAfterTemplating);
  });
  it('passing empty object of params', () => {
    expect(UrlUTils.template(url, {})).toEqual(url);
  });
  it('passing empty string as url and empty object of params', () => {
    expect(UrlUTils.template('', {})).toEqual('');
  });
  it('passing empty string as url and valid params', () => {
    expect(UrlUTils.template('', params)).toEqual('');
  });
  it('not passing any params', () => {
    expect(UrlUTils.template(url)).toEqual(url);
  });
});

