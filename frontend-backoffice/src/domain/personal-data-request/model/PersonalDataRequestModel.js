class PersonalDataRequest {
  constructor(user, id, status, createdAt, updatedAt, deletedAt) {
    this.user = user
    this.id = id
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  static fromJson(json) {
    const { user, id, status, createdAt, updatedAt, deletedAt } = json
    return new PersonalDataRequest(user, id, status, createdAt, updatedAt, deletedAt)
  }
}

export { PersonalDataRequest }
