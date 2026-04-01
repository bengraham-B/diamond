FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Diamond2026_Personal/Diamond2026_Personal.csproj", "Diamond2026_Personal/"]
RUN dotnet restore "Diamond2026_Personal/Diamond2026_Personal.csproj"
COPY . .
WORKDIR "/src/Diamond2026_Personal"
RUN dotnet build "./Diamond2026_Personal.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Diamond2026_Personal.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Diamond2026_Personal.dll"]
