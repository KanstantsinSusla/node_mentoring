import EntityDataMapper from './entity-mapper';

export default class GroupDataMapper extends EntityDataMapper {
  static toDomain(entity) {
    return {
      id: entity.id,
      name: entity.name,
      permissions: entity.permissions,
    };
  }

  static toDalEntity(domain) {
    return {
      name: domain.name,
      permissions: domain.permissions,
    };
  }
}
