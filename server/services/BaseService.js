class BaseService {
  constructor(model) {
    this.model = model;
  }
  save(objects) {
    return this.model.insertMany(objects);
  }
  async find(id) {
    return await this.model.findById(id);
  }
  async findBy(property, value) {
    return await this.model.findOne({ [property]: value });
  }
  async insert(object) {
    return await this.model.create(object);
  }
}

module.exports = BaseService;
