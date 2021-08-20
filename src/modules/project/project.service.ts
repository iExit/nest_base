import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/interface/project.interface';
import { IResponse } from 'src/interface/response.interface';

const logger = new Logger('project.service.ts');

@Injectable()
export class ProjectService {
  private res: IResponse;
  constructor(
    @InjectModel('PROJECT_MODEL') private readonly projectModel: Model<Project>,
  ) {}

  /**
   * 创建项目
   */
  public async create(project: Project) {
    const createProject = new this.projectModel(project);
    const data = await createProject.save();
    return data;
  }

  /**
   * 创建项目
   */
  public async deleteById(projectId: string) {
    await this.projectModel.findByIdAndDelete(projectId);
    return null;
  }

  /**
   * 修改项目
   */
  public async alterById(projectId: string, project: Project) {
    const data = await this.projectModel.findByIdAndUpdate(projectId, project);
    return data;
  }

  /**
   * 查询项目
   */
  public async findById(projectId: string) {
    const data = await this.projectModel.findById(projectId);
    if (!data) {
      throw new NotFoundException('找不到项目');
    }
    return data;
  }

  /**
   * 查询所有项目
   */
  public async findAll() {
    const data = await this.projectModel.find();
    if (!data) {
      throw new NotFoundException('找不到项目');
    }
    return data;
  }
}
