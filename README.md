<h1 align="center">
  <img src="https://res.cloudinary.com/eykhagen/image/upload/v1536487016/logo.png" height="300" width="300"/>
  <p align="center" style="font-size: 0.5em">:rocket: Flexible REST Tests</p>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  <img src="https://img.shields.io/github/package-json/v/eykhagen/strest.svg" alt="License: MIT">
</p>

**:link: Connect multiple requests**: _Example_ Embed an authorization token you got as a response from a login request in your following requests automatically

**:memo: YAML Syntax**: Write all of your tests in YAML files

**:tada: Easy to understand**: You'll understand the concept in seconds and be able to start instantly (seriously!)

## Getting Started

```bash
# Via Yarn
yarn global add strest-cli
```

```bash
# Via npm
npm i -g strest-cli
```

We'll be using the [postman-echo](https://docs.postman-echo.com) test API in this tutorial.

To get started, we're using [this file](tests/success/postman.strest.yml) _(The extension needs to be `.strest.yml` or `.strest.yaml`)_

```yaml
version: 1                            # only version at the moment

requests:                             # all test requests will be listed here
  testRequest:                        # name the request however you want
    url: https://postman-echo.com/get  # required
    method: GET                       # required
    data:                             # valid data types: params + json or raw
      params:
        foo1: bar1
        foo2: bar2
    # log: true # uncomment this to log the response
```

To run the test, open your terminal and type

```bash
strest tests/success/postman.strest.yml
```

You may also run multiple test files at the same time by pointing to the directory, where the files are stored

```yaml
strest # this will recursively search for all .strest.yml files in the cwd and it's subdirectories
# or
strest tests/success/chaining
```

Success! If you've done everything correctly, you'll get a response like this

```
[ Strest ] Found 2 test file(s)
[ Strest ] Schema validation: 2 of 2 file(s) passed

✔ Testing login succeeded (0.378s)
✔ Testing verify_login succeeded (0.334s)

[ Strest ] ✨  Done in 0.757s
```

## Writing .strest.yml test files

You can find a full __Documentation__ of how to write tests [here](SCHEMA.md)

## Documentation

- [How to write Tests](SCHEMA.md)
- [Validation Types](VALIDATION.md)
- [Examples](tests/success/)
- [Trello Board](https://trello.com/b/lqi6Aj9F)

## Using & Connecting multiple requests

With traditional tools like [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/) it's common to perform only a single request at a time. Moreover, you have to trigger each request on your own with a click on a button.

With __Strest__ you're able to predefine a very well structured test file once, and every time you make any changes to your API you can test it with just one command in your terminal. Additionally, you can add hundreds or thousands of requests and endpoints which will run synchronously one after the other.

To create multiple requests, simply add multiple entries into the `requests` yaml object.

```yaml
version: 1

requests:
  requestOne:
    ...
  requestTwo:
    ...
  requestThree:
    ...
```

Running this will result in something like

```
[ Strest ] Found 1 test file(s)
[ Strest ] Schema validation: 1 of 1 file(s) passed

✔ Testing requestOne succeeded (0.1s)
✔ Testing requestTwo succeeded (0.32s)
✔ Testing requestThree succeeded (0.11s)

[ Strest ] ✨  Done in 0.62s
```

### Connecting multiple requests

**What is meant by _connecting multiple requests_?**

Connecting multiple requests means that you write a request and in each of the following requests you are able to use and insert any of the data that was responded by this request.

**Usage**

```yaml
requests:
  
  login: # will return { token: "someToken" }
    ...

  authNeeded:
    delay: 2000 # Wait 2 seconds for token to become valid
    ...
    headers:
      Authorization: Bearer Value(login.token)
    ...
    validation:
      json:
        id: Value(login.users[0].id) # use arrays like you would in javascript

```

As you could see, the usage is very simple. Just use `Value(requestName.jsonKey)` to use any of the JSON data that was retrieved from a previous request. If you want to use raw data, just use `Value(requestName)` without any keys.

You can use this syntax __*anywhere*__ regardless of whether it is inside of some string like `https://localhost/posts/Value(postKey.key)/...` or as a standalone term like `Authorization: Value(login.token)`

This can also be used across files as demonstrated [here](tests/success/chaining)

## Using random values with Faker

If you need to generate some random values, you are able to do so by using [Faker API](http://marak.github.io/faker.js/) templates. 

**Usage**

```yaml
version: 1

requests:
  userRequest:
    url: https://postman-echo.com/get
    method: GET
    data:
      params:
        name: Fake(name.firstName) Fake(name.lastName)
    log: true
```

Visit [Faker.js Documentation](http://marak.github.io/faker.js/) for more methods

## Replacing values with predefined environment variables

**Usage**

```bash
export STREST_URL=https://jsonplaceholder.typicode.com
strest tests/success/Env/environ.strest.yml
```

```yaml
version: 1
# ensure the ENV var is set: `export STREST_URL=https://jsonplaceholder.typicode.com`
requests:
  environment:
    url: Env(STREST_URL)/todos/1
    method: GET
```

## Response Validation

With **Strest** you can validate responses either by a specific value or by a `Type`. _[List of all valid Types](VALIDATION.md)_

### Raw Validation

```yaml
requests:
  example:
    ...
    validate:
      raw: "the response has to match this string exactly"
```

### JSON Validation

```yaml
requests:
  example:
    ...
    validate:
      json:
        user:
          name: Type(String) # name has to be of type String
          id: Type(Null | Number | String) # id has to be of type Number, String or Null
          iconUrl: Type(String.Url)
        someOtherData: "match this string"
```

### JSON Path Validation

```yml
version: 1

requests:
  jsonpath:
    url: https://jsonplaceholder.typicode.com/posts
    method: POST
    data:
      json:
        myArray:
        - foo: 1
          bar: 1
        - foo: 2
          bar: 2
    validate:
      jsonpath:
        myArray.1.foo: 2
```

Read [jsonpath](https://github.com/dchester/jsonpath#jpvalueobj-pathexpression-newvalue) for more info

### Header Validation

```yaml
requests:
  example:
    ...
    validate:
      headers:
        content-type: application/json; charset=utf-8
        access-control-allow-credentials: Type(Boolean | String)
```

### Response-Code Validation

```yaml
requests:
  example:
    ...
    validate:
      code: 200 # only allow code 200 (default)
  ...
  advanced:
    ...
    validate:
      code: 2xx # allow all numbers in range of 200-299
```

### Retry until validation succeeds

```yaml
requests:
  waiter:
    url: https://postman-echo.com/time/now
    method: GET
    delay: 900
    validate:
      code: 200
      max_retries: 30
      raw: "Tue, 09 Oct 2018 03:07:20 GMT"
```

```bash
STREST_GMT_DATE=$(TZ=GMT-0 date --date='15 seconds' --rfc-2822 | sed "s/+0000/GMT/g")
strest tests/success/validate/maxRetries.strest.yaml
```

## Errors

**Strest** is a testing library so of course, you'll run into a few errors when testing an endpoint. Error handling is made very simple so can instantly see what caused an error and fix it.
If a request fails, the process will be exited with _exit code 1_ and no other requests will be executed afterwards.

_Example of a Validation Error_

```
[ Strest ] Found 1 test file(s)
[ Strest ] Schema validation: 1 of 1 file(s) passed

✖ Testing test failed (0.2s)

[ Validation ] The required item test wasn't found in the response data

[ Strest ] ✨  Done in 0.245s
```

## Allow Insecure certs

Boolean to allow:

- insecure certificates
- self-signed certificates
- expired certificates

```yaml
# Example
allowInsecure: true
someRequest:
  url: ...
  method: ...
```

## Configuration

You can create a file in your Computer's home directory called `.strestConfig.yml` which will be the custom config for **Strest**.

*Setup*

```yaml
config:
  primaryColor: "#2ed573" # Hexadecimal Color Code (don't forget the quotation marks)
  secondaryColor: "#ff4757" # Hexadecimal Color Code
  errorColor: "#576574" # Hexadecimal Color Code

```

## Docker

Use docker instead of setting up node.

```bash
docker build -t strest:dev .
docker run --env testURL=https://jsonplaceholder.typicode.com -v ${PWD}:/data strest:dev /data/tests/success/successRequestEnv.strest.yaml
```

## License

Strest is [MIT Licensed](LICENSE)
