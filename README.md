## Spring Cloud Upskill

### Building

You can just run `maven package` to have all the modules build their artifacts.

### Running

You can start each module in IntelliJ or by running the `spring-boot:run` goal on each of the modules; the order should not matter.

### Using

The UI is hosted at `http://localhost:8080`.  There is a `/pokemon/new` endpoint that you can hit along with JSON content in the following structure:

```json
{
  "name": "<string>",
  "elementalType": "<string>",
  "id": "<number>"
}
```

A new entry should appear on the table, along with a message initiated by the websocket.