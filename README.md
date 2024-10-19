# Vlad Cuciureanu's Assignment

## Local Setup w/ Docker

_Note: I recommend running through OrbStack, as it makes accessing the proxy simpler and working OOTB._

1. Install dependencies

```sh
npm i
```

2. Build apps

```sh
npm build
```

3. Create and start containers

```sh
docker compose up
```

4. Apply migrations

```sh
cd ./apps/api && npm run prisma:db:push && cd ../..
```

5. Access your Nginx's hostname

If you use OrbStack like I am, you can load up the app here:

```
http://nginx.saekiassignment.orb.local/
```
