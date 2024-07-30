class PersonalDataRequest {
  constructor(userId) {
    this.userId = userId
  }

  toJson() {
    return {
      userId: this.userId
    }
  }
}

export { PersonalDataRequest }
