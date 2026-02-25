# cloudnative-bcs-group1
- Include `.env` to make docker-compose work

#### Example `.env`
```.env
# Mongo
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=

# Mongo Express
ME_ADMIN_USERNAME=admin
ME_ADMIN_PASSWORD=
ME_BASIC_AUTH_USERNAME=admin
ME_BASIC_AUTH_PASSWORD=

# Backend
ME_CONFIG_MONGODB_URL: mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@mongo:27017/
```