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
        return `${params.id}`;
    }
    
    // or get directly:
    findOne(@Param('id') id: string) {
        return `${id}`;
    }
    ```

## Handling Request body/payload
* Use `@Post` decorator similar to how `@Get` is used
* Use `@Body` decorator in function args similar to how `@Param` is used. Can specify exact arguments to get in decorator argument, or get all values by leaving empty.

## Response Status Codes
* By default, nest responds with`200` and `201` status codes for successful execution.
* `@HttpCode` decorator lets us set a specific code for the entire response. Use IDE to find appropriate code by using `HttpStatus.` Enum. Useful when status code is static.
    * Can also use platform native `@Res` (express/fastify) for full control of response. However lose compatibility with nest features that depend on default response behavior (interceptors or HttpCode). Requires mocking response object for tests. 

## Handling Update & Delete Requests
* Use `@Patch` to update entity, & `@Delete` to delete. Same usage as decorators above.

## Pagination with Query Parameters
* Limit response length using pages. As best practice, use query parameters to filter/sort.
* Use `@Query` decorator similar to how @Param and @Body used.
* Wrap strings with ticks ``` ` ``` to use interpolation: `${param}` 
* Object destructuring:
    ```typescript
    const { limit, offset } = paginationQuery
    ```

## Services
* Helps separate business logic from controllers. Separating business logic into services helps us reuse logic across multiple parts of app.
* Creating new:
    ```bash
    $ nest generate service
    # or shorthand:
    $ nest g s
    ```
    *  Adds service, test file, and updates provider service array
* "Provider": can inject dependencies. Objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system.
* To add service to controller, add constructor to corresponding controller class
    ```typescript
    @Controller('coffees')
    export class CoffeesController {
        constructor(private readonly coffeesService: CoffeesService) {}
    /* ... */
    }
    ```
    * `private` (access modifier): Shorthand that allows us to declare and initialize service member in same location; makes it only accessible within the class itself. 
    * `readonly`: Best-practice; ensures we aren't modifying the service referenced & only accessing things from it.
    * `coffeesService`: Naming the parameter
    * `: CoffeesService`: Dependency resolved by type. Nest creates & returns an instance of service to controller. In the normal case of a singleton, returns existing instance if already requested elsewhere. 
* Services contain business logic and any connections to data sources.
* Resource `entities` are the schemas defining object attributes and types.

## User-Friendly Error Messages
* Can throw `new HTTPException(msg, code)` or use some built-ins like `NotFoundException`
* For exceptions not handled (non-http), Nest has a built-in exception layer. Logged as a "randomError" in service logs.

## Modules
* Way to encompass business domains. Organize code relevant for a specific feature.
* Create by:
    ```bash
    $ nest g module <module-name>
    ```
* Simply a class annotated with `@Module` decorator. The decorator provides metadata about context:
    * controllers: API routes that the module should instantiate
    * exports: List providers in the module that should be available anywhere module is imported
    * imports: List other modules that this module requires
    * providers: List services that need to be instantiated by Nest injector. Only available in this module unless added to exports array.
* Ensure that module components not listed in app-level controllers/providers, otherwise they would be instantiated twice.

## Data Transfer Objects (DTO)
* Object used to encapsulate data & send/receive between systems. Helps define interfaces for input/output for a system.
* Instead of using a generic `body`, can use DTO classes.
* To create (example):
    ```bash
    nest g class coffees/dto/create-coffee.dto --no-spec
    ```
    * Best practices: `.dto` format, separate DTO directory
* Adds full type safety to method args. DTOs are simple - no business logic, methods, nor anything that requires testing. Create shape or object interface of what DTO is.
* Another best practice is making all properties readonly.
* To make properties optional, add `?` suffix to property name in class.

### Validating Input Data with DTOs
* The `ValidationPipe` provides a convenient way of enforcing validation rules for all incoming client payloads. You can specify these rules by using simple annotations in your DTO.
> Install required packages `npm i class-validator class-transformer`
* Simply add decorators to attributes in DTOs to add validation.
* To remove redundant code for DTOs (update/create), use mapped-types
    * `npm i @nestjs/mapped-types`
    * `PartialType` allows us to copy all properties set to optional & inherit all validation rules applied. 

## Handling Malicious Request Data
* "Whitelist"ing acceptable properties with ValidationPipe strips all other properties out of request: `whitelist:true`
* Prevent requests with non-whitelisted properties from performing actions at all using `forbidNonWhitelisted: true`


## Transform payloads to DTO instances
* By default, objects passed in from requests are just generic JS objects. How to we transform them to DTOs? Use `ValidationPipe({ transform: true })`
* Transform also performs primitive type transformations