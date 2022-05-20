import IApiEntity from '../api/api-entity'
import IEntities from '../model/entities'
import IEntity from '../model/entity'
import { Unsubscribe } from '../utils/common-types'

abstract class EntityController<TModels extends IEntities<any>, TClass, TInterface extends IEntity, TPayload> {
    constructor(
        protected _model: TModels,
        private _api: IApiEntity<TInterface, TPayload>,
    ) { }

    protected abstract _createEntity(data: TInterface): TClass
    protected abstract _editEntity(target: TClass, data: TInterface): void
    protected abstract _removeEntity(data: TInterface): void

    private _unsubscribe: Unsubscribe | undefined

    start() {
        if (this._unsubscribe) return

        this._model.isLoading = true

        this._unsubscribe = this._api.changesTracking(changesData => {
            this._model.isLoading = false

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
                            this._removeEntity(item.data)
                            break
                    }
                })
            }
        })
    }

    stop() {
        if (this._unsubscribe) {
            this._unsubscribe()
            this._unsubscribe = undefined
            this._model.clear()
        }
    }
}
export default EntityController
