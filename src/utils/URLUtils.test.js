import URUTils from './URLUtils';

const params = {
  amdocsServer: 'http://eaasrt:40100',
  reportServer: 'http://ilmtx241.eaas.amdocs.com:34600',
  userId: 'AFFSuper',
};

/* eslint-disable */
const url = '${reportServer}/AmdocsOSS/NetworkNavigator/Report/index.html?userID=${userID}&nosubheader=1';
const urlAfterTemplating = `${params.reportServer}/AmdocsOSS/NetworkNavigator/Report/index.html?userID=${params.userId}&nosubheader=1`
/* eslint-enable */
describe('examines the output of URUTils.template(url, params) when...', () => {
  it('passing params that exists in the given URL', () => {
    expect(URUTils.template(url, params)).toEqual(urlAfterTemplating);
  });
  it('passing empty object of params', () => {
    expect(URUTils.template(url, {})).toEqual(url);
  });
  it('passing empty string as url and empty object of params', () => {
    expect(URUTils.template('', {})).toEqual('');
  });
  it('passing empty string as url and valid params', () => {
    expect(URUTils.template('', params)).toEqual('');
  });
  it('not passing any params', () => {
    expect(URUTils.template(url)).toEqual(url);
  });
});

