import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {
  public userId: string;
  public redirectUrl: string;
  constructor() { }
}
