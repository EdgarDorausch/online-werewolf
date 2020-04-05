export function actionCreatorFactoryFactory<A extends {type: string, payload: unknown}>() {
  type Action<T> = Extract<A,{type: T}>;

  return function actionCreatorFactory<T extends A['type']>(type: T): (payload: Action<T>['payload']) => Action<T>{
    return (payload: A['payload']) => ({
      type,
      payload
    } as Action<T>)
  }
}
