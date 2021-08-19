import { Injectable, Logger } from '@nestjs/common';
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
    try {
      const data = await createProject.save();
      this.res = {
        code: 0,
        msg: {
          data: data._id,
          msg: '项目创建成功',
        },
      };
    } catch (error) {
      logger.error(error);
      this.res = {
        code: 6,
        msg: '项目创建失败',
      };
    }
    return this.res;
  }

  /**
   * 创建项目
   */
  public async deleteById(projectId: string) {
    try {
      await this.projectModel.findByIdAndDelete(projectId);
      this.res = {
        code: 0,
        msg: '项目删除成功',
      };
    } catch (error) {
      logger.error(error);
      this.res = {
        code: 6,
        msg: '项目删除失败',
      };
    }
    return this.res;
  }

  /**
   * 修改项目
   */
  public async alterById(projectId: string, project: Project) {
    try {
      await this.projectModel.findByIdAndUpdate(projectId, project);
      this.res = {
        code: 0,
        msg: '项目修改成功',
      };
    } catch (error) {
      logger.error(error);
      this.res = {
        code: 6,
        msg: '项目修改失败',
      };
    }
    return this.res;
  }

  /**
   * 查询项目
   */
  public async findById(projectId: string) {
    try {
      const data = await this.projectModel.findById(projectId);
      this.res = {
        code: 0,
        msg: data,
      };
    } catch (error) {
      logger.error(error);
      this.res = {
        code: 6,
        msg: '项目查询失败',
      };
    }
    return this.res;
  }
}
