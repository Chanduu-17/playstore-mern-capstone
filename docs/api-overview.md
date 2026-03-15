# API Overview

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

## Apps
- GET `/api/apps`
- GET `/api/apps/:id`
- POST `/api/apps`
- PUT `/api/apps/:id`
- DELETE `/api/apps/:id`
- PATCH `/api/apps/:id/visibility`
- POST `/api/apps/:id/download`
- POST `/api/apps/:id/announce-update`

## Reviews
- POST `/api/reviews/:appId`
- GET `/api/reviews/:appId`
- DELETE `/api/reviews/:reviewId`

## Notifications
- GET `/api/notifications`
- PATCH `/api/notifications/:id/read`
