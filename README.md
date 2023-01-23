# Opensearch in iframe 

## Project 

This is a small project that allows to include AWS Opensearch dashboard (Kibana) inside an IFrame (using React). The use of React is just to make it easier to manage routes (this can be done with Angular, Vue or vanilla JS).

## Issue 

Opensearch doesn't allow to include the dashboard inside an IFrame using the same authentication. 

## Solution

Use a reverse proxy to modify headers and convert /oauth2/token response to cookies.

```mermaid
sequenceDiagram
    participant Browser 
    participant Reverse 
    participant Cognito 
    participant Opensearch 
    Browser->>Cognito: /login?response_type=code&...
    Cognito-->>Browser: ?code=xxx
    Browser->>Reverse: /oauth2/login?code=xxx
    Reverse->>Cognito: /oauth2/login?code=xxx
    Cognito-->>Reverse: body {access_token, id_token}
    Reverse-->>Browser: set-cookie:ACCESS-TOKEN
    Browser->>Reverse: iframe src=reverse/_dashboards
    Reverse->>Opensearch: /_dashboards
    Opensearch-->>Reverse: page
    Reverse-->>Browser: page
```
