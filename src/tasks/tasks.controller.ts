import { Controller, Body, Post, Get, Query, Param, NotFoundException, Put, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { prisma } from '../lib/auth.js';
import type { Priority } from "../generated/prisma/enums.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";


@Controller('tasks')
export class TasksController {
    @Post()
    async create(
        @Body() body: CreateTaskDto,
        @Session() session: UserSession) {
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                priority: body.priority,
                userId: session.user.id
            }
        });
        return task;
    }

    @Get()
    async findAll(@Query() query: {
        completed?: string,
        priority?: Priority
    },
        @Session() session: UserSession) {
        const where: any = { userId: session.user.id };
        if (query.completed !== undefined) {
            where.completed = query.completed === "true";
        }
        if (query.priority !== undefined) {
            where.priority = query.priority;
        }
        const tasks = await prisma.task.findMany({ where });
        return tasks;
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Session() session: UserSession) {
        const task = await prisma.task.findFirst({
            where: { id: Number(id), userId: session.user.id }
        });
        if (!task) {
            throw new NotFoundException('tache non trouvee');
        }
        return task;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateTaskDto,        
        @Session() session: UserSession) {
        const existingTask = await prisma.task.findFirst({
            where: { id: Number(id), userId: session.user.id },
        });
        if (!existingTask) {
            throw new NotFoundException("Tâche non trouvée");
        }
        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                title: body.title,
                description: body.description,
                priority: body.priority,
            },
        });
        return updatedTask;
    }

    @Patch(':id/complete')
    async complete(@Param('id') id: string, @Session() session: UserSession) {
        const existingTask = await prisma.task.findFirst({
            where: {id: Number(id), userId: session.user.id},
        })
        if(!existingTask){
            throw new NotFoundException('Tache non trouvee')
        }
        		const updatedTask = await prisma.task.update({
			where: { id: Number(id) },
			data: { completed: true },
		});
		return updatedTask;
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string ,@Session() session: UserSession){
        		const existingTask = await prisma.task.findFirst({
			where: { id: Number(id), userId: session.user.id },
		});
		if (!existingTask) {
			throw new NotFoundException("Tâche non trouvée");
		}
        		await prisma.task.delete({ where: { id: Number(id) } });
    }
}