export const profileInfo = {
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
};

export class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.nameSelector);
    this._about = document.querySelector(configInfo.professionSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._about.textContent,
    };
  }
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._about.textContent = data.job;
  }
}
