# AUTH
## AUTHENTICATION 
* ***ROUTER*** -> `/auth` 
* ***Google OAuth2***
  * ***passport-google-oauth2*** 사용

### SIGN IN
  * `@GET /auth/signin/google`
  * **Flow** *(위에서 아래로 순서대로 진행)*
    * **access** `/auth/signin/google`
      * 사용자는 구글 로그인을 행함
    * **redirect** `/auth/redirect/google-signin` 
      * 이 때 해당 경로로 접근하면서 `access token` & `profile` 정보를 얻게 된다.
      * `User Table` 에 `userName` 을 `profile.email` 으로 갖고 있는 `User`를 생성
    * View 에서는 `User` 데이터를 추가적으로 받아야하는 상황
    * 해당 경로 접근 권한을 위해서는 Google Login 이 우선 필요하다. (JWT Guard)
    * `@GET /auth/login/google` 로 다시 요청 (버튼을 눌러야 함) 
      * 이미 DB에 `userName` 이 존재하므로, token 획득 가능
        * token 에 `isActivated` 요소에서 `false` 로 설정하여 임시 토큰으로 활용
      * 이 때, 추가정보가 기입되지 않은 경우 token 을 cookie 에 넣어주는 동시에 redirect(추가 정보 기입 페이지)
    * ***추가 정보 기입 페이지***
      * 단순히 페이지 Redirect 라서 뷰만 바뀜... (앱 프론트에서 그냥 페이지 이동... 협의 필요)
      * **`@PUT /user`** 을 통해서 유저의 추가 정보를 업데이트
      * 이 때 유저가 정보를 기입하지 않으면 다른 행동을 하지 못하도록 제한해야한다. 
        * -> token 에 `isActivated` 요소가 있어서 강제로 추가 정보 기입 페이지로 리다이렉트 시켜야함.
      * 기입이 완료되면 `isActivated` 가 활성화된 정상 토큰을 재부여...

### LOG IN
  * `@GET /auth/login/google`
  * **Flow**
    * `GoogleGuard` 를 통해서 Google Login 페이지로 이동 -> `/auth/redirect/google-login` 으로 redirect
    * `/auth/redirect/google-login`
      * google 을 통해서 받아온 email 이 `User` table 에 존재하는지 검증
        * 존재하는 경우 Token 발급
          * 이 때, User 가 activated 상태인지 확인해야한다. (추가 정보 기입이 필요한 상태인지)
          * 만약 필요하다면, token 을 수정해서 발급한다.
        * 존재하지 않을 경우 fail
    * access token 을 발급할 때, refresh token 을 함께 발급한다. (10m / 7day?)
      * refresh token 을 발급하면서 이 refresh token 을 관리하는 session 을 하나 만들어야함.

### LOG OUT
  * `@GET /auth/logout`
  * clear cookie 를 통해서 단순히 구현 가능
  * refresh token 을 관리하는 session 에서도 이 정보를 삭제할 필요가 있다.

## AUTHORIZATION
### JWT
  * 우리 서비스에서는 JWT 를 통한 인가를 수행한다.
  * 인가는 Access Token 을 통해서 이루어지며, 보안적 요소를 고려하여 Access Token 은 빠르게 만료된다.
  * 대신, 만료 기한이 긴 Refresh Token 이 함께 발급되며 해당 토큰은 만료 기한이 1 month+ 로 길다.
### Refresh Token - Session
  * Refresh Token 을 보다 보안적으로 관리하기 위해서 이를 관리하는 session 을 별도로 유지한다.
  * 해당 세션은 단순히 `user`에게 주어진 refresh token 을 관리하기 위함이다.
  * 해당 세션이 유지되는 동안 `User`는 Valid 한 Access Token 혹은 Refresh 토큰을 가지고 있는 상태이다.
  * Refresh Token 의 경우 JWT 인증 중에 유저의 Access Token 이 만료되었거나, 곧 만료될 경우 수행한다.
### Refresh Token 을 통한 Access Token 재발급 과정
  * Access Token 이 만료되었거나 만료 기한이 가까울 경우 유저는 Unauthorized 상태코드(혹은 이에 상등하는)를 받을 것이다.
    * ***고려할 점 : 기존 요청 URL 에 다시 요청이 부드럽게 가야한다. 이를 위한 별도의 로직이 필요하다.***
    * 간단하게 해결할 수 있기는 하다. Access token 의 만료 기한을 2h+ 정도로 잡고, 10~30m- 에서 Refresh를 하도록 하는 것이다.
      * unauthorized 나 기한 만료가 나타나면, 단순 '세션 만료'와 같은 경고를 주고 페이지에서 벗어나게 한다.
      * 이미 유저가 같은 페이지에서 너무 오랜 기간 머울렀기 때문에 UX 적으로 나쁘지 않다.
  * Access Token 을 재발급하기 위해서 `@GET /auth/refresh` 으로 Refresh Token 을 들고 요청한다.
  * `@GET /auth/refresh` 에서는 Access Token  + Refresh token 을 보고 이 요청이 valid 한지 검증한다.
    * valid 하다면, 새로운 access token 을 발급해준다.
    * 만약 이 과정에서 refresh token 의 만료가 가깝다면, 새로운 Refresh Token 또한 이 과정에서 함께 발급한다.
    * session 도 함께 업데이트한다.