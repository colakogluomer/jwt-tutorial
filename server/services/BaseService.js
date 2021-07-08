class BaseService {
  constructor(model) {
    this.model = model;
  }

  async find(object) {
    return await this.model.findOne({ object });
  }
  async insert(object) {
    return await this.model.create(object);
  }
}

module.exports = BaseService;
