import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    find(@Res() response) {
        response.status(200).send('This action returns root level coffee');
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
    @HttpCode(HttpStatus.GONE)
    create(@Body() body: any) {
        return body;
    }
}
