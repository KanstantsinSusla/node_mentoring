import EntityDataMapper from "./entity-mapper";

export default class UserDataMapper extends EntityDataMapper {

    toDomain(entity) {
        return {
            id: entity.id,
            login: entity.login,
            password: entity.password,
            age: entity.age,
        }
    };

    toDalEntity(domain) {
        return {
            login: domain.login,
            password: domain.password,
            age: domain.age,
        };
    }
}