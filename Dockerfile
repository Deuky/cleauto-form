FROM node:24 AS base
WORKDIR /app
COPY Makefile.docker package.json package-lock.json .
RUN make -f Makefile.docker ENVIRONMENT=docker
RUN make build
CMD ["make", "start"]

FROM base AS build
COPY . .
RUN make compile

FROM scratch AS artifact
COPY --from=build /app/dist /artifact
CMD ["null"]