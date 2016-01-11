'use strict';

var template = require('./plex-status.tpl.html');
import './plex-status.scss';

interface IPlexStatusScope {
  name: string;
  hostname: string;
  port: string;
}

interface IPlexStatusVm {
}

class PlexStatus implements ng.IDirective {
  /* @ngInject */
  constructor() { }

  static instance(): ng.IDirective {
    return new PlexStatus();
  }

  bindToController: boolean = true;
  controller: any = PlexStatusController;
  controllerAs: string = 'vm';
  restrict: string = 'EA';
  templateUrl: string = template;
  scope: IPlexStatusScope = {
    'name': '@',
    'hostname': '@',
    'port': '@?'
  };

}

class PlexStatusController implements IPlexStatusVm {
  public name: string;
  public hostname: string;
  public port: number;

  /* @ngInject */
  constructor() {
  }
}

export default PlexStatus.instance;
