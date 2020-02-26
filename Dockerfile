FROM node:12.16.1

WORKDIR /usr/src/api-face-recognition

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]