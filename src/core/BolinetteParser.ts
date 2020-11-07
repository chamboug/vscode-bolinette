import { ControllerParsedData } from "parsed-data";
import { Uri } from "vscode";
import Project from "../models/Project";
import ProjectFile from "../models/ProjectFile";
import { ProjectFileType } from "../models/ProjectFileType";
import FilesUtil from "../utils/FilesUtil";

export default class BolinetteParser {
  private project?: Project;

  async run() {
    const projectFiles = [];
    const fileTypes = [
      ProjectFileType.controllers,
      ProjectFileType.mixins,
      ProjectFileType.models,
      ProjectFileType.services,
    ];
    for (const fileType of fileTypes) {
      const fileUris: Uri[] = await FilesUtil.listFilesInFolderRec(fileType);
      for (const fileUri of fileUris) {
        const projectFile = new ProjectFile(fileUri.path);
        await projectFile.updateAst();
        projectFiles.push(projectFile);
      }
    }
    this.project = new Project(projectFiles);

    const controllersParsedData = this.project.listParsedData(
      ProjectFileType.controllers
    ) as ControllerParsedData[];

    // controllersParsedData.forEach((a) => console.log(a));
    return this;
  }

  async addProjectFile(filePath: string) {
    const projectFile = new ProjectFile(filePath);
    await projectFile.updateAst();
    this.project?.addProjectFile(projectFile);
  }

  async updateProjectFile(filePath: string) {
    return this.project?.getProjectFile(filePath)?.updateAst();
  }

  updateProjectFilePath(oldPath: string, newPath: string) {
    this.project?.updateProjectFilePath(oldPath, newPath);
  }

  removeProjectFile(filePath: string) {
    this.project?.removeProjectFile(filePath);
  }
}
