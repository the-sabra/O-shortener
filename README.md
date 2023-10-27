# Overview 
O-shortener is used to make short urls 

## Built With
[![Nest][nest]][Nest-url] 
[![Mysql]][mysql-url] 
[![Prisma]][prisma-url] 
[![TypeScript]][typescript-url] 
[![Jest]][jest-url]
![docker]
[![Redis]][redis]


## API Endpoints
  * `POST /auth/sighup` : Create a new User
  * `GET /:short_code` :   Redirect to the original URL based on the provided short code.

For detailed documentation and examples, refer to the [API Documentation](https://documenter.getpostman.com/view/22968167/2s93sabtNc) file.


## Installation

1- clone the Repo 

```bash
git clone https://github.com/omarsabra1/O-shortener
```

```bash
cd o-shortener
npm install
```

## Running the app


```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## How code is work 
---------
NOTE : **The controller mange the routes only but the services for business logic and connecting With ORM** 
* `main.ts` : The entry point of the application.
* `urls/controller/urls.controller.ts` : Handles the creation of shortened URLs.
* `prismaService` : Is used to connect  Prisma Client.
* `app.controller.ts` : Handles the redirection to the original URLs.
* `auth/controller/auth.controller.ts` : Handles Authentication and creating user 
* `auth/guard/auth/auth.guard.ts` : Verifying JWT Token
* `caching` : Handle the caching layer in the app


## License
O-shortener under the  [MIT licensed](LICENSE.txt).

## Contact 
[![LinkedIn]][LinkedIn-profile]
[![Gmail]][email]

<!-- MARKDOWN LINKS & IMAGES -->
[nest]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[LinkedIn]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[Gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white

[nest-url]: https://nestjs.com/
[typeScript-url]: https://www.typescriptlang.org/
[prisma-url]: https://www.prisma.io/
[jest-url]: https://jestjs.io/
[mysql-url]: https://www.mysql.com/
[linkedIn-profile]: https://www.linkedin.com/in/omar-sabra/
[email]: omarsabra509@gmail.com
[redis]: https://redis.io/