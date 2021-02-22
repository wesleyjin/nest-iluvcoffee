import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    find() {
        return 'This action returns root level coffee'
    }

    @Get('flavors') // for /coffees/flavors endpoint
    findAll() {
        return 'This action returns all coffee flavors';
    }
    
}
