import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    find() {
        return 'This action returns root level coffee';
    }

    @Get('flavors') // for /coffees/flavors endpoint
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;  //object destructuring
    return `This action returns all coffee flavors. Limit: ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns coffee #${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return `This action UPDATES coffee #${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action REMOVES coffee #${id}`
    }
}
