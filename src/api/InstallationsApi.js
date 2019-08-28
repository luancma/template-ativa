export class InstallationsApi {
  static getListOfInstallations = () => api.get('installations');

  static createNewInstallation = installations => api.post('installations', installations);
}
