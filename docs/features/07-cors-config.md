# Cors Config

Currently in development, we're running our front end server on one server, and our backend on another.

Eventually we may go through the work to figure out getting our frontend hosted on our backend so it all
goes through a single server, but we're not doing that for now.  We're not doign that because I don't
want to change all that around at the moment.

Currently we're getting a CORS error, as we'd expect, because we're running these on separate hosts:

```
Access to fetch at 'http://localhost:3000/rooms/join' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

## Strategy for fixing this
- Install the `cors` package in the backend by running: npm install cors
- In `backend/src/chefServer.ts`, import cors and add it as middleware before your routes:
  ```typescript
  import cors from 'cors';
  // ...
  app.use(cors({ origin: 'http://localhost:5173' }));
  ```
- This will allow your frontend (running on port 5173) to successfully access backend endpoints.
- Test the endpoints after applying these changes and adjust the configuration for allowed methods/headers if needed.

## FAQ

**Q: Does vite always use port 5173 or does it change?**  
A: Vite defaults to port 5173; however, if that port is already in use or is overridden in the configuration (such as in vite.config.ts), Vite may select another available port.  We won't worry about this for now for this prototype.

