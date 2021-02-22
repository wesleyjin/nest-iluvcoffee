import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    find() {
        return 'This action returns root level coffee';
    }

    @Get('flavors') // for /coffees/flavors endpoint
    findAll() {
        return 'This action returns all coffee flavors';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns coffee #${id}`;
    }
    
    @Post()
    create(@Body() body: any) {
        return body;
    }
}
