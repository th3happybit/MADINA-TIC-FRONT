FROM node:14.0.0-alpine

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && apk del .gyp
    
RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

# Install dependencies
COPY ./frontend/ /opt/frontend
COPY ./entrypoint.sh /opt/frontend/

RUN yarn install

RUN yarn global add serve

RUN chmod u+x entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]