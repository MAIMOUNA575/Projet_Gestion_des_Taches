import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import {auth} from "./lib/auth.js";
import { AuthModule } from './auth/auth.module.js';
import { TasksModule } from './tasks/tasks.module.js';


@Module({
	imports: [
		// Distributed tracing, auto-correlated logs, request/job metrics, error
		// telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
		
		BetterAuthModule.forRoot(auth),
		AuthModule,
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
