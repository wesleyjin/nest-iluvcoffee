import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery) {
        // const { limit, offset } = paginationQuery;  //object destructuring
        return this.coffeesService.findAll();
        // return `This action returns all coffee flavors. Limit: ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id);
        // return `This action returns coffee #${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return this.coffeesService.create(body);
        // return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.coffeesService.update(id, body);
        // return `This action UPDATES coffee #${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
        // return `This action REMOVES coffee #${id}`
    }
}
