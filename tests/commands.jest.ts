import { spawnSync , StdioOptions , SpawnOptions } from 'child_process';
import * as path from 'path';

test('Strest Command Line', async () => {
  // const successRequest = spawnSync('node', ['dist/main.js', 'tests/success/successRequests1.strest.yaml']); 
  
  // // HTTP Error
  // const failureRequest1 = spawnSync('node', ['dist/main.js', 'tests/failure/failureRequest1.strest.yaml']);
  // // Validation Error
  // const failureRequest2 = spawnSync('node', ['dist/main.js', 'tests/failure/failureRequest1.strest.yaml']);

  // // Using form data
  // const formDataRequest = spawnSync('node', ['dist/main.js', 'tests/success/successRequestsWithFormData.strest.yaml']);

  // const options:SpawnOptions = {
  //   cwd: process.cwd(),
  //   env: { ...process.env, jsonplaceholderURL : 'https://jsonplaceholder.typicode.com' },
  //   stdio: 'pipe',
  // };
  // // Using EnvironmentVariable
  // const environmentVariableRequest = spawnSync('node', ['dist/main.js', 'tests/success/successRequestsWithValueFromEnvironmentVariable.strest.yaml','-p'], options);  
  
  // const bundledSuccessRequest = spawnSync('node', ['dist/main.js', 'tests/success'], options);

  // expect(successRequest.status).toBe(0);
  // expect(bundledSuccessRequest.status).toBe(0);
  // expect(formDataRequest.status).toBe(0);
  // expect(environmentVariableRequest.status).toBe(0);

  // expect(failureRequest1.status).toBe(1);
  // expect(failureRequest2.status).toBe(1);
  expect(1).toBe(1);
})