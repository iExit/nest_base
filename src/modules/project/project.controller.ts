import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Project } from 'src/interface/project.interface';
import { ProjectService } from './project.service';

@Controller('project')
@ApiTags('项目模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiOperation({
    summary: '创建',
  })
  public async create(@Body() project: Project) {
    return await this.projectService.create(project);
  }

  @Post('delete/:id')
  @ApiOperation({
    summary: '删除',
  })
  public async delete(@Param('id') projectId: string) {
    return await this.projectService.deleteById(projectId);
  }

  @Post('alter/:id')
  @ApiOperation({
    summary: '修改',
  })
  public async alter(@Param('id') projectId: string, @Body() project: Project) {
    return await this.projectService.alterById(projectId, project);
  }

  @Get('find/:id')
  @ApiOperation({
    summary: '查询',
  })
  public async find(@Param('id') projectId: string) {
    return await this.projectService.findById(projectId);
  }

  @Get('find')
  @ApiOperation({
    summary: '查询全部',
  })
  public async findAll() {
    return await this.projectService.findAll();
  }
}
