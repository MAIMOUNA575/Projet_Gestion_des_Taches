import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService } from "./app.service.js";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}










// // exo tuto
// @Get()
// findAll(@Query('age') age:number) {
// 	return[{age}];
// }
// @Get()
// findOne(@Param('id') id: string){
// 	return {id};
// }
// @Get(:id)
// findOne(@Param('id') id: string){
// 	return {id};
// }