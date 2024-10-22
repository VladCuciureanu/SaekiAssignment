<img src="https://cdn.prod.website-files.com/64528c9313634ef6496dea1f/645a995cf6b669d1e58cd8fc_logo.svg"/>

# Vlad Cuciureanu's Assignment

## Demo Info

Live Environment: https://saeki.cuciureanu.me
Admin Creds: admin@saeki.ch : SaekiRules!

## Overview

### Project Structure
This assignment is split into the following packages:
- A REST API at the center of it all
- A user-facing Next.js dashboard
- A common schema defining the contracts between the front-end and the back-end

### Considerations
From what I've gathered during my discussion with Thomas, for the scale and the complexity of this MVP, this architecture should be more than enough. REST APIs are easily scalable since they are stateless and React is the best choice for 2024 and onwards most likely. Slap a caching layer on top, optimize the backend, write some tests and this should be a sturdy production-ready application.

I've decided against GraphQL since we don't query a lot of deep objects and we don't want the boilerplate and flakiness that it's (in my opinion) still green and underdeveloped ecosystem brings.

### Concepts
- Projects: a collection of components
- Components: a definition of a part that can be ordered; configurable quantity, material and service package
- Material: self-explanatory
- Service Package: shipping service packages and production speed service packages rolled up into one concept
- Order: a read-only clone of a project and it's components, with shipping info
- Support Ticket: consists of messages and is related to an order

## Local Setup w/ OrbStack

_Note: I recommend running through OrbStack, as it makes accessing the proxy simpler and working OOTB. That said, this can very well be done through vanilla Docker too._

1. Setup Orbstack

2. Install dependencies
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
```
http://nginx.saekiassignment.orb.local/
```

## Fast follows

These are some things I wish I could've done and didn't due to lack of time
- Hamburger menu
- Implement read receipts
- Caching layer
- Login/register splash screen
- More account details (maybe would lighten the order form load)
- Entity nicknames
- Email notifications
- Organisation support
- Loading skeletons
- Optimize fetching
- Breadcrumbs
- Hook up chat to websockets for real-time changes
- Cull edge cases in API
- Confirmation dialog for component delete
- Order form autocomplete
- Some delete endpoints should be replaced with update endpoints, as they only update the status and don't delete the actual entity.
- Persist sidebar state in browser's local storage
- User-friendly error messages via toast notifications
