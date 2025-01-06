FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend

WORKDIR /src
COPY . .
RUN dotnet restore
WORKDIR /src/Web
RUN dotnet build "Web.csproj" -c Release -o /app/build

FROM node:latest AS build-frontend
ENV BUILD_PATH=/src/dist

WORKDIR /src
COPY ./Web /src
RUN npm install && npm run build

FROM build-backend AS publish

WORKDIR /src/Web
RUN dotnet publish "Web.csproj" -c Release -o /app/publish /p:UseAppHost=false
COPY --from=build-frontend /src/dist /app/publish/wwwroot/dist

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "Web.dll"]