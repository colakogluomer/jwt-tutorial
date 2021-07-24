class BaseService {
  constructor(model) {
    this.model = model;
  }
  save(objects) {
    return this.model.insertMany(objects);
  }
  async find(object) {
    return await this.model.findOne(object);
  }
  async findBy(prop, value) {
    return await this.model.find({ [prop]: value });
  }
  async insert(object) {
    return await this.model.create(object);
  }
}

module.exports = BaseService;
