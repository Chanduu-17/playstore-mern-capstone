# Database Collections

## users
- name
- email
- password
- role (`user` | `owner`)
- downloadedApps
- timestamps

## apps
- owner
- name
- description
- category
- genre
- version
- releaseDate
- ratingAverage
- ratingCount
- visible
- features
- imageUrl
- downloadCount
- timestamps

## reviews
- user
- app
- rating
- comment
- timestamps

## notifications
- user
- title
- message
- type
- relatedApp
- isRead
- timestamps
