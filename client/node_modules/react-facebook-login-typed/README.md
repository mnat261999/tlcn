# React Facebook Login

> Just a note: The repository is forked from an existing one (https://github.com/keppelen/react-facebook-login), but with upgraded code and types included (for typescript)

## Getting Started

- `yarn add react-facebook-login-typed` or `npm install react-facebook-login-typed`
- Your application will also need `react-dom` and `react` installed.

## How to use
```js
  import React, {useCallback} from 'react';
  import FacebookLogin from 'react-facebook-login-typed';

  const MyComponent = () => {
    const responseFacebook = useCallback(() => {
      console.log(response);
    }, []);

    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        callback={responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick}>Custom FB Button</button>
        )}
      />
    );
  };
```

The `render` function will be passed the following properties for you to use:

- `onClick`
- `isDisabled`
- `isProcessing`
- `isSdkLoaded`


### Custom permission
By default the component, request only 'public_profile' permission, you can change if you send 'scope', that is a string comma separated attribute.

see https://developers.facebook.com/docs/facebook-login/permissions for permissions list

```js
  import React, {useCallback} from 'react';
  import FacebookLogin from 'react-facebook-login-typed';

  const MyComponent = () => {
    const responseFacebook = useCallback(() => {
      console.log(response);
    }, []);

    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        fields="name,email,picture"
        scope="public_profile,user_friends,user_actions.books"
        callback={responseFacebook}
      />
    );
  };
```

### Server
```js
  import React, {useCallback} from 'react';
  import FacebookLogin from 'react-facebook-login-typed';

  const MyComponent = () => {
    const responseFacebook = useCallback(() => {
      console.log(response);
    }, []);

    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
      />
    );
  };
```


## Parameters
|    params    |     value           |                default value                        |
|:------------:|:-------------------:|:---------------------------------------------------:|
|     appId    |     string          |                Required                             |
|     scope    |     string          |      public_profile, email, user_birthday           |
|     fields   |     string          |              name,email,picture                     |
|   callback   |     function        |             resultFacebookLogin                     |
| returnScopes |     boolean         |                  false                              |
|   autoLoad   |     boolean         |                  false                              |
|     xfbml    |     boolean         |                  false                              |
|    cookie    |     boolean         |                  false                              |
| redirectUri  |     string          |               window.location.href (mobile-only)    |
|   version    |     string          |                  3.1                                |
|   language   |     string          |                  en_US                              |
|   onClick    |     function        |                  Initial click on the component     |
|   isMobile   |     boolean         |                  detected via userAgent             |
| disableMobileRedirect |    boolean     |                        false                        | set to true for popup authentication on mobile devices |
|   isDisabled |     boolean         |                  undefined                          |
|   onFailure  |     function        | optional function to separatere the failed init     |
|   state  |     string        | optional string to maintain state between the request and callback. This parameter should be used for preventing Cross-site Request Forgery and will be passed back to you, unchanged, in your redirect URI     |
| authType | string | optional string to change authentication type |
| responseType | string | optional string to change response type. Default value is 'code' |
