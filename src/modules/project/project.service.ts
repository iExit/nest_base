import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/interface/project.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('PROJECT_MODEL') private readonly projectModel: Model<Project>,
  ) {}

  /**
   * 创建项目
   */
  public async create(project: Project) {
    try {
      const createProject = new this.projectModel(project);
      return await createProject.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * 删除项目
   */
  public async deleteById(projectId: string) {
    try {
      return await this.projectModel.findByIdAndDelete(projectId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * 修改项目
   */
  public async alterById(projectId: string, project: Project) {
    try {
      return await this.projectModel.findByIdAndUpdate(projectId, project);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * 查询项目
   */
  public async findById(projectId: string) {
    try {
      return await this.projectModel.findById(projectId);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * 查询所有项目
   */
  public async findAll() {
    try {
      return await this.projectModel.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
