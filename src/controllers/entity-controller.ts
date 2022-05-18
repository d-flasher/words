import IApiEntity from '../api/api-entity'
import IEntities from '../model/entities'
import IEntity from '../model/entity'

abstract class EntityController<TModels extends IEntities<any>, TClass, TInterface extends IEntity, TPayload> {
    constructor(
        private _model: TModels,
        private _api: IApiEntity<TInterface, TPayload>,
    ) { }

    protected abstract _createEntity(data: TInterface): TClass
    protected abstract _editEntity(target: TClass, data: TInterface): void

    start() {
        this._api.changesTracking(changesData => {
            if (changesData instanceof Error) {
                this._model.error = changesData
            } else {
                this._model.error = undefined
                changesData.forEach(item => {
                    switch (item.type) {
                        case 'added':
                            this._model.add(this._createEntity(item.data))
                            break
                        case 'edited':
                            const target = this._model.getById(item.data.id)
                            if (target) this._editEntity(target, item.data)
                            break
                        case 'removed':
                            this._model.remove(item.data.id)
                            break
                    }
                })
            }
        })
    }
}
export default EntityController
