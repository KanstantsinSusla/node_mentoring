import EntityDataMapper from "./entity-mapper";

export default class UserDataMapper extends EntityDataMapper {

    toDomain(entity) {
        return super.toDomain(entity);
    };

    toDalEntity(domain) {
        return {
            login: domain.login,
            password: domain.password,
            age: domain.age,
        };
    }
}