export const profileInfo = {
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
  avatarSelector: ".profile__avatar",
};

export class UserInfo {
  constructor(config) {
    this._profileName = document.querySelector(config.nameSelector);
    this._about = document.querySelector(config.professionSelector);
    this._avatar = document.querySelector(config.avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._about.textContent,
    };
  }
  setUserInfo({ username, job, avatar }) {
    this._profileName.textContent = username;
    this._about.textContent = job;
    this._avatar.src = avatar;
  }
}
