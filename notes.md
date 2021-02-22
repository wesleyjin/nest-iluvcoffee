# Training Notes

## Creating a new app
```bash
# Create boilerplate:
$ nest new <project-name>
```

## Running the app
```bash
# regular
$ npm run start

# watch mode: auto recompilation
$ npm run start:dev  
```

## Creating a basic controller
* Basic building blocks of controller = classes & decorators.
* Update routes using HTTP decorators (ex. `@Get()`)

```bash
$ nest generate controller
$ nest g co

$ nest g co --dry-run  # simulated run
```

## Use Route Parameters
* Using `:` prefix in decorator argument specifies dynamic route parameter (ex. `GET(':id')`)
* The `@Param` decorator used in function arg, lets us capture all param values:
    ```typescript
    // Receive ALL request params:
    findOne(@Param() params) {
        return '${params.id}';
    }
    
    // or get directly:
    findOne(@Param('id') id: string) {
        return '${id}';
    }
    ```

